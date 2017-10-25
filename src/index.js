
import * as Vector from './vector'
import './index.css';
import Terrain from './terrain';
import Ship from './ship';
import Astroid from'./astroids';
//var gameOver = this.gameOver.bind(this);
//var handleKeyDown = this.handleKeyDown.bind(this);
//var update = this.update.bind(this);
//var render = this.render.bind(this);
//v//ar loop = this.loop.bind(this);
  var input = {

      direction: 'down'
    };// Set up event handlers

  // Start the game loop
//var DeadShipTimer
var timer=0;
var Score=0;
var gameOverText = document.createElement('h1');
var ScoreText = document.createElement('h2');
document.body.appendChild(gameOverText);
document.body.appendChild(ScoreText);
var warpText = document.createElement('h5');
var shatterText = document.createElement('h6');
document.body.appendChild(warpText);
document.body.appendChild(shatterText);

var instructions = document.createElement('p');
document.body.appendChild(instructions);
var lifeText = document.createElement('h3');
document.body.appendChild(lifeText);
instructions.innerHTML="number of Lives is 4 \n press space to Fire.\n use G ONLY ONCE to break some astroids in the screen.  "
+"\n click F to warp randomly. you could be killed if you warp into an astroid! you can only warp 3 times ";

var level= document.createElement('h4');
document.body.appendChild(level);

//var canvas = document.createElement('canvas');
var canvas = document.createElement('canvas');
canvas.width = 600;
canvas.height = 600;
var context = canvas.getContext('2d');
document.body.appendChild(canvas);

//var terrain = new Terrain(300, 300);
//terrain.render(context);
var bulletSound=new Audio("AstroidBullet.mp3");
var ship = new Ship(300, 300);
ship.render(context);
  window.onkeydown = handleKeyDown;
  lifeText.innerHTML="Lives: "+ship.life;
  "\n ";
var numberOfAstroids=10;
var Level=1;
level.innerHTML="Level: "+Level;
warpText.innerHTML="Warp:  "+ship.wrap;
  shatterText.innerHTML="Shatter: "+ship.shatter;
var astroids=[];
for(var i=0;i<10;i++){
  astroids.push(new Astroid());
}
  function handleKeyDown(event) {
    event.preventDefault();
    switch(event.key){
      case 'w':
      case 'ArrowUp':
      input.direction = 'up';
          ship.update(input);
        break;
      case 'a':
      case 'ArrowLeft':
      input.direction = 'left';
        ship.update(input);
        break;
      case 's':
      case 'ArrowDown':
    input.direction = 'down';
      ship.update(input);
        break;

      case 'd':
      case 'ArrowRight':
      input.direction = 'right';
        ship.update(input);
        break;
        case 'f' :
        input.direction="warp";
        if(ship.Destroyed===false &&ship.wrap>0){

            //ship.warp();
            ship.wrap--;
            ship.x = Math.floor(Math.random() * (570- 5 + 1)) + 5;
              ship.y = Math.floor(Math.random() * (570- 5 + 1)) + 5;
            warpText.innerHTML="Warp:  "+ship.wrap;

        }

        ship.update(input);


        break;
        case'g':
        input.direction="Shatter";
          ship.shatter--;
          shatterText.innerHTML="Shatter: "+ship.shatter;
        astroids.forEach(function(astroid){
          if(ship.shatter>0){

            astroid.Destroyed=true;
            if((astroid.mass/2)>6){
              //var velocity=astroid.Velocity;
            //  velocity.x-3;
              //velocity.y-3;
              astroids.push(new Astroid(astroid.x,astroid.y,astroid.mass/2,{x:astroid.Velocity.x*-1,y:astroid.Velocity.y}));
              astroids.push(new Astroid(astroid.x,astroid.y,astroid.mass/2,astroid.Velocity));
            }


          }

        });
        break;

        case ' ':
        input.direction="Fire";
        ship.update(input);
        break;
      }
  }
