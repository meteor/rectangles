// Contains a single document, with:
// * columns, an array of arrays of objects with:
//   * rectId, pointing to the _id of a document in the Rectangles collection
//   * type, one of "richText", "photo"
Dashboards = new Meteor.Collection("dashboards");

// Contains custom data requires for different rectangle types. All
// documents have:
// * type, one of "richText", "photo"
Rectangles = new Meteor.Collection("rectangles");

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
      urls: [
        "http://malsup.github.io/images/p1.jpg",
        "http://malsup.github.io/images/p2.jpg"
      ]
    });
    var photo2Id = Rectangles.insert({
      type: "photo",
      urls: [
        "http://malsup.github.io/images/p3.jpg",
        "http://malsup.github.io/images/p4.jpg"
      ]
    });

    Dashboards.insert({
      columns: [[{rectId: richText1Id, type: "richText"}, {rectId: photo1Id, type: "photo"}],
                [{rectId: photo2Id, type: "photo"}, {rectId: richText2Id, type: "richText"}],
                [],
                []]
    });
  }

  Meteor.publish("dashboard", function () {
    return [Dashboards.find(), Rectangles.find()];
  });
}

if (Meteor.isClient) {
  Meteor.subscribe("dashboard");
}

