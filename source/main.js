var game;
var graph;
var BallX = 75, BallY = 75;
var BallXSpeed = 5, BallYspeed = 5;
var paddle1Y = 250;
var paddle2Y = 250;
var leftPlayerScore = 0;
var rightPlayerScore = 0;
var showingScore = false;
const paddleSpeed = 4.2;
const paddleHeight = 100;
const paddleThickness = 10;
const winnigScore = 5;


function clickHandle (evt) {

    if (showingScore) {
        leftPlayerScore = 0;
        rightPlayerScore = 0;
        showingScore = false;
        
    }
}

window.onload = function () {

    console.log ("hello World");

    game = document.getElementById ("TennisGame");
    graph = game. getContext ("2d");

    game.addEventListener('mousedown', clickHandle);

    game.addEventListener("mousemove", function (evt) {
        var mousePos = calculateMousePosition(evt);        
        paddle1Y = mousePos.y - paddleHeight/2;

    })        

    const framePerSecond = 50
    setInterval(function () {
        moveEverything();
        drawEverything();
        
    }, 1000/framePerSecond);           

}