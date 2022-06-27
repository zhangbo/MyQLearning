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
        this.deathByDot = false;
        this.deathAtStep = 0;
        this.brain = new Brain(10);
    }

    movePlayerX() {
        if (!this.isHuman) {
            if (this.brain.directions.length > this.brain.step) {
                this.posXC = this.brain.directions[this.brain.step].x;
            } else {
                this.alive = false;
            }
        }
        if (checkForWallCollisions(this.posX + this.posXC, this.posY)) {
            this.posX += this.posXC;        
        }
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
        if (checkForWallCollisions(this.posX, this.posY + this.posYC)) {
             this.posY += this.posYC;   
        }
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
            var estimatedDistance = 0.0;//the estimated distance of the path from the player to the goal
    for (var i = this.nodes.length-1; i>=0; i--) {
      if (!this.nodes[i].reached) {
        estimatedDistance = this.nodes[i].distToFinish;
        estimatedDistance += dist(this.pos.x, this.pos.y, this.nodes[i].pos.x, this.nodes[i].pos.y);
      }
    }
    if (this.deathByDot) {
      estimatedDistance *= 0.9;
        }
    }

    update() {
        if (!checkForEnemyCollisions(this)) {
            this.alive = false;
            this.deathByDot = true;
            this.deathAtStep = this.brain.step;
        }
        if (this.alive && !this.reachedGoal) {
            this.movePlayerX();
            this.movePlayerY();
            this.brain.step++;
        }
    }

    clone() {
        var p = new Player(this.posX, this.posXC, this.prevX, this.posY, this.posYC, this.prevY, this.alive);
        p.brain = this.brain.clone();
        p.deathAtStep = this.deathAtStep;
        p.deathByDot = this.deathByDot;
        return p;
    }
}