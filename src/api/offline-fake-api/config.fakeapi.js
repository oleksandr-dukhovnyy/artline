export const config = {
  timing: {
    maxWait: 1500,
    minWait: 10,
  },
  prefix: '[server]: ',
  showLogs: true,
  DATABASE_LOCAL_KEY: 'fake-api:database.v1',
  TOKEN_LIST_LOCAL_KEY: 'fake-api:auth-tokens.v1',
  tokenLength: 16,
};
