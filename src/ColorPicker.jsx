import React from 'react';
import classNames from 'classnames';

const colors = [
  [
    '#330000', '#331900', '#333300', '#193300', '#003300', '#003319', '#003333',
    '#001933', '#000033', '#190033', '#330033', '#330019', '#000000',
  ],
  [
    '#660000', '#663300', '#666600', '#336600', '#006600', '#006633', '#006666',
    '#003366', '#000066', '#330066', '#660066', '#660033', '#202020',
  ],
  [
    '#990000', '#994C00', '#999900', '#4C9900', '#009900', '#00994C', '#009999',
    '#004C99', '#000099', '#4C0099', '#990099', '#99004C', '#404040',
  ],
  [
    '#CC0000', '#CC6600', '#CCCC00', '#66CC00', '#00CC00', '#00CC66', '#00CCCC',
    '#0066CC', '#0000CC', '#6600CC', '#CC00CC', '#CC0066', '#606060',
  ],
  [
    '#FF0000', '#FF8000', '#FFFF00', '#80FF00', '#00FF00', '#00FF80', '#00FFFF',
    '#0080FF', '#0000FF', '#7F00FF', '#FF00FF', '#FF007F', '#808080',
  ],
  [
    '#FF3333', '#FF9933', '#FFFF33', '#99FF33', '#33FF33', '#33FF99', '#33FFFF',
    '#3399FF', '#3333FF', '#9933FF', '#FF33FF', '#FF3399', '#A0A0A0',
  ],
  [
    '#FF6666', '#FFB266', '#FFFF66', '#B2FF66', '#66FF66', '#66FFB2', '#66FFFF',
    '#66B2FF', '#6666FF', '#B266FF', '#FF66FF', '#FF66B2', '#C0C0C0',
  ],
  [
    '#FF9999', '#FFCC99', '#FFFF99', '#CCFF99', '#99FF99', '#99FFCC', '#99FFFF',
    '#99CCFF', '#9999FF', '#CC99FF', '#FF99FF', '#FF99CC', '#E0E0E0',
  ],
  [
    '#FFCCCC', '#FFE5CC', '#FFFFCC', '#E5FFCC', '#CCFFCC', '#CCFFE5', '#CCFFFF',
    '#CCE5FF', '#CCCCFF', '#E5CCFF', '#FFCCFF', '#FFCCE5', '#FFFFFF',
  ],
];

const componentToHex = (c) => {
  const hex = c.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
};

export class ColorPicker extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string,
    canBeTransparent: React.PropTypes.bool,
  };

  setColor(color) {
    const { onChange } = this.props;

    return () => {
      if (typeof onChange !== 'function') {
        return;
      }

      onChange(color);
    };
  }

  invertColor(color) {
    color = color.substring(1);
    color = parseInt(color, 16);
    color = 0xFFFFFF ^ color;
    color = color.toString(16);
    color = (`000000${color}`).slice(-6);
    color = `#${color}`;
    return color;
  }

  prepareColor(color) {
    const { canBeTransparent } = this.props;

    if (!color || typeof color !== 'string') {
      return canBeTransparent ? null : '#000000';
    }

    color = color.toLowerCase();

    if (color.startsWith('rgb(')) {
      const matches = /^rgba?\((\d+),\s+(\d+),\s+(\d+)/.exec(color);

      const r = Number(matches[1]);
      const g = Number(matches[2]);
      const b = Number(matches[3]);

      return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
    }

    return color;
  }

  render() {
    const { value, canBeTransparent } = this.props;

    return (
      <div className="VicoColorPicker">
        {canBeTransparent && (
          <div
            className={classNames({
              VicoColorPickerLine: true,
              VicoColorPickerLineTransparent: true,
              active: !value,
            })}
            onClick={::this.setColor(null)}
          >
            <i
              className="fa fa-times"
              ariaHidden="true"
            ></i>
          </div>
        )}

        {colors.map((line, idx) => (
          <div
            key={idx}
            className="VicoColorPickerLine"
          >
            {line.map(color => {
              const active = this.prepareColor(color) === this.prepareColor(value);

              return (
                <div
                  key={color}
                  className={classNames({ VicoColorPickerColor: true, active })}
                  style={{ backgroundColor: color }}
                  onClick={::this.setColor(color)}
                >
                  {active && (
                    <i
                      className="fa fa-check"
                      ariaHidden="true"
                      style={{ color: this.invertColor(color) }}
                    ></i>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
}
