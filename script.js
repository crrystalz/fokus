const input = document.getElementById("chat-input");
const submit = document.getElementById("submit-button");
const response = document.getElementById("chat-response");

submit.addEventListener("click", function() {
  fetch("https://api.openai.com/v1/engines/davinci/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer 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"
    },
    body: JSON.stringify({
      prompt: input.value,
      max_tokens: 100
    })
  })
    .then(function(res) { return res.json(); })
    .then(function(data) { response.innerHTML = data.choices[0].text; });
});
