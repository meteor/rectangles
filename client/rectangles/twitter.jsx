TwitterRectangle = React.createClass({
  render: function () {
    if (this.props.html) {
      return <div className="tweets-outer hover-box">
        <TwitterEmbed html={this.props.html} />
        <div className="move-button">Move</div>
        </div>;
    } else {
      return <div className="config-outer hover-box">
        <div className="move-button">Move</div>
        <div>
          {"Configure your "}
          <a href="https://twitter.com/settings/widgets/new/">new Twitter widget</a>.
          When {"you're"} done, click on "Create widget". Then, copy and paste the HTML
          code:
        </div>

        <textarea style={{marginTop: "5px", marginBottom: "5px",
                          width: "99%", height: "80px"}} />
        <button style={{width: "40px", height: "20px"}}
                onClick={this.configure}>
          Add!
        </button>
      </div>;
    }
  },

  configure: function () {
    var rectId = this.props.rectId;
    var html = this.ref.html.getDOMNode().value;
    console.log(rectId, html);
//    Rectangles.update(rectId, {$set: {html: 
  },

  componentDidUpdate: function () {
    this.props.dragHandlesChanged();
  }
});
