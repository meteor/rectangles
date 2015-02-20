TwitterRectangle = React.createClass({
  render: function () {
    if (this.props.html) {
      return <div className="tweets-outer">
        <TwitterEmbed html={this.props.html} />
        <div className="move-button">Move</div>
        </div>;
    } else {
      return <div className="config-outer">
        <div className="move-button">Move</div>
        <div>
          {"Configure your "}
          <a href="https://twitter.com/settings/widgets/new/">new Twitter widget</a>.
          When {"you're"} done, click on "Create widget". Then, copy and paste the HTML
          code:
        </div>

        <textarea ref="html"
                  style={{marginTop: "5px", marginBottom: "5px",
                          width: "99%", height: "80px"}} />
        <button style={{width: "40px", height: "20px"}}
                onClick={this.configure}>
          Add!
        </button>
      </div>;
    }
  },

  configure: function () {
    var rectId = this.props._id;
    var html = this.refs.html.getDOMNode().value;
    Rectangles.update(rectId, {$set: {html: html}});
  },

  componentDidUpdate: function () {
    this.props.dragHandlesChanged();
  }
});

var TwitterEmbed = React.createClass({
  render: function () {
    // Turns out javascript in a script tag doesn't get eval'd
    // automatically, so extract it to be eval'd after rendering.
    this.scriptToEval = this.props.html.match(/<script>(.*)<\/script>/)[1];
    return <div dangerouslySetInnerHTML={{__html: this.props.html}}></div>;
  },

  componentDidMount: function () {
    eval(this.scriptToEval);
  },

  componentDidUpdate: function () {
    eval(this.scriptToEval);
  }
});