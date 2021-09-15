const firebaseConfig = {
    apiKey: "AIzaSyAZ84X0YhohHFY9DTayxf0fy57rkX9DyJE",
    authDomain: "authentication-extension-dab77.firebaseapp.com",
    projectId: "authentication-extension-dab77",
    storageBucket: "authentication-extension-dab77.appspot.com",
    messagingSenderId: "913287961039",
    appId: "1:913287961039:web:0713398a5d31f23e22daba",
    measurementId: "G-GGDVZ9BZ0M"
  };
firebase.initializeApp(firebaseConfig);
const ui = new firebaseui.auth.AuthUI(firebase.auth());
const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function(authResult, redirectUrl) {
        const user=firebase.auth().currentUser;
        chrome.runtime.sendMessage({message:'Sign In',user:user},function(response){
            if(response.message=='success'){
              window.location.replace('popup2.html');                  
            }
        })
       
        return false;
      },
      uiShown: function() {
        document.getElementById('signIn').style.display = 'none';
      }
    },
    signInFlow: 'popup',
    signInOptions: [
      {
        provider:firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        customParameters:{
            prompt:'select_account'
        }
      }
    ],
   
};
ui.start('#firebaseui-auth-container', uiConfig);
// document.getElementById('signIn').addEventListener('click',()=>{
//     // The start method will wait until the DOM is loaded.
//     ui.start('#firebaseui-auth-container', uiConfig);
// });
