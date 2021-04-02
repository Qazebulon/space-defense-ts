import { Player } from './player/player';
import { Enemy } from './enemies/enemy';
import { Menu } from './utility/menu';

const canvas = document.querySelector('canvas');
const context = canvas!.getContext('2d');
canvas!.width = innerWidth;
canvas!.height = innerHeight;
const centerX = canvas!.width / 2;
const centerY = canvas!.height / 2;

const menu = new Menu(startGame);
let player: Player;
let animationId: number;
let pause = false;

// Initialize New Game
function startGame() {
	Enemy.wave = 1;
	Enemy.clearEnemies();
	player = new Player(context, centerX, centerY, 30);
	animate();
	Enemy.spawnEnemies(centerX, centerY, context?.canvas);
}

// End Game
function endGame() {
	cancelAnimationFrame(animationId);
	clearInterval(Enemy.spawnIntervalId);
	menu.show(Enemy.wave);
}

// Main Game Loop
function animate() {
	// Get animation frame reference for starting and stopping animations
	animationId = requestAnimationFrame(animate);

	// Apply Fade / Cleanup
	context!.fillStyle = 'rgba(0, 0, 0, 0.3)';
	context!.fillRect(0, 0, canvas!.width, canvas!.height);

	// Update Player (blaster and projectiles)
	player.update(canvas!.width, canvas!.height);

	// Update Enemies
	Enemy.updateEnemies(context, player, endGame);
}

// Keyboard Input
addEventListener('keydown', (e) => {
    switch(e.code) {
        case "KeyA": {
            player.attemptUpgradeSize();
            break;
        }
        case "KeyD": {
            player.attemptUpgradeROF();
            break;
        }
        case "Space": {
		    player.blaster.attemptToFireProjectile();
            break;
        }
        case "Escape": {
		    if(pause){
		        pause = false;
		        animate();
		        Enemy.spawnEnemies(centerX, centerY, context?.canvas);
		    } else {
		        pause = true;
		        cancelAnimationFrame(animationId);
		        clearInterval(Enemy.spawnIntervalId);
		    }
            break;
        }
        default: {
            console.log(e.code);
        }
    }
});