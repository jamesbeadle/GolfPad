import MopsGolfIds "mops_golf_ids";
import MopsGolfEnums "mops_golf_enums";
module TournamentQueries {
    
    public type GetTournament = {
        tournamentId: MopsGolfIds.TournamentId;
    };

    public type Tournament = {
        tournamentId: MopsGolfIds.TournamentId;


    };
    
    public type GetTournamentInstance = {
        tournamentId: MopsGolfIds.TournamentId;
        year: Nat16;
    };

    public type TournamentInstance = {
        tournamentId: MopsGolfIds.TournamentId;
        year: Nat16;
        populated: Bool;
        golfCourseId: MopsGolfIds.GolfCourseId;
        startDate: Int;
        endDate: Int;
        leaderboard: TournamentLeaderboard;
        stage: MopsGolfEnums.TournamentStage;
    };

    public type TournamentLeaderboard = {
        totalEntries: Nat;
        entries: [TournamentLeaderboardEntry];
    };

    public type TournamentLeaderboardEntry = {
        golferId: MopsGolfIds.GolferId;
        tournamentId: MopsGolfIds.TournamentId;
        rounds: [GolfRound];
        totalShots: Nat;
    };

    public type GolfRound = {
        teeTime: Int;
        hole1Score: Nat8;
        hole2Score: Nat8;
        hole3Score: Nat8;
        hole4Score: Nat8;
        hole5Score: Nat8;
        hole6Score: Nat8;
        hole7Score: Nat8;
        hole8Score: Nat8;
        hole9Score: Nat8;
        hole10Score: Nat8;
        hole11Score: Nat8;
        hole12Score: Nat8;
        hole13Score: Nat8;
        hole14Score: Nat8;
        hole15Score: Nat8;
        hole16Score: Nat8;
        hole17Score: Nat8;
        hole18Score: Nat8;
        totalShots: Nat;
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
        tournamentId: MopsGolfIds.TournamentId;
        name: Text;
    };
    
}

  