import { isError } from "$lib/utils/helpers";
import { idlFactory } from "../../../../declarations/backend";
import type {
  CreateYardageSetDTO,
  UpdateYardageSetDTO,
  DeleteYardageSetDTO,
  GetYardageSetDTO,
  YardageSetDTO,
} from "../../../../declarations/backend/backend.did";
import { ActorFactory } from "$lib/utils/actor-factory";
import { authStore } from "$lib/stores/auth-store";

export class YardagesServices {
  private actor: any;

  constructor() {
    this.actor = ActorFactory.createActor(
      idlFactory,
      process.env.BACKEND_CANISTER_ID,
    );
  }
  async createYardageSet(dto: CreateYardageSetDTO): Promise<void> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    console.log("Creating Yardage Set", dto);
    const result: any = await identityActor.createYardageSet(dto);
    console.log("Yardage Set Created", result);
    if (isError(result)) {
      throw new Error("Error Creating Yardage Set");
    }
  }

  async updateYardageSet(dto: UpdateYardageSetDTO): Promise<void> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result: any = await identityActor.updateYardageSet(dto);
    if (isError(result)) {
      throw new Error("Error Updating Yardage Set");
    }
  }

  async deleteYardageSet(dto: DeleteYardageSetDTO): Promise<void> {
    const identityActor = await ActorFactory.createIdentityActor(
      authStore,
      process.env.BACKEND_CANISTER_ID ?? "",
    );
    const result: any = await identityActor.deleteYardageSet(dto);
    if (isError(result)) {
      throw new Error("Error Deleting Yardage Set");
    }
  }

  async getYardageSet(dto: GetYardageSetDTO): Promise<YardageSetDTO> {
    const result: any = await this.actor.getYardageSet(dto);
    if (isError(result)) {
      throw new Error("Error Getting Yardage Set");
    }
    return result.ok;
  }
}
