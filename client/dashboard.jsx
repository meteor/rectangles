Dashboard = React.createClass({
  calculateRectangleBounds: function () {
    var columns = this.props.columns;
    // Return a two-dimensional array of
    // {type, width, height, left, top},
    // where width/height/left/top are numeric percentages.
    return _.map(columns, function (rects, colNum) {
      var colWidth = 1. / columns.length;
      var numFlex = 0;
      var amountFlex = 1.;
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
      {bounds.map((column, columnIndex) =>
        column.map((rect, rectIndex) =>
          <Rectangle {...rect}
                     onDragEnd={this.onDragEnd.bind(this, columnIndex, rectIndex)} />
        ))}
      </div>;
  },
  onDragEnd: function (columnIndex, rectIndex, xFraction, yFraction) {
    if (xFraction < 0)
      xFraction = 0;
    if (xFraction >= 1)
      xFraction = 0.99999999;

    var bounds = this.calculateRectangleBounds();
    var numColumns = bounds.length;
    var newColumnIndex = Math.floor(xFraction * numColumns);

    var newColumn = bounds[newColumnIndex];
    var newRectIndex = newColumn.length; // if the clause in the loop below is never satisfied
    _.find(newColumn, (rect, rectIndex) => {
      var rectMidY = rect.top + rect.height / 2;

      if (rectMidY > yFraction) {
        newRectIndex = rectIndex;
        return true;
      } else {
        return false;
      }
    });

    var oldColumn = bounds[columnIndex];
    var newLayout = _.clone(this.props.columns);

    // call `this.props.onChangeLayout(columns)`
    console.log(columnIndex, rectIndex, xFraction, yFraction);
  }
});
