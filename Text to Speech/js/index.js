// A function for less code.
const select = (query) => document.querySelector(query);

// Variables
const button = select("#read-button");
const textarea = select("#text-area");
const message = new SpeechSynthesisUtterance();

// Configuration
message.lang = "en"

// Functions
const updateText = () => {
  message.text = textarea.value;
};

const speak = () => {
  window.speechSynthesis.speak(message);
};

// Listeners
button.onclick = speak;
textarea.oninput = updateText;

window.onload = () => {
  !"speechSynthesis" in window &&
    alert("Sorry, your browser doesn't support text to speech!");
};
