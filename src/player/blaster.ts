import { Projectile } from '../utility/projectile';
import type { Ammo } from './ammo';

export class Blaster {
	context: any;
	x: number;
	y: number;
	isTriggerDown: boolean;
    isAmmoReady: boolean;
    ammo: Ammo;
	velocity: number;
	pointVelocity: any;
	projectiles: Projectile[];
	constructor(context: any, x: number, y: number) {
		this.context = context;
		this.x = x;
		this.y = y;
		this.isTriggerDown = false;
        this.isAmmoReady = true;
        this.ammo = {
            name: "standard",
            radius: 5,
            color: 'red',
            velocity: 5,
            coolDown: 500,
            count: 1,
            angle: 0
        }
		this.velocity = 5;
		this.pointVelocity = { x: 0, y: 5 };
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

	triggerDown(): void {
        this.isTriggerDown = true;
        this.attemptToFireProjectile();
	}
	triggerUp(): void {
		this.isTriggerDown = false;
	}
	targetChanged(event: any): void {
		const angle = Math.atan2(event.clientY - this.y, event.clientX - this.x);
		this.pointVelocity = {
			x: Math.cos(angle) * this.velocity,
			y: Math.sin(angle) * this.velocity
		};
	}
    attemptToFireProjectile() {
        if(this.isAmmoReady){
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
        setTimeout(() => this.isAmmoReady = true, this.ammo.coolDown);

        // Add new projectile
        const p = new Projectile(this.x, this.y, this.ammo.radius, this.ammo.color, this.pointVelocity, this.context);
		setTimeout(() => this.projectiles.push(p), 0);
	}
    checkUpgrade(score: number): void {
        console.log('upgrade?');
    }

	updateProjectiles(boundX: number, boundY: number): number {
		let scoreLost = 0;
		// Update Projectiles
		this.projectiles.forEach((projectile, index) => {
			projectile.update();
			if (
				projectile.x + projectile.radius < 0 ||
				projectile.x > boundX + projectile.radius ||
				projectile.y + projectile.radius < 0 ||
				projectile.y > boundY + projectile.radius
			) {
				// remove projectile
				this.projectiles.splice(index, 1);
				scoreLost += projectile.radius;
			}
		});
		return scoreLost;
	}
}
