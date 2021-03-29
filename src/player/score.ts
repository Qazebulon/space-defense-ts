const scoreEl: any = document.querySelector('#scoreEl');

export class Score {
	score: number;
	constructor() {
		this.score = 0;
		scoreEl!.innerHTML = '0';
	}
	clearScore() {
		this.score = 0;
		this.updateScore();
	}
	increaseScore(delta: number) {
		this.score += delta;
		// if(this.score > 100){
		//     // player.blaster.ammo.coolDown -= 100;
		//     this.score = 0;
		// }
		this.updateScore();
	}
	decreaseScore(delta: number) {
		this.score -= delta;
		if (this.score < 0) {
			this.score = 0;
		}
		this.updateScore();
	}
	updateScore() {
		scoreEl!.innerHTML = this.score.toString();
	}
}
