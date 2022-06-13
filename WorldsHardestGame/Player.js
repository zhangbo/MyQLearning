class Player{
    constructor(posX, posXC, prevX, posY, posYC, prevY, alive){
        this.posX = posX;
        this.posXC = posXC;
        this.prevX = prevX;
        this.posY = posY;
        this.posYC = posYC;
        this.prevY = prevY;
        this.alive = alive;
        this.isBest = false;
        this.reachedGoal = false;
        this.fitness = 0;
        this.brain = new Brain(10);
    }

    movePlayerX(){
        player.posX += player.posXC;
        player.posXC = 0;
    }

    movePlayerY(){
        player.posY += player.posYC
        player.posYC = 0;
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
            this.fitness = 1.0/16.0 + 10000.0/(this.brain.step * this.brain.step);
        } else { //if the dot didn't reach the goal then the fitness is based on how close it is to the goal

        }
    }
}
