class Rule {
  constructor(condition, behavior) {
    this.condition = condition;
    this.behavior = behavior;
  }

  evaluateCondition(bot) {
    return this.condition(bot);
  }

  getBehavior() {
    return this.behavior;
  }
}

module.exports = Rule;
