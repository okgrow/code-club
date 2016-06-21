// Meteor imports
import { Meteor } from 'meteor/meteor';

// App
import { Projects } from '/imports/api/projects/collections.js';
import { currentMeetupCursor } from '/imports/api/meetups/utils.js';

Meteor.publish('users', () => {
  const currentMeetup = currentMeetupCursor().fetch()[0];
  let userIds = [];
  Projects.find({
    meetupId: currentMeetup._id,
  }).forEach(proj => {
    userIds = userIds.concat(proj.userIds);
  });
  return Meteor.users.find({ _id: { $in: userIds } }, { fields: { profile: 1 } });
});
