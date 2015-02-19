var Future = Npm.require("fibers/future");

Meteor.methods({
  // Add photos to the 'Photos' collection. We can't just store the
  // Dropbox URL since those expire after four hours. So we fetch them
  // and store them in the database. Then those are served with a
  // custom HTTP endpoint.
  "photos.addFromDropbox": function (urls, rectId) {
    this.unblock();
    var futures = [];

    // XXX TODO: Dedup images. Based on name?
    _.each(urls, function (url) {
      var fut = new Future;
      futures.push(fut);

      HTTP.get(url, {responseType: "ejson-binary"}, function (err, res) {
        var extension = url.split('.').pop();
        var mimeType = extension === "jpg" ? "image/jpeg" : "image/" + extension;

        var photoId = Photos.insert({
          mimeType: mimeType,
          data: res.content
        });

        Rectangles.update(rectId, {$push: {urls: "/photos/" + photoId}});
        fut["return"]();
      });
    });

    Future.wait(futures);
    console.log(urls.length + " photos added to rectangle " + rectId);
  }
});

HTTP.methods({
  "/photos/:id": function () {
    var photo = Photos.findOne(this.params.id);
    this.setContentType(photo.mimeType);
    return photo.data;
  }
});

