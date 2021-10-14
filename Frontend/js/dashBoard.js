chrome.storage.sync.get(['user'],function(result){
    const userDetails= result.user;
    document.getElementById('userName').innerText=userDetails.displayName;
    document.getElementById('profileImage').src=userDetails.photoURL;
})
chrome.storage.sync.get(['rating'],function(result){
    document.getElementById('rating').innerText=result.rating;
})

const signOutButton=document.getElementById('signOut')
signOutButton.addEventListener('click',()=>{
    chrome.runtime.sendMessage({message:"Sign Out"},function(response){
        if(response.message=='success'){
            window.location.replace('/signIn.html')
        }       
    });
});
    
