import type { AuthStoreData } from "../stores/auth-store";
import { authRemainingTimeStore, authStore } from "../stores/auth-store";
import type { PostMessage } from "../types/post-message";
import type { PostMessageDataResponseAuth } from "../types/post-message.auth";

export interface AuthWorker {
  syncAuthIdle: (auth: AuthStoreData) => void;
}

export const initAuthWorker = async (): Promise<AuthWorker> => {
  const AuthWorker = await import("$lib/workers/auth.worker?worker");
  const authWorker: Worker = new AuthWorker.default();

  authWorker.onmessage = async ({
    data,
  }: MessageEvent<PostMessage<PostMessageDataResponseAuth>>) => {
    const { msg, data: value } = data;

    switch (msg) {
      case "nnsSignOut":
        await authStore.signOut();
        return;
      case "nnsDelegationRemainingTime":
        authRemainingTimeStore.set(value.authRemainingTime);
        return;
    }
  };

  return {
    syncAuthIdle: (auth: AuthStoreData) => {
      if (!auth.identity) {
        authWorker.postMessage({ msg: "nnsStopIdleTimer" });
        return;
      }

      authWorker.postMessage({
        msg: "nnsStartIdleTimer",
      });
    },
  };
};
