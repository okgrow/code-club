// Meteor imports
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

// Meetup.com groups and their events
export const Meetups = new Mongo.Collection('meetups');
// Default policy denies all updates

// Useful for debugging
if (Meteor.isClient) {
  window.Meetups = Meetups;
}
if (Meteor.isServer) {
  global.Meetups = Meetups;
}
