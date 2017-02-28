const Rule = require('./Rule.js');

class RuleList {
  constructor() {
    this.rules = [];
    this.defaultBehavior = null;
  }

  setDefaultBehavior(behavior) {
    this.defaultBehavior = behavior;
  }

  addRule(rule) {
    this.rules.push(rule);
  }

  selectBehavior(bot) {
    for (let i = 0; i < this.rules.length; i++) {
      const rule = this.rules[i];
      if (rule.evaluateCondition(bot) === true) {
        return rule.getBehavior();
      }
    }

    return this.defaultBehavior;
  }
}

module.exports = RuleList;
