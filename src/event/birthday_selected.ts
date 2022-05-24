import { app } from "../app";
import { BlockAction } from "@slack/bolt";
import { Team } from "../entity/Team";
import { Channel } from "../entity/Channel";
import { User } from "../entity/User";

app.action<BlockAction>({ action_id: 'birthday_selected_via_channel', block_id: 'channel_assign_birthday' },
  async ({ body, client, ack }) => {
    await ack();

    const birthday = body.state?.values.channel_assign_birthday.birthday_selected_via_channel.selected_date
    if (birthday == null) { return }

    const team = await Team.findOneBy({ slackId: body.team?.id || '' })
    if (team == null) { return }

    const channel = await Channel.findOneBy({ slackId: body.channel?.id || '' })
    if ( channel == null) { return }

    const user = await User.findOneBy({ slackId: body.user.id || '' })
    await User.save({ 
      id: user?.id,
      slackId: body.user.id, 
      team: team, 
      channel: channel,
      birthday: new Date(birthday) 
    })

    await client.chat.postMessage({
      channel: body.user.id,
      text: `誕生日を${birthday}に登録しました`
    });      
  });


  app.action<BlockAction>({ action_id: 'birthday_selected_via_home', block_id: 'home_assign_birthday' },
  async ({ body, client, ack, logger }) => {
    await ack();

    const birthday = body.view?.state.values.home_assign_birthday.birthday_selected_via_home.selected_date
    if (birthday == null) { return }

    const team = await Team.findOneBy({ slackId: body.team?.id || '' })
    if (team == null) { return }

    const user = await User.findOneBy({ slackId: body.user.id || '' })
    await User.save({
      id: user?.id,
      slackId: body.user.id, 
      team: team, 
      birthday: new Date(birthday)
    })

    await client.chat.postMessage({
      channel: body.user.id,
      text: `誕生日を${birthday}に登録しました`
    });      
  });
