const { STILL } = require('../utils/hlt');
const { globals } = require('../utils/globals');
const Pathfinder = require('../classes/Pathfinder');

function RushBotBehavior(bot) {
  const { enemy } = globals.actors;
  const warDeclarer = globals.warDeclarer;

  const warringEnemies = enemy.filter(e => warDeclarer.hasWarBeenDeclaredOn(e.owner));

  const pathFinder = new Pathfinder();
  const targetEnemy = pathFinder.getClosestTarget(bot.loc, warringEnemies);
  const proposedDirection = pathFinder.selectDirection(bot.loc, targetEnemy.loc);

  if (!shouldMove(bot, proposedDirection)) {
    return STILL;
  }

  return proposedDirection;
};

function shouldMove(bot, direction) {
  const gameMap = globals.gameMap;
  const site = gameMap.getSite(bot.loc, direction);
  if (bot.owner === site.owner) return true;
  if (site.owner !== 0) return true;

  return (bot.strength > site.strength);
}

module.exports = RushBotBehavior;
