// NPM
import moment from 'moment';

// Meteor
import { HTTP } from 'meteor/http';
import { _ } from 'meteor/underscore';

// App
import { Meetups } from './collections.js';

export const currentMeetupCursor = () => {
  // Time 00:00 today in UTC-5 time zone
  const today = moment().
    utcOffset(-300).
    startOf('day').
    toDate();

  return Meetups.find({ time: { $gt: today.getTime() } }, { limit: 1 });
};

const retrieveMeetups = () => {
  // We don't want to act on behalf of a signed-in user, so use the 'API key'
  // method: http://www.meetup.com/meetup_api/auth/#keys
  // Quick & easy way to make one API call with unchanging parameters is to
  // just put the signed request URL here.

  // This API call retrieves the next upcoming meetup
  const SIGNED_URL = 'https://api.meetup.com/torontojs/events?desc=Bring&photo-host=public&page=20&sig_id=8845990&sig=a9eb269ae558ed807b07b85dc099db4fc3412547';
  const response = HTTP.get(SIGNED_URL, { timeout: 60000 });

  let events = null;
  if (response && response.data) {
    events = response.data.filter(event => event.name === 'JS Code Club');
  }
  return events;
};

const upsertEvent = function (event) {
  const eventToInsert = {
    meetupId: event.id,
    name: event.name,
    time: event.time,
    url: event.link,
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
