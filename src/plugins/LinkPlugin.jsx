import React from 'react';
import Modal from 'react-modal';
import { RichUtils, Entity } from 'draft-js';
import { find } from '../util/matcher';
import { deleteNodes } from '../util/dom';
import { ToolbarButton } from '../';

export class LinkPlugin extends React.Component {
  static propTypes = {
    editorState: React.PropTypes.object.isRequired,
    onChange: React.PropTypes.func.isRequired,
    nodes: React.PropTypes.array,
  };

  state = {
    modalOpened: false,
  };

  onUrlChange(e) {
    this.setState({
      url: e.target.value,
    });
  }

  openModal() {
    const { nodes } = this.props;
    const link = find(['a'], nodes);

    this.setState({
      modalOpened: true,
      url: link ? link.attributes.href.value : '',
      editMode: !!link,
    });
  }

  closeModal() {
    this.setState({ modalOpened: false });
  }

  link() {
    if (this.state.editMode) {
      const link = find(['a'], this.props.nodes);
      link.attributes.href.value = this.state.url;
    } else {
      const selection = this.props.editorState.getSelection();
      if (selection.isCollapsed()) {
        return;
      }

      const entityKey = Entity.create('LINK', 'MUTABLE', { url: this.state.url });
      this.props.onChange(RichUtils.toggleLink(this.props.editorState, selection, entityKey));
    }

    this.closeModal();
  }

  unlink() {
    deleteNodes(['a'], this.props.nodes);
    this.closeModal();
  }

  render() {
    return (
      <ToolbarButton
        icon="link"
        onClick={::this.openModal}
        selector="LINK"
        {...this.props}
      >
        <Modal
          className="Vico_Modal"
          isOpen={this.state.modalOpened}
          onRequestClose={::this.closeModal}
        >
          <div className="Vico_Modal_Header">
            <span
              className="Vico_Modal_Header_close"
              onClick={::this.closeModal}
            >
              <i className="fa fa-times"></i>
            </span>

            Insert URL
          </div>

          <div className="Vico_Modal_Body">
            <b>URL:</b>
            <input
              className="Vico_Modal_Input"
              type="text"
              value={this.state.url}
              onChange={::this.onUrlChange}
            />

            <br />
            <br />

            <div>
              <input type="checkbox" /> Open in new window
            </div>
          </div>

          <div className="Vico_Modal_Footer">
            <ToolbarButton
              icon="check"
              onClick={::this.link}
            >&nbsp;Save</ToolbarButton>

            {this.state.editMode && (
              <ToolbarButton
                icon="trash-o"
                onClick={::this.unlink}
              >&nbsp;Delete</ToolbarButton>
            )}
          </div>
        </Modal>
      </ToolbarButton>
    );
  }
}
