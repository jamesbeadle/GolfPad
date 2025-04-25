import { ActorFactory } from "$lib/utils/actor.factory";
import { isError } from "$lib/utils/helpers";
import { authStore } from "$lib/stores/auth-store";
import type { CreateTournament, UpdateTournamentStage, GetTournament, GetTournamentInstance, Tournament, TournamentInstance, ListTournaments, Tournaments } from "../../../../declarations/backend/backend.did";

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
              throw new Error("Error Creating Tournament");
            }
      
            return result.ok;
          } catch (error) {
            console.error("Error Creating Tournament", error);
            throw error;
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
                throw new Error("Error Updating Tournament Stage");
            }

            return result.ok;
        } catch (error) {
            console.error("Error Updating Tournament Stage", error);
            throw error;
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
                throw new Error("Error Getting Tournament");
            }

            return result.ok;
        } catch (error) {
            console.error("Error Getting Tournament", error);
            throw error;
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
                throw new Error("Error Getting Tournament Instance");
            }

            return result.ok;
        } catch (error) {
            console.error("Error Getting Tournament Instance", error);
            throw error;
        }
    }

    async listTournaments(dto: ListTournaments) : Promise<Tournaments | undefined>{
        try {
            const identityActor: any = await ActorFactory.createIdentityActor(
                authStore,
                process.env.BACKEND_CANISTER_ID ?? "",
            );

            let result = await identityActor.listTournaments(dto);

            if (isError(result)) {
                throw new Error("Error Listing Tournaments");
            }

            return result.ok;
        } catch (error) {
            console.error("Error Listing Tournaments", error);
            throw error;
        }
    }
}