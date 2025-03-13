import { isError } from "$lib/utils/helpers";
import { ActorFactory } from "$lib/utils/actor.factory";
import type {
  AcceptFriendRequest,
  FriendRequests,
  GetFriendRequests,
  RejectFriendRequest,
  SendFriendRequest,
} from "../../../../declarations/backend/backend.did";
import { authStore } from "$lib/stores/auth-store";

export class FriendRequestService {

  //Queries

  async getFriendRequests(dto: GetFriendRequests): Promise<FriendRequests> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result: any = await identityActor.getFriendRequests(dto);
    if (isError(result)) {
      throw new Error("Error Getting Friend Requests");
    }
    return result.ok;
  }

  //Commands

  async acceptFriendRequest(dto: AcceptFriendRequest): Promise<any> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result: any = await identityActor.acceptFriendRequest(dto);
    if (isError(result)) {
      throw new Error("Error Accepting Friend Request");
    }
    return result.ok;
  }

  async rejectFriendRequest(dto: RejectFriendRequest): Promise<any> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result: any = await identityActor.rejectFriendRequest(dto);
    if (isError(result)) {
      throw new Error("Error Rejecting Friend Request");
    }
    return result.ok;
  }

  async sendFriendRequest(dto: SendFriendRequest): Promise<any> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result: any = await identityActor.sendFriendRequest(dto);
    if (isError(result)) {
      throw new Error("Error Sending Friend Request");
    }
    return result.ok;
  }
}
