import * as mongoose from 'mongoose';
import { Server } from './server';
import { config } from './config';

const checkDbConnection = (mongo_url: string = config.DB.connectionURL) => {
  return mongoose
    .connect(mongo_url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false
    })
}

const cmdHandle = (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
}

(async () => {

  mongoose.connection.on('connecting', () => {
    console.log('[MongoDB] connecting...');
  });

  mongoose.connection.on('connected', () => {
    console.log('[MongoDB] connected');
  });

  mongoose.connection.on('error', (error) => {
    console.log('[MongoDB] error', { additionalInfo: error });
    process.exit(1);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('[MongoDB] disconnected');
    process.exit(1);
  });

  const connection = await checkDbConnection().catch(err => {
    // TODO start manual mongoDB
    if (config.DB.autoStartAndStop) {
      console.log("\nstart manual mongoDB Connection");
      const { exec } = require("child_process");
      exec(config.DB.startCommand, cmdHandle);
      return checkDbConnection().catch(err => {
        console.error('Error connecting db:', err.message)
        process.env.noDBConnection = true as any
        console.error('exit, no Db connection')
        process.exit(1);
      })
    }
  })

  process.on('SIGINT', () => {
    // kill manual mongoDb connection
    if (connection && config.DB.autoStartAndStop) {
      const { exec } = require("child_process");
      console.log("\nKill MongoDb Connection");
      exec(config.DB.startCommand, (error, stdout, stderr) => {
        cmdHandle(error, stdout, stderr)
        console.log("Bye bye!");
        process.exit(1);
      })
    }
  })

  Server.startServer();
})();
