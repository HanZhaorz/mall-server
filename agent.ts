import { Agent } from "egg";
// import Subscriber from "./lib/subscriber";
// import { RedisKey } from './app/emun/redis.emun';
import { AgentEventName } from "./app/emun/agent.enum";
import { AppEventName } from "./app/emun/app.enum";

export default (agent: Agent) => {
  agent.messenger.on(AgentEventName.UpdateAccessToken, () => {
    agent.messenger.sendToApp(AppEventName.UpdateAccessToken, "update");
  });
};
