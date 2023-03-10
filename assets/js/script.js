var saveBtn = $(".saveBtn");
var textArea = $(".description")

/* Obtains all the event information from the localStorage and displays it in their corresponding sections on the page */
$(window).on("load", function () {
  var saved_events = JSON.parse(localStorage.getItem("saved_events"));
  if (saved_events == null) {
    saved_events = {};
  }

  for (const event in saved_events) {
    const eventTimeEl = $(`#${event}`); //Element containing the id representing the event time stored in the local storage
    const eventText = saved_events[event];
    eventTimeEl.children("textarea.description").text(eventText); //Traverses through the DOM to edit the description of the textarea corresponding to the event time
  }
});


/* Obtains the time and description of the event when it is saved by the user, then saves it to the local storage and displays a note to confirm the event has been added*/
saveBtn.on("click", function () {
  var btnclicked = $(this);

  //Traverses through the DOM to obtain the event's time (id of the parent element) and description(value of the textarea sibling element)
  var eventTime = btnclicked.parents(".time-block")[0].id;
  var eventText = btnclicked.siblings("textarea.description").val();

  var saved_events = JSON.parse(localStorage.getItem("saved_events"));
  if (saved_events == null) {
    saved_events = {};
  }
  saved_events[eventTime] = eventText;
  localStorage.setItem("saved_events", JSON.stringify(saved_events));

  //Displays note on page to confirm event is added
  var eventAdded = $(`<div id="event-added-note" class="text-center mb-2">Appointment added to <span class="text-danger">localStorage✅</div>`);
  $("div.container-fluid").prepend(eventAdded);

  //Scrolls to top of page to let user see confirmation note
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/* Removes the "Appointmed added to localStorage" note when the user is about to enter a new event, and adds border to the textarea the user is typing on*/
textArea.on("focusin", function () {
  var eventAdded = $("#event-added-note");
  eventAdded.remove();

  var textClicked = $(this);
  textClicked.addClass("border border-dark border-2");
});

// Removes border from textarea when user clicks away from it
textArea.on("focusout", function () {
  var textClicked = $(this);

  textClicked.removeClass("border border-dark border-2");
});


//Continuously checks the time every second and displays it
var updateTime = setInterval(() => {
  var today = dayjs(); //Get's today's date
  displayTime(today);
  checkTime(today);
}, 1000);


//Displays the current day on the screen
function displayTime(today) {
  var currentDay = today.format("dddd, MMMM D - hh:mm a"); //Get the formatted date according to the string of tokens passed in.
  $("#currentDay").text(currentDay); 
}


/* Checks the current hour of the day and compares it to the work hour div's in the day planner. One of three classes (past,present,and future) 
is applied to the div sections of each work hour based on it's relation the current hour.*/
function checkTime(today) {
  var currentHour = today.hour(); //Get's the current hour
  var workHours = $(".time-block"); //Get's an array of all time block div's in HTML

  for (var hour = 0; hour < workHours.length; hour++) {
    elementHour = parseInt(workHours[hour].id.split("-")[1]); //Obtains the corresponding hour (24-hr time) of a div element using its id
    if (elementHour < currentHour) {
      $(workHours[hour]).removeClass("present");
      $(workHours[hour]).removeClass("future");
      $(workHours[hour]).addClass("past");
    } else if (elementHour == currentHour) {
      $(workHours[hour]).removeClass("past");
      $(workHours[hour]).removeClass("future");
      $(workHours[hour]).addClass("present");
    } else {
      $(workHours[hour]).removeClass("past");
      $(workHours[hour]).removeClass("present");
      $(workHours[hour]).addClass("future");
    }
  }
}