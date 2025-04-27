import Ids "mo:waterway-mops/Ids";
import GolfIds "mo:waterway-mops/golf/GolfIds";

module FantasyLeaderboardQueries {

    public type GetFantasyLeaderboard = {
        tournamentId: GolfIds.TournamentId;
        page: Nat;
    };

    public type FantasyLeaderboard = {
        tournamentId: GolfIds.TournamentId;
        entries: [FantasyLeaderboardEntry];
        totalEntries: Nat;
        page: Nat;
    };

    public type FantasyLeaderboardEntry = {
        principalId: Ids.PrincipalId;
        username: Text;
        score: Int8;
        shots: Nat8;
        holes: [FantasyPredictionHole];
    };

    public type FantasyPredictionHole = {
        golferId: GolfIds.ProGolferId;
        shotCount: Nat8;
        par: Nat8;
        score: Int8;
    };

}

  