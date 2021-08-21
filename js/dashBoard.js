function signOut(){
    window.location.replace('popup1.html')
    chrome.runtime.sendMessage({message:"Sign Out"},function(response){
        // sends a message to sign out 
    })
}
