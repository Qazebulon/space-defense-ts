const scoreEl: any = document.querySelector('#scoreEl');
const upgradeSizeBtn: any = document.querySelector('#upgradeSizeBtn');
const upgradeVelocityBtn: any = document.querySelector('#upgradeVelocityBtn');
const upgradeROFBtn: any = document.querySelector('#upgradeROFBtn');

export class Score {
	value: number;
	constructor() {
		this.value = 0;
		scoreEl!.innerHTML = '0';
	}
	clearScore() {
		this.value = 0;
		this.updateScore();
	}
	increaseScore(delta: number) {
		this.value += delta;
		this.updateScore();
	}
	decreaseScore(delta: number) {
		this.value -= delta;
		if (this.value < 0) {
			this.value = 0;
		}
		this.updateScore();
	}
	updateScore() {
		scoreEl!.innerHTML = this.value.toString();
	}
}
