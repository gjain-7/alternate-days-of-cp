var countDownDate=new Date("Aug 20, 2021 16:30:00").getTime();
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
        document.getElementById('timer').innerHTML="Contest has ended"
    }
},1000);