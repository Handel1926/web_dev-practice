var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var started = false
var level = 0
$(document).keypress(function () {
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChossenColor = $(this).attr("id");
  userClickedPattern.push(userChossenColor);

  playSound(userChossenColor);
  animatePress(userChossenColor);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentlevel){
  if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
    console.log("success");
    if (gamePattern.length === userClickedPattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }else {
    console.log("Wrong");
    var audio = new Audio("./sounds/wrong.mp3")
    audio.play()
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200)
    $("h1").text("Game Over, Press Any Key to Restart")
    startOver();
  }

}


function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);
  var randomNumber = Math.round(Math.random() * 3);
  var randomColor = buttonColors[randomNumber];

  gamePattern.push(randomColor);

  animatePress(randomColor);
  playSound(randomColor);
}



function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}
function  animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
function startOver(){
  level = 0;
  started = false;
  gamePattern = [];
}
