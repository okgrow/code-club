Template.project.onRendered(function() {
	var self = this;
	self.autorun(function() {
		self.subscribe("users");
	});
});

Template.project.helpers({
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
  }
});

Template.project.events({
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