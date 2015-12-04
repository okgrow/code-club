Template.addProject.onRendered(function() {
	var self = this;
  self.autorun(function() {
    self.subscribe("currentMeetup");    
  });
});
Template.addProject.helpers({
  currentMeetup: function() {
    var today = new Date().setHours(0);
    return Meetups.findOne({time: {$gt: today}}, {limit: 1});
  }
});

Template.addProject.events({
  'submit #new-project': function (event) {
    event.preventDefault();

    if (!Meteor.user()) {
      // shouldn't get here
      return;
    }

    projectId = Projects.insert({
      name: event.target.name.value,
      gitHubUrl: event.target.gitHubUrl.value,
      ownerName: Meteor.user().profile.name,
      ownerId: Meteor.userId(),
      meetupId: this._id,
      description: event.target.description.value
    });
		FlowRouter.go('/');
  }
});
