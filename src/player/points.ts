const pointsEl: any = document.querySelector('#pointsEl');
const upgradeSizeBtn: any = document.querySelector('#upgradeSizeBtn');
const upgradeVelocityBtn: any = document.querySelector('#upgradeVelocityBtn');
const upgradeROFBtn: any = document.querySelector('#upgradeROFBtn');

export class Points {
	value: number;
	constructor() {
		this.value = 0;
		pointsEl!.innerHTML = '0';
	}
	clearPoints() {
		this.value = 0;
		this.updatePoints();
	}
	increasePoints(delta: number) {
		this.value += delta;
		this.updatePoints();
	}
	decreasePoints(delta: number) {
		this.value -= delta;
		if (this.value < 0) {
			this.value = 0;
		}
		this.updatePoints();
	}
	updatePoints() {
		pointsEl!.innerHTML = this.value.toString();
	}
}
