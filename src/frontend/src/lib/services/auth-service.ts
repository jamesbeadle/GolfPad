import { authStore, type AuthSignInParams } from "$lib/stores/auth-store";
import { toasts } from "$lib/stores/toasts-store";
import { replaceHistory } from "$lib/utils/route.utils";
import { isNullish } from "@dfinity/utils";

export const signIn = async (
  params: AuthSignInParams,
): Promise<{ success: "ok" | "cancelled" | "error"; err?: unknown }> => {
  try {
    await authStore.signIn(params);
    return { success: "ok" };
  } catch (err: unknown) {
    if (err === "UserInterrupt") {
      // We do not display an error if user explicitly cancelled the process of sign-in
      return { success: "cancelled" };
    }

    toasts.addToast({
      message: `Something went wrong while sign-in.`,
      type: "error",
    });

    return { success: "error", err };
  } finally {
  }
};

export const signOut = (): Promise<void> => logout();

export const idleSignOut = async () => logout();

const logout = async () => {
  // To mask not operational UI (a side effect of sometimes slow JS loading after window.reload because of service worker and no cache).

  await authStore.signOut();

  // Auth: Delegation and identity are cleared from indexedDB by agent-js so, we do not need to clear these

  // Preferences: We do not clear local storage as well. It contains anonymous information such as the selected theme.
  // Information the user want to preserve across sign-in. e.g. if I select the light theme, logout and sign-in again, I am happy if the dapp still uses the light theme.

  // We reload the page to make sure all the states are cleared
  window.location.reload();
};

const PARAM_MSG = "msg";
const PARAM_LEVEL = "level";

/**
 * If the url contains a msg that has been provided on logout, display it as a toast message. Cleanup url afterwards - we don't want the user to see the message again if reloads the browser
 */
export const displayAndCleanLogoutMsg = () => {
  const urlParams: URLSearchParams = new URLSearchParams(
    window.location.search,
  );

  const msg: string | null = urlParams.get(PARAM_MSG);

  if (isNullish(msg)) {
    return;
  }

  cleanUpMsgUrl();
};

const cleanUpMsgUrl = () => {
  const url: URL = new URL(window.location.href);

  url.searchParams.delete(PARAM_MSG);
  url.searchParams.delete(PARAM_LEVEL);

  replaceHistory(url);
};
