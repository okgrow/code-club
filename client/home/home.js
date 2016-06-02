import { Meetups } from '../../imports/api/meetups/collections.js';

Template.home.onRendered(function() {
  this.autorun(() => {
    this.subscribe("currentMeetup");
  });
});

Template.home.helpers({
  currentMeetup() {
    const today = new Date().setHours(0);
    return Meetups.findOne({ time: { $gt: today } }, { limit: 1 });
  }
});
