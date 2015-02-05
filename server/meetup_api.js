var retrieveMeetups = function retrieveMeetups() {

  // We don't want to act on behalf of a signed-in user, so use the "API key"
  // method: http://www.meetup.com/meetup_api/auth/#keys
  // Quick & easy way to make one API call with unchanging parameters is to
  // just put the signed request URL here.

  // This API call retrieves the next upcoming meetup
  var SIGNED_URL = "https://api.meetup.com/2/events?status=upcoming&order=time&limited_events=True&group_urlname=Meteor-Code-Club&desc=false&offset=0&photo-host=public&format=json&page=1&fields=&sig_id=8845990&sig=cdaa33eacb50e2c1c5612a4a7548bbef46ed3327";

  var response = HTTP.get(SIGNED_URL, {timeout: 60000});

  var events = null;
  if (response && response.data && response.data.results) {
    events = response.data.results;
  }

  return events;
};

var upsertEvent = function (event) {
  var eventToInsert = {
    meetupId: event.id,
    name: event.name,
    time: event.time,
    url: event.event_url
  };
  Meetups.upsert({meetupId: event.id}, eventToInsert);
};

var importMeetups = function importMeetups() {
  var events = retrieveMeetups();
  _.each(events, function (event) {
    upsertEvent(event);
  });

};

Meteor.startup(function () {
  importMeetups();
  console.log("Meetups: ", Meetups.find().fetch()); // TODO remove this, for debugging only
});
