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
const upgradeColorBtn: any = document.querySelector('#upgradeColorBtn');

// Upgrades Test
upgradeSizeBtn.addEventListener('click', () => upgradeSize());
upgradeVelocityBtn.addEventListener('click', () => upgradeVelocity());
upgradeROFBtn.addEventListener('click', () => upgradeROF());
let upgradeSizeAvailable = false;
let upgradeVelocityAvailable = false;
let upgradeROFAvailable = false;
let upgradeColorAvailable = false;
let pause = false;
addEventListener('keydown', (e) => {
    // console.log('keydown event', e);
    if(e.code == "KeyA" && upgradeSizeAvailable){
        upgradeSize();
    }else if(e.code == "KeyS" && upgradeVelocityAvailable){
        upgradeVelocity();
    } else if(e.code == "KeyD" && upgradeROFAvailable){
        upgradeROF();
    } else if(e.code == "KeyF" && upgradeColorAvailable){
        upgradeColor();
    } else if(e.code == "Space") {
        player.blaster.attemptToFireProjectile();
    } else if(e.code == "Escape") {
        if(pause){
            pause = false;
            animate();
            Enemy.spawnEnemies(centerX, centerY, context?.canvas);
        } else {
            pause = true;
            cancelAnimationFrame(animationId);
            clearInterval(Enemy.spawnIntervalId);
        }
    } else {
        console.log(e.code);
    }
})

function upgradeSize() {
    player.points.value -= player.blaster.ammo.size.cost * player.blaster.ammo.size.level;
    player.blaster.ammo.size.level++;
    player.blaster.ammo.size.value++;
}
function upgradeVelocity() {
    player.points.value -= player.blaster.ammo.velocity.cost * player.blaster.ammo.velocity.level;
    player.blaster.ammo.velocity.level += 1;
    player.blaster.ammo.velocity.value++;
}
function upgradeROF() {
    player.points.value -= player.blaster.ammo.coolDown.cost * player.blaster.ammo.coolDown.level;
    player.blaster.ammo.coolDown.level++;
    player.blaster.ammo.coolDown.value -= 50;
}
function upgradeColor() {
    const ammo = player.blaster.ammo;
    player.points.value -= ammo.color.cost * ammo.color.level * ammo.color.level;
    ammo.color.level++;
    ammo.color.value = player.blaster.colors[player.blaster.ammo.color.level];
    // //BETA
    // ammo.size.level = 1;
    // ammo.velocity.level = 2;
    // ammo.coolDown.level = 1;
    // ...
}

function startGame() {
    Enemy.wave = 1;
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
    player.points.decreasePoints(player.blaster.updateProjectiles(canvas!.width, canvas!.height));

	// Update Enemies
    if (Enemy.updateEnemies(context, player)){
        // Game Over
        cancelAnimationFrame(animationId);
        clearInterval(Enemy.spawnIntervalId);
		menu.show(Enemy.wave);
    }

    const ammo = player.blaster.ammo;
    upgradeSizeAvailable = (player.points.value > ammo.size.cost * ammo.size.level) && ammo.size.level < ammo.size.max;
    upgradeVelocityAvailable = false; // (player.points.value > ammo.velocity.cost * ammo.velocity.level) && ammo.velocity.level < ammo.velocity.max;
    upgradeROFAvailable = (player.points.value > ammo.coolDown.cost * ammo.coolDown.level) && ammo.coolDown.level < ammo.coolDown.max;
    upgradeColorAvailable = (player.points.value > ammo.color.cost * ammo.color.level) && ammo.color.level < ammo.color.max;
    if (upgradeSizeAvailable) {
        setTimeout(() => upgradeSizeBtn.style.display = 'flex', 0);
    } else {
        setTimeout(() => upgradeSizeBtn.style.display = 'none', 0);
    }
    if (upgradeVelocityAvailable) {
        setTimeout(() => upgradeVelocityBtn.style.display = 'flex', 0);
    } else {
        setTimeout(() => upgradeVelocityBtn.style.display = 'none', 0);
    }
    if (upgradeROFAvailable) {
        setTimeout(() => upgradeROFBtn.style.display = 'flex', 0);
    } else {
        setTimeout(() => upgradeROFBtn.style.display = 'none', 0);
    }
    if (upgradeColorAvailable) {
        setTimeout(() => upgradeColorBtn.style.display = 'flex', 0);
    } else {
        setTimeout(() => upgradeColorBtn.style.display = 'none', 0);
    }

}



