function signOut(){
    window.location.replace('signIn.html')
    chrome.runtime.sendMessage({message:"Sign Out"},function(response){
        // sends a message to sign out 
    })
}
