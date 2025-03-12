import { writable } from "svelte/store";
import type {
  GetGolfChannel,
  GetGolfChannels,
  GolfChannel,
  GolfChannels,
} from "../../../../declarations/backend/backend.did";
import { GolfChannelService } from "$lib/services/golf-channel-service";

function createGolfChannelStore() {
  const { subscribe, set } = writable<GolfChannel | undefined>(undefined);

  async function getGolfChannel(dto: GetGolfChannel): Promise<GolfChannel> {
    return await new GolfChannelService().getGolfChannel(dto);
  }

  async function getGolfChannels(dto: GetGolfChannels): Promise<GolfChannels> {
    return new GolfChannelService().getGolfChannels(dto);
  }

  return {
    subscribe,
    setGolfChannel: (golfChannel: GolfChannel) => set(golfChannel),
    getGolfChannel,
    getGolfChannels,
  };
}

export const golfChannelStore = createGolfChannelStore();
