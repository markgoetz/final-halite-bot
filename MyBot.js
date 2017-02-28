const {
  Move,
} = require('./utils/hlt');
const Networking = require('./utils/networking');
const parseBots = require('./utils/parseBots');
const RushBotBehavior = require('./behavior/RushBotBehavior');
const { registerGlobal } = require('./utils/globals');
const ruleEngine = require('./RuleEngine');
const WarDeclarer = require('./classes/WarDeclarer');

const network = new Networking('mgoetz');

network.on('map', (gameMap, id) => {
  registerGlobal('gameMap', gameMap);
  const moves = [];
  const actors = parseBots(gameMap, id);
  registerGlobal('actors', actors);

  const warDeclarer = new WarDeclarer();
  registerGlobal('warDeclarer', warDeclarer);

  actors.mine.map((bot) => {
    const behavior = ruleEngine.selectBehavior(bot);
    bot.attachBehavior(behavior);
    const botCommand = bot.run();
    moves.push(new Move(bot.loc, botCommand));
  });
  network.sendMoves(moves);
});
