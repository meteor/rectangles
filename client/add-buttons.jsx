AddButtons = React.createClass({
  render: function () {
    return <div className="add-buttons">
      <div onClick={this.add.bind(this, "twitter")} className="add-button add-twitter-button">Add Twitter Feed</div>
      <div onClick={this.add.bind(this, "photo")} className="add-button add-album-button">Add Photo Album</div>
      <div onClick={this.add.bind(this, "richText")} className="add-button add-text-button">Add Text</div>
      <div onClick={this.showBackgroundColorPicker.bind(this)} className="add-button choose-background-color">Change background color</div>
    </div>
  },

  add: function (type) {
    var rect = {type: type};
    if (type === "photo")
      rect.urls = [];
    else if (type === "richText")
      rect.text = "Hello there!";

    var rectId = Rectangles.insert(rect);
    Dashboards.update(Dashboards.findOne()._id,
                      {$push: {"columns.0": {rectId: rectId, type: type}}});
  },

  showBackgroundColorPicker: function () {
    Session.set("showBackgroundColorPicker", true);
  }
});