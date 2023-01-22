// Function to send user input to OpenAI API and display output
function submitText() {
    // Get user input
    const inputText = document.getElementById('input-text').value;

    // Send input to OpenAI API
    fetch('https://api.openai.com/v1/engines/davinci/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`
        },
        body: JSON.stringify({
            prompt: inputText,
            temperature: 0.5
        })
    })
    .then(response => response.json())
    .then(data => {
        // Display output from model
        const output = data.choices[0].text;
        document.getElementById('output').innerHTML = output;
    });
}