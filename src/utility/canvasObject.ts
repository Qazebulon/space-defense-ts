import type { Vector } from "./types";

export class CanvasObject {
	context: any;
	vector: Vector;
	radius: number;
	color: unknown;
	constructor(context: any, vector: Vector, radius: number, color: string) {
		this.context = context;
		this.radius = radius;
		this.color = color;
		this.vector = vector;
	}

	draw(): void {
		this.context.beginPath();
		this.context.arc(this.vector.x, this.vector.y, this.radius, 0, Math.PI * 2, true);
		this.context.fillStyle = this.color;
		this.context.fill();
	}

	update(): void {
		this.draw();
		this.vector.x = this.vector.x + this.vector.dx;
		this.vector.y = this.vector.y + this.vector.dy;
	}
}
