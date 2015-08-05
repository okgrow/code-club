Meteor.publish("users", function () {
  var currentMeetup = currentMeetupCursor().fetch()[0];
  var userIds = [];
  Projects.find({meetupId: currentMeetup._id}).forEach(function (proj) {
    userIds = userIds.concat(proj.users);
  });
  return Meteor.users.find({_id: {$in: userIds}});
});
