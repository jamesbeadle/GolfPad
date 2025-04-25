import { TournamentService } from "$lib/services/tournament-service";
import type { CreateTournament, UpdateTournamentStage, GetTournament, GetTournamentInstance, Tournament, TournamentInstance, ListTournaments, Tournaments } from "../../../../declarations/backend/backend.did";
import { writable } from "svelte/store";

function createTournamentStore() {
    const { subscribe, set } = writable<TournamentInstance[]>([]);
    
    async function createTournament(dto: CreateTournament) : Promise<any> {
        return new TournamentService().createTournament(dto);
    }

    async function updateTournamentStage(dto: UpdateTournamentStage) : Promise<any> {
        return new TournamentService().updateTournamentStage(dto);
    }

    async function getTournament(dto: GetTournament) : Promise<Tournament | undefined> {
        return new TournamentService().getTournament(dto);
    }

    async function getTournamentInstance(dto: GetTournamentInstance) : Promise<TournamentInstance | undefined> {
        return new TournamentService().getTournamentInstance(dto);
    }

    async function listTournaments(dto: ListTournaments) : Promise<Tournaments | undefined> {
        return new TournamentService().listTournaments(dto);
    }

    return {
        subscribe,
        set,
        createTournament,
        updateTournamentStage,
        getTournament,
        getTournamentInstance,
        listTournaments
    };
}

export const tournamentStore = createTournamentStore();