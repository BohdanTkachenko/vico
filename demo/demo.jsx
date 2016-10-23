import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.css';
import { Vico } from '../src/Vico';
import content from './content.html';
import '../src/vico.less';

class Test extends React.Component {
  state = {
    value: content,
  }

  onChange(value) {
    this.setState({ value });
  }

  render() {
    return (
      <div>
        <Vico
          value={this.state.value}
          onChange={::this.onChange}
        />

        <h5>Result:</h5>

        <textarea
          value={this.state.value}
          onChange={(e) => this.onChange(e.target.value)}
          style={{
            width: '100%',
            height: 300,
          }}
        ></textarea>

        <div dangerouslySetInnerHTML={{ __html: this.state.value }}></div>
      </div>
    );
  }
}

ReactDOM.render((
  <Test />
), document.getElementById('main'));
