var rectangleTypes = {
  richText: RichTextRectangle,
  photo: PhotoRectangle,
  twitter: TwitterRectangle
};

Rectangle = React.createClass({
  mixins: [ReactMeteor.Mixin],
  getInitialState: function () {
    return {
      key: 0
    };
  },
  getMeteorState: function () {
    return {
      rect: Rectangles.findOne(this.props.rectId)
    };
  },
  render: function () {
    return <div className={"rect " + this.props.type + "Rect"}
                style={{overflow: "hidden",
                        width: this.props.width*100 + "%",
                        height: this.props.height*100 + "%",
                        left: this.props.left*100 + "%",
                        top: this.props.top*100 + "%"}}>
      <div key={this.state.key} className="rect-body hover-box">
        <div className="remove-button" onClick={this.props.onRemove}>Remove</div>
        {this.state.rect ?
         React.createElement(rectangleTypes[this.props.type], _.extend(
           {rerender: this.rerender,
            dragHandlesChanged: this.requeryDragHandles}, this.state.rect)) :
         "Loading..."}
      </div>
    </div>;
  },

  rerender: function () {
    this.setState({key: this.state.key + 1});
  },

  componentDidMount: function () {
    var div = this.getDOMNode();
    this.draggie = new Draggabilly(div, {
      handle: '.move-button'
    });

    this.draggie.on('dragEnd', (_, __, pointer) => {

      // draggabilly sets position in pixels; restore it to its original form.
      div.style.left = this.props.left*100 + "%";
      div.style.top = this.props.top*100 + "%";

      this.props.onDragEnd(
        pointer.pageX / $(window).width(),
        pointer.pageY / $(window).height());
    });
  },

  componentDidUpdate: function () {
    this.requeryDragHandles();
  },

  // call this if a "Move" button might ever have been recreated,
  // so that Dragabilly can find it.
  requeryDragHandles: function () {
    this.draggie.setHandles();
  },

  componentDidUnmount: function () {
    this.draggie.destroy();
  }
});
