Template.registerHelper("formatDate", function (time) {
  // time is an integer
  return moment(time).format("dddd, MMMM Do YYYY, h:mm A")
});
