// MAIN JS SCRIPT - CUSTOM 


  var r = document.getElementById('todo-list-item');

  function startConverting() {

  if('webkitSpeechRecognition' in window) {
    var speechRecognizer = new webkitSpeechRecognition();
    speechRecognizer.continuous = true;
    speechRecognizer.interimResults = true;
    speechRecognizer.lang = 'en-US';
    speechRecognizer.start();

    var finalTranscripts = '';

    speechRecognizer.onresult = function(event) {
      var interimTranscripts = '';
      for(var i = event.resultIndex; i < event.results.length; i++){
        var transcript = event.results[i][0].transcript;
        transcript.replace("\n","<br>");
        if(event.results[i].isFinal){
          finalTranscripts += transcript;
        }else{
          interimTranscripts += transcript;
        }
      }
      r.value = finalTranscripts + interimTranscripts;

      };
      speechRecognizer.onerror = function(event){
    };
  } else {
    r.value = "Not supported";
  }
}