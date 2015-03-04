// Contains a single document, with:
// * columns, an array of arrays of objects with:
//   * rectId, pointing to the _id of a document in the Rectangles collection
//   * type, one of "richText", "photo"
Dashboards = new Meteor.Collection("dashboards");

// Contains custom data requires for different rectangle types. All
// documents have:
// * type, one of "richText", "photo"
Rectangles = new Meteor.Collection("rectangles");

// Contains photos used in the "photo" rectangle. Fields:
// * data, an EJSON.binary
// * mimeType, one of "image/jpeg", "image/png", "image/gif"
Photos = new Meteor.Collection("photos");

if (Meteor.isServer) {
  if (!Dashboards.findOne()) {
    var richText1Id = Rectangles.insert({
      type: "richText",
      text: "Foo!"
    });
    var richText2Id = Rectangles.insert({
      type: "richText",
      text: "Bar!"
    });
    var photo1Id = Rectangles.insert({
      type: "photo",
      urls: []
    });
    var photo2Id = Rectangles.insert({
      type: "photo",
      urls: []
    });
    var twitter1Id = Rectangles.insert({
      type: "twitter",
      html: '<a class="twitter-timeline" href="https://twitter.com/avitaloliver" data-widget-id="568542368127660032">Tweets by @avitaloliver</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?\'http\':\'https\';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>'
    });
    var twitter2Id = Rectangles.insert({
      type: "twitter"
    });

    Dashboards.insert({
      columns: [[{rectId: richText1Id, type: "richText"}, {rectId: photo1Id, type: "photo"}],
                [{rectId: photo2Id, type: "photo"}, {rectId: richText2Id, type: "richText"}],
                [{rectId: twitter1Id, type: "twitter"}],
                [{rectId: twitter2Id, type: "twitter"}]]
    });
  }

  Meteor.publish("dashboard", function () {
    return [Dashboards.find(), Rectangles.find()];
  });
}

if (Meteor.isClient) {
  Meteor.subscribe("dashboard");
}

