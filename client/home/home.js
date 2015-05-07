Meteor.subscribe("projects");
Meteor.subscribe("currentMeetup");

Template.home.helpers({
  allProjects: function () {
    return Projects.find({meetupId: this._id}, {sort: {name: 1}});
  }
});

Template.home.events({
  'submit #new-project': function (event) {
    event.preventDefault();

    if (!Meteor.user()) {
      // shouldn't get here
      return;
    }

    Projects.insert({
      name: event.target.name.value,
      gitHubUrl: event.target.gitHubUrl.value,
      ownerName: Meteor.user().profile.name,
      ownerId: Meteor.userId(),
      meetupId: this._id,
      description: event.target.description.value
    });
  },
  'click .delete-project': function (event) {
    Projects.remove({_id: this._id});
  }
});
