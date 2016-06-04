// NPM
import React from 'react';

// Meteor
import { Meteor } from 'meteor/meteor';

// Atmosphere
import { createContainer } from 'meteor/react-meteor-data';

// App
import { Projects } from '/imports/api/projects/collections.js';

class ProjectDetailComponent extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ProjectDetailComponent';
    }
    renderUrl(url) {
        if (url) {
            return (
                <div>
                    <li className="fa fa-github-alt"></li> &nbsp;
                    <a href={url} target="_blank">
                        GitHub Link
                    </a>
                </div>
            );
        };
    }

    renderMembers() {
        const { userIds } = this.props.project;
        if (userIds && userIds.length !== 0) {
            const users = userIds.map(userId => Meteor.users.findOne(userId));
            return users.map(user => {
                return (
                    <li>
                        { user.profile.name }
                    </li>
                );
            });
        }
    }

    leaveProject(_id, ev) {
        ev.preventDefault();
        Meteor.call("leaveProject", _id);
    }

    deleteProject(_id, ev) {
        ev.preventDefault();
        Projects.remove({_id: _id});
    }

    joinProject(_id, ev) {
        ev.preventDefault();
        Meteor.call("joinProject", _id);
    }

    renderLoggedInContent() {
        if (Meteor.userId()) {
            const { ownerId, userIds } = this.props.project;

            if (userIds && userIds.indexOf(Meteor.userId()) !== -1) { // In project
                return (
                    <button className="btn btn-xs btn-danger pull-right"
                        id="leave-project-button"
                        onClick={this.leaveProject.bind(this, this.props.project._id)}>
                        Leave
                    </button>
                )
            } else if (ownerId === Meteor.userId()) { // Owns project
                return (
                    <button className="delete-project btn btn-danger btn-xs pull-right"
                        onClick={this.deleteProject.bind(this, this.props.project._id)}>
                        <i className="fa fa-close"></i>
                    </button>
                );
            } else { // Rest of the cases
                return (
                    <button className="btn btn-xs btn-primary pull-right"
                        id="join-project-button"
                        onClick={this.joinProject.bind(this, this.props.project._id)}>
                        Join
                    </button>
                );
            }
        }
    }

    render() {
        const {
            name,
            gitHubUrl,
            ownerName,
            description,
        } = this.props.project;

        return (
            <div className="panel panel-success">
                <div className="panel-heading">
                    { name } &nbsp;
                    { this.renderUrl(gitHubUrl) } &nbsp;
                    <small className="text-muted">
                        <i className="fa fa-user"></i> &nbsp;
                        { ownerName }
                    </small>

                    { this.renderLoggedInContent() }
                </div>

                <div className="panel-body">
                    { description ? <p>{description}</p> : "" }
                  <ul>
                    { this.renderMembers() }
                  </ul>
                </div>
            </div>
        );
    }
}

export const ProjectDetailComponentContainer = createContainer(() => {
    const handler = Meteor.subscribe("users");
    const data = {
        isLoading: !handler.ready()
    };
    return data;
}, ProjectDetailComponent);

class ProjectComponent extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ProjectComponent';
    }

    renderProjects() {
        if (this.props.projects && this.props.projects.length !== 0) {
            return this.props.projects.map(x => {
                return (
                    <ProjectDetailComponentContainer project={x} key={x._id} />
                );
            });

        } else {
            return (
                <div>
                    {`Looks like there aren't any projects yet, create one`}&nbsp;
                    <a href="/add-project">here</a>
                </div>
            );
        }
    }

    render() {
        if (this.props.isLoading) {
            return (
                <div>Loading</div>
            );
        }

        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <span className="panel-title">
                        <strong>Projects</strong>
                    </span>
                    <a href="/add-project" className="btn btn-xs btn-success pull-right">
                        Add Project
                    </a>
                </div>
                <div className="panel-body">
                    <ul className="list-group">
                        <div className="clearboth"></div>
                        { this.renderProjects() }
                    </ul>
                </div>
            </div>
        );
    }
}

export const ProjectComponentContainer = createContainer(({ params }) => {
    const handler = Meteor.subscribe("projects");
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
