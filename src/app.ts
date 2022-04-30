import { App } from '@slack/bolt';

export const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
  port: 3000
});

(async () => {
  await app.start();

  console.log('Ome is running!');
})();

app.event('app_home_opened', async ({ payload, client }) => {
  await client.views.publish({
    user_id: payload.user,
    view: {
      "type": "home",
      "blocks": [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": "誕生日を登録してください",
            "emoji": true
          }
        },    
        {
          "type": "actions",
          "elements": [
            {
              "type": "datepicker",
              "initial_date": "1995-08-10",
              "placeholder": {
                "type": "plain_text",
                "text": "Select a date",
                "emoji": true
              },
              "action_id": "birthday-selected"
            }
          ]
        }
      ]
    }
  });
});

app.event('member_joined_channel', async ({ body, say }) => {
  console.log(`member_joined_channel ${body.api_app_id}`)
  if (body.api_app_id == 'A03DNU4DTGC') { 
    say({
      "blocks": [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": "誕生日を登録してください",
            "emoji": true
          }
        },    
        {
          "type": "actions",
          "elements": [
            {
              "type": "datepicker",
              "initial_date": "1995-08-10",
              "placeholder": {
                "type": "plain_text",
                "text": "Select a date",
                "emoji": true
              },
              "action_id": "birthday-selected"
            }
          ]
        }
      ]
    })
  }
});

app.event('app_requested', async ({ body, client }) => {
  await client.chat.postMessage({
    channel: body.user.id,
    text: 'test'
  });
});

app.event('channel_left', async ({ body, say }) => {
  // TODO: DBのレコード削除処理
  console.log('channel_left')
});


app.action('birthday-selected', async ({ ack, body, client }) => {
  await ack();
  // TODO: DBの値を更新
  await client.chat.postMessage({
    channel: body.user.id,
    text: 'test'
  });
});
