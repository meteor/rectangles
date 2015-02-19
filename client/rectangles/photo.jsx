// TODO:
// - remove images from rotation
// - stagger timing of photo transitions
// - crop images
PhotoRectangle = React.createClass({
  getInitialState: function () {
    return {
      dropboxVisible: false
    };
  },
  render: function () {
    // show newest images first.
    var urls = _.clone(this.props.urls).reverse();

    return <div key={this.state.key}
      onMouseEnter={this.setState.bind(this, {dropboxVisible: true}, null)}
      onMouseLeave={this.setState.bind(this, {dropboxVisible: false}, null)}>

      <div className="dropbox-container" ref="dropbox-container" style={{visibility: this.state.dropboxVisible ? "" : "hidden"}}></div>
      <div className="cycle-slideshow" ref="cycle-slideshow"
        data-cycle-fx="flipHorz"
        data-cycle-timeout={_.random(5000, 10000)}>
        {_.map(urls, (url) =>
          <img style={{width: "100%", height: "100%"}} src={url} />)}
      </div>
    </div>;
  },

  initSlideshowPlugin: function () {
    $(this.refs["cycle-slideshow"].getDOMNode()).cycle();
  },

  componentDidMount: function () {
    var rectId = this.props._id;
    var comp = this;
    comp.initSlideshowPlugin();

    var button = Dropbox.createChooseButton({
      success: function (files) {
        Meteor.call("photos.addFromDropbox", _.pluck(files, "link"), rectId, function () {
          comp.props.rerender();
        });
      },

      linkType: "direct",
      multiselect: true,
      extensions: [".png", ".jpg", ".jpeg", ".gif"]
    });
    this.refs["dropbox-container"].getDOMNode().appendChild(button);
  }
});
