PhotoRectangle = React.createClass({
  render: function () {
    return <div className="cycle-slideshow"
      data-cycle-fx="flipHorz"
      data-cycle-timeout={_.random(5000, 10000)}>
      {_.map(this.props.urls, (url) =>
        <img style={{width: "100%", height: "100%"}} src={url} />)}
    </div>;
  },

  componentDidMount: function () {
    $(this.getDOMNode()).cycle();
  }
});
