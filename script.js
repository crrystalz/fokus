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
