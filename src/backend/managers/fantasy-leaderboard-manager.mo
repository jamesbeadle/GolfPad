
import Result "mo:base/Result";
import Array "mo:base/Array";
import List "mo:base/List";
import Enums "mo:waterway-mops/Enums";
import Types "../data-types/types";
import FantasyLeaderboardQueries "../queries/fantasy_leaderboard_queries";
import Environment "../environment";

module {
    public class FantasyLeaderboardManager() {

        private var leaderboards: [Types.FantasyLeaderboard] = [];

        public func getLeaderboard(dto: FantasyLeaderboardQueries.GetFantasyLeaderboard) : Result.Result<FantasyLeaderboardQueries.FantasyLeaderboard, Enums.Error> {
            let leaderboard = Array.find(leaderboards, func(entry: Types.FantasyLeaderboard) : Bool {
                entry.tournamentId == dto.tournamentId
            });

            switch(leaderboard){
                case (?foundLeaderboard){

                    let allEntries = List.fromArray(foundLeaderboard.entries);
                    let startIndex = dto.page * Environment.PAGINATION_ROW_COUNT;
                    let droppedEntries = List.drop<Types.FantasyLeaderboardEntry>(allEntries, startIndex);
                    let paginatedEntires = List.take<Types.FantasyLeaderboardEntry>(droppedEntries, Environment.PAGINATION_ROW_COUNT);

                    return #ok({
                        entries = List.toArray(paginatedEntires);
                        tournamentId = foundLeaderboard.tournamentId;
                        page = dto.page;
                        totalEntries = List.size(allEntries);
                    });
                };
                case (null){
                    return #err(#NotFound);
                }
            };
        };

        public func getStableLeaderboards() : [Types.FantasyLeaderboard] {
            return leaderboards;
        };

        public func setStableLeaderboards(stable_leaderboards : [Types.FantasyLeaderboard]) : () {
            leaderboards := stable_leaderboards;
        };
    };
};
