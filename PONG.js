// ====================================================================
// INITIALISING VARIABLES
// ====================================================================
var paddle1Pos = 50;
var paddle2Pos = 50 ;
var paddle1Speed = 0;
var paddle2Speed = 0;
var paddle1 = document.getElementById('paddle1');
var paddle2 = document.getElementById('paddle2');
var ballSpeedTop = 0;
var ballSpeedLeft = 0;
var ballTopPos = 50;
var ballLeftPos = 50;
var ball = document.getElementById('ball');
var borderLeft = 4;
var borderRight = 96;
var paddleHeight = 20;
var scoreLeft = 0;
var scoreRight = 0;

//=================================================================
// SETTING UP AUDIO
//=================================================================

 function play(sound) {
   const audio = document.getElementById(sound)
   audio.currentTime = 0;
   audio.play()
 }

// ====================================================================
// INITIALISING BALL SPEED
// ====================================================================

function startBall() {
  ballTopPos = 50;
  ballLeftPos = 50;
  if (Math.random() < 0.5) {
    var side = -1;
  } else {
    side = 1;
  }
  if (Math.random() < 0.5) {
    var side2 = -1;
  } else {
    side2 = 1;
  }
  ballSpeedTop =  side2 *(Math.random() * -0.05 - 0.1);
  ballSpeedLeft = side * (Math.random() * 0.05 + 0.1);
};

// ====================================================================
// PADDLES COMMANDS
// ====================================================================

document.addEventListener('keydown', function(e) {
  if (e.keycode == 87 || e.which == 87) {
    paddle1Speed -= 0.5;
  }
  if (e.keycode == 83 || e.which == 83) {
    paddle1Speed += 0.5;
  }
  if (e.keycode == 38 || e.which == 38) {
    paddle2Speed -= 0.5;
  }
  if (e.keycode == 40 || e.which == 40) {
    paddle2Speed += 0.5;
  }
});
// ====================================================================
// UPDATING BALL SPEED, PADDLES SPEEDS, AND SCORES
// ====================================================================
window.setInterval(function () {
  paddle1Pos += paddle1Speed;
  paddle2Pos += paddle2Speed;
  ballTopPos += ballSpeedTop;
  ballLeftPos += ballSpeedLeft;
  if (paddle1Pos <= 10) {
    paddle1Pos = 10;
  }
  if (paddle2Pos <= 10) {
    paddle2Pos = 10;
  }
  if (paddle1Pos >= 90) {
    paddle1Pos = 90;
  }
  if (paddle2Pos >= 90) {
    paddle2Pos = 90;
  }
  if (ballTopPos <= 2 || ballTopPos >= 97) {
    ballSpeedTop = -ballSpeedTop;
    play('paddle-clap');
  }
  if (ballLeftPos <= borderLeft) {
    if ((ballTopPos + 13) > paddle1Pos && (ballTopPos + 7) < (paddle1Pos + paddleHeight)) {
      ballSpeedLeft = -ballSpeedLeft;
      play('paddle-clap');
    } else {
      scoreRight += 1;
      if (scoreRight == 5) {
        scoreRight = 0;
        scoreLeft = 0;
        document.getElementById('score-right').innerHTML = scoreRight;
        document.getElementById('score-left').innerHTML = scoreLeft;
      }
      document.getElementById('score-right').innerHTML = scoreRight;
      startBall();
    }
  }
  if (ballLeftPos >= borderRight)  {
    if (paddle2Pos < ballTopPos + 13 && ballTopPos + 7 < (paddle2Pos + paddleHeight)) {
      ballSpeedLeft = -ballSpeedLeft;
      play('paddle-clap');
    } else {
      scoreLeft += 1;
      if (scoreLeft == 5) {
        scoreLeft = 0;
        scoreRight = 0;
        document.getElementById('score-right').innerHTML = scoreRight;
        document.getElementById('score-left').innerHTML = scoreLeft;
      }
      document.getElementById('score-left').innerHTML = scoreLeft;
      startBall();
    }
  }
  paddle1.style.top = paddle1Pos + "%";
  paddle2.style.top = paddle2Pos + '%';
  ball.style.top = ballTopPos + "%";
  ball.style.left = ballLeftPos + "%";
}, 0.1);

// ====================================================================
// STOP PADDLE MOVEMENT
// ====================================================================

document.addEventListener('keyup', function(e) {
  if(e.keycode == 87 || e.which == 87) {
    paddle1Speed = 0;
  }
  if(e.keycode == 83 || e.which == 83) {
    paddle1Speed = 0;
  }
  if(e.keycode == 38 || e.which == 38) {
    paddle2Speed = 0;
  }
  if(e.keycode == 40 || e.which == 40) {
    paddle2Speed = 0;
  }
});

// ====================================================================
// STARTING GAME WITH SPACE KEY
// ====================================================================

document.addEventListener('keydown',function(e) {
  if (e.keycode == 32 || e.which == 32) {
    document.getElementById('space').style.display= 'none';
    startBall();
  }
});
