import GolfIds "mo:waterway-mops/golf/GolfIds";
import GolfEnums "mo:waterway-mops/golf/GolfEnums";

module TournamentQueries {
    
    public type GetTournament = {
        tournamentId: GolfIds.TournamentId;
    };

    public type Tournament = {
        tournamentId: GolfIds.TournamentId;


    };
    
    public type GetTournamentInstance = {
        tournamentId: GolfIds.TournamentId;
        year: Nat16;
    };

    public type TournamentInstance = {
        tournamentId: GolfIds.TournamentId;
        year: Nat16;
        populated: Bool;
        golfCourseId: GolfIds.GolfCourseId;
        startDate: Int;
        endDate: Int;
        leaderboard: TournamentLeaderboard;
        stage: GolfEnums.TournamentStage;
    };

    public type TournamentLeaderboard = {
        totalEntries: Nat;
        entries: [TournamentLeaderboardEntry];
    };

    public type TournamentLeaderboardEntry = {
        golferId: GolfIds.ProGolferId;
        tournamentId: GolfIds.TournamentId;
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
        tournamentId: GolfIds.TournamentId;
        name: Text;
    };
    
}

  