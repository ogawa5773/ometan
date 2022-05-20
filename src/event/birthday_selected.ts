import { app } from "../app";
import { BlockAction } from "@slack/bolt";
import { Team } from "../entity/Team";
import { Channel } from "../entity/Channel";
import { User } from "../entity/User";

app.action<BlockAction>({ action_id: 'birthday_selected', block_id: 'assign_birthday' },
  async ({ body, client, ack, logger }) => {
    await ack();

    const birthday = body.view?.state.values.assign_birthday.birthday_selected.selected_date
    if (birthday == null) { return }
    
    if (body.team?.id == null) { return }
    const team = await Team.findOneBy({ slackId: body.team?.id })
    if (team == null) { return }

    if (body.channel?.id == null) { return }
    const channel = await Channel.findOneBy({ slackId: body.channel?.id })
    if ( channel == null) { return }

    const user = await User.save({ slackId: body.user.id, team: team, channel: channel })
    if (user == null) { return }

    try {    
      user.birthday = new Date(birthday)
      await user.save()

      await client.chat.postMessage({
        channel: body.user.id,
        text: `誕生日を${birthday}に登録しました`
      });      
    } catch (error) {
      logger.error(error);
    }
  });
