class Brain {
	constructor(size) {
		this.size = size;
		this.directions = [];
		this.step = 0;
		this.randomized(this.size);
	}

	randomized(size) {
		for (var i = 0; i < size; i++) {
			this.directions[i] = this.getRandomDirection();
		}
		console.log(this.directions);
	}

	getRandomDirection() {
		var number = Math.floor(Math.random() * 9);
		switch(number) {
			case 0:
				return createVector(0, 2);
			case 1:
				return createVector(2, 2);
			case 2:
				return createVector(2, 0);
			case 3:
				return createVector(2, -2);
			case 4:
				return createVector(0, -2);
			case 5:
				return createVector(-2, -2);
			case 6:
				return createVector(-2, 0);
			case 7:
				return createVector(-2, 2);
			case 8:
				return createVector(0, 0);
		}
	}

	clone() {
	    var clone = new Brain(this.directions.length);
	    for (var i = 0; i < this.directions.length; i++) {
	    	clone.directions[i] = this.directions[i].copy();
	    }
		return clone;
	}

	mutate(died, deathStep) {
		for (var i = 0; i < this.directions.length; i++) {
			var rand = Math.random(1);
			if (died && i > deathStep - 10) {
				rand = Math.random(0.2);
			}
			if (rand < 0.01) {
				this.directions[i] = this.getRandomDirection();
			}
		}
	}

	increaseMoves() {
		for (var i = 0; i < 5; i++) {
			this.directions.push(this.getRandomDirection());
		}
	}
}