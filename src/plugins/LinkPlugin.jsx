import React from 'react';
import Modal from 'react-modal';
import { find } from '../util/matcher';
import { deleteNodes } from '../util/dom';
import { ToolbarButton } from '../';

export class LinkPlugin extends React.Component {
  static propTypes = {
    execCommand: React.PropTypes.func,
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
      this.props.execCommand('createLink', this.state.url);
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
        selectors={['a']}
        {...this.props}
      >
        <Modal
          className="ReactWriter_Modal"
          isOpen={this.state.modalOpened}
          onRequestClose={::this.closeModal}
        >
          <div className="ReactWriter_Modal_Header">
            <span
              className="ReactWriter_Modal_Header_close"
              onClick={::this.closeModal}
            >
              <i className="fa fa-times"></i>
            </span>

            Insert URL
          </div>

          <div className="ReactWriter_Modal_Body">
            <b>URL:</b>
            <input
              className="ReactWriter_Modal_Input"
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

          <div className="ReactWriter_Modal_Footer">
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
