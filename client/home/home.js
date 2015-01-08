Template.home.helpers({
  allProjects: function () {
    return Projects.find();
  }
});


Template.home.events({
  'submit #new-project': function (event) {
    event.preventDefault();

    Projects.insert({name: event.target.name.value});
  }
});
