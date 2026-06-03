export class Bullet {
  position: any;
  radius: any;
  velocity: any;
  constructor({
    position,
    velocity
  }: any) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 5;
  }

  draw(context: any) {
    context.beginPath();
    context.arc(
      this.position.x,
      this.position.y,
      this.radius,
      0,
      Math.PI * 2,
      false
    );
    context.closePath();
    context.fillStyle = "white";
    context.fill();
  }

  update(context: any) {
    this.draw(context);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
