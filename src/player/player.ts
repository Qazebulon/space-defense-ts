import { Blaster } from './blaster';
import { Points } from './points';

export class Player {
	context: any;
	x: number;
	y: number;
	radius: number;
	blaster: Blaster;
	points: Points;
	constructor(x: number, y: number, radius: number, context: any) {
		this.context = context;
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.blaster = new Blaster(context, x, y);
		this.points = new Points();
	}

	draw(): void {
		// this.context.beginPath();
		// this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
		// this.context.fillStyle = this.blaster.ammo.color.value;
		// this.context.fill();

		let img = new Image();
		let x = this.x;
		let y = this.y;
		let d = this.radius * 4;
		let o = d / 2;
		let context = this.context;
		img.src = './base.svg';
		img.onload = function() {
			context.drawImage(img, x - o, y - o, d, d);
		};
	}

	static newPlayer(centerX: number, centerY: number, context: any): Player {
		return new Player(centerX, centerY, 30, context);
	}
}
