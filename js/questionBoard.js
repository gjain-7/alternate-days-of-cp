

document.getElementById("status").addEventListener("click",gotowhat)
function gotowhat(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
     chrome.tabs.sendMessage(tabs[0].id, {txt:"ViewStatus"}, function(stats) {
       if(stats.acceptable === "yes")
       document.getElementById("heading").style["color"] = "red";
     });
   });
}


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
// document.getElementById("q1").addEventListener("click",gotowhat)
// function gotowhat(){
//   var q1url = 'https://www.google.com';
//   chrome.tabs.create({url: q1url});
// }

// document.getElementById("q2").addEventListener("click",gotowhat)
// function gotowhat(){
//   var q2url = 'https://www.google.com';
//   chrome.tabs.create({url: q2url});
// }

// document.getElementById("q3").addEventListener("click",gotowhat)
// function gotowhat(){
//   var q3url = 'https://www.google.com';
//   chrome.tabs.create({url: q3url});
// }

// document.getElementById("db").addEventListener("click",gotowhat)
// function gotowhat(){
//   var dburl = 'https://www.google.com';
//   chrome.tabs.create({url: dburl});
// }

// document.getElementById("lb").addEventListener("click",gotowhat)
// function gotowhat(){
//   var lburl = 'https://www.google.com';
//   chrome.tabs.create({url: lburl});
// }
