var buttonColors = ["red","blue","green","yellow"]
var gamePattern = []
var userCLickedPattern = []
var level = 0

function nextSequence() {
    $("h1").text("level " + level);
    level++ ;
    var randomNumber = Math.floor(Math.random()*4);
    var randomColorChoosen = buttonColors[randomNumber];
    gamePattern.push(randomColorChoosen);
    level = gamePattern.length
    playSound(randomColorChoosen);
}

function playSound(name) {
    $("#" + name).fadeIn(100).fadeOut(100).fadeIn();
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed")
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed")
    },100)
}

function handler(event){
    var userChoosenColor = $(event.target).attr("id");
    userCLickedPattern.push(userChoosenColor);
    playSound(userChoosenColor);
    animatePress(userChoosenColor);
    chechAnswer(userCLickedPattern.length - 1);
}

function chechAnswer(currentLevel){
    if(gamePattern[currentLevel] == userCLickedPattern[currentLevel]){
        if(userCLickedPattern.length == gamePattern.length){
            userCLickedPattern = []
            setTimeout(function(){
                nextSequence()
            },1000)
        }
    }
    else {
        $("h1").text("Game Over... Press any Key to restart")
        startOver()
    }
}

function startOver(){
    $("body").addClass("game-over")
    setTimeout(function(){
        $("body").removeClass("game-over")
    },1000)
    gamePattern = []
    userCLickedPattern = []
    level = 0
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
}

$(document).keypress(function(){
    if(gamePattern.length < 1){
        nextSequence()
    }
})

$(".btn").click(handler)

