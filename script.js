var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).on("keypress",function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    var userChoosenColor = this.id;
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(userClickedPattern.length - 1);
});


function nextSequence() {
    userClickedPattern = [];
    
    level++;
    $("h1").text("Level " + level);
    var randNum = Math.floor((Math.random()) * 4);
    var randomChoosenColor = buttonColours[randNum];
    $("." + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    animatePress(randomChoosenColor);
    playSound(randomChoosenColor);
    gamePattern.push(randomChoosenColor);
}
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // console.log("success");
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        
        wrongAnswer();
    }
}
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatePress(curentColor) {
    $("." + curentColor).addClass("pressed");
    setTimeout(function () {
        $("." + curentColor).removeClass("pressed");

    }, 100);
}

function wrongAnswer() {
    
    playSound("wrong");

    $("h1").text("Game over, Press any key to Restart");

    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");

    }, 200);

    gamePattern = [];
    level=0;
    started = false;

}


