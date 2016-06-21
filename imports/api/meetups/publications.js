// Meteor imports
import { Meteor } from 'meteor/meteor';
import { currentMeetupCursor } from './utils.js';

Meteor.publish('currentMeetup', () => currentMeetupCursor());
