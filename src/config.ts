import * as env from 'env-var';

export const config = {
  server: {
    port: env.get('APPLICATION_PORT').default(3000).asPortNumber(),
    name: "Let's Build It",
  },
  db: {
    connectionURL: env
      .get('DB_CONNECTION_URL')
      .default("mongodb://localhost:27017/Let's-Build-It")
      .asString(),
    autoStartAndStop: env.get('AUTO_START_AND_STOP').default('false').asBool(),
    startCommand: env.get('DB_START_COMMAND').default('').asString(),
    StopCommand: env.get('DB_STOP_COMMAND').default('').asString(),
  },
  configuration: {
    maxUserAmountToGet: env.get('MAX_USER_TO_GET').default(20).asIntPositive(),
  },
  auth: {
    secretToken: env.get('TOKEN_SECRET').default('123456').asString()
  }
};
