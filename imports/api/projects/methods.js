// Meteor imports
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

// App Imports
import { Projects } from './collections.js';


Meteor.methods({
  joinProject(projectId) {
    check(projectId, String);

    // Leave other projects from the same meetup
    const project = Projects.findOne({ _id: projectId });

    if (project.ownerId === this.userId) {
      return;
    }

    Projects.update({ meetupId: project.meetupId }, {
      $pull: { userIds: this.userId } }, { multi: true });

    // Join this one
    Projects.update({ _id: projectId }, { $addToSet: { userIds: this.userId } });
  },
  leaveProject(projectId) {
    check(projectId, String);

    Projects.update({ _id: projectId }, { $pull: { userIds: this.userId } });
  },
});
