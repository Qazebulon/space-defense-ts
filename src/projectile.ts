export class Projectile {
	x: number;
	y: number;
	radius: number;
	color: unknown;
	velocity: any;
	context: any;
	constructor(x: number, y: number, radius: number, color: string, velocity: any, context: any) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.velocity = velocity;
		this.context = context;
	}

	draw(): void {
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		this.context.fillStyle = this.color;
		this.context.fill();
	}

	update(): void {
		this.draw();
		this.x = this.x + this.velocity.x;
		this.y = this.y + this.velocity.y;
	}
}
