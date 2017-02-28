function selectDirection(bot, target, gameMap) {
  const directions = [];
  const { width, height } = gameMap;

  let westDistance = bot.loc.x - target.loc.x;
  if (westDistance < 0) westDistance += width;

  if (westDistance > width / 2) {
    directions.push(EAST);
  } else if (westDistance > 0) {
    directions.push(WEST);
  }

  let northDistance = bot.loc.y - target.loc.y;
  if (northDistance < 0) northDistance += height;

  if (northDistance > width / 2) {
    directions.push(SOUTH);
  } else if (northDistance > 0) {
    directions.push(NORTH);
  }

  if (directions.length === 1)
    return directions[0];

  const strength1 = costToMove(bot, gameMap.getSite(bot.loc, directions[0]));
  const strength2 = costToMove(bot, gameMap.getSite(bot.loc, directions[1]));

  if (strength1 < strength2) return directions[0];
  if (strength1 > strength2) return directions[1];
  return directions[Math.floor(Math.random() * 2)];
}

function costToMove(bot, site) {
  const strength = site.strength;
  if (site.owner === bot.owner) strength = -strength;
  return strength;
}

function shouldMove(bot, direction, gameMap) {
  const site = gameMap.getSite(bot.loc, direction);
  if (bot.owner === site.owner) return true;
  if (site.owner !== 0) return true;

  return (bot.strength > site.strength);
}

module.exports = { selectDirection, costToMove, shouldMove };
