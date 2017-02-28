const { EAST, WEST, SOUTH, NORTH, STILL } = require('../utils/hlt.js');
const { globals } = require('../utils/globals.js');

class Pathfinder {
  constructor() {
    this.gameMap = globals.gameMap;
  }

  selectDirection(startLoc, targetLoc) {
    const directions = [];
    const { width, height } = this.gameMap;

    let westDistance = startLoc.x - targetLoc.x;
    if (westDistance < 0) westDistance += width;

    if (westDistance > width / 2) {
      directions.push(EAST);
    } else if (westDistance > 0) {
      directions.push(WEST);
    }

    let northDistance = startLoc.y - targetLoc.y;
    if (northDistance < 0) northDistance += height;

    if (northDistance > width / 2) {
      directions.push(SOUTH);
    } else if (northDistance > 0) {
      directions.push(NORTH);
    }

    if (directions.length === 1)
      return directions[0];

    const strength1 = this.costToMove(this.gameMap.getSite(startLoc, directions[0]));
    const strength2 = this.costToMove(this.gameMap.getSite(startLoc, directions[1]));

    if (strength1 < strength2) return directions[0];
    if (strength1 > strength2) return directions[1];
    return directions[Math.floor(Math.random() * 2)];
  }

  costToMove(site) {
    const strength = site.strength;
    if (site.owner === this.owner) strength = -strength;
    return strength;
  }

  getClosestTarget(loc, targets) {
    let minDistance = 999999;
    let closestTarget = null;

    for (let i = 0; i < targets.length; i++) {
      const target = targets[i];
      const distance = this.gameMap.getDistance(loc, target.loc);

      if (distance < minDistance) {
        closestTarget = target;
        minDistance = distance;
      }
    }

    return closestTarget;
  };
}

module.exports = Pathfinder;
