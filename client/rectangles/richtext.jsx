RichTextRectangle = React.createClass({
  getInitialState: function () {
    return {
      content: {ops: [{insert: 'Hello World!'}]},
      isEditing: false
    };
  },
  render: function () {
    // the <div> is just for React's benefit.  Also, the "key"
    // attributes seem to workaround a bizarre bug where clicking
    // "Save" triggers both finishEditing and startEditing.
    return <div>
      {this.state.isEditing ?
       <RichTextEditor key="1" initialContent={this.state.content}
        onSave={this.finishEditing} /> :
       <div key="2" className="view-mode hover-box">
       <div className="view-mode-content">
         <RichTextView content={this.state.content}/>
       </div>
       <div className="edit-button" onClick={this.startEditing}>Edit</div>
       <div className="move-button">Move</div>
       </div>}
    </div>;
  },
  startEditing: function () {
    this.setState({isEditing: true});
  },
  finishEditing: function (quillContent) {
    this.setState({isEditing: false,
                   content: quillContent});
  },
  componentDidUpdate: function () {
    // We may have gained a new "Move" button
    this.props.dragHandlesChanged();
  }
});

RichTextView = React.createClass({
  render: function () {
    return <div className="rich-text-content" ref="q"></div>;
  },
  componentDidMount: function () {
    this.quill = new Quill(this.refs.q.getDOMNode(), {
      theme: 'snow',
      readOnly: true
    });
    this.quill.setContents(this.props.content);
  },
  componentDidUpdate: function () {
    this.quill.setContents(this.props.content);
  }
});

RichTextEditor = React.createClass({
  render: function () {
    return <div className="edit-mode-wrapper" ref="editModeWrapper">
      <div className="editor-toolbar-wrapper">
      <div className="editor-toolbar" ref="editorToolbar">
      <RichTextEditorToolbarControls onSaveClicked={this.handleSaveClicked}/>
      </div>
      </div>
      <div className="editor-wrapper">
      <div className="editor" ref="editor">Editor</div>
      </div>
      </div>;
  },
  handleSaveClicked: function () {
    this.props.onSave(this.quill.getContents());
  },
  componentDidMount: function () {
    var quill = this.quill = new Quill(this.refs.editor.getDOMNode(), {
      theme: 'snow',
      modules: {
        'toolbar': { container: this.refs.editorToolbar.getDOMNode() },
        'link-tooltip': true
      }
    });
    quill.setContents(this.props.initialContent);
    quill.getModule('undo-manager').clear();
    // focus the editor, and put insertion point at end
    quill.setSelection(quill.getLength(), quill.getLength());
  }
});

