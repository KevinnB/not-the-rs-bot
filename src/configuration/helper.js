const NO_XP_ACCOUNT_FIELDS = ['name', 'type'];

const ERROR = {
  BASE: 'There was an error trying to execute that command',
  USER_NOT_FOUND: 'Could not find rsn on highscores.',
  USERNAME_NOT_PROVIDED: 'Username must be specified.',
};

const generateError = (ERROR_TYPE) => {
  return `${ERROR.BASE}: ${ERROR[ERROR_TYPE]}`;
};

const logger = {
  log: (message) => {
    if (process.env.debug) {
      console.log(message);
    }
  },
  error: (message) => {
    console.error(message);
  },
};

module.exports = {
  NO_XP_ACCOUNT_FIELDS,
  ERROR,
  generateError,
  logger,
};
