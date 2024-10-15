import { authStore } from "$lib/stores/auth-store";
import { isError } from "$lib/utils/helpers";
import { writable } from "svelte/store";
import { ActorFactory } from "$lib/utils/actor-factory";
import type {
  GolferGameSummariesDTO,
  PaginationFilters,
} from "../../../../declarations/backend/backend.did";

const golferGameSummary = writable<GolferGameSummariesDTO | null>(null);
const loading = writable<boolean>(false);
const error = writable<string | null>(null);

const emptyGolferGameSummary: GolferGameSummariesDTO = {
  entries: [],
  totalEntries: 0n,
  limit: 0n,
  offset: 0n,
};

async function getGolferGameSummary(dto: PaginationFilters) {
  loading.set(true);
  try {
    console.log("Backend Canister id: ", process.env.BACKEND_CANISTER_ID);
    console.log(process.env);

    const identityActor: any = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    let getProfileResponse = await identityActor.getMyGames(dto);
    let error = isError(getProfileResponse);
    if (error) {
      console.error("Error fetching Golfer's Game Summaries");
      return emptyGolferGameSummary;
      loading.set(false);
      return;
    }
    console.log("Did not get error from response");
  } catch (error) {
    console.error("Error 2 xFetching Golfer's Game Summaries");
    return emptyGolferGameSummary;
    throw error;
  }

  loading.set(false);
}

export { golferGameSummary, loading, error, getGolferGameSummary };
