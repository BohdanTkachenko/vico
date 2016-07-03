import React from 'react';
import { ToolbarDelimeter } from './index';
import { FullPreset } from './presets';
import { match } from './util/matcher';
import { getSelection, setSelection } from './util/selection';

export class Vico extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
    toolbar: React.PropTypes.array,
    value: React.PropTypes.string,
    disabled: React.PropTypes.bool,
  };

  state = {
    selection: null,
    nodes: [],
  };

  onBlur(e) {
    this.saveSelection();

    const { onBlur } = this.props;
    if (typeof onBlur === 'function') {
      this.props.onBlur(e);
    }
  }

  onChange() {
    this.saveSelection();

    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      this.props.onChange(this.refs.content.innerHTML);
    }
  }

  onKeyDown(e) {
    this.saveSelection();

    if (match(['li'], this.state.nodes)) {
      return;
    }

    if (e.keyCode !== 13) {
      return;
    }

    document.execCommand('formatBlock', false, 'p');
  }

  onKeyUp() {
    this.saveSelection();
  }

  onMouseDown() {
    this.saveSelection();
  }

  onMouseUp() {
    this.saveSelection();
  }

  saveSelection(callback) {
    const { selection, nodes } = getSelection(this.refs.content);
    this.setState({ selection, nodes }, callback);
  }

  restoreSelection() {
    if (!this.state.selection) {
      this.saveSelection(() => {
        this.restoreSelection();
      });

      return;
    }

    setSelection(this.state.selection);
  }

  execCommand(name, arg) {
    this.restoreSelection();
    this.refs.content.focus();
    document.execCommand(name, false, arg);
  }

  render() {
    const { value, disabled } = this.props;
    let { toolbar } = this.props;

    if (!toolbar) {
      toolbar = FullPreset;
    }

    let isArr = true;
    for (const item of toolbar) {
      if (!Array.isArray(item)) {
        isArr = false;
      }
    }

    if (!isArr) {
      toolbar = [toolbar];
    }

    return (
      <div className="Vico">
        {toolbar.map((items, toolbarId) => (
          <div
            key={toolbarId}
            className="VicoToolbar"
          >
            {items.map((item, toolbarItemId) => {
              if (item === '-') {
                return <ToolbarDelimeter key={toolbarItemId} />;
              }

              return React.createElement(item, {
                key: toolbarItemId,
                execCommand: ::this.execCommand,
                restoreSelection: ::this.restoreSelection,
                selection: this.state.selection,
                nodes: this.state.nodes,
              });
            })}
          </div>
        ))}

        <div className="clear"></div>

        <div className="VicoContent">
          <div
            ref="content"
            className="VicoEditArea"
            contentEditable={!disabled}
            dangerouslySetInnerHTML={{ __html: value }}
            onInput={::this.onChange}
            onBlur={::this.onBlur}
            onFocus={this.props.onFocus}
            onKeyDown={::this.onKeyDown}
            onKeyUp={::this.onKeyUp}
            onMouseDown={::this.onMouseDown}
            onMouseUp={::this.onMouseUp}
          ></div>
        </div>
      </div>
    );
  }
}
