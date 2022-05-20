import { app } from "../app";
import { Team } from "../entity/Team";
import { Channel } from "../entity/Channel";

app.event('member_joined_channel',async ({ body, say }) => {
  if (body.api_app_id != 'A03DNU4DTGC') { return }
  
  const team = await Team.save({ slackId: body.team_id })
  await Channel.save({ team: team, slackId: body.channel })

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
        "block_id": "assign_birthday",
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
            "action_id": "birthday_selected"
          }
        ]
      }
    ]
  })
})