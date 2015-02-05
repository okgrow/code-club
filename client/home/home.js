Meteor.subscribe("projects");
Meteor.subscribe("meetups");

Template.home.helpers({
  allProjects: function () {
    return Projects.find();
  },
  allMeetups: function () {
    return Meetups.find();
  }
});

Template.home.events({
  'submit #new-project': function (event) {
    event.preventDefault();

    Projects.insert({
      name: event.target.name.value,
      ownerId: Meteor.userId()
    });
  },
  'click .delete-project': function (event) {
    Projects.remove({_id: this._id});
  }
});
