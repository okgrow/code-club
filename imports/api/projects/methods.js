// Meteor imports
import { Meteor } from 'meteor/meteor';

// App Imports
import { Projects } from './collections.js';


Meteor.methods({
  joinProject: function (projectId) {
    check(projectId, String);

    // Leave other projects from the same meetup
    var project = Projects.findOne({ _id: projectId });

    if (project.ownerId == this.userId) {
      return;
    }

    Projects.update({ meetupId: project.meetupId }, {
      $pull: { userIds: this.userId } }, { multi: true });

    // Join this one
    Projects.update({_id: projectId}, {$addToSet: {userIds: this.userId}});
  },
  leaveProject: function (projectId) {
    check(projectId, String);

    Projects.update({_id: projectId}, {$pull: {userIds: this.userId}});
  }
});
