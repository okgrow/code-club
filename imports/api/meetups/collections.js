// Meteor imports
import { Mongo } from 'meteor/mongo';

// Meetup.com groups and their events
export const Meetups = new Mongo.Collection("meetups");
// Default policy denies all updates
