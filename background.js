// 1 open connection with firebase
// bool = signedIN
// User's google image and name and rating
// background stores signed in user's history previous contests --top 'n'
// backgrounds stores question if contest is running (check it from current time)
// 
// 2 create function for posting data to table


// (amarnath)


// (ashwin)
// another dashboard Page and load according the variable signedIN,username,img-link, score
// independent timer
// some buttons related to signin/signout


// independent timer in leaderBoard
//


//chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    // listening to content message
    //console.log(message);
    // POST it to firebase
    // send info questionBoards page (Khushi)
    
//});


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => { 
    if(request.message==='Sign Out'){
        chrome.storage.sync.set({userStatus:false})
        sendResponse({message:'success'})        
    } 
    if(request.message==='Sign In'){        
        chrome.storage.sync.set({user:request.user,userStatus:true});
        sendResponse({message:'success'});
    }
});
chrome.runtime.onConnect.addListener(function(port){
    port.onMessage.addListener(function(msg) {
        if (msg.message === "isUserSignedIn"){
            chrome.storage.sync.get(['userStatus'],function(result){
                port.postMessage({signedInStatus:result.userStatus});
            });
        }          
    });
})






