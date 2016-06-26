import React from 'react';
import classNames from 'classnames';
import { match } from './util/matcher';

export class ToolbarButton extends React.Component {
  static propTypes = {
    execCommand: React.PropTypes.func,
    nodes: React.PropTypes.array,
    selection: React.PropTypes.object,
    className: React.PropTypes.string,
    children: React.PropTypes.node,
    command: React.PropTypes.string,
    commandValue: React.PropTypes.string,
    onClick: React.PropTypes.func,
    selectors: React.PropTypes.array,
    icon: React.PropTypes.string,
    style: React.PropTypes.object,
  };

  onClick(e) {
    const { command, commandValue, onClick, execCommand } = this.props;

    if (typeof command === 'string') {
      execCommand(command, false, commandValue);
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
    const { className, children, selectors, nodes } = this.props;
    const activeClassName = match(selectors, nodes) ? 'active' : undefined;

    return (
      <div className="ReactWriterToolbarItem">
        <div
          className={classNames(['ReactWriterToolbarButton', className, activeClassName])}
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
