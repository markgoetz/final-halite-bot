const Bot = require('../classes/Bot');

function parseBots(gameMap, id) {
  const bots = {
    mine: [],
    enemy: [],
    neutral: []
  };

  for (let y = 0; y < gameMap.height; y++) {
    for (let x = 0; x < gameMap.width; x++) {

      const loc = { x, y };
      const site = gameMap.getSite(loc);

      if (site.owner === id) {
        bots.mine.push(new Bot(loc, site, gameMap));
      } else if (site.owner === 0) {
        bots.neutral.push(new Bot(loc, site, gameMap));
      } else {
        bots.enemy.push(new Bot(loc, site, gameMap));
      }
    }
  }

  return bots;
};

module.exports = parseBots;
