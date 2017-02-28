const { NORTH, SOUTH, EAST, WEST, STILL } = require('../utils/hlt');
const { globals } = require('../utils/globals');

class Bot {
  constructor(loc, site) {
    this.loc = loc;
    this.strength = site.strength;
    this.site = site;
    this.owner = site.owner;
  }

  attachBehavior(behaviorFunc) {
    this.behavior = behaviorFunc;
  }

  run() {
    return this.behavior(this);
  }
}

module.exports = Bot;
