import LeaderboardQueries "../queries/leaderboard_queries";
import Result "mo:base/Result";
import Enums "mo:waterway-mops/Enums";

module {
    public class LeaderboardManager() {
        public func getLeaderboard(dto: LeaderboardQueries.GetLeaderboard) : Result.Result<LeaderboardQueries.Leaderboard, Enums.Error> {
            return #err(#NotFound);
        };
    };
};
