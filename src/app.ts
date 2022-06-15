import { App, AwsLambdaReceiver } from '@slack/bolt';
import { Context, APIGatewayProxyCallback, APIGatewayEvent } from 'aws-lambda';
import { AppDataSource } from "./data-source"

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET || '',
});

export const handler = async (event: APIGatewayEvent, context: Context, callback: APIGatewayProxyCallback) => {
  const handler = await awsLambdaReceiver.start();
  return handler(event, context, callback);
}

export const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: awsLambdaReceiver
});

AppDataSource.initialize()
    .then(() => {
      app.start();
      console.log('Ome is running!');
    })
    .catch((error) => console.log(error));
