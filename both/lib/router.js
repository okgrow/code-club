Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

Router.route('/', function () {
  var meetup = Meetups.findOne();
  this.render('home', { data: meetup });
});
