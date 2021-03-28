import { gsap } from "gsap";
import { Player } from './player';
import { Projectile } from './projectile';
import { Enemy } from './enemy';
import { Particle } from './particle';

const canvas = document.querySelector('canvas');
const context = canvas!.getContext('2d');
canvas!.width = innerWidth;
canvas!.height = innerHeight;
const centerX = canvas!.width / 2;
const centerY = canvas!.height / 2;
const scoreEl: any = document.querySelector('#scoreEl');
const startBtn: any = document.querySelector('#startBtn');
const modalEl: any = document.querySelector('#modalEl');
const modalScoreEl: any = document.querySelector('#modalScoreEl');

console.log('sc', context);

let player: Player;
let projectiles: Projectile[];
let particles: Particle[];
let animationId: number;
let score: number;
let fireControlEnabled = false;

function init() {
	player = new Player(centerX, centerY, 30, 'blue', context);
	projectiles = [];
	Enemy.clearEnemies();
	particles = [];
	score = 0;
	scoreEl!.innerHTML = score.toString();
	fireControlEnabled = false;
}

function animate() {
	animationId = requestAnimationFrame(animate);
	context!.fillStyle = 'rgba(0, 0, 0, 0.3)';
	context!.fillRect(0, 0, canvas!.width, canvas!.height);
	player.draw();
	// Update Projectiles
	projectiles.forEach((projectile, index) => {
		projectile.update();
		// remove projectiles
		if (
			projectile.x + projectile.radius < 0 ||
			projectile.x > canvas!.width + projectile.radius ||
			projectile.y + projectile.radius < 0 ||
			projectile.y > canvas!.height + projectile.radius
		) {
			score -= projectile.radius;
			if (score < 0) {
				score = 0;
			}
			scoreEl!.innerHTML = score.toString();
			projectiles.splice(index, 1);
		}
	});

	// Update Enemies
	Enemy.enemies.forEach((enemy, index) => {
		enemy.update(context);
		const dist = Math.hypot(player.x - enemy.x, player.y - enemy.y);
		if (dist < enemy.radius + player.radius) {
			cancelAnimationFrame(animationId);
			modalScoreEl!.innerHTML = score.toString();
			modalEl!.style.display = 'flex';
		}
			// Handle enemy hit
			projectiles.forEach((projectile, projectileIndex) => {
				const dist = Math.hypot(projectile.x - enemy.x, projectile.y - enemy.y);
				if (dist < enemy.radius + projectile.radius) {
					// Hit
					const numberOfParticles = Math.random() * 10;
					for (let i = 0; i < numberOfParticles; i++) {
						const particleSize = Math.random() * 4;
						particles.push(
							new Particle(projectile.x, projectile.y, particleSize, enemy.color, {
								x: (Math.random() - 0.5) * 10,
								y: (Math.random() - 0.5) * 10
							}, context)
						);
					}
					if (enemy.radius > 10 + projectile.radius) {
						score += projectile.radius;
						scoreEl.innerHTML = score;
						gsap.to(enemy, {
							radius: enemy.radius - projectile.radius
						});
						setTimeout(() => {
							projectiles.splice(projectileIndex, 1);
						}, 0);
					} else {
						score += projectile.radius * 2;
						scoreEl.innerHTML = score;
						setTimeout(() => {
							Enemy.enemies.splice(index, 1);
							projectiles.splice(projectileIndex, 1);
						}, 0);
					}
				}
			});
	    });
	// Update particles
	particles.forEach((particle, particleIndex) => {
		if (particle.alpha <= 0) {
			particles.splice(particleIndex, 1);
		} else {
			particle.update();
		}
	});
}

startBtn!.addEventListener('click', () => {
	init();
	modalEl!.style.display = 'none';
	animate();
	Enemy.spawnEnemies(centerX, centerY, context?.canvas);
	fireControlEnabled = true;
});

// Projectile Control

let fire = false;
let pointOfAimVelocity: any;
addEventListener('mousedown', (event) => {
	if (fireControlEnabled) {
		fire = true;
		fireProjectile();
	}
});
addEventListener('mousemove', (event) => {
	const angle = Math.atan2(event.clientY - centerY, event.clientX - centerX);
	pointOfAimVelocity = {
		x: Math.cos(angle) * 5,
		y: Math.sin(angle) * 5
	};
});
addEventListener('mouseup', (event) => {
	fire = false;
});

function fireProjectile() {
	// Add new projectiles?
	if (fire) {
		setTimeout(() => {
			projectiles.push(new Projectile(centerX, centerY, 5, 'orange', pointOfAimVelocity, context));
		}, 0);
		setTimeout(() => {
			fireProjectile();
		}, 100);
	}
}
