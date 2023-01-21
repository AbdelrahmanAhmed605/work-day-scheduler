// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

/* Obtains all the event information from the localStorage and displays it in their corresponding sections on the 
page */
$(window).on('load',function() {
  var saved_events = JSON.parse(localStorage.getItem("saved_events"));
  if (saved_events == null) {
    saved_events = {};
  }

  for (const event in saved_events) {
    const eventTimeEl = $(`#${event}`); //Element containing the id representing the event time in the local storage
    const eventText = saved_events[event];
    eventTimeEl.children("textarea, .description").text(eventText); //Traverses through the DOM to edit the description of the textarea corresponding to the event time
  }
})

var saveBtn = $(".saveBtn");

/* Obtains the time and description of the event when it is saved by the user and saves it to the local storage,
while also displays the new information on the page */
saveBtn.on('click', function () {
  var btnclicked = $(this) //JQuery object of the DOM element that was clicked on (the save button)

  //Traverses through the DOM to obtain the event time (id of the parent element) and 
  //description(value of the textarea sibling element)
  var eventTime = btnclicked.parents(".time-block")[0].id;
  var eventText = btnclicked.siblings("textarea, .description").val();

  var saved_events = JSON.parse(localStorage.getItem("saved_events"));
  if (saved_events == null) {
    saved_events = {};
  }
  saved_events[eventTime] = eventText;
  localStorage.setItem("saved_events", JSON.stringify(saved_events));
})

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
