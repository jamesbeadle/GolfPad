import { isError } from "$lib/utils/helpers";
import { ActorFactory } from "$lib/utils/actor.factory";
import type {
  CreateGolfChannel,
  DeleteGolfChannel,
  GetGolfChannel,
  GetGolfChannels,
  GetGolfChannelVideo,
  GetGolfChannelVideos,
  GolfChannel,
  GolfChannels,
  GolfChannelVideos,
  RemoveGolfChannelVideo,
  SubscribeToGolfChannel,
  UnsubscribeFromGolfChannel,
  UpdateGolfChannel,
  UpdateGolfChannelVideo,
  UploadGolfChannelVideo,
} from "../../../../declarations/backend/backend.did";
import { authStore } from "$lib/stores/auth-store";

export class GolfChannelService {
  constructor() {}

  //Golf Channel Queries:

  async getGolfChannels(dto: GetGolfChannels): Promise<GolfChannels> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );

      let result = await identityActor.getGolfChannels(dto);

      if (isError(result)) {
        console.error("Error Fetching Golf Channels", result);
      }

      return result.ok;
    } catch (error) {
      console.error("Error Fetching Golf Channels", error);
      throw error;
    }
  }

  async getGolfChannel(dto: GetGolfChannel): Promise<GolfChannel> {
    const identityActor: any = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result = await identityActor.getGolfCourse(dto);
    if (isError(result)) throw new Error("Failed to get golf course");
    return result.ok;
  }

  async getGolfChannelVideos(
    dto: GetGolfChannelVideos,
  ): Promise<GolfChannelVideos> {
    const identityActor: any = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result = await identityActor.getGolfChannelVideos(dto);
    if (isError(result)) throw new Error("Failed to get golf channel videos");
    return result.ok;
  }

  async getGolfChannelVideo(
    dto: GetGolfChannelVideo,
  ): Promise<GolfChannelVideos> {
    const identityActor: any = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result = await identityActor.getGolfChannelVideo(dto);
    if (isError(result)) throw new Error("Failed to get golf channel video");
    return result.ok;
  }

  //Golf Channel Commands:

  async createGolfChannel(dto: CreateGolfChannel): Promise<any> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.createGolfChannel(dto);
      return result.ok;
    } catch (error) {
      console.error("Error creating golf channel:", error);
      throw error;
    }
  }

  async updateGolfChannel(dto: UpdateGolfChannel): Promise<any> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.updateGolfChannel(dto);
      return result.ok;
    } catch (error) {
      console.error("Error updating golf channel:", error);
      throw error;
    }
  }

  async deleteGolfChannel(dto: DeleteGolfChannel): Promise<any> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.deleteGolfChannel(dto);
      return result.ok;
    } catch (error) {
      console.error("Error deleting golf channel:", error);
      throw error;
    }
  }

  async subscribeToGolfChannel(dto: SubscribeToGolfChannel): Promise<any> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.subscribeToGolfChannel(dto);
      return result.ok;
    } catch (error) {
      console.error("Error subscribing to golf channel:", error);
      throw error;
    }
  }

  async unsubscribeFromGolfChannel(dto: UnsubscribeFromGolfChannel): Promise<any> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.unsubscribeFromGolfChannel(dto);
      return result.ok;
    } catch (error) {
      console.error("Error unsubscribing from golf channel:", error);
      throw error;
    }
  }

  async uploadGolfChannelVideo(dto: UploadGolfChannelVideo): Promise<any> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.uploadGolfChannelVideo(dto);
      return result.ok;
    } catch (error) {
      console.error("Error uploading golf channel video:", error);
      throw error;
    }
  }

  async updateGolfChannelVideo(dto: UpdateGolfChannelVideo): Promise<any> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.updateGolfChannelVideo(dto);
      return result.ok;
    } catch (error) {
      console.error("Error updating golf channel video:", error);
      throw error;
    }
  }

  async removeGolfChannelVideo(dto: RemoveGolfChannelVideo): Promise<any> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );
      const result = await identityActor.removeGolfChannelVideo(dto);
      return result.ok;
    } catch (error) {
      console.error("Error removing golf channel video:", error);
      throw error;
    }
  }
}
