Template.body.helpers({
  props: function () {
    var columns = Rectangles.findOne() && Rectangles.findOne().columns;
    return {columns: columns};
  }
});
