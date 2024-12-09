import { writable } from "svelte/store";
import { YardagesServices } from "$lib/services/yardages-services";
import type {
  CreateYardageSetDTO,
  UpdateYardageSetDTO,
  DeleteYardageSetDTO,
  GetYardageSetDTO,
  YardageSetDTO,
} from "../../../../declarations/backend/backend.did";

function createYardagesStore() {
  const { subscribe, set } = writable<YardageSetDTO[]>([]);

  async function createYardageSet(dto: CreateYardageSetDTO): Promise<void> {
    return await new YardagesServices().createYardageSet(dto);
  }

  async function updateYardageSet(dto: UpdateYardageSetDTO): Promise<void> {
    return await new YardagesServices().updateYardageSet(dto);
  }

  async function deleteYardageSet(dto: DeleteYardageSetDTO): Promise<void> {
    return await new YardagesServices().deleteYardageSet(dto);
  }

  async function getYardageSet(dto: GetYardageSetDTO): Promise<YardageSetDTO> {
    return await new YardagesServices().getYardageSet(dto);
  }

  return {
    subscribe,
    setYardageSet: (yardageSet: YardageSetDTO[]) => set(yardageSet),
    createYardageSet,
    updateYardageSet,
    deleteYardageSet,
    getYardageSet,
  };
}
export const yardagesStore = createYardagesStore();
