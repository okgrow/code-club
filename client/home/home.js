Template.home.onRendered(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe("currentMeetup");
    self.subscribe("projects");
    self.subscribe("users");
  });
})


Template.home.helpers({
  allProjects: function () {
    return Projects.find({meetupId: this._id}, {sort: {name: 1}});
  },
  inProject: function () {
    return this.userIds && _.contains(this.userIds, Meteor.userId());
  },
  ownsProject: function () {
    return this.ownerId == Meteor.userId();
  },
  users: function () {
    return _.map(this.userIds, function (userId) {
      return Meteor.users.findOne(userId);
    });
  },
  currentMeetup: function() {
    var today = new Date().setHours(0);
    return Meetups.findOne({time: {$gt: today}}, {limit: 1});
  }
});

Template.home.events({
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
  },
  'click .delete-project': function (event) {
    Projects.remove({_id: this._id});
  },
  'click #join-project-button': function (event) {
    Meteor.call("joinProject", this._id);
  },
  'click #leave-project-button': function (event) {
    Meteor.call("leaveProject", this._id);
  }
});
