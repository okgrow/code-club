import { Meetups } from "./collections.js";

export const currentMeetupCursor = () => {
  // Time 00:00 today
  const today = new Date().setHours(0);
  return Meetups.find({ time: { $gt: today } }, { limit: 1 });
};

const retrieveMeetups = () => {

  // We don't want to act on behalf of a signed-in user, so use the "API key"
  // method: http://www.meetup.com/meetup_api/auth/#keys
  // Quick & easy way to make one API call with unchanging parameters is to
  // just put the signed request URL here.

  // This API call retrieves the next upcoming meetup
  const SIGNED_URL = "https://api.meetup.com/2/events?status=upcoming&order=time&limited_events=True&group_urlname=Meteor-Code-Club&desc=false&offset=0&photo-host=public&format=json&page=1&fields=&sig_id=8845990&sig=cdaa33eacb50e2c1c5612a4a7548bbef46ed3327";
  const response = HTTP.get(SIGNED_URL, { timeout: 60000 });
  return response && response.data && response.data.results || null;
};

const upsertEvent = function (event) {
  var eventToInsert = {
    meetupId: event.id,
    name: event.name,
    time: event.time,
    url: event.event_url
  };

  Meetups.upsert({ meetupId: event.id }, eventToInsert);
};

export const importMeetups = () => {
  try {
    const events = retrieveMeetups();
    _.each(events, event => upsertEvent(event));
  } catch (error) {
    console.error(error);
  }
};
