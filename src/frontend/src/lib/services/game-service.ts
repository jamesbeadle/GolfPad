import { isError } from "$lib/utils/helpers";
import { ActorFactory } from "$lib/utils/actor.factory";
import { authStore } from "$lib/stores/auth-store";
import type {
  AcceptGameInvite,
  AddGameScore,
  BeginGame,
  CreateGame,
  DeleteGame,
  Game,
  GameInvites,
  GameSummaries,
  GetGame,
  GetGameInvites,
  GetGameSummaries,
  InviteGolfers,
  PredictGameScore,
  RejectGameInvite,
  UpdateGame,
} from "../../../../declarations/backend/backend.did";

export class GameService {
  constructor() {}

  //Queries

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

  async getGame(dto: GetGame): Promise<Game> {
    try {
      const identityActor: any = await ActorFactory.createIdentityActor(
        authStore,
        process.env.BACKEND_CANISTER_ID ?? "",
      );

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

  async getGameInvites(dto: GetGameInvites): Promise<GameInvites> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result: any = await identityActor.getGameInvites(dto);
    if (isError(result)) {
      throw new Error("Error Getting Game Invites");
    }
    return result.ok;
  }

  //Commands

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

  async updateGame(dto: UpdateGame): Promise<any> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result: any = await identityActor.updateGame(dto);
    if (isError(result)) {
      throw new Error("Error Updating Game");
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

  async predictGameScore(dto: PredictGameScore): Promise<any> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result: any = await identityActor.predictGameScore(dto);
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

  async deleteGame(dto: DeleteGame): Promise<any> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result: any = await identityActor.deleteGame(dto);
    if (isError(result)) {
      throw new Error("Error Deleting Game");
    }
    return result.ok;
  }

  async inviteGolfers(dto: InviteGolfers): Promise<any> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result: any = await identityActor.inviteGolfers(dto);
    if (isError(result)) {
      throw new Error("Error Inviting Golfers To Game");
    }
    return result.ok;
  }

  async acceptGameInvite(dto: AcceptGameInvite): Promise<any> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result: any = await identityActor.acceptGameInvite(dto);
    if (isError(result)) {
      throw new Error("Error Accepting Game Invite");
    }
    return result.ok;
  }

  async rejectGameInvite(dto: RejectGameInvite): Promise<any> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result: any = await identityActor.rejectGameInvite(dto);
    if (isError(result)) {
      throw new Error("Error Rejecting Game Invite");
    }
    return result.ok;
  }
}
