// NPM
import React from 'react';

// Meteor
import { Meteor } from 'meteor/meteor';

// Atmosphere
import { createContainer } from 'meteor/react-meteor-data';
import { FlowRouter } from 'meteor/kadira:flow-router';

// App
import { Meetups } from '/imports/api/meetups/collections.js';
import { Projects } from '/imports/api/projects/collections.js';

export default ProjectCreatePage = React.createClass({
    displayName: 'ProjectCreatePage',

    submitForm(ev) {
        ev.preventDefault();
        // If user is not authenticated or the current meetup as not been set
        if (!this.props.currentUser || !this.props.currentMeetup) return;

        Projects.insert({
            name: ev.target.name.value,
            gitHubUrl: ev.target.gitHubUrl.value,
            ownerName: this.props.currentUser.profile.name,
            ownerId: this.props.currentUser._id,
            meetupId: this.props.currentMeetup._id,
            description: ev.target.description.value
        });

        FlowRouter.go('/');
    },

    renderForm() {
        if (this.props.currentUser) {
            return (
                <form id="new-project" onSubmit={this.submitForm}>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-desktop"></i>
                            </span>

                            <input type="text"
                                name="name"
                                className="form-control"
                                placeholder="Name"
                                required />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon">
                                <i className="fa fa-github-alt"></i>
                            </span>
                            <input type="url"
                                name="gitHubUrl"
                                className="form-control"
                                placeholder="GitHub Link" />
                        </div>
                    </div>

                    <div className="form-group">
                        <textarea name="description"
                            className="form-control"
                            rows="3"
                            placeholder="Description...">
                        </textarea>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Project" className="btn btn-primary" />
                    </div>
                </form>
            );
        } else {
            return (
                <div>
                    Sign in to create a project
                </div>
            );
        }
    },

    render() {
        if (this.props.isLoading) {
            return (
                <div>Loading</div>
            );
        }

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Add Project</h3>
                </div>

                <div className="panel-body">
                    { this.renderForm() }
                </div>
            </div>
        );
    }
});

export const ProjectCreateContainer = createContainer(() => {
    const handler = Meteor.subscribe("currentMeetup");
    const data = {
        isLoading: !handler.ready(),
        currentUser: Meteor.user()
    };

    if (!data.isLoading) {
        const today = new Date().setHours(0);
        data.currentMeetup = Meetups.findOne({
            time: { $gt: today }
        }, { limit: 1 });
    }
    return data;
}, ProjectCreatePage);
