var rectangleTypes = {
  richText: RichTextRectangle,
  photo: PhotoRectangle
};

Rectangle = React.createClass({
  mixins: [ReactMeteor.Mixin],
  getMeteorState: function () {
    console.log(this.props.rectId);
    return {
      rect: Rectangles.findOne(this.props.rectId)
    };
  },
  render: function () {
    console.log('xy', this.props.type, rectangleTypes[this.props.type]);

    return <div className={"rect " + this.props.type + "rect"}
                style={{width: this.props.width*100 + "%",
                        height: this.props.height*100 + "%",
                        left: this.props.left*100 + "%",
                        top: this.props.top*100 + "%"}}>
      {this.state.rect ?
       React.createElement(rectangleTypes[this.props.type], this.state.rect) :
       "Loading..."}
    </div>;
  },

  componentDidMount: function () {
    var div = this.getDOMNode();
    this.draggie = new Draggabilly(div);

    this.draggie.on('dragEnd', (_, __, pointer) => {

      // draggabilly sets position in pixels; restore it to its original form.
      div.style.left = this.props.left*100 + "%";
      div.style.top = this.props.top*100 + "%";

      this.props.onDragEnd(
        pointer.pageX / $(window).width(),
        pointer.pageY / $(window).height());
    });
  },

  componentDidUnmount: function () {
    this.draggie.destroy();
  }
});

