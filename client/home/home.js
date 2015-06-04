Meteor.subscribe("currentMeetup");
Meteor.subscribe("projects");
Meteor.subscribe("users");

Template.home.helpers({
  allProjects: function () {
    return Projects.find({meetupId: this._id}, {sort: {name: 1}});
  },
  inProject: function () {
    return this.users && _.contains(this.users, Meteor.userId());
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
  },
  'click #join-project-button': function (event) {
    Meteor.call("joinProject", this._id, Meteor.userId());
  },
  'click #leave-project-button': function (event) {
    Meteor.call("leaveProject", this._id, Meteor.userId());
  }
});
