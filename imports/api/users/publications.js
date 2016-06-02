// Meteor imports
import { Meteor } from 'meteor/meteor';

// App
import { Projects } from '../projects/collections.js';
import { currentMeetupCursor } from '../meetups/utils.js';

Meteor.publish("users", function () {
    const currentMeetup = currentMeetupCursor().fetch()[0];
    let userIds = [];
    Projects.find({
        meetupId: currentMeetup._id
    }).forEach(proj => {
        userIds = userIds.concat(proj.userIds);
    });
  return Meteor.users.find({ _id: { $in: userIds } }, { fields: { profile: 1 } } );
});
