const loggerOn = 1;

var winston = null;
try {
  winston = require('winston');
  winston.remove(winston.transports.Console);
  winston.add(
    winston.transports.File,
    {
      filename: 'match.log',
      json: false,
      formatter: (options) => { return options.message; }
    }
  );
  winston.log('info', 'LOGGER INITIALIZED');
} catch (e) {
  // when you submit your bot to Halite.io, don't include the winston module
  // logging to file is super slow and you can get booted if you try to create files
  // on their servers
}

// cause the process to wait giving time for the logs to get flushed to the file
process.on('exit', () => {
  setTimeout(() => {}, 5000);
});

process.on('uncaughtException', (err) => {
  // remove and readd the file transport to deal with a bug with adding formatters that won't log errors
  winston.remove(winston.transports.File);
  winston.add(winston.transports.File, { filename: 'match.log' });
  winston.log('error', 'Fatal uncaught exception', err);
});

module.exports.log = function(message) {
  winston.log('info', message);
}
