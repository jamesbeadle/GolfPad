import { isError } from "$lib/utils/helpers";
import { idlFactory } from "../../../../declarations/backend";
import type {
  GolferDTO,
  CreateGolferDTO,
  GolfersDTO,
  UpdateGolferPictureDTO,
} from "../../../../declarations/backend/backend.did";
import { ActorFactory } from "$lib/utils/actor-factory";
import { authStore } from "$lib/stores/auth-store";

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

  async createPlayer(player: CreateGolferDTO): Promise<void> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result: any = await identityActor.createGolfer(player);
    console.log("Result:", result);
    if (isError(result)) {
      console.log("ERROR Result:", result);
      throw new Error("Error Creating Player");
    }
  }

  async listPlayers(searchTerm: string): Promise<GolfersDTO> {
    const dto = { searchTerm };
    const result = await this.actor.listGolfers(dto);
    if (isError(result)) throw new Error("Failed to list players");
    return result.ok as GolfersDTO;
  }

  async saveGolferPicture(dto: UpdateGolferPictureDTO): Promise<void> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result = await identityActor.saveGolferPicture(dto);
    if (isError(result)) {
      console.log("ERROR Result:", result);
      throw new Error("Error Saving Golfer Picture");
    }
  }
}
