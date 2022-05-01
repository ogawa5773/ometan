import { app } from "./app";

app.event('app_requested', async ({ body, client }) => {
  await client.chat.postMessage({
    channel: body.user.id,
    text: 'test'
  });
});

app.event('channel_left', async ({ body }) => {
  const team_id = body.team_id

});

app.action('birthday-selected', async ({ ack, client, body, payload }) => {
  await ack();

  // await User.findOne({
  //   where: {
  //     slack_id: `${body.user.id}`
  //   }
  // }).then((user) => {
  //   user?.update({
  //     birthday: payload.selected_date
  //   })
  // })

  // await client.chat.postMessage({
  //   channel: body.user.id,
  //   text: `${payload.selected_date}で登録しました`
  // });
});
