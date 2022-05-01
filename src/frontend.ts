import { app } from "./app";

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
