
firebase.initializeApp({
  apiKey: "AIzaSyBRnVor3AVva1MCJrvKY6gMCeGX17c6nic",
  authDomain: "alternate-days-of-cp-eabcd.firebaseapp.com",
  projectId: "alternate-days-of-cp-eabcd",
  storageBucket: "alternate-days-of-cp-eabcd.appspot.com",
  messagingSenderId: "226869401306",
  appId: "1:226869401306:web:e7ef9730bdb168ef54b7e3"
});

var db = firebase.firestore();

var questionPointer;
var docRef = db.collection("questionsList").doc("questionPointer");
docRef.get().then((doc)=>{
  questionPointer=doc.data().questionPointer;
});

document.getElementById("q1").addEventListener("click",handleClick1);
 function handleClick1(){
   db.collection("questionsList").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        if(doc.data().qNumber === questionPointer) {chrome.tabs.create({url: doc.data().qLink});}
    });
});
}

document.getElementById("q2").addEventListener("click",handleClick2)
function handleClick2(){
  db.collection("questionsList").get().then((querySnapshot) => {
   querySnapshot.forEach((doc) => {
       if(doc.data().qNumber === (questionPointer+1)) chrome.tabs.create({url: doc.data().qLink});
   });
  });
}

document.getElementById("q3").addEventListener("click",handleClick3)
function handleClick3(){
  db.collection("questionsList").get().then((querySnapshot) => {
   querySnapshot.forEach((doc) => {
       if(doc.data().qNumber === (questionPointer+2)) chrome.tabs.create({url: doc.data().qLink});
   });
  });
}



//connecting with background to get metadata about each question

document.getElementById("status").addEventListener("click",gotowhat)
function gotowhat(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
     chrome.tabs.sendMessage(tabs[0].id, {txt:"ViewStatus"}, function(stats) {
       if(stats.acceptable === "yes")
       {document.getElementById("heading").style["color"] = "red";}
     });
   });
}



//Timer and updating questionPointer
var countDownDate=new Date("Sep 5, 2021 17:30:00").getTime();
var timerId=setInterval(function(){
    var now=new Date().getTime();
    var availableTime=countDownDate-now;
    var days = Math.floor(availableTime / (1000 * 60 * 60 * 24));
    var hours = Math.floor((availableTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((availableTime % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((availableTime % (1000 * 60)) / 1000);
    document.getElementById("timer").innerHTML = "Contest Ends in "+days + "d " + hours + "h "+ minutes + "m " + seconds + "s ";
    if(availableTime<0){
        clearInterval(timerId)
        document.getElementById('timer').innerHTML="Contest has ended";
        db.collection('questionsList').doc('questionPointer').update({questionPointer: questionPointer+1});
    }
},1000);

// var mytimer = setInterval(function(){questionPointer=questionPointer+3; console.log(questionPointer);},20000);





//adding data to database
//    db.collection("users").add({
//     first: "Alan",
//     middle: "Mathison",
//     last: "Turing",
//     born: 1912
// })
// .then((docRef) => {
//     console.log("Document written with ID: ", docRef.id);
// })
// .catch((error) => {
//     console.error("Error adding document: ", error);
// });



// document.getElementById("userInput").addEventListener("input",changeText);
//
// function changeText(){
// var newText = document.getElementById("userInput").value;
//
// let params = {
//   active:true,
//   currentWindow:true
// }
//
// chrome.tabs.query(params, gotTabs);
//
// function gotTabs(tabs){
//   let msg = {
//     "txt" : newText
//   }
//   chrome.tabs.sendMessage(tabs[0].id, msg);
// }
//
// }
