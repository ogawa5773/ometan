import { app } from "../app";
import { Team } from "../entity/Team";
import { Channel } from "../entity/Channel";

app.event('member_joined_channel',async ({ body, say }) => {
  if (body.api_app_id != process.env.APP_ID) { return }
  
  let team = await Team.findOneBy({ slackId: body.team_id})
  const channel = await Channel.findOneBy({ slackId: body.event.channel })

  team = await Team.save({ id: team?.id, slackId: body.team_id })
  await Channel.save({ id: channel?.id , slackId: body.event.channel, team: team })

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
        "block_id": "channel_assign_birthday",
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
            "action_id": "birthday_selected_via_channel"
          }
        ]
      }
    ]
  })
})