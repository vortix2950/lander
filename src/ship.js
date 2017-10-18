export default class Ship {
  constructor(screenWidth, screenHeight) {
    this.x = screenWidth / 2;
    this.y = 10;
    this.angle = -5;
  }

  render(ctx) {
    ctx.save();
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle);
    ctx.moveTo(0, -5);
    ctx.lineTo(2, 5);
    ctx.lineTo(-2, 5);
    ctx.closePath();
    ctx.stroke();
    ctx.restore();
  }

}
