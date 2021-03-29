import { Blaster } from './blaster';
import { Score } from './score';

export class Player {
	context: any;
	x: number;
	y: number;
	radius: number;
	color: unknown;
	blaster: Blaster;
	score: Score;
	constructor(x: number, y: number, radius: number, color: unknown, context: any) {
		this.context = context;
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.blaster = new Blaster(context, x, y);
		this.score = new Score();
	}

	draw(): void {
		this.context.beginPath();
		this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		this.context.fillStyle = this.color;
		this.context.fill();
	}

	static newPlayer(centerX: number, centerY: number, context: any): Player {
		return new Player(centerX, centerY, 30, 'blue', context);
	}
}
