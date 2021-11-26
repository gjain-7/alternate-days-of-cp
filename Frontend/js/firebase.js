const firebaseConfig = {
  apiKey: "AIzaSyBRnVor3AVva1MCJrvKY6gMCeGX17c6nic",
  authDomain: "alternate-days-of-cp-eabcd.firebaseapp.com",
  databaseURL: "https://alternate-days-of-cp-eabcd-default-rtdb.firebaseio.com",
  projectId: "alternate-days-of-cp-eabcd",
  storageBucket: "alternate-days-of-cp-eabcd.appspot.com",
  messagingSenderId: "226869401306",
  appId: "1:226869401306:web:e7ef9730bdb168ef54b7e3"
};
firebase.initializeApp(firebaseConfig);
const ui = new firebaseui.auth.AuthUI(firebase.auth());
let db = firebase.firestore();

const contests = db.collection("contests")

const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult:async function(authResult, redirectUrl) {
        const user=firebase.auth().currentUser;
        console.log(user);
        var rating;
        await db.collection('users').doc(user.email).get().then(doc=>{
          if(!doc.exists){ // users should exist
            db.collection('users').doc(user.email).set({rating:0})
          }
          else{
            rating = doc.data().rating
          }
        })
        await chrome.runtime.sendMessage({message:'Sign In',user:user,rating:rating},function(response){
            if(response.message=='success'){
              window.location.replace('dashBoard.html');                  
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
const currentuser = firebase.auth().currentUser;

// document.getElementById('signIn').addEventListener('click',()=>{
//     // The start method will wait until the DOM is loaded.
//     ui.start('#firebaseui-auth-container', uiConfig);
// });
