class Population {
	constructor(size) {
		this.players = [];
		this.gen = 1;
		this.bestPlayerIdx = 0;
		this.bestPlayerMinStep = 10000;
		this.solutionFound = false;
		for (var i = 0; i < size; i++) {
			this.players[i] = new Player(startPositionX, 0, 0, startPositionY, 0, 0, true);
			this.players[i].isHuman = false;
		}
	}

	show() {
		for (var i = 0; i < this.players.length; i++) {
			this.players[i].showPlayer();
		}
	}

	update() {
		for (var i = 0; i < this.players.length; i++) {
			if (this.players[i].brain.step > this.bestPlayerMinStep) {
				this.players[i].alive = false;
			} else {
				this.players[i].update();
			}
		}
	}

	mutateAllPlayers() {
		for (var i = 1; i < this.players.length; i++) {
			this.players[i].brain.mutate(this.players[i].deathByDot, this.players[i].deathAtStep);
			this.players[i].deathByDot = false;
			this.players[i].gen = this.gen;
		}
		this.players[0].deathByDot = false;
		this.players[0].gen = this.gen;
	}

	increaseMoves() {
		if (this.players[0].brain.directions.length < 120 && !this.solutionFound) {
			for (var i = 0; i < this.players.length; i++) {
				this.players[i].brain.increaseMoves();
			}
		}
	}

	allPlayersDead() {
		for (var i = 0; i < this.players.length; i++) {
			if (!this.players[i].dead && !this.players[i].reachedGoal) {
				return false;
			}
		}
		return true;
	}

	//calculate all the fitnesses
	calculateFitness() {
		for (var i = 0; i < this.players.length; i++) {
			this.players[i].calculateFitness();
		}
	}
}