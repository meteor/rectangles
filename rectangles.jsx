if (Meteor.isClient) {
  Template.dashboard.helpers({
    layout: function () {
      var board = { columns: [[{type: "photo"}, {type: "text"}],
                              [{type: "text"}, {type: "photo"}]] };
      var layout = { columns: _.map(board.columns, function (rects, colNum) {
        var colWidth = 100. / board.columns.length;
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
      }) };

      return layout;
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
