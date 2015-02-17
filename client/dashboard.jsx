Dashboard = React.createClass({
  calculateRectangleBounds: function () {
    var columns = this.props.columns;
    // Return a two-dimensional array of
    // {type, width, height, left, top},
    // where width/height/left/top are numeric percentages.
    return _.map(columns, function (rects, colNum) {
      var colWidth = 100. / columns.length;
      var numFlex = 0;
      var amountFlex = 100.;
      _.each(rects, function (rect) {
        if (rect.type === 'text') {
          numFlex++;
        } else if (rect.type === 'photo') {
          amountFlex -= colWidth * 0.75;
        }
      });
      var totalHeight = 0;
      return _.map(rects, function (rect) {
        var height = (rect.type === 'text' ? amountFlex/numFlex :
                      colWidth * 0.75);
        var top = totalHeight;
        totalHeight += height;
        return { type: rect.type,
                 width: colWidth,
                 height: height,
                 left: colNum*colWidth,
                 top: top
               };
      });
    });
  },
  render: function () {
    var bounds = this.calculateRectangleBounds();

    return <div className="dashboard">
      {bounds.map((column) =>
            column.map((rect) =>
            <div className={"rect " + rect.type + "rect"}
                 style={{width: rect.width + "%", height: rect.height + "%",
                        left: rect.left + "%", top: rect.top + "%"}}>
              {rect.type}
            </div>
          )
        )}
      </div>;
  }
});
