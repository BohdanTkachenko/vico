import React from 'react';
import classNames from 'classnames';
import { RichUtils } from 'draft-js';
import { getEntityAtCursor } from './util/getEntityAtCursor';

export class ToolbarButton extends React.Component {
  static propTypes = {
    editorState: React.PropTypes.object, // TODO: required
    inlineStyle: React.PropTypes.string,
    blockType: React.PropTypes.string,

    nodes: React.PropTypes.array,
    selection: React.PropTypes.object,
    className: React.PropTypes.string,
    children: React.PropTypes.node,
    command: React.PropTypes.string,
    commandValue: React.PropTypes.string,
    onClick: React.PropTypes.func,
    onChange: React.PropTypes.func,
    selector: React.PropTypes.string,
    selectors: React.PropTypes.array,
    icon: React.PropTypes.string,
    style: React.PropTypes.object,
  };

  onClick(e) {
    const { editorState, inlineStyle, blockType, onChange, onClick } = this.props;

    if (editorState && inlineStyle) {
      onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle.toUpperCase()));
    }

    if (editorState && blockType) {
      onChange(RichUtils.toggleBlockType(editorState, blockType.toLowerCase()));
    }

    if (typeof onClick === 'function') {
      onClick(e, this.props);
    }
  }

  renderIcon() {
    const { icon } = this.props;
    if (!icon) {
      return null;
    }

    return (
      <i
        className={`fa fa-${icon}`}
        aria-hidden="true"
      ></i>
    );
  }

  render() {
    const { className, children, editorState } = this.props;

    let isActive = false;
    if (editorState) {
      let selectors = [];
      if (typeof this.props.selector === 'string') {
        selectors = [this.props.selector];
      } else if (Array.isArray(this.props.selectors)) {
        selectors = this.props.selectors;
      }

      const inlineStyles = editorState.getCurrentInlineStyle().toObject();
      const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(editorState.getSelection().getStartKey())
        .getType();
      const entity = getEntityAtCursor(editorState);

      console.log(entity && entity.type);

      for (const selector of selectors) {
        if (typeof selector !== 'string') {
          continue;
        }

        if (selector.toUpperCase() === blockType.toUpperCase()) {
          isActive = true;
          break;
        }

        if (inlineStyles[selector.toUpperCase()]) {
          isActive = true;
          break;
        }

        if (entity && entity.type.toUpperCase() === selector.toUpperCase()) {
          isActive = true;
          break;
        }
      }
    }

    const activeClassName = isActive ? 'active' : undefined;

    return (
      <div className="VicoToolbarItem">
        <div
          className={classNames(['VicoToolbarButton', className, activeClassName])}
          onClick={::this.onClick}
          style={this.props.style}
        >
          {this.renderIcon()}
          {children}
        </div>
      </div>
    );
  }
}