var handleKeyDown=handleKeyDown.bind(this);
function gameOver(){
  context.beginPath();
  context.fillStyle="#000000";
  context.fillRect(0,0,600,600);
  gameOverText.innerHTML="Game Over";
  //  document.body.appendChild(gameOverText);
}
function nextLevel(){


  if (timer>=2000){
    console.log("nextLev");
    timer=0;
    astroids=[];
    Level++;
    gameOverText.innerHTML="";
    level.innerHTML="Level: "+Level;
    for(var i=0;i<Level*2+10;i++){
      astroids.push(new Astroid());
    }
    ship=new Ship(300,300);

  }
else{
  context.beginPath();
  context.fillStyle="#000000";
  context.fillRect(0,0,600,600);
  gameOverText.innerHTML="Next Level...";
}

}
function loop(){
timer++;
if(ship.life>0 || ship.Destroyed===false){
  var nextLevels=true;
for(var i=0;i<astroids.length;i++){
  if(astroids[i].Destroyed===false){
    nextLevels=false;
  };

}
if(nextLevels===true){nextLevel();}
ScoreText.innerHTML="Score : "+Score;

  ship.deadShipTimer++;
    context.fillStyle = '#00000';
    context.fillRect(0, 0, 600, 600);

    //ship.update(input);
    if(ship.Destroyed===false){
      console.log("hg");
      ship.Move();
    ship.render(context);
    }

  if(ship.life>0 && ship.Destroyed==true &&ship.deadShipTimer>100){
    ship.Destroyed=false;
    ship.x=300;
    ship.y=300;
  }
  astroids.forEach(function(astroid){


    if(astroid.Destroyed===false){
      if(ship.Destroyed===false){
        if(!(
        ship.x <= (astroid.x-astroid.mass)-2||
        ship.x >= (astroid.x+2*astroid.mass)-2||
        ship.y <= (astroid.y-astroid.mass) -2||
        ship.y >=(astroid.y+astroid.mass)-2
        )) {
          ship.Destroyed=true;
          ship.deadShipTimer=0;
          ship.ShipDestryoedSound.play();
          ship.accelration=0;
        ship.life--;
        lifeText.innerHTML="Lives: "+ship.life;
        }
      }


      astroid.render(context);
      astroid.update();
    }

  });

  var bullets=ship.bullets;
  for(var i=0;i<bullets.length;i++){
  for(var j=0;j<astroids.length;j++){
    if(bullets[i].Destroyed===false)//console.log(bullets[i]);
  {//console.log(astroids[j].point6.x + astroids[j].x);
  if(astroids[j].Destroyed===false){
    if(!(
  bullets[i].x <= (astroids[j].x-astroids[j].mass)-1||
  bullets[i].x >= (astroids[j].x+2*astroids[j].mass)-1||
  bullets[i].y <= (astroids[j].y-astroids[j].mass) -1||
  bullets[i].y >=(astroids[j].y+astroids[j].mass)-1
  )) {
    //console.log("here");

    bulletSound.pause();
  bulletSound.load();
  bulletSound.play();
   astroids[j].Destroyed=true;
   bullets[i].Destroyed=true;
   Score=Score+50;
    if(( astroids[j].mass/2)>=6){
      //var velocity=astroid.Velocity;
    //  velocity.x-3;
      //velocity.y-3;
      astroids.push(new Astroid( astroids[j].x, astroids[j].y, astroids[j].mass/2,{x: astroids[j].Velocity.x*-1,y: astroids[j].Velocity.y}));
      astroids.push(new Astroid( astroids[j].x, astroids[j].y, astroids[j].mass/2, astroids[j].Velocity));
    }

    // collision between rect1 and rect2
  }
    ;
  }
  // console.log(bullets[i].x);
  //console.log(bullets[i].x+"x bullet");//console.log(astroids[j].x+"x astroid");

  }}  //console.log(astroids[j]);

  }


}
else{gameOver();}
}


var interval = setInterval(loop,20);
loop();
