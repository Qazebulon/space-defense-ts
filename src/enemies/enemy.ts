import type { Player } from '../player/player';
import { Particle } from '../utility/particle';
import { gsap } from "gsap";

const MINIMUM_ENEMY_SIZE = 10;
const waveEl: any = document.querySelector('#waveEl');
export class Enemy {
	static enemies: Enemy[] = [];
	static spawnIntervalId: number;
	static spawnInterval = 3000;
	static totalCreated = 0;
	static deltaCreated = 0;
	static wave = 1;
	static particles: Particle[] = [];
	x: number;
	y: number;
	radius: number;
	color: unknown;
	velocity: any;
	number: number;
	// context: any; // TODO: switch back to having context here...
	constructor(x: number, y: number, radius: number, color: string, velocity: any) {
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.velocity = velocity;
		this.number = Enemy.totalCreated++;
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

	remove(index: number): void {
		if(Enemy.enemies[index]?.number == this.number){
			Enemy.enemies.splice(index, 1);
		}
	}

	////////////////////////////////////////

	static spawnEnemies(centerX: number, centerY: number, canvas: any): void {
		Enemy.spawnIntervalId = setInterval(() => {
			this.spawnEnemy(centerX, centerY, canvas);
		}, Enemy.spawnInterval);
	}

	// TODO: revisit spawning rules...
	static spawnEnemy(centerX: number, centerY: number, canvas: any): void {
		Enemy.deltaCreated++;
		const radius = Math.random() * (3 * Enemy.wave) + (4 * Enemy.wave) + 15;
		const velocityScaler = Math.random() * 0.25 + (0.3 * Enemy.wave) + 0.25;
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
		Enemy.enemies.push(new Enemy(x, y, radius, color, velocity));
		if(Enemy.deltaCreated > 10) {
			Enemy.deltaCreated = 0;
			Enemy.wave++;
			waveEl!.innerHTML = this.wave.toString();
			Enemy.spawnInterval -= 10; // TODO: handle underflow at some point...
			clearInterval(Enemy.spawnIntervalId);
			Enemy.spawnEnemies(centerX, centerY, canvas);
		}
	}

	static clearEnemies() {
		clearInterval(Enemy.spawnIntervalId);
		Enemy.enemies = [];
		Enemy.spawnInterval = 3000;
		Enemy.totalCreated = 0;
		Enemy.deltaCreated = 0;
		Enemy.wave = 1;
		waveEl!.innerHTML = this.wave.toString();
		Enemy.particles = [];
	}

	// Was working here...
	static updateEnemies(context: any, player: Player): boolean {
		let gameOver = false;
		// Update Enemies
		Enemy.enemies.forEach((enemy, index) => {
			enemy.update(context);
			const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
			if (dist < enemy.radius + player.radius) {
				gameOver = true;
			}
			// Handle enemy hit
			player.blaster.projectiles.forEach((projectile, projectileIndex) => {
				const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
				if (dist < enemy.radius + projectile.radius) {
					// Hit
					const numberOfParticles = Math.random() * enemy.radius / 2 + projectile.radius / 2;
					for (let i = 0; i < numberOfParticles; i++) {
						let particleSize;
						if(Math.random() > 0.3){
							particleSize = Math.random() * projectile.radius / 2;
						} else {
							particleSize = Math.random() * projectile.radius;
						}
						Enemy.particles.push(
							new Particle(
								projectile.x,
								projectile.y,
								particleSize,
								'yellow',
								{
									x: (Math.random() - 0.5) * projectile.radius,
									y: (Math.random() - 0.5) * projectile.radius
								},
								context
							)
						);
					}
					const damage = projectile.radius * player.blaster.ammo.color.level;
					if (enemy.radius > MINIMUM_ENEMY_SIZE + damage) {
						player.points.increasePoints(damage);
						gsap.to(enemy, {
							radius: enemy.radius - damage
						});
						setTimeout(() => {
							player.blaster.projectiles.splice(projectileIndex, 1);
						}, 0);
					} else {
						player.points.increasePoints(damage * 5);
						setTimeout(() => {
							enemy.remove(index);
							player.blaster.projectiles.splice(projectileIndex, 1);
						}, 0);
					}
				}
			});
			// Update particles
			Enemy.particles.forEach((particle, particleIndex) => {
				if (particle.alpha <= 0) {
					Enemy.particles.splice(particleIndex, 1);
				} else {
					particle.update();
				}
			});
		});
		return gameOver;
	}
}
