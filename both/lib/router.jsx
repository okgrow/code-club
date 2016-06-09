// NPM
import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

// App
import { HomeContainer } from '/imports/ui/pages/home.jsx';
import { ProjectCreateContainer } from '/imports/ui/pages/projects/create.jsx';
import { MainLayout } from '/imports/ui/pages/layouts/main.jsx';


FlowRouter.route('/', {
  name: 'home',
  action() {
    mount(MainLayout, {
      content: <HomeContainer />
    });
  }
});

FlowRouter.route('/add-project', {
  name: "addProject",
  action() {
    mount(MainLayout, {
      content: <ProjectCreateContainer />
    });
  }
});

FlowRouter.route('/edit-project/:projectId/', {
  name: "editProject",
  action(params) {
    mount(MainLayout, {
      content: <ProjectCreateContainer projectId={ params.projectId } />,
    });
  }
});
