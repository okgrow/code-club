import React from 'react';

class ProjectDetail extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ProjectDetail';
    }
    render() {
        return (
            <div class="panel panel-success">
                <div class="panel-heading">
                    {this.props.project.name}&nbsp;
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
                    <ProjectDetail project={x}/>
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
