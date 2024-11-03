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

function moveEverything() {

    if (showingScore){
        return;
    }
    BallX += BallXSpeed;
    console.log (BallX);
    BallY += BallYspeed;

    moveComputerPaddle ();

    if (BallY >= game.height || BallY <= 0) {
        BallYspeed *= -1;
    }

    if (BallX > game.width ) {

        if (BallY > paddle2Y && BallY < (paddle2Y + paddleHeight)) {
            BallXSpeed *= -1;
        } else {
            leftPlayerScore += 1;
            ballReset();
        }           
        
    }

    if (BallX < 0) {
        if (BallY > paddle1Y && BallY < (paddle1Y + paddleHeight)) {
            BallXSpeed *= -1;
        } else {
            rightPlayerScore += 1;
            ballReset();
        }
    }
        
}
function moveComputerPaddle (){
    var paddleCenter = paddle2Y + paddleHeight/2;
    if (BallY > paddleCenter) {
        paddle2Y += paddleSpeed;
    } else {paddle2Y -= paddleSpeed}

}

function colorRect (topleftx, toplefty, boxwidth, boxheight, fillcolor){
    
    graph.fillStyle = fillcolor;
    graph.fillRect (topleftx, toplefty, boxwidth, boxheight);

}

function colorCirc (topleftx, toplefty, radius, fillcolor) {
    
    graph.fillStyle = fillcolor;
    graph.beginPath();
    graph.arc (topleftx, toplefty, radius, 0, Math.PI*2, true);
    graph.fill();

} 

function colorText (words, posx, posy, fillcolor){
    graph.fillStyle = fillcolor;
    graph.fillText(words, posx, posy);

}

function drawEverything () { 
    
    colorRect (0, 0, game.width, game.height, "black");

    if (showingScore){
        if (leftPlayerScore >= winnigScore) {
            colorText ("LEFT WINS!", game.width/2, game.height/2, "white");

        } else {
            colorText ("RIGHT WINS!", game.width/2, game.height/2, "white");
        }

    } else {          

    // new rectangle paddle
    colorRect (0, paddle1Y, paddleThickness, paddleHeight, "white");

    // computer side paddle
    colorRect (game.width - paddleThickness, paddle2Y, paddleThickness, paddleHeight, "yellow" )

    // new ball shape
    colorCirc (BallX, BallY, 10 ,"white");

    // score board
    graph.fillText (leftPlayerScore, 200, 100);
    graph.fillText (rightPlayerScore, 600, 100);
    
    // dashline on the board
    dashLine();

    }
}

function calculateMousePosition(evt) {

    var rect = game.getBoundingClientRect(), root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    }

}

function ballReset () {

    BallX = game.width/2;
    BallY = game.height/2;
    BallXSpeed *= -1;

    if (winnigScore <= leftPlayerScore || winnigScore <= rightPlayerScore) {
        showingScore = true;        
        
    } 
    
}

function dashLine () {
    for (let i = 0; i <= game.height; i+=30) {
        colorRect(game.width/2, i, 2, 20, 'white')
    }    

}