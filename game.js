
var buttonColours =["red","blue","green","yellow"];

var gamePattern=[];

var userClickedPattern=[];

var level=0;

var started=false;

$("#start-button").click( function () {
    if (!started) {
        
        $("#level-title").text("level "+level);
        nextSequence();
        started=true;
    }
    
});

$( ".bttn" ).click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});

function nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("level "+level);
    var randomNumber= Math.trunc(Math.random() *4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
}
    
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
       
        if (gamePattern.length===userClickedPattern.length) {
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }
    } else {
       
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        }, 2000);
        $("#level-title").text("Game Over,Press Button to Restart");
        startOver();
    }
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $( "#" + currentColour ).addClass( "pressed" );
    setTimeout(function(){
    $( "#" + currentColour).removeClass("pressed")},100);
}
  
function startOver() {
    level=0;
    started=false;
    gamePattern=[];
}
    
        