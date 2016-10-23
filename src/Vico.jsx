import React from 'react';
import {
  Editor,
  EditorState,
  // ContentState,
  // convertToRaw,
  RichUtils,
  CompositeDecorator,
} from 'draft-js';
// import { processHTML } from 'draft-js/lib/DraftPasteProcessor';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import { ToolbarDelimeter } from './index';
import { Link } from './components';
import { FullPreset } from './presets';
// import { draftRawToHtml } from './util/draftRawToHtml';
import { findEntities } from './util/findEntities';

const decorator = new CompositeDecorator([
  {
    strategy: findEntities.bind(null, 'LINK'),
    component: Link,
  },
]);

const createEditorStateFromHtml = (html = '') => {
  if (typeof html !== 'string') {
    html = '';
  }

  return EditorState.createWithContent(stateFromHTML(html, {
    elementStyles: {
      u: 'UNDERLINE',
      s: 'STRIKETHROUGH',
      sub: 'SUBSCRIPT',
      sup: 'SUPERSCRIPT',
    },
  }), decorator);

  // return EditorState.createWithContent(
  //   ContentState.createFromBlockArray(processHTML(html)),
  //   decorator
  // );
};

export class Vico extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func,
    toolbar: React.PropTypes.array,
    value: React.PropTypes.string,
    disabled: React.PropTypes.bool,
  };

  state = {
    editorState: createEditorStateFromHtml(this.props.value),
    value: this.props.value,
    nodes: [],
  };

  componentWillMount() {
    const { onChange, value } = this.props;
    const currentValue = this.getValue(this.state.editorState);

    if (currentValue !== value) {
      // onChange(currentValue);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      this.setState({
        editorState: createEditorStateFromHtml(nextProps.value),
        value: nextProps.value,
      });
    }
  }

  onChange(editorState) {
    let value = this.state.value;

    const previousContent = this.state.editorState.getCurrentContent();
    const changed = previousContent !== editorState.getCurrentContent();

    if (changed) {
      value = this.getValue(editorState);
    }

    this.setState({ editorState, value }, () => {
      if (changed) {
        // this.props.onChange(value);
      }
    });
  }

  getValue(editorState = this.state.editorState) {
    // const raw = convertToRaw(editorState.getCurrentContent());
    return stateToHTML(editorState.getCurrentContent());
    // return draftRawToHtml(raw);
  }

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);

    if (newState) {
      // this.onChange(newState);
      return true;
    }

    return false;
  }

  render() {
    const { editorState } = this.state;
    // const { disabled } = this.props;
    let { toolbar } = this.props;

    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();

    const currentStyle = editorState.getCurrentInlineStyle();

    window.es = editorState;

    console.log(blockType);
    console.log(currentStyle.toObject());

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
                editorState,
                onChange: ::this.onChange,
                nodes: this.state.nodes,
              });
            })}
          </div>
        ))}

        <div className="clear"></div>

        <div className="VicoContent">
          <Editor
            editorState={editorState}
            onChange={::this.onChange}
            handleKeyCommand={::this.handleKeyCommand}
            customStyleMap={{
              SUBSCRIPT: {
                fontSize: '.83em',
                verticalAlign: 'sub',
              },
              SUPERSCRIPT: {
                fontSize: '.83em',
                verticalAlign: 'super',
              },
            }}
          />
        </div>
      </div>
    );
  }
}
