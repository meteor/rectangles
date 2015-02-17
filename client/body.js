var onChangeLayout = function (newColumns) {
  Rectangles.update(Rectangles.findOne()._id, {columns: newColumns});
};

Template.body.helpers({
  props: function () {
    var columns = Rectangles.findOne() && Rectangles.findOne().columns;
    return {
      columns: columns,
      onChangeLayout: onChangeLayout
    }
  }
});
