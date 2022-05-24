import { app } from "../app";
import { Team } from "../entity/Team";

app.event('app_uninstalled', async ({ body }) => {
  const team = await Team.findOneBy({ slackId: body.team_id })
  if (team == null) { return }
  
  await team.remove()
});
