FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('layout', { 
    	top: 'header', 
    	main: 'home' 
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