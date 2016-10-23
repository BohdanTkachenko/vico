import React from 'react';
import { ToolbarPopupMenuButton, ColorPicker } from '../';

export class FontColorPlugin extends React.Component {
  static propTypes = {
    nodes: React.PropTypes.array.isRequired,
  };

  setColor(color) {
    throw new Error(`Set color ${color} not implemented`);
  }

  render() {
    let value = '#000000';
    for (const node of this.props.nodes) {
      if (!node || !node.tagName || node.tagName.toLowerCase() !== 'font') {
        continue;
      }

      if (node.attributes && node.attributes.color) {
        value = node.attributes.color.value;
        break;
      }
    }

    return (
      <ToolbarPopupMenuButton
        icon="font"
        menu={(
          <ColorPicker
            value={value}
            onChange={::this.setColor}
          />
        )}
        {...this.props}
      >
        <div
          className="VicoToolbarButtonColorLine"
          style={{ backgroundColor: value }}
        ></div>
      </ToolbarPopupMenuButton>
    );
  }
}
