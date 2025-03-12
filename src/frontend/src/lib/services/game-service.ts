import { isError } from "$lib/utils/helpers";
import { ActorFactory } from "$lib/utils/actor.factory";
import { authStore } from "$lib/stores/auth-store";
import type {
  AddGameScore,
  BeginGame,
  CreateGame,
  Game,
  GameSummaries,
  GetGame,
  GetGameSummaries,
  PredictGame,
} from "../../../../declarations/backend/backend.did";

export class GameService {
  constructor() {}

  async getGameSummaries(dto: GetGameSummaries): Promise<GameSummaries> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );

      let result = await identityActor.getGameSummaries(dto);

      if (isError(result)) {
        console.error("Error Fetching Game Summaries", result);
      }

      return result.ok;
    } catch (error) {
      console.error("Error Fetching Game Summaries", error);
      throw error;
    }
  }

  async getGame(gameId: number): Promise<Game> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );

      let dto: GetGame = {
        gameId: BigInt(gameId),
      };
      let result = await identityActor.getGame(dto);

      if (isError(result)) {
        console.error("Error Fetching Game", result);
      }

      return result.ok;
    } catch (error) {
      console.error("Error Fetching Game", error);
      throw error;
    }
  }

  async createGame(dto: CreateGame): Promise<any> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result: any = await identityActor.createGame(dto);
    if (isError(result)) {
      throw new Error("Error Creating Game");
    }
    return result.ok;
  }

  async beginGame(dto: BeginGame): Promise<any> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result: any = await identityActor.beginGame(dto);
    if (isError(result)) {
      throw new Error("Error Setting Up Game");
    }
    return result.ok;
  }

  async predictGame(dto: PredictGame): Promise<any> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result: any = await identityActor.predictGame(dto);
    if (isError(result)) {
      throw new Error("Error Making Game Prediction");
    }
    return result.ok;
  }

  async addGameScore(dto: AddGameScore): Promise<any> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result: any = await identityActor.addGameScore(dto);
    if (isError(result)) {
      throw new Error("Error Adding Game Score");
    }
    return result.ok;
  }
}
