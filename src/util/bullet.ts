import { Vector2D } from "../state/reducer";

export interface BulletConfig {
  position: Vector2D;
  velocity: Vector2D;
}

export class Bullet {
  public position: Vector2D;
  public radius: number;
  public velocity: Vector2D;

  constructor({ position, velocity }: BulletConfig) {
    this.position = position;
    this.velocity = velocity;
    this.radius = 5;
  }

  public draw(context: CanvasRenderingContext2D): void {
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

  public update(context: CanvasRenderingContext2D): void {
    this.draw(context);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
