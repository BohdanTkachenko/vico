import React from 'react';
import ReactDOM from 'react-dom';
import ReactWriter from '../dist/writer';

const value = `
<p>
  <strong>WYSIWYG</strong> (<a href="https://en.wikipedia.org/wiki/Help:IPA_for_English">/ˈwɪziwɪɡ/</a>
  <a href="https://en.wikipedia.org/wiki/Wikipedia:Pronunciation_respelling_key">wiz-ee-wig</a>)
  is an <a href="https://en.wikipedia.org/wiki/Acronym">acronym</a> for "<b>what you see is what
  you get</b>". In <a href="https://en.wikipedia.org/wiki/Computing">computing</a>, a <u>WYSIWYG</u>
  editor is a system in which content (text and graphics) onscreen during editing appears in a
  form <i>closely corresponding</i> to its appearance when printed or displayed as a finished
  product, which might be a printed document, web page, or slide presentation. <s>Test.</s>
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

ReactDOM.render((
  <ReactWriter value={value} />
), document.getElementById('main'));
