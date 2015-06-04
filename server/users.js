Meteor.publish("users", function () {
  var currentMeetup = currentMeetupCursor().fetch()[0];
  var userIds = [];
  Projects.find({meetupId: currentMeetup._id}).forEach(function (proj) {
    console.log('@@@', "proj", proj); // TODO remove this, for debugging only
    userIds = userIds.concat(proj.users);
  });
  console.log('@@@', userIds); // TODO remove this, for debugging only
  return Meteor.users.find({_id: {$in: userIds}});
});
