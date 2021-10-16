

// Time on main Page
var currentDate = moment().format('ddd Do MMM, h:mm: a');
$("#time").text(currentDate);

// This is the time slot for the greeting
var myDate = new Date();
var hrs = myDate.getHours();
var greet;
if (hrs < 12)
  greet = 'Good Morning';
else if (hrs >= 12 && hrs <= 17)
  greet = 'Good Afternoon';
else if (hrs >= 17 && hrs <= 24)
  greet = 'Good Evening';
document.getElementById('daymaker').innerHTML =
  greet;
