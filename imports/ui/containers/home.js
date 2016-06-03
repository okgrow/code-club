// Meteor
import { Meteor } from 'meteor/meteor';

// NPM
import React from 'react';

// App
import { HomePage } from '/imports/ui/pages/home.jsx';
import { Meetups } from '/imports/api/meetups/collections.js';

// Atmosphere
import { createContainer } from 'meteor/react-meteor-data';

export const HomeContainer = createContainer(() => {
    const handler = Meteor.subscribe("currentMeetup");
    const data = {
        isLoading: !handler.ready(),
    };

    if (!data.isLoading) {
        const today = new Date().setHours(0);
        data.currentMeetup = Meetups.findOne({
            time: { $gt: today }
        }, { limit: 1 });
    }
    return data;
}, HomePage);
