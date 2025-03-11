import type { PostMessageData } from "./post-message";

export interface PostMessageDataResponseAuth extends PostMessageData {
  authRemainingTime: number;
}
