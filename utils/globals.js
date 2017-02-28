const globals = {};

function registerGlobal(key, value) {
  globals[key] = value;
}

module.exports = { globals, registerGlobal };
