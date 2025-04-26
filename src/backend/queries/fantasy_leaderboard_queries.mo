import Ids "mo:waterway-mops/Ids";
import MopsGolfIds "../mops_golf_ids";

module FantasyLeaderboardQueries {

    public type GetFantasyLeaderboard = {
        tournamentId: MopsGolfIds.TournamentId;
        page: Nat;
    };

    public type FantasyLeaderboard = {
        tournamentId: MopsGolfIds.TournamentId;
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
        golferId: MopsGolfIds.GolferId;
        shotCount: Nat8;
        par: Nat8;
        score: Int8;
    };

}

  