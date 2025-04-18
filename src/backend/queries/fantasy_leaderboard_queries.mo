import Types "../data-types/types";
import Ids "mo:waterway-mops/Ids";

module FantasyLeaderboardQueries {

    public type GetFantasyLeaderboard = {
        tournamentId: Types.TournamentId;
        page: Nat;
    };

    public type FantasyLeaderboard = {
        tournamentId: Types.TournamentId;
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
        golferId: Types.GolferId;
        shotCount: Nat8;
        par: Nat8;
        score: Int8;
    };

}

  