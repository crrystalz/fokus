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
