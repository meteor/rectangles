PhotoRectangle = React.createClass({
  render: function () {
    return <div className="cycle-slideshow"
      data-cycle-fx="flipHorz"
      data-cycle-timeout="8000"
      >
      <img style={{width: "100%", height: "100%"}} src="http://malsup.github.io/images/p1.jpg" />
      <img style={{width: "100%", height: "100%"}} src="http://malsup.github.io/images/p2.jpg" />
      <img style={{width: "100%", height: "100%"}} src="http://malsup.github.io/images/p3.jpg" />
      <img style={{width: "100%", height: "100%"}} src="http://malsup.github.io/images/p4.jpg" />
    </div>;
  },

  componentDidMount: function () {
    $(this.getDOMNode()).cycle();
  }
});
