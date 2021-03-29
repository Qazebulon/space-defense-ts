import { Player } from './player/player';
import { Enemy } from './enemies/enemy';
import { Menu } from "./utility/menu";

const canvas = document.querySelector('canvas');
const context = canvas!.getContext('2d');
canvas!.width = innerWidth;
canvas!.height = innerHeight;
const centerX = canvas!.width / 2;
const centerY = canvas!.height / 2;

let player: Player;
let animationId: number;
const menu = new Menu(startGame);

const upgradeSizeBtn: any = document.querySelector('#upgradeSizeBtn');
const upgradeVelocityBtn: any = document.querySelector('#upgradeVelocityBtn');
const upgradeROFBtn: any = document.querySelector('#upgradeROFBtn');

// Upgrades Test
upgradeSizeBtn.addEventListener('click', () => {
    player.score.value -= 100 * player.blaster.ammo.level.size;
    player.blaster.ammo.level.size++;
    player.blaster.ammo.radius++;
});
upgradeVelocityBtn.addEventListener('click', () => {
    player.score.value -= 100 * player.blaster.ammo.level.velocity;
    player.blaster.ammo.level.velocity++;
    player.blaster.ammo.velocity++;
});
upgradeROFBtn.addEventListener('click', () => {
    player.score.value -= 100 * player.blaster.ammo.level.rateOfFire;
    player.blaster.ammo.level.rateOfFire++;
    player.blaster.ammo.coolDown -= 50;
});

function startGame() {
	Enemy.clearEnemies();
	player = Player.newPlayer(centerX, centerY, context);
    animate();
    Enemy.spawnEnemies(centerX, centerY, context?.canvas);
}

function animate() {
	animationId = requestAnimationFrame(animate);
	context!.fillStyle = 'rgba(0, 0, 0, 0.3)';
	context!.fillRect(0, 0, canvas!.width, canvas!.height);

    // Update Player
	player.draw();

    // Update Projectiles
    player.score.decreaseScore(player.blaster.updateProjectiles(canvas!.width, canvas!.height));

	// Update Enemies
    if (Enemy.updateEnemies(context, player)){
        // Game Over
        cancelAnimationFrame(animationId);
        clearInterval(Enemy.spawnIntervalId);
		menu.show(player.score.value);
    }

    if (player.score.value > 100 * player.blaster.ammo.level.size) {
        setTimeout(() => upgradeSizeBtn.style.display = 'flex', 0);
    } else {
        setTimeout(() => upgradeSizeBtn.style.display = 'none', 0);
    }
    if (player.score.value > 100 * player.blaster.ammo.level.velocity) {
        setTimeout(() => upgradeVelocityBtn.style.display = 'flex', 0);
    } else {
        setTimeout(() => upgradeVelocityBtn.style.display = 'none', 0);
    }
    if (player.score.value > 100 * player.blaster.ammo.level.rateOfFire) {
        setTimeout(() => upgradeROFBtn.style.display = 'flex', 0);
    } else {
        setTimeout(() => upgradeROFBtn.style.display = 'none', 0);
    }

}



