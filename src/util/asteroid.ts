export class Asteroid {
  position: any;
  radius: any;
  velocity: any;
  constructor({
    position,
    velocity,
    radius
  }: any) {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
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
    context.strokeStyle = "white";
    context.fillStyle = "white";
    context.fill();
    context.stroke();
  }

  update(context: any) {
    this.draw(context);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
