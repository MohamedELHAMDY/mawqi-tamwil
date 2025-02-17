function getBankAddress() {
    let query = document.getElementById("userInput").value;
    let [bank, location] = query.split(" in ");

    if (!bank || !location) {
        alert("Please enter a valid format: 'Bank Name in Location'");
        return;
    }

    fetch(`/get_address?bank=${bank.trim()}&location=${location.trim()}`)
    .then(response => response.json())
    .then(data => {
        let resultDiv = document.getElementById("chatResponse");
        resultDiv.innerHTML = ""; // Clear previous results

        if (data.message) {
            resultDiv.innerHTML = `<p>No results found.</p>`;
        } else {
            data.forEach(bank => {
                resultDiv.innerHTML += `<p><strong>${bank.BANQUE}</strong>: ${bank.ADRESSE_GUICHET}</p>`;
            });
        }
    })
    .catch(error => {
        console.error("Error fetching data:", error);
    });
}

function startListening() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "fr-FR"; // Set to French if needed
    recognition.start();

    recognition.onresult = function(event) {
        document.getElementById("userInput").value = event.results[0][0].transcript;
        getBankAddress(); // Auto-fetch data
    };
}

document.getElementById("voiceBtn").addEventListener("click", startListening);
