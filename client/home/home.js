Meteor.subscribe("projects");
Meteor.subscribe("currentMeetup");

Template.home.helpers({
  allProjects: function () {
    return Projects.find();
  },
  meetup: function () {
    return Meetups.findOne();
  }
});

Template.home.events({
  'submit #new-project': function (event) {
    event.preventDefault();

    Projects.insert({
      name: event.target.name.value,
      ownerId: Meteor.userId(),
      meetupId: this._id
    });
  },
  'click .delete-project': function (event) {
    Projects.remove({_id: this._id});
  }
});
