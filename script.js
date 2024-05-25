let speech = new SpeechSynthesisUtterance();
let voices = [];
let voiceSelect = document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    voices.forEach((voice, i) => {
        voiceSelect.options[i] = new Option(voice.name, i);
    });
};

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});

document.getElementById("click_to_convert").addEventListener('click', function () {
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.interimResults = true;

    // Set the initial language to English (United States)
    recognition.lang = 'en-US';

    recognition.addEventListener('result', e => {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        document.getElementById("convert_to_text").innerHTML = transcript;
    });

    recognition.start();

    // Switch recognition language based on some condition (e.g., user input)
    // For example, you can switch language when a button is clicked
    document.getElementById("switch_language_button").addEventListener('click', function () {
        // Toggle between English and French
        if (recognition.lang === 'en-US') {
            recognition.lang = 'fr-FR'; // Switch to French
        } else {
            recognition.lang = 'en-US'; // Switch to English
        }
    });
});

