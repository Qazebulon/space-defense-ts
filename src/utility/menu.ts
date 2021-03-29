const modalEl: any = document.querySelector('#modalEl');
const modalScoreEl: any = document.querySelector('#modalScoreEl');
const startBtn: any = document.querySelector('#startBtn');

export class Menu {
	startGame: any;
	constructor(startGame: any) {
		this.startGame = startGame;
		startBtn!.addEventListener('click', () => this.hide());
	}
	show(score: number) {
		modalScoreEl!.innerHTML = score.toString();
		modalEl!.style.display = 'flex';
	}
	hide() {
		modalEl!.style.display = 'none';
		this.startGame();
	}
}
