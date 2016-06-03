// Meteor
import { Meteor } from 'meteor/meteor';

// NPM
import React from 'react';

// App
import ProjectComponent from '/imports/ui/components/projects.jsx';
import { Projects } from '/imports/api/projects/collections.js';

// Atmosphere
import { createContainer } from 'meteor/react-meteor-data';

export default ProjectContainer = createContainer(({ params }) => {
    const handler = Meteor.subscribe("currentMeetup");
    const { meetup } = params;
    const data = {
        isLoading: !handler.ready(),
        meetup: meetup
    };

    if (!data.isLoading) {
        const today = new Date().setHours(0);
        data.projects = Projects.find({ meetupId: meetup._id }, { sort: { name: 1 } } ).fetch();
    }
    return data;
}, ProjectComponent);
