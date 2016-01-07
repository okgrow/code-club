Meteor.publish("projects", function () {
  if (currentMeetupCursor.count() === 0) {
    console.error("No meetups found!");
    this.ready();
    return;
  }
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
  joinProject: function (projectId) {
    check(projectId, String);
    
    // Leave other projects from the same meetup
    var project = Projects.findOne({_id: projectId});
    
    if (project.ownerId == this.userId) {
      return;
    }
    
    Projects.update({meetupId: project.meetupId}, {$pull: {userIds: this.userId}}, {multi: true});
    
    // Join this one
    Projects.update({_id: projectId}, {$addToSet: {userIds: this.userId}});
  },
  leaveProject: function (projectId) {
    check(projectId, String);
    
    Projects.update({_id: projectId}, {$pull: {userIds: this.userId}});
  }
});
