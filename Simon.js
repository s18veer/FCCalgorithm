"use strict";
var onoff=false;
var strict=false;
var start = false;
var level = "--";
var sequence = [];
var userSequence=[];
var playTime = false; // user turn
var usetWaitTimer = 1500; // 2 seconds for each sequence value 2*sequence.length
var errorDelay = 2000;
var userTimerCtrl;
var clearColorDelay=600; // how much time wait to clear colors (1 second)

// play sound
function playsound(sound){
  // play sound
  var a=document.getElementById(sound);
  a.currentTime=0;
  a.play();
}


// check if both array matches
function checkArray(arr1, arr2){
  if (arr1.length !== arr2.length) {
    return false;
  }
  
  for(var i=0;i<arr1.length;i++) {
    if(arr1[i]!==arr2[i]){
      return false;
    }
  }
  return true;
}

// generate random num 0..3
function getRandNum(){
  return Math.floor(Math.random()*4);
}

// 00's padding
function digits(num, count){
  return ("00000"+num).slice(-count);
}

// show level on display
function showLevel(lvl){
  $("#display").text(digits(lvl,2));
}

// lights effect to play sequence of nums
function showSequence(index, max){
  if(!start) return;
  if(index>=max) return;
  console.log("showing seq",playTime);
  switch (sequence[index]){
    case 0:
      $("#topleft").addClass("on");
      break;
    case 1:
      $("#topright").addClass("on");
      break;
    case 2:
      $("#bottomleft").addClass("on");
      break;
    case 3:
      $("#bottomright").addClass("on");
      break;
  };

  // play sound
  playsound("audio"+sequence[index]);

  //clear on class
  console.log("showSeq timeout", clearColorDelay);
  setTimeout(function(){
    //console.log("clear color");
    $("#topleft").removeClass("on");
    $("#topright").removeClass("on");
    $("#bottomleft").removeClass("on");
    $("#bottomright").removeClass("on");

    console.log("showSeq timeout pause", clearColorDelay);
    // pause before show next value/sequence
    setTimeout(function(){
      showSequence(index+1, max);
    },clearColorDelay);
    
  }, clearColorDelay); 
}

// add new value to sequence
function addData(){
  console.log("ptime",playTime);
  sequence.push(getRandNum());
  console.log("sequence",sequence);
}

// set start values
function initialize(){
  level = "--";
  userSequence = [];
  sequence = [];
  strict = false;
  start = false;
  $("#strict-light").removeClass("on");
  $("#center").removeClass("on");
  showLevel(level);
}

// main play function
function game(add){
  playTime = false;
  console.log("game ptime",playTime);
  if(!start) return;
  
  showLevel(level);
  if(add) {
    addData();
  }
  showSequence(0, sequence.length);
  
  //compu playing show indicator
  $("#center").addClass("on");
  
  // wait will showSequence finish.. 
  setTimeout(function(){
    $("#center").removeClass("on");
    playTime=true;
    userSequence=[];
    console.log("game p2time",playTime);

    // wait for user input
    console.log("waiting for user play", usetWaitTimer*(sequence.length+1));
    userTimerCtrl = setTimeout(function(){
      // check if user input is correct
      console.log(JSON.stringify(sequence));
      console.log(JSON.stringify(userSequence));
      if (checkArray(sequence,userSequence)){
        // both equal, next level
        //alert("good job, next level");
        level++;
        game(true);// addData, showSequence, waitForInput, checkInput, repeat
      } else {
        // wrong input, show sequence, wait for input
        //alert("wrong input");
        playsound("errorsound");
        showLevel("!!");

        setTimeout(function(){
          // if strict, re initialize all, start over newSequence
          var startAgain=false;
          if(strict){
            level = "0";
            userSequence=[];
            sequence=[];
            startAgain=true;
          }

          game(startAgain); //NOTaddData, showSeq, wait, check, repeat

        }, errorDelay); // wait for error beep/msg finish


      }

    }, usetWaitTimer*(sequence.length+1)); //wait for user to play
    
  }, (clearColorDelay*2)*sequence.length); // wait for showSequence finish
  
  
  // user turn
  //1. create another timer handler to wait for user input
  //2. if user input ontime and correct, clear interval and addData (repeat)
  //3. if userinput incorrect, clear interval, showsequence, and repeat from step 1.
  //4. if timer runout and userinput incomplete, clear interval, showsequence, repeat from step 1.
  
  
}// fin game()


///////////////////////
///////////////////////

$(document).ready(function(){
  $("#switchbtn").click(function(){
    onoff=!onoff;
    $(this).toggleClass("on");
    $("#display").toggleClass("on");
    
    if(!onoff){
      initialize();
//      $("#display").addClass("on");
    }
    console.log("onoff",onoff);
  });

  $("#count").click(function(){
    if(!onoff) return;
    
    strict=!strict;
    $("#strict-light").toggleClass("on");
    
    console.log("strict",strict);
  });

  $("#start").click(function(){
    if(!onoff) return;
    
    start=!start;
    if(start){
      level=0;
      userSequence = [];
      sequence = [];
      game(true);
    } else {
      initialize();
      userTimerCtrl = clearTimeout(userTimerCtrl);
    }
    showLevel(level);
    
    console.log("start",start);
  });
  
  
  
  // color buttons on user input
  $("#topleft").mousedown(function(){
    if(playTime) {
      $(this).toggleClass("on");
      userSequence.push(0);
      //play sound
      playsound("audio0");
    }
  }).mouseup(function(){
    if(playTime) {
      $(this).removeClass("on");
    }
  });
  
  $("#topright").mousedown(function(){
    if(playTime) {
      $(this).toggleClass("on");
      userSequence.push(1);
      //play sound
      playsound("audio1");
    }
  }).mouseup(function(){
    if(playTime) {
      $(this).removeClass("on");
    }
  });
  
  $("#bottomleft").mousedown(function(){
    if(playTime) {
      $(this).toggleClass("on");
      userSequence.push(2);
      //play sound
      playsound("audio2");
    }
  }).mouseup(function(){
    if(playTime) {
      $(this).removeClass("on");
    }
  });
  
  $("#bottomright").mousedown(function(){
    if(playTime) {
      $(this).toggleClass("on");
      userSequence.push(3);
      //play sound
      playsound("audio3");
    }
  }).mouseup(function(){
    if(playTime) {
      $(this).removeClass("on");
    }
  });
  

});
