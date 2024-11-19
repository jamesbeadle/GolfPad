import { isError } from "$lib/utils/helpers";
import { idlFactory } from "../../../../declarations/backend";
import type {
  GameDTO,
  GetGameDTO,
  CreateGameDTO,
} from "../../../../declarations/backend/backend.did";
import { ActorFactory } from "$lib/utils/actor-factory";

export class GameServices {
  private actor: any;

  constructor() {
    this.actor = ActorFactory.createActor(
      idlFactory,
      process.env.BACKEND_CANISTER_ID,
    );
  }

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
    try {
      let result = await this.actor.createGame(dto);
      if (isError(result)) {
        console.error("Error Creating Game1", result);
      }
      return { ok: result.ok };
    } catch (error) {
      console.error("Error Creating Game (Catch)", error);
      throw error;
    }
  }
}
