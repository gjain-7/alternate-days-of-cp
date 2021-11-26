
firebase.initializeApp({
  apiKey: "AIzaSyBRnVor3AVva1MCJrvKY6gMCeGX17c6nic",
  authDomain: "alternate-days-of-cp-eabcd.firebaseapp.com",
  databaseURL: "https://alternate-days-of-cp-eabcd-default-rtdb.firebaseio.com",
  projectId: "alternate-days-of-cp-eabcd",
  storageBucket: "alternate-days-of-cp-eabcd.appspot.com",
  messagingSenderId: "226869401306",
  appId: "1:226869401306:web:e7ef9730bdb168ef54b7e3"
});

var db = firebase.firestore();

var questionPointer;


document.getElementById("q1").addEventListener("click",handleClick1);
async function handleClick1(){

 await db.collection("questionsList").doc('questionPointer').get().then((doc)=>{
  questionPointer=doc.data().questionPointer;
  console.log(doc.data());
});

 await db.collection("questionsList").get().then((querySnapshot) => {
 querySnapshot.forEach((doc) => {
   if(parseInt(doc.id) === questionPointer) {chrome.tabs.create({url: doc.data().qLink});}
 });
});


}

document.getElementById("q2").addEventListener("click",handleClick2)
async function handleClick2(){

  await db.collection("questionsList").doc('questionPointer').get().then((doc)=>{
   questionPointer=doc.data().questionPointer;
   console.log(doc.data());
 });

  await db.collection("questionsList").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    if(parseInt(doc.id) === questionPointer+1) {chrome.tabs.create({url: doc.data().qLink});}
  });
 });

}

document.getElementById("q3").addEventListener("click",handleClick3)
async function handleClick3(){

  await db.collection("questionsList").doc('questionPointer').get().then((doc)=>{
   questionPointer=doc.data().questionPointer;
   console.log(doc.data());
  });

  await db.collection("questionsList").get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    if(parseInt(doc.id) === questionPointer+2) {chrome.tabs.create({url: doc.data().qLink});}
  });
  });

}


// ************************************************************************************************************


//connecting with background to get metadata about each question

document.getElementById("status").addEventListener("click",gotowhat)
function gotowhat(){
   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
     chrome.tabs.sendMessage(tabs[0].id, {message:"ViewStatus"}, function(stats) {
       if(stats.status === "accepted")
       {document.getElementById("q1").style["background-color"] = "#6ECB63";}
       if(stats.status === "wrong answer")
       {document.getElementById("q1").style["background-color"] = "#E02401";}
       if(stats.status === "runtime error")
       {document.getElementById("q1").style["background-color"] = "#FFF9B6";}
       if(stats.status === "time limit exeeded")
       {document.getElementById("q1").style["background-color"] = "#FFDAC7";}
     });
   });
}





// ***********************************************************************************************************

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
    }
},1000);
