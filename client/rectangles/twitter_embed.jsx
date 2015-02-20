TwitterEmbed = React.createClass({
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