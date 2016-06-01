// App Imports
import { Projects } from './collections.js';
import { currentMeetupCursor } from '../meetups/utils.js';

Meteor.publish("projects", function () {
  var currentMeetup = currentMeetupCursor().fetch()[0];
  return Projects.find({meetupId: currentMeetup._id});
});
