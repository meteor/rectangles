Dashboard = React.createClass({
  calculateRectangleBounds: function () {
    var aspectRatio =
      this.props.dimensions.width / this.props.dimensions.height;
    var columns = this.props.columns;
    // Return a two-dimensional array of
    // {type, width, height, left, top},
    // where width/height/left/top are numeric percentages.
    return _.map(columns, function (rects, colNum) {
      var colWidth = 1. / columns.length;
      var numFlex = 0;
      var amountFlex = 1.;
      _.each(rects, function (rect) {
        if (rect.type === 'photo') {
          amountFlex -= colWidth * 0.75 * aspectRatio;
        } else {
          numFlex++;
        }
      });
      var totalHeight = 0;
      return _.map(rects, function (rect) {
        var height = rect.type === 'photo'
              ? colWidth * 0.75 * aspectRatio
              : amountFlex/numFlex;
        var top = totalHeight;
        totalHeight += height;
        return { type: rect.type,
                 rectId: rect.rectId,
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
      <AddButtons />
      {bounds.map((column, columnIndex) =>
        column.map((rect, rectIndex) =>
          <Rectangle key={rect.rectId} {...rect}
                     onDragEnd={this.onDragEnd.bind(this, columnIndex, rectIndex)}
                     onRemove={this.onRemove.bind(this, columnIndex, rectIndex)}/>
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
    var destColumnIndex = Math.floor(xFraction * numColumns);

    var destColumn = bounds[destColumnIndex];
    var destRectIndex = destColumn.length; // if the clause in the loop below is never satisfied
    _.find(destColumn, (rect, rectIndex) => {
      var rectMidY = rect.top + rect.height / 2;

      if (rectMidY > yFraction) {
        destRectIndex = rectIndex;
        return true;
      } else {
        return false;
      }
    });

    var newColumns = EJSON.clone(this.props.columns);

    var movedRect = newColumns[columnIndex][rectIndex];
    // first, clone "movedRect" and move it into its new place.
    newColumns[destColumnIndex].splice(destRectIndex, 0, EJSON.clone(movedRect));
    // then, delete it (via reference equality check, not index. the
    // indexes may have changed)
    newColumns[columnIndex] = _.without(newColumns[columnIndex], movedRect);

    this.props.onChangeLayout(newColumns);
  },
  onRemove: function (columnIndex, rectIndex) {
    var newColumns = EJSON.clone(this.props.columns);
    newColumns[columnIndex].splice(rectIndex, 1);
    this.props.onChangeLayout(newColumns);
  }
});
