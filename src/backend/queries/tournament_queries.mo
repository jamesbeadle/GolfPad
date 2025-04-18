import Types "../data-types/types";
module TournamentQueries {
    
    public type GetTournament = {
        tournamentId: Types.TournamentId;
    };

    public type Tournament = {
        tournamentId: Types.TournamentId;


    };
    
    public type GetTournamentInstance = {
        tournamentId: Types.TournamentId;
        year: Nat16;
    };

    public type TournamentInstance = {
        tournamentId: Types.TournamentId;
        year: Nat16;
        populated: Bool;
        golfCourseId: Types.GolfCourseId;
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

  