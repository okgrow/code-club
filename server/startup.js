import { importMeetups } from "../imports/api/meetups/utils.js";
import { Meetups } from "../imports/api/meetups/collections.js";


Meteor.startup(() => {
  importMeetups();

  // Do it again once per day
  Meteor.setInterval(importMeetups, 24 * 60 * 60 * 1000);

  console.log("Meetups: ", Meetups.find().fetch()); // TODO remove this, for debugging only
});
