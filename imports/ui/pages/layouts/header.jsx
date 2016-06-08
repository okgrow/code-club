// React
import React from 'react';

// App
import AccountsUIWrapper from '/imports/ui/components/accounts.jsx';

export const HeaderLayout = React.createClass({
  displayName: 'HeaderLayout',
  render() {
    // <li>{{> loginButtons}}</li>

    return (
      <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">JS Code Club</a>
            </div>

            <div className="collapse navbar-collapse" id="navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <AccountsUIWrapper />
              </ul>
            </div>
          </div>
      </nav>
    );
  }
});
