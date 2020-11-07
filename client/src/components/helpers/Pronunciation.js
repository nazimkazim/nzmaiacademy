const tts = window.speechSynthesis;

export const speak = (e, lang) => {
  //console.log(e.target.value)
  //console.log(e.target.value.replace(/<\/?[^>]+(>|$)/g, ""))
  if (e.target.value) {
    let word = e.target.value.replace(/<\/?[^>]+(>|$)/g, "");
    let toSpeak = new SpeechSynthesisUtterance(word);
    toSpeak.lang = lang;
    tts.speak(toSpeak);
  }
};

export const speakStr = (str, lang) => {
  //console.log(e.target.value)
  //console.log(e.target.value.replace(/<\/?[^>]+(>|$)/g, ""))
  if (str) {
    let word = str.replace(/<\/?[^>]+(>|$)/g, "");
    let toSpeak = new SpeechSynthesisUtterance(word);
    toSpeak.lang = lang;
    tts.speak(toSpeak);
  }
};