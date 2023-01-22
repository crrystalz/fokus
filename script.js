// Function to send user input to OpenAI API and display output
function submitText() {
    // Show loading animation
    document.getElementById("loading").style.display = "block";

    // Get user input
    const inputText = document.getElementById('input-text').value;

    // Send input to OpenAI API
    fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`
        },
        body: JSON.stringify({
            prompt: inputText,
            temperature: 0.4,
            max_tokens: 500
        })
    })
    .then(response => response.json())
    .then(data => {
        // check if data.choices is defined and has elements
        if (data.choices && data.choices.length > 0) {
            // Display output from model
            const output = data.choices[0].text;
            document.getElementById('output').textContent = output;
        } else {
            // Handle case where data.choices is not defined or has no elements
            document.getElementById('output').textContent = "No output from the model";
        }

        // Hide loading animation
        document.getElementById("loading").style.display = "none";
    });              
}

$(document).ready(function() {
    $('#calendar').fullCalendar({
        events: [
            {
                title: 'Event 1',
                start: '2022-01-01'
            },
            {
                title: 'Event 2',
                start: '2022-01-05',
                end: '2022-01-07'
            }
        ],
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        selectable: true,
        selectHelper: true,
        select: function(start, end) {
            var title = prompt('Event Title:');
            var eventData;
            if (title) {
                eventData = {
                    title: title,
                    start: start,
                    end: end
                };
                $('#calendar').fullCalendar('renderEvent', eventData, true);
            }
            $('#calendar').fullCalendar('unselect');
        },
        editable: true,
        eventLimit: true,
    });
});

let currentStreak = 0;

setInterval(() => {
    currentStreak++;
}, 1000);

setInterval(() => {
    document.getElementById("streak").innerHTML = "Current Streak: " + currentStreak + " seconds";
}, 1000);

document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
        currentStreak = 0;
    }
});

let workTime = 25; // Default work time in minutes
let breakTime = 5; // Default break time in minutes
let isRunning = false; // Whether the timer is running or not
let isWork = true; // Whether it is the work time or break time
let intervalId; // ID of the interval used to update the timer

// Add click event listeners to the break and work time containers
document.getElementById("break-time-container").addEventListener("click", changeBreakTime);
document.getElementById("work-time-container").addEventListener("click", changeWorkTime);

function startStopTimer() {
    if (isRunning) {
        clearInterval(intervalId);
        isRunning = false;
        document.getElementById("start-stop").innerHTML = "Start";
    } else {
        startWorkTimer();
        document.getElementById("start-stop").innerHTML = "Pause";
        isRunning = true;
    }
}

function startWorkTimer() {
    let timeLeft = workTime * 60; // Convert minutes to seconds
    document.getElementById("break-time-container").style.display = "none";
    document.getElementById("work-time-container").style.display = "none";
    document.getElementById("timer").innerHTML = `${workTime}:00`;
    intervalId = setInterval(() => {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        document.getElementById("timer").innerHTML = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        if (timeLeft === 0) {
            clearInterval(intervalId);
            startBreakTimer();
        }
    }, 1000);
}

function startBreakTimer() {
    let timeLeft = breakTime * 60; // Convert minutes to seconds
    document.getElementById("timer").innerHTML = `${breakTime}:00`;
    intervalId = setInterval(() => {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        document.getElementById("timer").innerHTML = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        if (timeLeft === 0) {
            clearInterval(intervalId);
            document.getElementById("break-time-container").style.display = "flex";
            document.getElementById("work-time-container").style.display = "flex";
            document.getElementById("start-stop").innerHTML = "Start";
            isRunning = false;
        }
    }, 1000);
}

function changeBreakTime() {
    let newBreakTime = prompt("Enter new break time (minutes)", breakTime);
    if (newBreakTime != null) {
        breakTime = newBreakTime;
        document.getElementById("break-time").innerHTML = breakTime;
    }
}

function changeWorkTime() {
    let newWorkTime = prompt("Enter new work time (minutes)", workTime);
    if (newWorkTime != null) {
        workTime = newWorkTime;
        document.getElementById("work-time").innerHTML = workTime;
    }
}

function addItem() {
    // Get the value of the text input field
    var newItem = document.getElementById("new-item").value;

    // Create a new list item
    var newLi = document.createElement("li");

    // Create a new checkbox
    var newCheckbox = document.createElement("input");
    newCheckbox.type = "checkbox";
    newCheckbox.onclick = removeItem;

    // Create a new label
    var newLabel = document.createElement("label");
    newLabel.innerHTML = newItem;

    // Add the checkbox and label to the list item
    newLi.appendChild(newCheckbox);
    newLi.appendChild(newLabel);

    // Add the list item to the todo list
    var todoList = document.getElementById("todo-list");
    todoList.appendChild(newLi);

    // Clear the text input field
    document.getElementById("new-item").value = "";
  }

  function removeItem() {
    // Get the parent list item of the checkbox that was clicked
    var item = this.parentNode;

    // Remove the parent list item from the todo list
    var todoList = document.getElementById("todo-list");
    todoList.removeChild(item);
  }