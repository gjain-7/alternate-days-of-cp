var port = chrome.runtime.connect({name: "port1"});
port.postMessage({message: "isUserSignedIn"});
port.onMessage.addListener(function(msg) {
  if (msg.signedInStatus)
    window.location.replace('/dashBoard.html');            
});