import LeaderboardQueries "../queries/leaderboard_queries";
import Result "mo:base/Result";
import Enums "mo:waterway-mops/Enums";
import Types "../data-types/types";

module {
    public class FantasyLeaderboardManager() {

        private var leaderboards: [Types.FantasyLeaderboard] = [];

        public func getLeaderboard(dto: LeaderboardQueries.GetLeaderboard) : Result.Result<LeaderboardQueries.Leaderboard, Enums.Error> {
            return #err(#NotFound);
        };

        public func getStableLeaderboards() : [Types.FantasyLeaderboard] {
            return leaderboards;
        };

        public func setStableLeaderboards(stable_leaderboards : [Types.FantasyLeaderboard]) : () {
            leaderboards := stable_leaderboards;
        };
    };
};
