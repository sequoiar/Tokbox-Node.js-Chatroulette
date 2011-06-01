window.onload = function(){
  var session = TB.initSession(sessionId); // Sample session ID. 
var subscribers = {};
			
	session.addEventListener("sessionConnected", sessionConnectedHandler);
	session.addEventListener("streamCreated", streamCreatedHandler);
	session.connect(apikey, token); // OpenTok sample API key and sample token string. 

  function sessionConnectedHandler(event) {
     subscribeToStreams(event.streams);
	
     session.publish('publishWindow');
  }

  function streamCreatedHandler(event) {
    subscribeToStreams(event.streams);
  }

  function subscribeToStreams(streams) {
    for (i = 0; i < streams.length; i++) {
      var stream = streams[i];
      	// dont publish our own session again
	if (stream.connection.connectionId != session.connection.connectionId) {

	var subscriberDiv = document.createElement('div'); // Create a div for the subscriber to replace
	subscriberDiv.setAttribute('id', stream.streamId); // Give the replacement div the id of the stream as its id.
	document.getElementById("subscribeWindow").appendChild(subscriberDiv);
	subscribers[stream.streamId] = session.subscribe(stream, subscriberDiv.id);
      }
    }
  }
}
