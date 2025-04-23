import { TournamentService } from "$lib/services/tournament-service";
import type { CreateTournament, UpdateTournamentStage, GetTournament, GetTournamentInstance, Tournament, TournamentInstance } from "../../../../declarations/backend/backend.did";
import { writable } from "svelte/store";


function createTournamentStore() {
    const { subscribe, set } = writable<TournamentInstance[]>([]);
    
    async function createTournament(dto: CreateTournament) {
        return new TournamentService().createTournament(dto);
    }

    async function updateTournamentStage(dto: UpdateTournamentStage) {
        return new TournamentService().updateTournamentStage(dto);
    }

    async function getTournament(dto: GetTournament) : Promise<Tournament | undefined> {
        return new TournamentService().getTournament(dto);
    }

    async function getTournamentInstance(dto: GetTournamentInstance) : Promise<TournamentInstance | undefined> {
        return new TournamentService().getTournamentInstance(dto);
    }

    return {
        subscribe,
        set,
        createTournament,
        updateTournamentStage,
        getTournament,
        getTournamentInstance,
    };
}

export const tournamentStore = createTournamentStore();