const { NORTH, SOUTH, EAST, WEST, STILL } = require('../utils/hlt');
const { globals } = require('../utils/globals');

function FindTerritoryBehavior(bot) {
  const neighbors = [NORTH,SOUTH,EAST,WEST].map(function(d) {
    const site = globals.gameMap.getSite(bot.loc, d);
    site.direction = d;
    return site;
  });

  const neutralNeighbors = neighbors.filter(function(n) {
    return (n.owner === 0 && n.production > bot.site.production);
  });

  if (neutralNeighbors.length === 0)
    return STILL;

  neutralNeighbors.sort(function(a,b) {
    if (a.production !== b.production)
      return b.production - a.production;

    else
      return a.strength - b.strength;
  });

  const proposedDirection = neutralNeighbors[0].direction;

  if (!shouldMove(bot, proposedDirection)) {
    return STILL;
  }

  return proposedDirection;
}

function shouldMove(bot, direction) {
  const gameMap = globals.gameMap;
  const site = gameMap.getSite(bot.loc, direction);
  if (bot.owner === site.owner) return true;
  if (site.owner !== 0) return true;

  return (bot.strength > site.strength);
}

module.exports = FindTerritoryBehavior;
