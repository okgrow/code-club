import React from 'react';

import moment from 'moment';


export default class MeetupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'MeetupComponent';
    }

    render() {
        const { url, name}  = this.props.meetup;

        return (
            <div id="meetup-details" className="panel panel-default">
                <div className="panel-heading">
                <h3 className="panel-title">Meetup details</h3>
                </div>

                <div className="panel-body">
                    <p>
                        <li className="fa fa-calendar"></li>&nbsp;
                        <a href={url} target="_blank">{name}</a>&nbsp;
                        <li className="fa fa-clock-o"></li>&nbsp;
                        { moment(this.time).format("dddd, MMMM Do YYYY, h:mm A") }
                    </p>
                </div>
            </div>
        );
    }
}
