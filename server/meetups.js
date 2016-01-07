currentMeetupCursor = function () {
  // Time 00:00 today in UTC-5 time zone
  var today = moment().utcOffset(-300).startOf('day').toDate();

  return Meetups.find({time: {$gt: today.getTime()}}, {limit: 1});
};

Meteor.publish("currentMeetup", function() {
  return currentMeetupCursor();
});
