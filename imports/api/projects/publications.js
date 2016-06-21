// Meteor imports
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

// App Imports
import { Projects } from './collections.js';
import { currentMeetupCursor } from '../meetups/utils.js';

Meteor.publish('projects', function getProjects() {
  if (currentMeetupCursor().count() === 0) {
    console.error('No meetups found!');
    this.ready();
    return false;
  }

  const currentMeetup = currentMeetupCursor().fetch()[0];
  return Projects.find({
    meetupId: currentMeetup._id,
  });
});

Meteor.publish('projects.currentProject', _id => {
  check(_id, String);
  return Projects.find({ _id });
});

