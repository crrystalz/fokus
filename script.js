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

// Get the form and list elements
const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");

// Handle the form submit event
todoForm.addEventListener("submit", (e) => {
    // Prevent the form from submitting
    e.preventDefault();

    // Get the task input value
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value;

    // Create a new list item
    const li = document.createElement("li");
    li.innerHTML = task;

    // Create a new checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // Append the checkbox to the list item
    li.appendChild(checkbox);
        
    // Add the list item to the todo list
    todoList.appendChild(li);

    // Clear the task input field
    taskInput.value = "";
    });

    // Add an event listener to the todo list
    todoList.addEventListener("click", (e) => {
    // Check if the target is a checkbox
    if (e.target.type === "checkbox") {
        // If it is, toggle the completed class
        e.target.parentElement.classList.toggle("completed");
        e.target.parentNode.classList.add("fly-right");
        setTimeout(() => {
            e.target.parentNode.remove();
        }, 500);
    }
});
// function startTimer() {
//     var startingTime = document.getElementById('TimerInput').value * 60;
//     var orginalTime = startingTime;
//     setInterval(function(){
//     startingTime--;
//     document.getElementById("timer").innerHTML = "Study Timer: "+ startingTime;
//     }, 1000);
//     if(startingTime <= 0) {
//         clearInterval(timer);
//         document.getElementById("timer").innerHTML = "Time For Break!";
//         breaktimer(startingTime)
//     }
// }
let workTime = 25; // work interval in minutes
let breakTime = 5; // break interval in minutes
let isWorking = true; // flag to indicate whether the user is currently working
let timeLeft; // variable to store the time left in the current interval


function startTimer() {

    if (isWorking) {
        timeLeft = workTime * 60;
    } else {
        timeLeft = breakTime * 60;

    }
    let timer = setInterval(function() {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        document.getElementById("timer").innerHTML = `Time left: ${minutes}:${seconds}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            isWorking = !isWorking; // switch between work and break intervals
            startTimer();
        }
    }, 1000);
}





// function breaktimer(time){
//     var startingBreakTime = parseint(time/5);
//     setInterval(function(){
//         startingBreakTime--;
//         document.getElementById("timer").innerHTML = "Break Timer: " + startingBreakTime;
//         }, 1000);
//         if(startingBreakTime <= 0) {
//             clearInterval(timer);
//             document.getElementById("timer").innerHTML = "Time For Studying!";
//             startTimer()
//         }
// }


