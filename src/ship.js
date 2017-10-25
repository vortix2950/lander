import * as Vector from './vector'
import bullet from './bullet';
export default class Ship {
  constructor(screenWidth, screenHeight) {
    this.x = screenWidth / 2;
    this.y =50;
    this.angle = 0;
    this.direction="right";
    this.PiAngle=this.angle*Math.PI/180;
    this.Velocity={x:Math.cos(this.PiAngle),y: Math.sin(this.PiAngle)};
    this.accelration=0;
    this.life=3;
    this.wrap=3;
    this.bullets=[];
    this.sound=new Audio("laser.mp3");
    this.shatter=2;
this.Destroyed=false;

this.ShipDestryoedSound=new Audio("sound.mp3");
  }

  render(ctx) {

    ctx.save();
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.translate(this.x, this.y);
    //console.log(this.x,this.y);
  //  console.log("this is x and  y");
  //  ctx.moveTo(5, 0);
    ctx.moveTo(0, 0);
    ctx.rotate(this.angle*Math.PI/180)
  //  ctx.rotate(this.angle);
    var tx = 4;
    var ty = 6;
    ctx.moveTo(2-tx,1-ty)
    ctx.lineTo(10-tx, 9-ty);
    ctx.lineTo(-2-tx, 9-ty);
    ctx.closePath();
    ctx.stroke();
  //ctx.translate(this.x, this.y)
    ctx.restore();
  ctx.translate(0, 0);
    this.bullets.forEach( function(bullet){
        //ctx.strokeStyle = "#50D0D0";
        if(bullet.x>600|| bullet.y>600||bullet.x<-5|| bullet.y<-5){

        }
        else{
          if(bullet.Destroyed===false){
            bullet.render(ctx);
            bullet.update();
          }

          bullet.update();}

    })
  }
  Forward(){
    if(this.accelration>4){}
    else{this.accelration++;}
    this.x= Vector.add({x:this.x,y:this.y},  this.Velocity).x;
      this.y= Vector.add({x:this.x,y:this.y},  this.Velocity).y;
  };
  Backward(){
    if(this.accelration<-4){}
    else{this.accelration--;}
     this.x= Vector.add({x:this.x,y:this.y}, {x:this.Velocity.x*-1,y:this.Velocity.y*-1}).x;
       this.y= Vector.add({x:this.x,y:this.y}, {x:this.Velocity.x*-1,y:this.Velocity.y*-1}).y;
  };
  update (input){
    //console.log("stuff");
    //console.log(this.angle);
   this.direction = input.direction;

     // Apply our movement
     switch(this.direction) {
       case 'right':
       this.rotate(+20);
         break;
       case 'left':
       this.rotate(-20);
         break;
         case 'up':

           this.Forward();

         break;

         case 'down':
           this.Backward();
           break;
           case 'warp':
           this.warp--;
          //   this.Backward();
             break;
           case 'Fire':
        //   console.log("new bullet");
        //  console.log(this.Velocity);
          this.bullets.push(new bullet(this.x,this.y,this.angle,this.direction,this.PiAngle,this.Velocity));
          this.sound.pause();
          this.sound.load();
          this.sound.play();
          break;

  }
  }

rotate(angle){
    this.angle=this.angle+angle;
    this.PiAngle=this.angle*Math.PI/180;
      this.Velocity={x:Math.cos(this.PiAngle),y: Math.sin(this.PiAngle)};
  }
Move(){
  this.x= this.x+this.Velocity.x*this.accelration;
    this.y=this.y+this.Velocity.y*this.accelration;
    if(this.x>600){this.x=0;}
    if(this.x<0){this.x=600;}
    if(this.y<0){this.y=600;}
    if(this.y>600){this.y=0;}
}

}
