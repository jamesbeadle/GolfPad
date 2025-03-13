import { ActorFactory } from "$lib/utils/actor.factory";
import { authStore } from "$lib/stores/auth-store";
import { isError } from "$lib/utils/helpers";
import type { AppStatusDTO } from "../../../../declarations/backend/backend.did";

export class AppService {
  constructor() {}

  async getAppStatus(): Promise<AppStatusDTO | undefined> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );

    const result: any = await identityActor.getAppStatus();
    if (isError(result)) throw new Error("Failed to get app status");
    return result.ok;
  }
}
