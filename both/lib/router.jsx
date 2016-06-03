// NPM
import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';

// App
import { HomeContainer } from '/imports/ui/containers/home.js';
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
		BlazeLayout.render('layout', {
			top: 'header',
			main: 'addProject'
		})
	}
});
