// Meteor imports
import { Mongo } from 'meteor/mongo';

export const Projects = new Mongo.Collection('projects');

Projects.allow({
  insert(userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    return (userId && doc.ownerId === userId);
  },
  update(userId, doc, fields, modifier) {
    // can only change your own documents
    return doc.ownerId === userId;
  },
  remove(userId, doc) {
    // can only remove your own documents
    return doc.ownerId === userId;
  },
  fetch: ['ownerId'],
});
