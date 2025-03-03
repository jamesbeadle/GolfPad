import { writable } from "svelte/store";
import { ShotssService } from "$lib/services/shots-service";
import type {
  CreateShotSetDTO,
  UpdateShotSetDTO,
  DeleteShotDTO,
  GetShotDTO,
  ShotDTO,
} from "../../../../declarations/backend/backend.did";

function createShotssStore() {
  const { subscribe, set } = writable<ShotDTO[]>([]);

  async function createShot(dto: CreatShotDTO): Promise<void> {
    return await new ShotsService().createShot(dto);
  }

  async function updateShot(dto: UpdateShotDTO): Promise<void> {
    return await new ShotsService().updateShot(dto);
  }

  async function deleteShot(dto: DeleteShotDTO): Promise<void> {
    return await new ShotsService().deleteShot(dto);
  }

  async function getShot(dto: GetShotDTO): Promise<ShotDTO> {
    return await new ShotsService().getShot(dto);
  }

  return {
    subscribe,
    setShot: (shot: ShotDTO[]) => set(shot),
    createShot,
    updateShot,
    deleteShot,
    getShot,
  };
}
export const shotStore = createShotStore();
