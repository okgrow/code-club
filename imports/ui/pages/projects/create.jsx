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

    propTypes: {
        currentProject: React.PropTypes.object,
        currentMeetup: React.PropTypes.object,
        projectId: React.PropTypes.string
    },

    submitForm(ev) {
        ev.preventDefault();
        // If user is not authenticated or the current meetup as not been set
        if (!this.props.currentUser || !this.props.currentMeetup) return;
        const name = ev.target.name.value;
        const gitHubUrl = ev.target.gitHubUrl.value;
        const description = ev.target.description.value;

        // If current project do an update
        if (this.props.currentProject &&
            this.props.currentProject.ownerId === this.props.currentUser._id) {
            // Prevent non project owners from updating project
            Projects.update(this.props.currentProject._id, {
                $set: {
                    name,
                    gitHubUrl,
                    description
                }
            });

        } else { // If not current project is set do an insert
            Projects.insert({
                name,
                gitHubUrl,
                description,
                ownerName: this.props.currentUser.profile.name,
                ownerId: this.props.currentUser._id,
                meetupId: this.props.currentMeetup._id,
                createdAt: Date()
            });
        }

        FlowRouter.go('/');
    },

    renderForm() {
        if (this.props.currentUser) {
            const { name, gitHubUrl, description } = this.props.currentProject || {};
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
                                defaultValue={ name }
                                required
                            />
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
                                placeholder="GitHub Link"
                                defaultValue={ gitHubUrl }
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <textarea name="description"
                            className="form-control"
                            rows="3"
                            placeholder="Description..."
                            defaultValue={ description } >
                        </textarea>
                    </div>

                    <div className="form-group">
                        <input type="submit"
                            value={ this.props.currentProject ? "Edit Project" : "Create Project" }
                            className="btn btn-primary" />
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
                    <h3 className="panel-title">{ this.props.currentProject ? "Edit" : "Add" } Project</h3>
                </div>

                <div className="panel-body">
                    { this.renderForm() }
                </div>
            </div>
        );
    }
});

export const ProjectCreateContainer = createContainer((params) => {
    const handler = Meteor.subscribe("currentMeetup");
    const data = {
        isLoading: !handler.ready(),
        currentUser: Meteor.user()
    };

    // If projectId is provided assume it's an edit
    if (params.projectId) {
        const projectHandler = Meteor.subscribe("projects.currentProject", params.projectId);
        data.isLoading = data.isLoading || !projectHandler.ready();
    }

    if (!data.isLoading) {
        const today = new Date().setHours(0);
        data.currentMeetup = Meetups.findOne({
            time: { $gt: today }
        }, { limit: 1 });

        if (params.projectId) {
            data.currentProject = Projects.findOne({
                _id: params.projectId
            });
        };
    }
    return data;
}, ProjectCreatePage);
