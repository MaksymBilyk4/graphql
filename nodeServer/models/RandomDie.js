class RandomDie {

    numSides;

    constructor(numSides) {
        this.numSides = numSides;
    }

    rollOnce () {
        return 1 + Math.floor(Math.random() * this.numSides);
    }

    roll ({numRolls}) {
        const result = [];
        for (let i = 0; i < numRolls; i++) {
            result.push(this.rollOnce());
        }
        return result;
    }

}

module.exports = RandomDie;