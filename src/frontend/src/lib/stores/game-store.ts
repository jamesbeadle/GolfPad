import { GameService } from "$lib/services/game-service";
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
  PredictGame,
  RejectGameInvite,
} from "../../../../declarations/backend/backend.did";

function createGameStore() {
  async function getGameSummaries(
    dto: GetGameSummaries,
  ): Promise<GameSummaries> {
    return new GameService().getGameSummaries(dto);
  }

  async function getGame(dto: GetGame): Promise<Game> {
    return new GameService().getGame(dto);
  }

  async function getGameInvites(dto: GetGameInvites): Promise<GameInvites> {
    return new GameService().getGameInvites(dto);
  }

  async function createGame(dto: CreateGame): Promise<any> {
    return new GameService().createGame(dto);
  }

  async function beginGame(dto: BeginGame): Promise<any> {
    return new GameService().beginGame(dto);
  }

  async function predictGame(dto: PredictGame): Promise<any> {
    return new GameService().beginGame(dto);
  }

  async function addGameScore(dto: AddGameScore): Promise<any> {
    return new GameService().addGameScore(dto);
  }

  async function deleteGame(dto: DeleteGame): Promise<any> {
    return new GameService().deleteGame(dto);
  }

  async function inviteGolfers(dto: InviteGolfers): Promise<any> {
    return new GameService().inviteGolfers(dto);
  }

  async function acceptGameInvite(dto: AcceptGameInvite): Promise<any> {
    return new GameService().acceptGameInvite(dto);
  }

  async function rejectGameInvite(dto: RejectGameInvite): Promise<any> {
    return new GameService().rejectGameInvite(dto);
  }

  return {
    getGameSummaries,
    getGame,
    getGameInvites,
    createGame,
    beginGame,
    predictGame,
    addGameScore,
    deleteGame,
    inviteGolfers,
    acceptGameInvite,
    rejectGameInvite,
  };
}
export const gameStore = createGameStore();
