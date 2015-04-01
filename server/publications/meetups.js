Meteor.publish("currentMeetup", function() {
  // Time 00:00 today
  var today = new Date().setHours(0);

  return Meetups.find({time: {$gt: today}}, {limit: 1});
});
