import type { Player } from '../player/player';
import { Particle } from '../utility/particle';
import { gsap } from "gsap";

export class Enemy {
	static enemies: Enemy[] = [];
	static spawnInterval: number;
	static particles: Particle[] = [];
	x: number;
	y: number;
	radius: number;
	color: unknown;
	velocity: any;
	// context: any;
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

	////////////////////////////////////////

	static spawnEnemies(centerX: number, centerY: number, canvas: any): void {
		this.spawnInterval = setInterval(() => {
			this.spawnEnemy(centerX, centerY, canvas);
		}, 2000);
	}

	// TODO: revisit spawning rules...
	static spawnEnemy(centerX: number, centerY: number, canvas: any): void {
		const radius = Math.random() * 20 + 10;
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

	static clearEnemies() {
		clearInterval(this.spawnInterval);
		this.enemies = [];
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
					const numberOfParticles = Math.random() * enemy.radius;
					for (let i = 0; i < numberOfParticles; i++) {
						const particleSize = Math.random() * projectile.radius;
						Enemy.particles.push(
							new Particle(
								projectile.x,
								projectile.y,
								particleSize,
								enemy.color,
								{
									x: (Math.random() - 0.5) * projectile.radius,
									y: (Math.random() - 0.5) * projectile.radius
								},
								context
							)
						);
					}
					if (enemy.radius > 10 + projectile.radius) {
						player.score.increaseScore(projectile.radius);
						gsap.to(enemy, {
							radius: enemy.radius - projectile.radius
						});
						setTimeout(() => {
							player.blaster.projectiles.splice(projectileIndex, 1);
						}, 0);
					} else {
						player.score.increaseScore(projectile.radius * 2);
						setTimeout(() => {
							Enemy.enemies.splice(index, 1);
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
