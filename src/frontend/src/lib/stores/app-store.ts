import { isError } from "../utils/helpers";
import type {
  AppStatusDTO,
  BuzzEntries,
  GetBuzzEntries,
} from "../../../../declarations/backend/backend.did";
import { AppService } from "$lib/services/app-service";
import { toasts } from "./toasts-store";

function createAppStore() {
  async function checkServerVersion() {
    const res = await new AppService().getAppStatus();
    if (isError(res)) {
      throw new Error("Error fetching app status");
    }

    let status: AppStatusDTO = res!;

    let localVersion = localStorage.getItem("version");
    if (!localVersion) {
      localStorage.setItem("version", status.version);
      return;
    }

    if (status.version !== localStorage.getItem("version")) {
      toasts.addToast({
        message: `ICFC V${status.version} is now available. Click here to reload:`,
        type: "frontend-update",
      });
    }
  }
  async function getBuzzEntries(dto: GetBuzzEntries): Promise<BuzzEntries> {
    return await new AppService().getBuzzEntries(dto);
  }

  async function updateFrontend() {
    const res = await new AppService().getAppStatus();
    if (isError(res)) {
      throw new Error("Error fetching app status");
    }

    let status: AppStatusDTO = res!;
    localStorage.setItem("version", status.version);
    window.location.replace(`${window.location.pathname}?v=${status.version}`);
  }

  return {
    checkServerVersion,
    updateFrontend,
    getBuzzEntries,
  };
}

export const appStore = createAppStore();
