Rectangle = React.createClass({
  render: function () {
    return <div className={"rect " + this.props.type + "rect"}
                style={{width: this.props.width*100 + "%",
                        height: this.props.height*100 + "%",
                        left: this.props.left*100 + "%",
                        top: this.props.top*100 + "%"}}>
      {this.props.type}
    </div>;
  },

  componentDidMount: function () {
    this.draggie = new Draggabilly(this.getDOMNode());
    this.draggie.on('dragEnd', (_, __, pointer) => {
      this.props.onDragEnd(
        pointer.pageX / $(window).width(), pointer.pageY / $(window).height());
    });
  },

  componentDidUnmount: function () {
    this.draggie.destroy();
  }
});

