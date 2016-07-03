import React from 'react';
import ReactDOM from 'react-dom';
import Vico from '../dist/vico';

const VALUE = `
<p>
  <strong>WYSIWYG</strong> (<a href="https://en.wikipedia.org/wiki/Help:IPA_for_English">/ˈwɪziwɪɡ/</a>
  <a href="https://en.wikipedia.org/wiki/Wikipedia:Pronunciation_respelling_key">wiz-ee-wig</a>)
  is an <a href="https://en.wikipedia.org/wiki/Acronym">acronym</a> for "<b>what you see is what
  you get</b>". In <a href="https://en.wikipedia.org/wiki/Computing">computing</a>, a <u>WYSIWYG</u>
  editor is a system in which <s>content</s> (text and graphics) onscreen during editing appears
  in a form <i>closely corresponding</i> to its appearance when printed or displayed as a finished
  product, which might be a printed document, web page, or slide presentation.
</p>
<p>
  Typically, the design goals of a WYSIWYG application may include the following:
</p>
<p>
  <ul>
    <li>Provide high-quality printed output on a particular printer</li>
    <li>Provide high-quality printed output on a variety of printers</li>
    <li>Provide high-quality on-screen output</li>
    <li>Allow the user to visualize what the document will look like when printed</li>
    <li>Allow the user to visualize what the website will look like when published</li>
  </ul>
</p>
`;

class Test extends React.Component {
  state = {
    value: VALUE,
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
      </div>
    );
  }
}

ReactDOM.render((
  <Test />
), document.getElementById('main'));
