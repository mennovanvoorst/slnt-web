export interface TimedMessage {
  name: string;
  message: string;
  interval: number;
  messages_between: number;
  enabled: boolean;
}
