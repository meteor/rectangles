// Contains a single document, with:
// * columns, an array of arrays of objects with:
//   * type, one of: "photo", "text"
Rectangles = new Meteor.Collection("rectangles");

if (Meteor.isServer) {
  if (!Rectangles.findOne()) {
    Rectangles.insert({
      columns: [[{type: "photo"}, {type: "text"}],
                [{type: "text"}, {type: "photo"}]]
    });
  }
}
