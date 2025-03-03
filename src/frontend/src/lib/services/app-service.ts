import type { AppStatusDTO } from "../../../../declarations/backend/backend.did";
import { isError } from "../utils/helpers";
import { idlFactory as backend_canister } from "../../../../declarations/backend";
import { ActorFactory } from "$lib/utils/ActorFactory";

export class AppService {
  constructor() {}

  async getAppStatus(): Promise<AppStatusDTO | undefined> {
    const identityActor: any = await ActorFactory.createActor(
      backend_canister,
      process.env.BACKEND_CANISTER_ID,
    );

    const result = await identityActor.getAppStatus();
    if (isError(result)) throw new Error("Failed to get app status");
    return result.ok;
  }
}
