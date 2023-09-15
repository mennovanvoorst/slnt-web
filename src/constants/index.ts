import { TimedMessage } from "@interfaces/timedMessage";
import { Command } from "../types/command";

export const defaultBotSettings = {
  bot_prefix: "!",
  bot_enabled: false,
  bot_commands: [],
  song_requests: {
    mode: "priority",
    cooldown: {
      vip: 0,
      viewer: 0,
      donator: 0,
      streamer: 0,
      moderator: 0,
      subscriber: 0
    },
    priority: ["vip", "moderator", "subscriber", "streamer", "viewer"],
    chat_enabled: true
  },
  bot_timedmessages: []
};

export const timedMessage: TimedMessage = {
  name: "",
  message: "",
  interval: 60,
  messages_between: 3,
  enabled: true
};

export const botCommand: Command = {
  trigger: "",
  message: "",
  enabled: true
};
