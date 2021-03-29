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
		menu.show(player.score.score);
    }
}



