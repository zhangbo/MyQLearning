class Player {
    constructor(posX, posXC, prevX, posY, posYC, prevY, alive) {
        this.posX = posX;
        this.posXC = posXC;
        this.prevX = prevX;
        this.posY = posY;
        this.posYC = posYC;
        this.prevY = prevY;
        this.alive = alive;
        this.isBest = false;
        this.isHuman = true;
        this.reachedGoal = false;
        this.fitness = 0;
        this.brain = new Brain(100);
    }

    movePlayerX() {
        if (!this.isHuman) {
            if (this.brain.directions.length > this.brain.step) {
                this.posXC = this.brain.directions[this.brain.step].x;
            } else {
                this.alive = false;
            }
        }
        this.posX += this.posXC;
        this.posXC = 0;
    }

    movePlayerY() {
        if (!this.isHuman) {
            if (this.brain.directions.length > this.brain.step) {
                this.posYC = this.brain.directions[this.brain.step].y;
            } else {
                this.alive = false;
            }
        }
        this.posY += this.posYC
        this.posYC = 0;
    }

    showPlayer() {
        rectMode(CENTER);
        strokeWeight(5);
        fill(255, 0, 0);
        rect(this.posX, this.posY, 30, 30);
        rectMode(CORNER);
    }

    calculateFitness() {
        if (this.reachedGoal) {
            this.fitness = 1.0 / 16.0 + 10000.0 / (this.brain.step * this.brain.step);
        } else { //if the dot didn't reach the goal then the fitness is based on how close it is to the goal

        }
    }

    update() {
        if (this.alive || !this.reachedGoal) {
            if (checkForWallCollisions(this.posX + this.posXC, this.posY)) {
                this.movePlayerX();
            }
            if (checkForWallCollisions(this.posX, this.posY + this.posYC)) {
                this.movePlayerY();
            }
            this.brain.step++;
        }
    }

    clone() {
        var p = new Player(this.posX, this.posXC, this.prevX, this.posY, this.posYC, this.prevY, this.alive);
        p.brain = this.brain.clone();
        return p;
    }
}