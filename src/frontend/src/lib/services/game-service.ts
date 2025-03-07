import { isError } from "$lib/utils/helpers";
import { idlFactory } from "../../../../declarations/backend";
import { ActorFactory } from "$lib/utils/actor.factory";
import { authStore } from "$lib/stores/auth-store";

export class GameService {
  constructor() {}

  async getGame(gameId: number): Promise<GameDTO> {
    try {
      let dto: GetGameDTO = {
        gameId: BigInt(gameId),
      };
      let result = await this.actor.getGame(dto);

      if (isError(result)) {
        console.error("Error Fetching Game", result);
      }

      return result.ok;
    } catch (error) {
      console.error("Error Fetching Game", error);
      throw error;
    }
  }

  async createGame(dto: CreateGameDTO): Promise<{ ok?: bigint; err?: string }> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result: any = await identityActor.createGame(dto);
    if (isError(result)) {
      throw new Error("Error Creating Game");
    }
    return { ok: result.ok };
  }
}
