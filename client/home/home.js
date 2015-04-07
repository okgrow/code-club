Meteor.subscribe("projects");
Meteor.subscribe("currentMeetup");

Template.home.helpers({
  allProjects: function () {
    return Projects.find();
  }
});

Template.home.events({
  'submit #new-project': function (event) {
    event.preventDefault();

    Projects.insert({
      name: event.target.name.value,
      gitHubUrl: event.target.gitHubUrl.value,
      ownerName: Meteor.user().profile.name,
      ownerId: Meteor.userId(),
      meetupId: this._id
    });
  },
  'click .delete-project': function (event) {
    Projects.remove({_id: this._id});
  }
});
