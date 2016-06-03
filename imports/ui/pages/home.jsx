// NPM
import React from 'react';

// App
import MeetupComponent from '/imports/ui/components/meetups.jsx';
import ProjectComponent from '/imports/ui/components/projects.jsx';


export const HomePage = React.createClass({
    displayName: 'HomePage',

    renderMeetup() {
        if (this.props.currentMeetup) {
            return <MeetupComponent meetup={this.props.currentMeetup}/>
        }
    },

    renderProjects() {
        if (this.props.currentMeetup) {
            return <ProjectComponent meetup={this.props.currentMeetup}/>
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
