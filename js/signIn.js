
chrome.runtime.sendMessage({message:'isUserSignedIn'},function(response){        
    if(response.result){
        window.location.replace('dashBoard.html');            
    }
});


