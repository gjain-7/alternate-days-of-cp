chrome.storage.sync.get(['user'],function(result){
    const userDetails= result.user;
    document.getElementById('userName').innerHTML=userDetails.displayName;
    document.getElementById('profileImage').src=userDetails.photoURL;
})

const signOutButton=document.getElementById('signOut')
signOutButton.addEventListener('click',()=>{
    chrome.runtime.sendMessage({message:"Sign Out"},function(response){
        if(response.message=='success'){
            window.location.replace('/signIn.html')
        }       
    });
});
    
