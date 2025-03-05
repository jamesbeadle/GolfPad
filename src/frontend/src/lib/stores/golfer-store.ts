import { writable } from "svelte/store";
import { GolferSummariesServices } from "$lib/services/friend-request-service";
import type {
  GolferGameSummariesDTO,
  PaginationFilters,
} from "../../../../declarations/backend/backend.did";

function createGolferSummariesStore() {
  const { subscribe, set } = writable<GolferGameSummariesDTO | undefined>(
    undefined,
  );

  async function getGolferGameSummaries(
    dto: PaginationFilters,
  ): Promise<GolferGameSummariesDTO> {
    return await new GolferSummariesServices().getGolferGameSummaries(dto);
  }

  return {
    subscribe,
    setGolferGameSummaries: (golferGameSummaries: GolferGameSummariesDTO) =>
      set(golferGameSummaries),
    getGolferGameSummaries,
  };
}

export const golferSummariesStore = createGolferSummariesStore();
