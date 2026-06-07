import { Vector2D } from "../state/reducer";

export interface PlayerConfig {
  position: Vector2D;
  velocity: Vector2D;
}

export class Player {
  public position: Vector2D;
  public rotation: number;
  public velocity: Vector2D;

  constructor({ position, velocity }: PlayerConfig) {
    this.position = position;
    this.velocity = velocity;
    this.rotation = 0;
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.save();

    context.translate(this.position.x, this.position.y);
    context.rotate(this.rotation);
    context.translate(-this.position.x, -this.position.y);

    context.beginPath();
    context.moveTo(this.position.x + 30, this.position.y);
    context.lineTo(this.position.x - 10, this.position.y - 10);
    context.lineTo(this.position.x - 10, this.position.y + 10);
    context.fillStyle = "red";
    context.strokeStyle = "red";
    context.fill();
    context.closePath();

    context.strokeStyle = "white";
    context.stroke();
    context.restore();
  }

  public update(context: CanvasRenderingContext2D): void {
    this.draw(context);
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
  }

  // Enforce an absolute vector coordinate list signature for collision calculations
  public getVertices(): Vector2D[] {
    const cos = Math.cos(this.rotation);
    const sin = Math.sin(this.rotation);

    return [
      {
        x: this.position.x + cos * 30 - sin * 0,
        y: this.position.y + sin * 30 + cos * 0,
      },
      {
        x: this.position.x + cos * -10 - sin * 10,
        y: this.position.y + sin * -10 + cos * 10,
      },
      {
        x: this.position.x + cos * -10 - sin * -10,
        y: this.position.y + sin * -10 + cos * -10,
      },
    ];
  }
}
