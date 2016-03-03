var retrieveMeetups = function retrieveMeetups() {

  // We don't want to act on behalf of a signed-in user, so use the "API key"
  // method: http://www.meetup.com/meetup_api/auth/#keys
  // Quick & easy way to make one API call with unchanging parameters is to
  // just put the signed request URL here.

  // This API call retrieves the next upcoming meetup
  var SIGNED_URL = "https://api.meetup.com/torontojs/events?desc=Bring&photo-host=public&page=20&sig_id=8845990&sig=a9eb269ae558ed807b07b85dc099db4fc3412547";

  var response = HTTP.get(SIGNED_URL, {timeout: 60000});

  var events = null;
  if (response && response.data) {
    events = response.data.filter((event) => {

      if (event.name === "JS Code Club") {
        return true;
      }
    });
  }

  return events;
};

var upsertEvent = function (event) {
  var eventToInsert = {
    meetupId: event.id,
    name: event.name,
    time: event.time,
    url: event.link
  };
  Meetups.upsert({meetupId: event.id}, eventToInsert);
};

var importMeetups = function importMeetups() {
  try {
    var events = retrieveMeetups();
    _.each(events, function (event) {
      upsertEvent(event);
    });
  } catch (error) {
    console.error(error);
  }
};

Meteor.startup(function () {
  importMeetups();
  
  // Do it again once per day
  Meteor.setInterval(importMeetups, 24 * 60 * 60 * 1000);
  
  console.log("Meetups: ", Meetups.find().fetch()); // TODO remove this, for debugging only
});
