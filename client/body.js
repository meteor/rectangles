var onChangeLayout = function (newColumns) {
  Dashboards.update(Dashboards.findOne()._id, {$set: {columns: newColumns}});
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
    var columns = Dashboards.findOne() && Dashboards.findOne().columns;
    return {
      columns: columns,
      onChangeLayout: onChangeLayout,
      dimensions: windowDimensions.get()
    };
  },
  showBackgroundColorPicker: function () {
    return Session.get("showBackgroundColorPicker");
  },
  backgroundColor: function () {
    return Dashboards.findOne().backgroundColor;
  }
});
