import Types "../data-types/types";
module TournamentQueries {
    
    public type GetTournament = {
        tournamentId: Types.TournamentId;
    };

    public type Tournament = {
        tournamentId: Types.TournamentId;
    };

    public type ListTournaments = {
        page: Nat;
    };

    public type Tournaments = {
        entries: [TournamentSummary];
        totalEntries: Nat;
        page: Nat;
    };

    public type TournamentSummary = {
        tournamentId: Types.TournamentId;
        name: Text;
    };
    
}

  