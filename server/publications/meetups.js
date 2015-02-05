Meteor.publish("meetups", function() {
  return Meetups.find();
});
