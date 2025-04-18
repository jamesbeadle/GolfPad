import Types "../data-types/types";
module TournamentQueries {
    
    public type GetTournament = {
        id: Types.TournamentId;
    };

    public type Tournament = {
        id: Types.TournamentId;
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
        
    };
    
}

  