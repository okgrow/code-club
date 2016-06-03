// NPM
import React from 'react';

// App
import { HeaderLayout } from "./header.jsx";

export const MainLayout = React.createClass({
  displayName: 'MainLayout',
  render() {
    return (
      <div>
        <div>
            <HeaderLayout />
        </div>

        <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-8 col-md-offset-2">
                { this.props.content }
              </div>
            </div>
        </div>

      </div>
    );
  }
});
