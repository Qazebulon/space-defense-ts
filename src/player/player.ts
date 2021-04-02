import { Blaster } from './blaster';
import { Points } from './points';

const upgradeSizeBtn: any = document.querySelector('#upgradeSizeBtn');
const upgradeSizeLevelEl: any = document.querySelector('#upgradeSizeLevelEl');
const upgradeSizeCostEl: any = document.querySelector('#upgradeSizeCostEl');
// const upgradeVelocityBtn: any = document.querySelector('#upgradeVelocityBtn');
// const upgradeVelocityLevelEl: any = document.querySelector('#upgradeVelocityLevelEl');
// const upgradeVelocityCostEl: any = document.querySelector('#upgradeVelocityCostEl');
const upgradeROFBtn: any = document.querySelector('#upgradeROFBtn');
const upgradeROFLevelEl: any = document.querySelector('#upgradeROFLevelEl');
const upgradeROFCostEl: any = document.querySelector('#upgradeROFCostEl');
// const upgradeColorBtn: any = document.querySelector('#upgradeColorBtn');
// const upgradeColorLevelEl: any = document.querySelector('#upgradeColorLevelEl');
// const upgradeColorCostEl: any = document.querySelector('#upgradeColorCostEl');

let upgradeSizeAvailable = false;
// let upgradeVelocityAvailable = false;
let upgradeROFAvailable = false;
// let upgradeColorAvailable = false;
export class Player {
	blaster: Blaster;
	points: Points;
	constructor(context: any, x: number, y: number, radius: number) {
		const vector = { x: x, y: y, dx: 0, dy: 0 };
		this.blaster = new Blaster(context, vector, radius);
		this.points = new Points();
		upgradeSizeBtn.addEventListener('click', () => this.upgradeSize());
		// upgradeVelocityBtn.addEventListener('click', () => this.upgradeVelocity());
		upgradeROFBtn.addEventListener('click', () => this.upgradeROF());
	}
	update(boundW: number, boundH: number) {
		// Update Blaster
		this.blaster.draw();

		// Update Projectiles
		this.points.decreasePoints(this.blaster.updateProjectiles(boundW, boundH));

		// Update Upgrades UI
		const ammo = this.blaster.ammo;
		// Update Upgrade Size button UI
		if (this.points.value > ammo.size.cost * ammo.size.level && ammo.size.level < ammo.size.max) {
			if (!upgradeSizeAvailable) {
				// Update UI: Disabled -> Enabled
				setTimeout(() => (upgradeSizeBtn.style.display = 'flex'), 0);
				upgradeSizeAvailable = true;
			}
		} else {
			if (upgradeSizeAvailable) {
				// Update UI: Enabled -> Disabled
				setTimeout(() => (upgradeSizeBtn.style.display = 'none'), 0);
				upgradeSizeAvailable = false;
			}
		}
		// Update Upgrade ROF button UI
		if (this.points.value > ammo.coolDown.cost * ammo.coolDown.level && ammo.coolDown.level < ammo.coolDown.max) {
			if (!upgradeROFAvailable) {
				// Update UI: Disabled -> Enabled
				setTimeout(() => (upgradeROFBtn.style.display = 'flex'), 0);
				upgradeROFAvailable = true;
			}
		} else {
			if (upgradeROFAvailable) {
				// Update UI: Enabled -> Disabled
				setTimeout(() => (upgradeROFBtn.style.display = 'none'), 0);
				upgradeROFAvailable = false;
			}
		}
	}

	attemptUpgradeSize() {
		const ammo = this.blaster.ammo;
		if (this.points.value > ammo.size.cost * ammo.size.level && ammo.size.level < ammo.size.max) {
			this.upgradeSize();
		}
	}
	upgradeSize() {
		this.points.value -= this.blaster.ammo.size.cost * this.blaster.ammo.size.level;
		this.blaster.ammo.size.level++;
		this.blaster.ammo.size.value++;
		upgradeSizeLevelEl.innerHTML = this.blaster.ammo.size.level + 1;
		upgradeSizeCostEl.innerHTML = this.blaster.ammo.size.cost * this.blaster.ammo.size.level;
		//Freebee
		this.upgradeVelocity();
	}

	upgradeVelocity() {
		// this.points.value -= this.blaster.ammo.velocity.cost * this.blaster.ammo.velocity.level;
		this.blaster.ammo.velocity.level += 1;
		this.blaster.ammo.velocity.value++;
	}

	attemptUpgradeROF() {
		const ammo = this.blaster.ammo;
		if (this.points.value > ammo.coolDown.cost * ammo.coolDown.level && ammo.coolDown.level < ammo.coolDown.max) {
			this.upgradeROF();
		}
	}
	upgradeROF() {
		this.points.value -= this.blaster.ammo.coolDown.cost * this.blaster.ammo.coolDown.level;
		this.blaster.ammo.coolDown.level++;
		this.blaster.ammo.coolDown.value -= 50;
		upgradeROFLevelEl.innerHTML = this.blaster.ammo.coolDown.level + 1;
		upgradeROFCostEl.innerHTML = this.blaster.ammo.coolDown.cost * this.blaster.ammo.coolDown.level;
		//Freebee
		this.upgradeVelocity();
	}

	// // TODO: add this in later... maybe when basic upgrades are maxed?
	// upgradeColor() {
	// 	const ammo = this.blaster.ammo;
	// 	this.points.value -= ammo.color.cost * ammo.color.level * ammo.color.level;
	// 	ammo.color.level++;
	// 	ammo.color.value = this.blaster.colors[this.blaster.ammo.color.level];
	// 	upgradeColorLevelEl.innerHTML = this.blaster.ammo.color.level + 1;
	// 	upgradeColorCostEl.innerHTML = this.blaster.ammo.color.cost * this.blaster.ammo.color.level;
	// 	// //BETA
	// 	// ammo.size.level = 1;
	// 	// ammo.velocity.level = 2;
	// 	// ammo.coolDown.level = 1;
	// 	// ...
	// }
}
