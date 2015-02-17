// xcxc doc
var updateColumnsAfterDrag = function (columnIndex, rectIndex, xPos, yPos) {
  console.log(columnIndex, rectIndex, xPos, yPos);
};

Template.body.helpers({
  props: function () {
    var columns = Rectangles.findOne() && Rectangles.findOne().columns;
    return {columns: columns, updateColumnsAfterDrag: updateColumnsAfterDrag};
  }
});
