const { globals } = require('../utils/globals');

const WAR_DISTANCE = 2;

class WarDeclarer {
  constructor() {
    const { mine, enemy } = globals.actors;
    this._list = {};
    let closestEnemy = null;
    let closestEnemyDistance = 99999;

    for (var i = 0; i < mine.length; i++) {
      for (var j = 0; j < enemy.length; j++) {
        const distance = globals.gameMap.getDistance(mine[i].loc, enemy[j].loc);

        if (distance <= WAR_DISTANCE) {
          this._list[enemy[j].owner] = true;
        }

        if (distance < closestEnemyDistance) {
          closestEnemyDistance = distance;
          closestEnemy = enemy[j];
        }
      }
    }

    if (Object.keys(this._list).length === 0 && closestEnemy != null) {
      this._list[closestEnemy.owner] = true;
    }
  }

  getActiveWars() {
    return this._list;
  }

  hasWarBeenDeclaredOn(id) {
    return this._list[id];
  }
}

module.exports = WarDeclarer;
