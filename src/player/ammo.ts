export type AmmoType = {
	name: string;
	level: {
		size: number;
		velocity: number;
		rateOfFire: number;
	};
	radius: number;
	color: any;
	velocity: any;
	coolDown: number;
	// count: number;
	// angle: number;
};

// export enum standard {
// 	name = 'standard',
// 	level = {radius = 1, velocity = 1, cooldown = 1},
// 	radius = 5, // upgrade +1 for 100 points per level?
// 	color = 'red', // changes every 5 upgrades?
// 	velocity = 5, // upgrade +1 for 100 points per level?
// 	coolDown = 500 // upgrade -10 for 100 points per level?
// }

// export enum laser {
// 	name = 'laser',
// 	// level = 1,
// 	radius = 1,
// 	color = 'red',
// 	velocity = 20,
// 	coolDown = 50
// }

// export enum cannon {
// 	name = 'cannon',
// 	// level = 1,
// 	radius = 25,
// 	color = 'red',
// 	velocity = 2,
// 	coolDown = 1000
// }
