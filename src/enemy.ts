export class Enemy {
	static enemies: Enemy[] = [];
	static spawnInterval: number;
	x: number;
	y: number;
	radius: number;
	color: unknown;
	velocity: any;
	context: any;
	constructor(x: number, y: number, radius: number, color: string, velocity: any) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.velocity = velocity;
	}

	draw(context: any): void {
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		context.fillStyle = this.color;
		context.fill();
	}

	update(context: any): void {
		this.draw(context);
		this.x = this.x + this.velocity.x;
		this.y = this.y + this.velocity.y;
	}

	public static spawnEnemies(centerX: number, centerY: number, canvas: any): void {
		this.spawnInterval = setInterval(() => {
			this.spawnEnemy(centerX, centerY, canvas);
		}, 2000);
	}

	public static spawnEnemy(centerX: number, centerY: number, canvas: any): void {
		const radius = Math.random() * 30 + 10;
		const velocityScaler = Math.random() * 1 + 0.5;
		let x;
		let y;
		if (Math.random() < 0.5) {
			x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
			y = Math.random() * canvas.height;
		} else {
			x = Math.random() * canvas.width;
			y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
		}
		const color = 'green';
		const angle = Math.atan2(centerY - y, centerX - x);
		const velocity = {
			x: Math.cos(angle) * velocityScaler,
			y: Math.sin(angle) * velocityScaler
		};
		this.enemies.push(new Enemy(x, y, radius, color, velocity));
	}

	public static clearEnemies() {
		clearInterval(this.spawnInterval);
		this.enemies = [];
	}
}
