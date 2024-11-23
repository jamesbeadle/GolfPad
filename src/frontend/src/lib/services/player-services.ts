import { isError } from "$lib/utils/helpers";
import { idlFactory } from "../../../../declarations/backend";
import type { GolferDTO, CreateGolferDTO } from "../../../../declarations/backend/backend.did";
import { ActorFactory } from "$lib/utils/actor-factory";

export class PlayerServices {
  private actor: any;

  constructor() {
    this.actor = ActorFactory.createActor(
      idlFactory,
      process.env.BACKEND_CANISTER_ID,
    );
  }

  async getPlayer(playerId: number): Promise<GolferDTO[]> {
    const result = await this.actor.getPlayer(playerId);
    if (isError(result)) throw new Error("Failed to get player");
    return result.ok;
  }

  async createPlayer(player: CreateGolferDTO): Promise<GolferDTO[]> {
    const result = await this.actor.createGolfer(player);
    if (isError(result)) throw new Error("Failed to create player");
    return result.ok;
  }

  async listPlayers(searchTerm: string): Promise<GolferDTO[]> {
    const dto = { searchTerm };
    const result = await this.actor.listGolfers(dto);
    if (isError(result)) throw new Error("Failed to list players");
    return result.ok;
  }
}
