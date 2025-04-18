
import Result "mo:base/Result";
import Array "mo:base/Array";
import List "mo:base/List";
import Buffer "mo:base/Buffer";
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

        public func addChunkToLeaderboard(tournamentId: Types.TournamentId, chunk: [Types.Prediction]) {
            
            let existingLeaderboard = Array.find<Types.FantasyLeaderboard>(leaderboards, func(entry: Types.FantasyLeaderboard) : Bool {
                entry.tournamentId == tournamentId;
            });

            switch(existingLeaderboard){
                case(?foundLeaderboard){
                    let entriesBuffer = Buffer.fromArray<Types.FantasyLeaderboardEntry>(foundLeaderboard.entries);
                    /*
                    let mappedEntries = Array.map<Types.Prediction, Types.FantasyLeaderboardEntry>(chunk, func(entry: Types.Prediction){
                        return {
                            holes = [
                                {
                                    
                                }
                            ];
                            principalId = entry.principalId;
                            score : Int8;
                            shots : Nat8

                        };
                    });
                    */
                };
                case (null){
                    //create new
                }
            };
            
            //Based on a batch number transfer the data into here
        };

        public func calculateLeaderboard(tournamentId: Types.TournamentId) {
            //sort all the chunks
            //using all the player information calculate the leaderboard
            //add in leaderbaord positions and position text
        };

        public func getStableLeaderboards() : [Types.FantasyLeaderboard] {
            return leaderboards;
        };

        public func setStableLeaderboards(stable_leaderboards : [Types.FantasyLeaderboard]) : () {
            leaderboards := stable_leaderboards;
        };
    };
};
