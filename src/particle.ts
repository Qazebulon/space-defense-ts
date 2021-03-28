export class Particle {
	static friction = 0.99;
	x: number;
	y: number;
	radius: number;
	color: unknown;
	velocity: any;
	alpha: number;
	context: any;
	constructor(x: number, y: number, radius: number, color: unknown, velocity: any, context: any) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.velocity = velocity;
		this.alpha = 1;
		this.context = context;
	}

	draw(): void {
		this.context.save();
		this.context.globalAlpha = this.alpha;
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		this.context.fillStyle = this.color;
		this.context.fill();
		this.context.restore();
	}

	update(): void {
		this.draw();
		this.velocity.x *= Particle.friction;
		this.velocity.y *= Particle.friction;
		this.x = this.x + this.velocity.x;
		this.y = this.y + this.velocity.y;
		this.alpha -= 0.05;
	}
}
