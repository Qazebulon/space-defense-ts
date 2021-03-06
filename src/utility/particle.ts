import { CanvasObject } from "./canvasObject";
import type { Vector } from "./types";

export class Particle extends CanvasObject {
	static friction = 0.99;
	alpha: number;
	constructor(context: any, vector: Vector, radius: number, color: string) {
		super(context, vector, radius, color);
		this.alpha = 1;
	}

	draw(): void {
		this.context.save();
		this.context.globalAlpha = this.alpha;
		this.context.beginPath();
		this.context.arc(this.vector.x, this.vector.y, this.radius, 0, Math.PI * 2, true);
		this.context.fillStyle = this.color;
		this.context.fill();
		this.context.restore();
	}

	update(): void {
		this.draw();
		this.vector.dx *= Particle.friction;
		this.vector.dy *= Particle.friction;
		this.vector.x = this.vector.x + this.vector.dx;
		this.vector.y = this.vector.y + this.vector.dy;
		this.alpha -= 0.05;
	}
}
