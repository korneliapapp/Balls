// first and foremost, setup canvas
const canvas = document.getElementById("graphics");
const context = canvas.getContext('2d');
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

//some variables stored in the global scope
//array to store balls 
let balls = [];
//variable to store score
let score = 0;
//set duration
let dur = 30;
//variable to check if timer is finished with boolean
let timeLeft = true;
//number of balls
let numberOfBalls = 20;
/*a global speed is set up so the balls added 
 may also adapt the other balls' speed */
let globalSpeed = 1;

//get elements using DOM
//score board setup 
const para = document.getElementById("scoreboard");
//speed buttons setup
const plusButton= document.getElementById("plus");
const minusButton= document.getElementById("minus");
//ball add button setup
const addButton= document.getElementById("add");

//event listeners and stuff
plusButton.addEventListener("change",plus());
minusButton.addEventListener("change",minus());
addButton.addEventListener("change",addBall());

/*
Title: Object Building Practice
Author: Mozilla MDN Web Docs
Date: Last updated Jun 27th 2018
Availability: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice
*/

// function to generate random number 
function random(min,max) {
 let num = Math.floor(Math.random()*(max-min)) + min;
 return num;
}

// define Ball constructor
function Ball(x, y, velX, velY, color, size) {
 this.x = x;
 this.y = y;
 this.velX = velX;
 this.velY = velY;
 this.color = color;
 this.size = size;
}

// define ball draw method, how the drawn in spherical shapes 
Ball.prototype.draw = function() {
 context.beginPath();
 context.fillStyle = this.color;
 context.arc(this.x, this.y, this.size, 0,2 * Math.PI);
 context.fill();
};

// define ball bounce method, how the balls manage to bounce off the walls  
Ball.prototype.bounce = function() {
 if((this.x + this.size) >= width) {
   this.velX = -(this.velX);
 }

 if((this.x - this.size) <= 0) {
   this.velX = -(this.velX);
 }

 if((this.y + this.size) >= height) {
   this.velY = -(this.velY);
 }

 if((this.y - this.size) <= 0) {
   this.velY = -(this.velY);
 }

 this.x = this.x + this.velX;
 this.y += this.velY;
};


//function to add ball using button 
function addBall(){
  let size = random(50,70);
  let ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-15,15) * globalSpeed,
    random(-15,15) * globalSpeed,
    'rgb(' + random(0,333) + ',' + random(0,220) + ',' + random(0,360) +')',
    size
    );
  balls.push(ball);
}


//Event handler for removing balls
function removeBall(event){
	  const curX = event.clientX;
    const curY = event.clientY;
    for(j = 0; j < balls.length; j++) {
      
        let iball = balls[j];
        if(iball.x-iball.size < curX && curX < iball.x+iball.size && iball.y-iball.size < curY && curY < iball.y+iball.size){

          balls.splice(j, 1)
          if(timeLeft) score++;
          para.textContent = 'Your Score: ' + score;
          
          console.log(score);
        } 
      
      }
};


  //functions to speed up or slow down speed of balls 
  function plus(){
    for(i = 0; i < balls.length ; i++){
      balls[i].velX = balls[i].velX * 2;
      balls[i].velY = balls[i].velY * 2;
    }
    globalSpeed = globalSpeed * 2;
  }
  function minus(){
      for(i = 0; i < balls.length ; i++){
        balls[i].velX = balls[i].velX / 2;
        balls[i].velY = balls[i].velY / 2;
      } 
      globalSpeed = globalSpeed / 2;
    }
  
  

/*
Title: The simplest possible JavaScript countdown timer? [closed]
Author: stackoverflow username: "robbmj:
Date: December 16th 2013
Availability:https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer
*/

//Start timer 
function startTimer(duration) {
  
  timeLeft = true;

  let timer = duration, minutes, seconds;

  timerVal = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      document.getElementById("time").textContent = "Time: " + minutes + ":" + seconds;

      if (--timer < -1) {
        //timer runs out add popups? we also found how to use "confirm" on google to create confirm boxes 
        timeLeft = false;
        clearInterval(timerVal); 
        document.getElementById("time").textContent = "Time: 00:00";

        if (confirm("Your score was: " + score + "\nPress 'OK' to Restart Game" + "\nPress 'Cancel' to Quit Page")) {
          window.location.reload();
        } else {
          window.close();
        }
      }
  }, 1000);

}


//Fills a new array with balls
function ballArray(numBalls){
  balls = [];
    while(balls.length < numBalls) {
      let size = random(50,70);
      let ball = new Ball(
        random(0 + size,width - size),
        random(0 + size,height - size),
        random(-15,15),
        random(-15,15),
        'rgb(' + random(0,333) + ',' + random(0,220) + ',' + random(0,360) +')',
        size
        );
      balls.push(ball);
    }
  }


// define loop that keeps drawing the scene constantly
function loop() {
  context.fillStyle = '#ffffff';
  context.fillRect(0,0,width,height);
  for(i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].bounce();
  } 
  if(timeLeft)requestAnimationFrame(loop);
 }


//Start game
function startGame(duration, numBalls){
  
  startTimer(duration);
  ballArray(numBalls);
  score = 0; 
  para.textContent = 'Your Score: ' + score;
  loop();
}


canvas.addEventListener("click", removeBall);

startGame(dur,numberOfBalls);


