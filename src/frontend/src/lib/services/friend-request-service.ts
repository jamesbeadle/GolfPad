import { isError } from "$lib/utils/helpers";
import { idlFactory } from "../../../../declarations/backend";
import { ActorFactory } from "$lib/utils/actor.factory";

export class FriendRequestService {
  private actor: any;

  constructor() {
    this.actor = ActorFactory.createActor(
      idlFactory,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
  }
  //acceptFriendRequest
  //rejectFriendRequest
  //sendFriendRequest
  //listFriendRequests

}
