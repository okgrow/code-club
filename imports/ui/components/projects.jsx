import React from 'react';

class ProjectDetail extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ProjectDetail';
    }
    renderUrl(url) {
        if (url) {
            return (
                <div>
                    <li className="fa fa-github-alt"></li>
                    <a href={url} target="_blank">
                        GitHub Link
                    </a>
                </div>
            );
        };
    }

    renderMembers(userIds) {
        if (userIds && userIds.length !== 0) {
            // {{#each users}}
            //   <li>
            //     {{this.profile.name}}
            //   </li>
            // {{/each}}
        }
    }

    renderLoggedInContent() {
        if (Meteor.userId()) {

        }
    }

    render() {
        const {
            name,
            gitHubUrl,
            ownerName,
            description,
            userIds
        } = this.props.project;

        return (
            <div className="panel panel-success">
                <div className="panel-heading">
                    { name }&nbsp;
                    { this.renderUrl(gitHubUrl) }&nbsp;
                    <small className="text-muted">
                        <i className="fa fa-user"></i>
                        { ownerName }
                    </small>
                </div>

                { this.renderLoggedInContent() }

                <div className="panel-body">
                    { description ? <p>{{description}}</p> : "" }
                  <ul>
                    { this.renderMembers(userIds) }
                  </ul>
                </div>
            </div>
        );
    }
}

export default class ProjectComponent extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ProjectComponent';
    }

    renderProjects() {
        if (this.props.projects && this.props.projects.length !== 0) {
            return this.props.projects.map(x => {
                return (
                    <ProjectDetail project={x} key={x._id} />
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
