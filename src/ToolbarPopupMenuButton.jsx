import React from 'react';
import { ToolbarButton } from './';

export class ToolbarPopupMenuButton extends React.Component {
  static propTypes = {
    restoreSelection: React.PropTypes.func.isRequired,
    menu: React.PropTypes.node.isRequired,
    children: React.PropTypes.node,
    onClick: React.PropTypes.func,
  };

  state = {
    show: false,
  };

  onClick(e) {
    const { restoreSelection, onClick } = this.props;

    restoreSelection();
    this.setState({ show: !this.state.show });

    if (typeof onClick === 'function') {
      onClick(e);
    }
  }

  render() {
    return (
      <ToolbarButton
        {...this.props}
        onClick={::this.onClick}
      >
        {this.props.children}
        {this.state.show && (
          <div className="VicoToolbarButtonMenu">
            {this.props.menu}
          </div>
        )}
      </ToolbarButton>
    );
  }
}
