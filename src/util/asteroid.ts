import { Vector2D } from "../state/reducer";

export interface AsteroidConfig {
  position: Vector2D;
  velocity: Vector2D;
  radius: number;
}

export class Asteroid {
  public position: Vector2D;
  public radius: number;
  public velocity: Vector2D;

  constructor({ position, velocity, radius }: AsteroidConfig) {
    this.position = position;
    this.velocity = velocity;
    this.radius = radius;
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
    context.strokeStyle = "white";
    context.fillStyle = "white";
    context.fill();
    context.stroke();
  }

  public update(context: CanvasRenderingContext2D): void {
    this.draw(context);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }
}
