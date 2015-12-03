FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('layout', { 
    	top: 'header', 
    	main: 'home' 
    });
  }
});