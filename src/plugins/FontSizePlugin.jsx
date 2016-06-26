import React from 'react';
import { ToolbarButton } from '../';

const FONT_SIZES = [1, 2, 3, 4, 5, 6, 7];

export class FontSizePlugin extends React.Component {
  static propTypes = {
    execCommand: React.PropTypes.func.isRequired,
    nodes: React.PropTypes.array.isRequired,
  };

  onChange(e) {
    const { execCommand } = this.props;
    execCommand('fontSize', e.target.value);
  }

  render() {
    let value = 3;
    for (const node of this.props.nodes) {
      if (!node || !node.tagName || node.tagName.toLowerCase() !== 'font') {
        continue;
      }

      if (node.attributes && node.attributes.size) {
        value = Number(node.attributes.size.value);
        break;
      }
    }

    return (
      <ToolbarButton
        className="ReactWriterToolbarDropdown"
        {...this.props}
      >
        <select
          onChange={::this.onChange}
          value={value}
        >
          {FONT_SIZES.map(s => (
            <option
              key={s}
              value={s}
            >{s}</option>
          ))}
        </select>
      </ToolbarButton>
    );
  }
}
