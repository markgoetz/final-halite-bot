const StayStillBehavior = require('./behavior/StayStillBehavior');
const RushBotBehavior = require('./behavior/RushBotBehavior');
const FindTerritoryBehavior = require('./behavior/FindTerritoryBehavior');
const Pathfinder = require('./classes/Pathfinder');


const RuleList = require('./classes/RuleList');
const Rule = require('./classes/Rule');
const { globals } = require('./utils/globals');
const { NORTH, SOUTH, EAST, WEST } = require('./utils/hlt');

const ruleEngine = new RuleList();

const MIN_BOT_SIZE = 25;
const INVASION_DISTANCE = 3;

ruleEngine.addRule(new Rule(
  function(bot) {
    return (bot.strength <= MIN_BOT_SIZE);
  },
  StayStillBehavior
));

ruleEngine.addRule(new Rule(
  function(bot) {
    const { enemy } = globals.actors;
    const warDeclarer = globals.warDeclarer;
    const warringEnemies = enemy.filter(e => warDeclarer.hasWarBeenDeclaredOn(e.owner));

    const pathFinder = new Pathfinder();
    const targetEnemy = pathFinder.getClosestTarget(bot.loc, warringEnemies);
    return (globals.gameMap.getDistance(bot.loc, targetEnemy.loc) <= INVASION_DISTANCE);
  },
  RushBotBehavior
));

ruleEngine.addRule(new Rule(
  function(bot) {
    const neighbors = [NORTH,SOUTH,EAST,WEST].map(function(d) {
      const site = globals.gameMap.getSite(bot.loc, d);
      site.direction = d;
      return site;
    });

    const neutralNeighbors = neighbors.filter(function(n) {
      return (n.owner === 0 && n.production > bot.site.production);
    });

    return (neutralNeighbors.length > 0);
  },
  FindTerritoryBehavior
));

ruleEngine.setDefaultBehavior(RushBotBehavior);

module.exports = ruleEngine;
