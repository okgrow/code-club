// App Imports
import { Projects } from './collections.js';
import { currentMeetupCursor } from '../meetups/utils.js';

Meteor.publish("projects", function () {
  if (currentMeetupCursor().count() === 0) {
    console.error("No meetups found!");
    this.ready();
    return;
  }

  var currentMeetup = currentMeetupCursor().fetch()[0];
  return Projects.find({meetupId: currentMeetup._id});
});
