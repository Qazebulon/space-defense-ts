export class Player {
	x: number;
	y: number;
	radius: number;
	color: unknown;
	context: any;
	constructor(x: number, y: number, radius: number, color: unknown, context: any) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.context = context;
	}

	draw(): void {
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		this.context.fillStyle = this.color;
		this.context.fill();
	}
}
