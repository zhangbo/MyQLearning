class Population {
	constructor(size) {
		this.players = [];
		this.gen = 1;
		for (var i = 0; i < size; i++) {
			this.players[i] = new Player();
		}
	}

	show() {
		for (var i = 0; i < this.players.length; i++) {
			this.players[i].showPlayer();
		}
	}
}