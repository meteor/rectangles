var onChangeLayout = function (newColumns) {
  Rectangles.update(Rectangles.findOne()._id, {columns: newColumns});
};

var windowDimensions = new ReactiveVar();
var updateWindowDimensions = function () {
  windowDimensions.set({
    width: $(document.body).width(),
    height: $(document.body).height()
  });
};
Meteor.startup(function () {
  updateWindowDimensions();
});

$(window).on('resize', function () {
  updateWindowDimensions();
});

Template.body.helpers({
  props: function () {
    var columns = Rectangles.findOne() && Rectangles.findOne().columns;
    return {
      columns: columns,
      onChangeLayout: onChangeLayout,
      dimensions: windowDimensions.get()
    };
  }
});
