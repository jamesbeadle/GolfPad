import type {
  CreateGolfChannel,
  DeleteGolfChannel,
  GetGolfChannel,
  GetGolfChannels,
  GetGolfChannelVideo,
  GetGolfChannelVideos,
  GolfChannel,
  GolfChannels,
  GolfChannelVideo,
  GolfChannelVideos,
  RemoveGolfChannelVideo,
  SubscribeToGolfChannel,
  UnsubscribeFromGolfChannel,
  UpdateGolfChannel,
  UpdateGolfChannelVideo,
  UploadGolfChannelVideo,
} from "../../../../declarations/backend/backend.did";
import { GolfChannelService } from "$lib/services/golf-channel-service";

function createGolfChannelStore() {
 
  async function getGolfChannel(dto: GetGolfChannel): Promise<GolfChannel> {
    return await new GolfChannelService().getGolfChannel(dto);
  }

  async function getGolfChannels(dto: GetGolfChannels): Promise<GolfChannels> {
    return new GolfChannelService().getGolfChannels(dto);
  }

  async function getGolfChannelVideos(dto: GetGolfChannelVideos) : Promise<GolfChannelVideos>{
    return new GolfChannelService().getGolfChannelVideos(dto);
  }

  async function getGolfChannelVideo(dto: GetGolfChannelVideo) : Promise<GolfChannelVideo>{
    return new GolfChannelService().getGolfChannelVideo(dto);
  }

  async function createGolfChannel(dto: CreateGolfChannel) : Promise<void>{
    return new GolfChannelService().createGolfChannel(dto);
  }

  async function updateGolfChannel(dto: UpdateGolfChannel) : Promise<void>{
    return new GolfChannelService().updateGolfChannel(dto);
  }

  async function deleteGolfChannel(dto: DeleteGolfChannel) : Promise<void>{
    return new GolfChannelService().deleteGolfChannel(dto);
  }

  async function subscribeToGolfChannel(dto: SubscribeToGolfChannel) : Promise<void>{
    return new GolfChannelService().subscribeToGolfChannel(dto);
  }

  async function unsubscribeFromGolfChannel(dto: UnsubscribeFromGolfChannel) : Promise<void>{
    return new GolfChannelService().unsubscribeFromGolfChannel(dto);
  }

  async function uploadGolfChannelVideo(dto: UploadGolfChannelVideo) : Promise<void>{
    return new GolfChannelService().uploadGolfChannelVideo(dto);
  }

  async function updateGolfChannelVideo(dto: UpdateGolfChannelVideo) : Promise<void>{
    return new GolfChannelService().updateGolfChannelVideo(dto);
  }

  async function removeGolfChannelVideo(dto: RemoveGolfChannelVideo) : Promise<void>{
    return new GolfChannelService().removeGolfChannelVideo(dto);
  }

  return {
    getGolfChannels,
    getGolfChannel,
    getGolfChannelVideos,
    getGolfChannelVideo,
    createGolfChannel,
    updateGolfChannel,
    deleteGolfChannel,
    subscribeToGolfChannel,
    unsubscribeFromGolfChannel,
    uploadGolfChannelVideo,
    updateGolfChannelVideo,
    removeGolfChannelVideo
  };
}

export const golfChannelStore = createGolfChannelStore();
