import { app } from "../app";
import { Team } from "../entity/Team";

app.event('app_uninstalled', async ({ body }) => {
  const team = await Team.findOne({ where: { slackId: body.team_id }, relations: ["channels" , "users"] })
  if (team == null) { return }

  await team.softRemove()
});
