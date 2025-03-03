import { ActorFactory } from "$lib/utils/ActorFactory";
import { authStore } from "$lib/stores/auth-store";
import { isError } from "$lib/utils/helpers";

export class UserService {
  constructor() {
    authStore.sync();
  }

  async isAdmin(): Promise<boolean> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result: any = await identityActor.isAdmin();
    if (isError(result)) {
      throw new Error("Failed to check is admin");
    }
    return result.ok;
  }
}
