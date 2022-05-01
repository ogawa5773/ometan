import { App } from '@slack/bolt';
import { AppDataSource } from "./data-source"

export const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
  port: 3000
});

AppDataSource.initialize()
    .then(() => {
      app.start();
      console.log('Ome is running!');
    })
    .catch((error) => console.log(error));
