import * as env from 'env-var';

export const config = {
  SERVER: {
    port: env.get('APPLICATION_PORT').default(3000).asPortNumber(),
    name: "Let's Build It",
  },
  DB: {
    connectionURL: env
      .get('DB_CONNECTION_URL')
      .default('mongodb://localhost:27017/base-server')
      .asString(),
    autoStartAndStop: env.get('AUTO_START_AND_STOP').default('false').asBool(),
    startCommand: env.get('DB_START_COMMAND').default(null).asString(),
    StopCommand: env.get('DB_STOP_COMMAND').default(null).asString(),
  },
  CONFIGURATION: {
    maxUserAmountToGet: env.get('MAX_USER_TO_GET').default(20).asIntPositive(),
  },
  AUTH: {
    secretToken: env.get('TOKEN_SECRET').default('123456').asString()
  }
};
