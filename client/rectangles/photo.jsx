// TODO:
// - replace rotation with fade in and out with ease
// - remove images from rotation
// - stagger timing of photo transitions
// - crop images
PhotoRectangle = React.createClass({
  getInitialState: function () {
    return {
      dropboxVisible: false
    }
  },
  render: function () {
    return <div onMouseEnter={this.setState.bind(this, {dropboxVisible: true}, null)} onMouseLeave={this.setState.bind(this, {dropboxVisible: false}, null)}>
      <div className="dropbox-container" ref="dropbox-container" style={{visibility: this.state.dropboxVisible ? "" : "hidden"}}></div>
      <div className="cycle-slideshow" ref="cycle-slideshow"
        data-cycle-fx="flipHorz"
        data-cycle-timeout={_.random(5000, 10000)}>
        {_.map(this.props.urls, (url) =>
          <img style={{width: "100%", height: "100%"}} src={url} />)}
      </div>
    </div>;
  },

  componentDidMount: function () {
    var rectId = this.props._id;
    $(this.refs["cycle-slideshow"].getDOMNode()).cycle();

    var button = Dropbox.createChooseButton({
      success: function (files) {
        Meteor.call("photos.addFromDropbox", _.pluck(files, "link"), rectId);
        console.log(files);
      },

      linkType: "direct",
      multiselect: true,
      extensions: [".png", ".jpg", ".jpeg", ".gif"]
    });
    this.refs["dropbox-container"].getDOMNode().appendChild(button);
  }
});
