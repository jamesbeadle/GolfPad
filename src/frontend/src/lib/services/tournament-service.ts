import { ActorFactory } from "$lib/utils/actor.factory";
import { isError } from "$lib/utils/helpers";
import { authStore } from "$lib/stores/auth-store";
import type { CreateTournament, UpdateTournamentStage, GetTournament, GetTournamentInstance, Tournament, TournamentInstance } from "../../../../declarations/backend/backend.did";

export class TournamentService {
    constructor() {}

    async createTournament(dto: CreateTournament) : Promise<any> {
        try {
            const identityActor: any = await ActorFactory.createIdentityActor(
              authStore,
              process.env.BACKEND_CANISTER_ID ?? "",
            );
      
            let result = await identityActor.createTournament(dto);
      
            if (isError(result)) {
              console.error("Error Creating Tournament", result);
            }
      
            return result.ok;
          } catch (error) {
            console.error("Error Creating Tournament", error);
          }
    }

    async updateTournamentStage(dto: UpdateTournamentStage) : Promise<any> {
        try {
            const identityActor: any = await ActorFactory.createIdentityActor(
                authStore,
                process.env.BACKEND_CANISTER_ID ?? "",
            );

            let result = await identityActor.updateTournamentStage(dto);

            if (isError(result)) {
                console.error("Error Updating Tournament Stage", result);
            }

            return result.ok;
        } catch (error) {
            console.error("Error Updating Tournament Stage", error);
        }
    }

    async getTournament(dto: GetTournament) : Promise <Tournament | undefined>{
        try {
            const identityActor: any = await ActorFactory.createIdentityActor(
                authStore,
                process.env.BACKEND_CANISTER_ID ?? "",
            );

            let result = await identityActor.getTournament(dto);

            if (isError(result)) {
                console.error("Error Getting Tournament", result);
            }

            return result.ok;
        } catch (error) {
            console.error("Error Getting Tournament", error);
        }
    }

    async getTournamentInstance(dto: GetTournamentInstance) : Promise <TournamentInstance | undefined>{
        try {
            const identityActor: any = await ActorFactory.createIdentityActor(
                authStore,
                process.env.BACKEND_CANISTER_ID ?? "",
            );

            let result = await identityActor.getTournamentInstance(dto);

            if (isError(result)) {
                console.error("Error Getting Tournament Instance", result);
            }

            return result.ok;
        } catch (error) {
            console.error("Error Getting Tournament Instance", error);
        }
    }
    
}