
import Result "mo:base/Result";
import Array "mo:base/Array";
import List "mo:base/List";
import Buffer "mo:base/Buffer";
import Nat8 "mo:base/Nat8";
import Enums "mo:waterway-mops/Enums";
import Types "../data-types/types";
import FantasyLeaderboardQueries "../queries/fantasy_leaderboard_queries";
import Environment "../environment";
import GolfCourseQueries "../queries/golf_course_queries";

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

        public func addChunkToLeaderboard(tournamentId: Types.TournamentId, chunk: [Types.Prediction], golfCourse: GolfCourseQueries.GolfCourse) {
            
            let existingLeaderboard = Array.find<Types.FantasyLeaderboard>(leaderboards, func(entry: Types.FantasyLeaderboard) : Bool {
                entry.tournamentId == tournamentId;
            });

            switch(existingLeaderboard){
                case(?foundLeaderboard){

                    let entriesBuffer = Buffer.fromArray<Types.FantasyLeaderboardEntry>(foundLeaderboard.entries);
                    
                    let mappedPredictions = Array.map<Types.Prediction, Types.FantasyLeaderboardEntry>(chunk, func(entry: Types.Prediction){
                        return {
                            holes = Array.tabulate<Types.FantasyPredictionHole>(18, func(i: Nat) {
                                
                                let holeNumber = i + 1;
                                
                                let hole = Array.find(golfCourse.holes, func(holeEntry: GolfCourseQueries.GolfHole) : Bool { 
                                    return holeEntry.holeNumber == Nat8.fromNat(holeNumber); 
                                });
                                
                                let holePar: Nat8 = switch (hole) {
                                    case (?h) { h.par };
                                    case (null) { 0 };
                                };
                                
                                return switch (holeNumber) {
                                    case (1) { 
                                        return {
                                            hole = Nat8.fromNat(holeNumber);
                                            golferId = entry.hole1GolferId;
                                            shotCount = 0;
                                            par = holePar;
                                            score = 0;
                                        }
                                        };
                                    case (2) { 
                                        return {
                                            hole = Nat8.fromNat(holeNumber);
                                            golferId = entry.hole1GolferId;
                                            shotCount = 0;
                                            par = holePar;
                                            score = 0;
                                        }
                                        };
                                    case (3) { 
                                        return {
                                            hole = Nat8.fromNat(holeNumber);
                                            golferId = entry.hole1GolferId;
                                            shotCount = 0;
                                            par = holePar;
                                            score = 0;
                                        }
                                        };
                                    case (4) { 
                                        return {
                                            hole = Nat8.fromNat(holeNumber);
                                            golferId = entry.hole1GolferId;
                                            shotCount = 0;
                                            par = holePar;
                                            score = 0;
                                        }

                                        };
                                    case (5) { 
                                        return {
                                            hole = Nat8.fromNat(holeNumber);
                                            golferId = entry.hole1GolferId;
                                            shotCount = 0;
                                            par = holePar;
                                            score = 0;
                                        }
                                        };
                                    case (6) { 
                                        return {
                                            hole = Nat8.fromNat(holeNumber);
                                            golferId = entry.hole1GolferId;
                                            shotCount = 0;
                                            par = holePar;
                                            score = 0;
                                        }
                                        };
                                    case (7) { 
                                        return {
                                            hole = Nat8.fromNat(holeNumber);
                                            golferId = entry.hole1GolferId;
                                            shotCount = 0;
                                            par = holePar;
                                            score = 0;
                                        }
                                        };
                                    case (8) { 
                                        return {
                                            hole = Nat8.fromNat(holeNumber);
                                            golferId = entry.hole1GolferId;
                                            shotCount = 0;
                                            par = holePar;
                                            score = 0;
                                        }
                                        };
                                    case (9) { 
                                        return {
                                            hole = Nat8.fromNat(holeNumber);
                                            golferId = entry.hole1GolferId;
                                            shotCount = 0;
                                            par = holePar;
                                            score = 0;
                                        }
                                        };
                                    case (10) { 
                                        return {
                                            hole = Nat8.fromNat(holeNumber);
                                            golferId = entry.hole1GolferId;
                                            shotCount = 0;
                                            par = holePar;
                                            score = 0;
                                        }
                                        };
                                    case (11) { 
                                        return {
                                            hole = Nat8.fromNat(holeNumber);
                                            golferId = entry.hole1GolferId;
                                            shotCount = 0;
                                            par = holePar;
                                            score = 0;
                                        }
                                        };
                                    case (12) { 
                                        return {
                                            hole = Nat8.fromNat(holeNumber);
                                            golferId = entry.hole1GolferId;
                                            shotCount = 0;
                                            par = holePar;
                                            score = 0;
                                        }
                                        };
                                    case (13) { 
                                        return {
                                            hole = Nat8.fromNat(holeNumber);
                                            golferId = entry.hole1GolferId;
                                            shotCount = 0;
                                            par = holePar;
                                            score = 0;
                                        }
                                        };
                                    case (14) { 
                                        return {
                                            hole = Nat8.fromNat(holeNumber);
                                            golferId = entry.hole1GolferId;
                                            shotCount = 0;
                                            par = holePar;
                                            score = 0;
                                        }
                                        };
                                    case (15) { 
                                        return {
                                            hole = Nat8.fromNat(holeNumber);
                                            golferId = entry.hole1GolferId;
                                            shotCount = 0;
                                            par = holePar;
                                            score = 0;
                                        }
                                        };
                                    case (16) { 
                                        return {
                                            hole = Nat8.fromNat(holeNumber);
                                            golferId = entry.hole1GolferId;
                                            shotCount = 0;
                                            par = holePar;
                                            score = 0;
                                        }
                                        };
                                    case (17) { 
                                        return {
                                            hole = Nat8.fromNat(holeNumber);
                                            golferId = entry.hole1GolferId;
                                            shotCount = 0;
                                            par = holePar;
                                            score = 0;
                                        }
                                        };
                                    case (18) { 
                                        return {
                                            hole = Nat8.fromNat(holeNumber);
                                            golferId = entry.hole1GolferId;
                                            shotCount = 0;
                                            par = holePar;
                                            score = 0;
                                        }
                                        };
                                    case (_) { 
                                        return {
                                            hole = Nat8.fromNat(holeNumber);
                                            golferId = entry.hole1GolferId;
                                            shotCount = 0;
                                            par = holePar;
                                            score = 0;
                                        }
                                        };
                                };
                            });
                            principalId = entry.principalId;
                            score = 0;
                            shots = 0;
                        }
                    });

                    entriesBuffer.append(Buffer.fromArray(mappedPredictions));

                    let updatedLeaderboard: Types.FantasyLeaderboard = {
                        entries = Buffer.toArray(entriesBuffer);
                        tournamentId = foundLeaderboard.tournamentId;
                    };

                    let leaderboardBuffer = Buffer.fromArray<Types.FantasyLeaderboard>(leaderboards);
                    leaderboardBuffer.add(updatedLeaderboard);
                    leaderboards := Buffer.toArray(leaderboardBuffer);
                    
                };
                case (null){

                    let newLeaderboard: Types.FantasyLeaderboard = {
                        entries = Array.map<Types.Prediction, Types.FantasyLeaderboardEntry>(chunk, func(entry: Types.Prediction){
                            return {

                                holes = Array.tabulate<Types.FantasyPredictionHole>(18, func(i: Nat) {
                                    
                                    let holeNumber = i + 1;
                                    
                                    let hole = Array.find(golfCourse.holes, func(holeEntry: GolfCourseQueries.GolfHole) : Bool { 
                                        return holeEntry.holeNumber == Nat8.fromNat(holeNumber); 
                                    });
                                    
                                    let holePar: Nat8 = switch (hole) {
                                        case (?h) { h.par };
                                        case (null) { 0 };
                                    };
                                    
                                    return switch (holeNumber) {
                                        case (1) { 
                                            return {
                                                hole = Nat8.fromNat(holeNumber);
                                                golferId = entry.hole1GolferId;
                                                shotCount = 0;
                                                par = holePar;
                                                score = 0;
                                            }
                                         };
                                        case (2) { 
                                            return {
                                                hole = Nat8.fromNat(holeNumber);
                                                golferId = entry.hole1GolferId;
                                                shotCount = 0;
                                                par = holePar;
                                                score = 0;
                                            }
                                         };
                                        case (3) { 
                                            return {
                                                hole = Nat8.fromNat(holeNumber);
                                                golferId = entry.hole1GolferId;
                                                shotCount = 0;
                                                par = holePar;
                                                score = 0;
                                            }
                                         };
                                        case (4) { 
                                            return {
                                                hole = Nat8.fromNat(holeNumber);
                                                golferId = entry.hole1GolferId;
                                                shotCount = 0;
                                                par = holePar;
                                                score = 0;
                                            }

                                         };
                                        case (5) { 
                                            return {
                                                hole = Nat8.fromNat(holeNumber);
                                                golferId = entry.hole1GolferId;
                                                shotCount = 0;
                                                par = holePar;
                                                score = 0;
                                            }
                                         };
                                        case (6) { 
                                            return {
                                                hole = Nat8.fromNat(holeNumber);
                                                golferId = entry.hole1GolferId;
                                                shotCount = 0;
                                                par = holePar;
                                                score = 0;
                                            }
                                         };
                                        case (7) { 
                                            return {
                                                hole = Nat8.fromNat(holeNumber);
                                                golferId = entry.hole1GolferId;
                                                shotCount = 0;
                                                par = holePar;
                                                score = 0;
                                            }
                                         };
                                        case (8) { 
                                            return {
                                                hole = Nat8.fromNat(holeNumber);
                                                golferId = entry.hole1GolferId;
                                                shotCount = 0;
                                                par = holePar;
                                                score = 0;
                                            }
                                         };
                                        case (9) { 
                                            return {
                                                hole = Nat8.fromNat(holeNumber);
                                                golferId = entry.hole1GolferId;
                                                shotCount = 0;
                                                par = holePar;
                                                score = 0;
                                            }
                                         };
                                        case (10) { 
                                            return {
                                                hole = Nat8.fromNat(holeNumber);
                                                golferId = entry.hole1GolferId;
                                                shotCount = 0;
                                                par = holePar;
                                                score = 0;
                                            }
                                         };
                                        case (11) { 
                                            return {
                                                hole = Nat8.fromNat(holeNumber);
                                                golferId = entry.hole1GolferId;
                                                shotCount = 0;
                                                par = holePar;
                                                score = 0;
                                            }
                                         };
                                        case (12) { 
                                            return {
                                                hole = Nat8.fromNat(holeNumber);
                                                golferId = entry.hole1GolferId;
                                                shotCount = 0;
                                                par = holePar;
                                                score = 0;
                                            }
                                         };
                                        case (13) { 
                                            return {
                                                hole = Nat8.fromNat(holeNumber);
                                                golferId = entry.hole1GolferId;
                                                shotCount = 0;
                                                par = holePar;
                                                score = 0;
                                            }
                                         };
                                        case (14) { 
                                            return {
                                                hole = Nat8.fromNat(holeNumber);
                                                golferId = entry.hole1GolferId;
                                                shotCount = 0;
                                                par = holePar;
                                                score = 0;
                                            }
                                         };
                                        case (15) { 
                                            return {
                                                hole = Nat8.fromNat(holeNumber);
                                                golferId = entry.hole1GolferId;
                                                shotCount = 0;
                                                par = holePar;
                                                score = 0;
                                            }
                                         };
                                        case (16) { 
                                            return {
                                                hole = Nat8.fromNat(holeNumber);
                                                golferId = entry.hole1GolferId;
                                                shotCount = 0;
                                                par = holePar;
                                                score = 0;
                                            }
                                         };
                                        case (17) { 
                                            return {
                                                hole = Nat8.fromNat(holeNumber);
                                                golferId = entry.hole1GolferId;
                                                shotCount = 0;
                                                par = holePar;
                                                score = 0;
                                            }
                                         };
                                        case (18) { 
                                            return {
                                                hole = Nat8.fromNat(holeNumber);
                                                golferId = entry.hole1GolferId;
                                                shotCount = 0;
                                                par = holePar;
                                                score = 0;
                                            }
                                         };
                                        case (_) { 
                                            return {
                                                hole = Nat8.fromNat(holeNumber);
                                                golferId = entry.hole1GolferId;
                                                shotCount = 0;
                                                par = holePar;
                                                score = 0;
                                            }
                                         };
                                    };
                                });
                                principalId = entry.principalId;
                                score = 0;
                                shots = 0;
                            }
                        });
                        tournamentId = tournamentId;
                    };
                    
                    let leaderboardBuffer = Buffer.fromArray<Types.FantasyLeaderboard>(leaderboards);
                    leaderboardBuffer.add(newLeaderboard);
                    leaderboards := Buffer.toArray(leaderboardBuffer);
                }
            };
        };

        public func calculateLeaderboard(tournamentId: Types.TournamentId) {
            //populate all the golfer scores and shot count
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
