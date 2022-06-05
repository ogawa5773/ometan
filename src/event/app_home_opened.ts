import { app } from "../app";

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
          "block_id": "home_assign_birthday",
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
              "action_id": "birthday_selected_via_home"
            }
          ]
        }
      ]
    }
  });
});