RichTextEditorToolbarControls = React.createClass({
  shouldCompontUpdate: function () {
    return false;
  },
  componentDidMount: function () {
    var saveButton = this.getDOMNode().querySelector('.edit-done');
    saveButton.addEventListener('click', this.props.onSaveClicked, false);
  },
  render: function () {
    // Because Quill does things like replace SELECT tags with SPAN tags,
    // which then cause React to blow up (even if the component is never
    // updated!), we can't generate this DOM via React (as far as I know).
    return <div dangerouslySetInnerHTML={{__html: `
      <span class="ql-format-group">
      <span title="Bold" class="ql-format-button ql-bold"></span>
      <span class="ql-format-separator"></span>
      <span title="Italic" class="ql-format-button ql-italic"></span>
      <span class="ql-format-separator"></span>
      <span title="Underline" class="ql-format-button ql-underline"></span>
      <span class="ql-format-separator"></span>
      <span title="Strikethrough" class="ql-format-button ql-strike"></span>
      </span>
      <span class="ql-format-group">
      <select title="Size" class="ql-size">
      <option value="16px" selected="">Normal</option>
      <option value="24px">Large</option>
      <option value="36px">Huge</option>
      </select>
      </span>
      <span class="ql-format-group">
      <select title="Text Color" class="ql-color">
      <option value="rgb(0, 0, 0)" label="rgb(0, 0, 0)" selected=""></option>
      <option value="rgb(230, 0, 0)" label="rgb(230, 0, 0)"></option>
      <option value="rgb(255, 153, 0)" label="rgb(255, 153, 0)"></option>
      <option value="rgb(255, 255, 0)" label="rgb(255, 255, 0)"></option>
      <option value="rgb(0, 138, 0)" label="rgb(0, 138, 0)"></option>
      <option value="rgb(0, 102, 204)" label="rgb(0, 102, 204)"></option>
      <option value="rgb(153, 51, 255)" label="rgb(153, 51, 255)"></option>
      <option value="rgb(255, 255, 255)" label="rgb(255, 255, 255)"></option>
      <option value="rgb(250, 204, 204)" label="rgb(250, 204, 204)"></option>
      <option value="rgb(255, 235, 204)" label="rgb(255, 235, 204)"></option>
      <option value="rgb(255, 255, 204)" label="rgb(255, 255, 204)"></option>
      <option value="rgb(204, 232, 204)" label="rgb(204, 232, 204)"></option>
      <option value="rgb(204, 224, 245)" label="rgb(204, 224, 245)"></option>
      <option value="rgb(235, 214, 255)" label="rgb(235, 214, 255)"></option>
      <option value="rgb(187, 187, 187)" label="rgb(187, 187, 187)"></option>
      <option value="rgb(240, 102, 102)" label="rgb(240, 102, 102)"></option>
      <option value="rgb(255, 194, 102)" label="rgb(255, 194, 102)"></option>
      <option value="rgb(255, 255, 102)" label="rgb(255, 255, 102)"></option>
      <option value="rgb(102, 185, 102)" label="rgb(102, 185, 102)"></option>
      <option value="rgb(102, 163, 224)" label="rgb(102, 163, 224)"></option>
      <option value="rgb(194, 133, 255)" label="rgb(194, 133, 255)"></option>
      <option value="rgb(136, 136, 136)" label="rgb(136, 136, 136)"></option>
      <option value="rgb(161, 0, 0)" label="rgb(161, 0, 0)"></option>
      <option value="rgb(178, 107, 0)" label="rgb(178, 107, 0)"></option>
      <option value="rgb(178, 178, 0)" label="rgb(178, 178, 0)"></option>
      <option value="rgb(0, 97, 0)" label="rgb(0, 97, 0)"></option>
      <option value="rgb(0, 71, 178)" label="rgb(0, 71, 178)"></option>
      <option value="rgb(107, 36, 178)" label="rgb(107, 36, 178)"></option>
      <option value="rgb(68, 68, 68)" label="rgb(68, 68, 68)"></option>
      <option value="rgb(92, 0, 0)" label="rgb(92, 0, 0)"></option>
      <option value="rgb(102, 61, 0)" label="rgb(102, 61, 0)"></option>
      <option value="rgb(102, 102, 0)" label="rgb(102, 102, 0)"></option>
      <option value="rgb(0, 55, 0)" label="rgb(0, 55, 0)"></option>
      <option value="rgb(0, 41, 102)" label="rgb(0, 41, 102)"></option>
      <option value="rgb(61, 20, 102)" label="rgb(61, 20, 102)"></option>
      </select>
      <span class="ql-format-separator"></span>
      <select title="Background Color" class="ql-background">
      <option value="rgb(0, 0, 0)" label="rgb(0, 0, 0)"></option>
      <option value="rgb(230, 0, 0)" label="rgb(230, 0, 0)"></option>
      <option value="rgb(255, 153, 0)" label="rgb(255, 153, 0)"></option>
      <option value="rgb(255, 255, 0)" label="rgb(255, 255, 0)"></option>
      <option value="rgb(0, 138, 0)" label="rgb(0, 138, 0)"></option>
      <option value="rgb(0, 102, 204)" label="rgb(0, 102, 204)"></option>
      <option value="rgb(153, 51, 255)" label="rgb(153, 51, 255)"></option>
      <option value="rgb(255, 255, 255)" label="rgb(255, 255, 255)" selected=""></option>
      <option value="rgb(250, 204, 204)" label="rgb(250, 204, 204)"></option>
      <option value="rgb(255, 235, 204)" label="rgb(255, 235, 204)"></option>
      <option value="rgb(255, 255, 204)" label="rgb(255, 255, 204)"></option>
      <option value="rgb(204, 232, 204)" label="rgb(204, 232, 204)"></option>
      <option value="rgb(204, 224, 245)" label="rgb(204, 224, 245)"></option>
      <option value="rgb(235, 214, 255)" label="rgb(235, 214, 255)"></option>
      <option value="rgb(187, 187, 187)" label="rgb(187, 187, 187)"></option>
      <option value="rgb(240, 102, 102)" label="rgb(240, 102, 102)"></option>
      <option value="rgb(255, 194, 102)" label="rgb(255, 194, 102)"></option>
      <option value="rgb(255, 255, 102)" label="rgb(255, 255, 102)"></option>
      <option value="rgb(102, 185, 102)" label="rgb(102, 185, 102)"></option>
      <option value="rgb(102, 163, 224)" label="rgb(102, 163, 224)"></option>
      <option value="rgb(194, 133, 255)" label="rgb(194, 133, 255)"></option>
      <option value="rgb(136, 136, 136)" label="rgb(136, 136, 136)"></option>
      <option value="rgb(161, 0, 0)" label="rgb(161, 0, 0)"></option>
      <option value="rgb(178, 107, 0)" label="rgb(178, 107, 0)"></option>
      <option value="rgb(178, 178, 0)" label="rgb(178, 178, 0)"></option>
      <option value="rgb(0, 97, 0)" label="rgb(0, 97, 0)"></option>
      <option value="rgb(0, 71, 178)" label="rgb(0, 71, 178)"></option>
      <option value="rgb(107, 36, 178)" label="rgb(107, 36, 178)"></option>
      <option value="rgb(68, 68, 68)" label="rgb(68, 68, 68)"></option>
      <option value="rgb(92, 0, 0)" label="rgb(92, 0, 0)"></option>
      <option value="rgb(102, 61, 0)" label="rgb(102, 61, 0)"></option>
      <option value="rgb(102, 102, 0)" label="rgb(102, 102, 0)"></option>
      <option value="rgb(0, 55, 0)" label="rgb(0, 55, 0)"></option>
      <option value="rgb(0, 41, 102)" label="rgb(0, 41, 102)"></option>
      <option value="rgb(61, 20, 102)" label="rgb(61, 20, 102)"></option>
      </select>
      </span>
      <span class="ql-format-group">
      <span title="List" class="ql-format-button ql-list"></span>
      <span class="ql-format-separator"></span>
      <span title="Bullet" class="ql-format-button ql-bullet"></span>
      <span class="ql-format-separator"></span>
      <select title="Text Alignment" class="ql-align">
      <option value="left" label="Left" selected=""></option>
      <option value="center" label="Center"></option>
      <option value="right" label="Right"></option>
      <option value="justify" label="Justify"></option>
      </select>
      </span>
      <span class="edit-done">Save</span>
      `}}>
      </div>;
  }
});
