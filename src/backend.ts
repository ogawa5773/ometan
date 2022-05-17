import { BlockAction } from "@slack/bolt";
import { app } from "./app";
import { Team } from "./entity/Team";
import { Channel } from "./entity/Channel";
import { User } from "./entity/User";

app.event('member_joined_channel',async ({ body, say }) => {
  if (body.api_app_id == 'A03DNU4DTGC') {
    // FindOrInitialize
    const team = new Team()
    team.slackId = body.team_id
    team.save()

    const channel = new Channel()
    channel.team = team
    channel.slackId = body.channel
    channel.save()

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
  }
})

app.event('app_uninstalled', async ({ body }) => {
  const team = await Team.findOneBy({ slackId: body.team_id })
  if (team != null) {
    await team.remove()
  }
});

app.action<BlockAction>({ action_id: 'birthday_selected', block_id: 'assign_birthday' },
  async ({ body, client, ack, logger }) => {
    await ack();

    const birthday = body.view?.state.values.assign_birthday.birthday_selected.selected_date
    if (birthday == null) { return }
    
    if (body.user.id == null) { return }
    const user = await User.findOneBy({ slackId: body.user.id })
    if (user == null) { return }

    try {    
      user.birthday = new Date(birthday)
      user.save

      await client.chat.postMessage({
        channel: body.user.id,
        text: `誕生日を${birthday}に登録しました`
      });      
    } catch (error) {
      logger.error(error);
    }
  });