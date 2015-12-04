Template.home.onRendered(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe("currentMeetup");    
  });
});

Template.home.helpers({
  currentMeetup: function() {
    var today = new Date().setHours(0);
    return Meetups.findOne({time: {$gt: today}}, {limit: 1});
  }
});