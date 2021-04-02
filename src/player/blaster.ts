import { CanvasObject } from '../utility/canvasObject';
import type { Vector } from '../utility/types';
import { Projectile } from '../utility/projectile';
import type { Ammo } from './types';

export class Blaster extends CanvasObject {
	colors = ['black', 'red', 'orange', 'yellow', 'light-green', 'blue', 'purple', 'white'];
	isTriggerDown: boolean;
	isAmmoReady: boolean;
	ammo: Ammo;
	targetingVector: Vector;
	projectiles: Projectile[];
	constructor(context: any, vector: Vector, radius: number) {
		super(context, vector, radius, 'red');
		this.isTriggerDown = false;
		this.isAmmoReady = true;
		this.ammo = {
			size: {value: 5, cost: 45, level: 1, max: 30},
			velocity: {value: 5, cost: 20, level: 1, max: 20},
			coolDown: {value: 1000, cost: 75, level: 1, max: 19},
			color: {value: this.colors[1], cost: 1000, level: 1, max: 7}
		};
		this.targetingVector = {x:this.vector.x, y:this.vector.y, dx:0, dy:1};
		this.projectiles = [];

		// Projectile Control
		addEventListener('mousedown', () => {
			this.triggerDown();
		});
		addEventListener('mousemove', (event) => {
			this.targetChanged(event);
		});
		addEventListener('mouseup', () => {
			this.triggerUp();
		});
	}

	draw(): void {
		this.context.beginPath();
		this.context.arc(this.vector.x, this.vector.y, this.radius, 0, Math.PI * 2, true);
		this.context.fillStyle = this.ammo.color.value;
		this.context.fill();
		// let img = new Image();
		// let x = this.vector.x;
		// let y = this.vector.y;
		// let d = this.radius * 4;
		// let o = d / 2;
		// let context = this.context;
		// img.src = './blaster.svg';
		// img.onload = function() {
		// 	context.drawImage(img, x - o, y - o, d, d);
		// };
	}


	triggerDown(): void {
		this.isTriggerDown = true;
		this.attemptToFireProjectile();
	}
	triggerUp(): void {
		this.isTriggerDown = false;
	}
	targetChanged(event: any): void {
		const angle = Math.atan2(event.clientY - this.vector.y, event.clientX - this.vector.x);
		this.targetingVector.dx = Math.cos(angle) * this.ammo.velocity.value;
		this.targetingVector.dy = Math.sin(angle) * this.ammo.velocity.value
	}
	attemptToFireProjectile() {
		if (this.isAmmoReady) {
			this.fireProjectile();
		}

		// Repeat?
		if (this.isTriggerDown) {
			setTimeout(() => {
				this.attemptToFireProjectile();
			}, 1);
		}
	}
	fireProjectile(): void {
		// Start coolDown timer
		this.isAmmoReady = false;
		setTimeout(() => (this.isAmmoReady = true), this.ammo.coolDown.value);

		// Add new projectile
		const projectileVector = {
			x: this.targetingVector.x,
			y: this.targetingVector.y,
			dx: this.targetingVector.dx,
			dy: this.targetingVector.dy,
		}
		const p = new Projectile(this.context, projectileVector, this.ammo.size.value, this.ammo.color.value);
		setTimeout(() => this.projectiles.push(p), 0);
	}

	updateProjectiles(boundX: number, boundY: number): number {
		let scoreLost = 0;
		// Update Projectiles
		this.projectiles.forEach((projectile, index) => {
			projectile.update();
			if (
				projectile.vector.x + projectile.radius < 0 ||
				projectile.vector.x > boundX + projectile.radius ||
				projectile.vector.y + projectile.radius < 0 ||
				projectile.vector.y > boundY + projectile.radius
			) {
				// remove projectile
				this.projectiles.splice(index, 1);
				scoreLost += projectile.radius;
			}
		});
		return scoreLost;
	}
}
