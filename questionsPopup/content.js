console.log("The extension is here!");



chrome.runtime.onMessage.addListener(receivedMessage);

function receivedMessage( request, sender, sendResponse) {

    let para = document.getElementsByTagName('h2');
    for(var i=1;i<=para.length;i++){
      para[i-1].innerHTML = request.txt;
    }

}
