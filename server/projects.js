Meteor.publish("projects", function () {
  var currentMeetup = currentMeetupCursor().fetch()[0];
  return Projects.find({meetupId: currentMeetup._id});
});

Projects.allow({
  insert: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    return (userId && doc.ownerId === userId);
  },
  update: function (userId, doc, fields, modifier) {
    // can only change your own documents
    return doc.ownerId === userId;
  },
  remove: function (userId, doc) {
    // can only remove your own documents
    return doc.ownerId === userId;
  },
  fetch: ['ownerId']
});

Meteor.methods({
  joinProject: function (projectId, userId) {
    // Leave other projects from the same meetup
    var project = Projects.findOne({_id: projectId});
    Projects.update({meetupId: project.meetupId}, {$pull: {userIds: userId}}, {multi: true});
    
    // Join this one
    Projects.update({_id: projectId}, {$addToSet: {userIds: userId}});
  },
  leaveProject: function (projectId, userId) {
    Projects.update({_id: projectId}, {$pull: {userIds: userId}});
  }
});
