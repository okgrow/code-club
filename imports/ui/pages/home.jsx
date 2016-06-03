// NPM
import React from 'react';

// Meteor
import { Meteor } from 'meteor/meteor';

// Atmosphere
import { createContainer } from 'meteor/react-meteor-data';

// App
import MeetupComponent from '/imports/ui/components/meetups.jsx';
import { ProjectComponentContainer } from '/imports/ui/components/projects.jsx';
import { Meetups } from '/imports/api/meetups/collections.js';

export const HomePage = React.createClass({
    displayName: 'HomePage',

    renderMeetup() {
        if (this.props.currentMeetup) {
            return <MeetupComponent meetup={this.props.currentMeetup}/>
        }
    },

    renderProjects() {
        if (this.props.currentMeetup) {
            return <ProjectComponentContainer params={{ meetup: this.props.currentMeetup }} />
        }
    },

    render() {
        if (this.props.isLoading) {
            return (
                <div>Loading</div>
            );
        }

        return (
            <div>
                { this.renderMeetup() }
                { this.renderProjects() }
            </div>
        );
    }
});

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
