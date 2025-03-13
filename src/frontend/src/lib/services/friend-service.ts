import { isError } from "$lib/utils/helpers";
import { idlFactory } from "../../../../declarations/backend";
import { ActorFactory } from "$lib/utils/actor.factory";
import { authStore } from "$lib/stores/auth-store";

export class FriendService {
  constructor() {}

  //Queries

  async getFriends(dto: GetFriends): Promise<Friends> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result: any = await identityActor.getFriends(dto);
    if (isError(result)) {
      throw new Error("Error Getting Friends");
    }
    return result.ok;
  }

  //Commands

  async removeFriend(dto: RemoveFriend): Promise<any> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result: any = await identityActor.removeFriend(dto);
    if (isError(result)) {
      throw new Error("Error Removing Friend");
    }
    return result.ok;
  }
}
