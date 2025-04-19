import Types "../data-types/types";
import TournamentCommands "../commands/tournament_commands";
import TournamentQueries "../queries/tournament_queries";
import Result "mo:base/Result";
import Array "mo:base/Array";
import List "mo:base/List";
import Buffer "mo:base/Buffer";
import Order "mo:base/Order";
import Enums "mo:waterway-mops/Enums";
import Environment "../environment";


module {
  public class TournamentManager() {

    private var tournaments: [Types.Tournament] = [];

    public func getTournament(dto: TournamentQueries.GetTournament) : Result.Result<TournamentQueries.Tournament, Enums.Error> {
      let tournament = Array.find(tournaments, func(entry: Types.Tournament) : Bool {
        entry.id == dto.tournamentId
      });
      switch(tournament){
        case (?foundTournament){
          return #ok({
            tournamentId = foundTournament.id;
          });
        };
        case (null){
          return #err(#NotFound); 
        }
      }
    };

    public func getTournamentInstance(dto: TournamentQueries.GetTournamentInstance) : Result.Result<TournamentQueries.TournamentInstance, Enums.Error> {
      let tournament = Array.find(tournaments, func(entry: Types.Tournament) : Bool {
        entry.id == dto.tournamentId
      });
      switch(tournament){
        case (?foundTournament){
          
          let instance = Array.find<Types.TournamentInstance>(foundTournament.instances, func(entry: Types.TournamentInstance) : Bool {
            return entry.year == dto.year;
          });
          switch(instance){
            case (?foundInstance){
              return #ok(
                {
                  tournamentId = dto.tournamentId; 
                  year = foundInstance.year; 
                  populated = foundInstance.populated; 
                  golfCourseId = foundInstance.golfCourseId;
                  startDate = foundInstance.startDate;
                  endDate = foundInstance.endDate;
                  leaderboard = foundInstance.leaderboard;
                  stage = foundInstance.stage;
                });
            };
            case (null){
              return #err(#NotFound);
            }
          }
        };
        case (null){
          return #err(#NotFound); 
        }
      }
    };
    
    public func listTournaments(dto: TournamentQueries.ListTournaments) : Result.Result<TournamentQueries.Tournaments, Enums.Error> {
      
      let allEntries = List.fromArray(tournaments);
      let startIndex = dto.page * Environment.PAGINATION_ROW_COUNT;
      let droppedEntries = List.drop<Types.Tournament>(allEntries, startIndex);
      let paginatedEntires = List.take<Types.Tournament>(droppedEntries, Environment.PAGINATION_ROW_COUNT);
      let mappedEntries = List.map<Types.Tournament, TournamentQueries.TournamentSummary>(paginatedEntires, func(entry: Types.Tournament){
        return {
          name = entry.name;
          tournamentId = entry.id;
        }
      });

      return #ok({
        entries = List.toArray<TournamentQueries.TournamentSummary>(mappedEntries);
        page = dto.page;
        totalEntries = List.size(allEntries);
      });
    };

    public func createTournament(dto: TournamentCommands.CreateTournament) : Result.Result<(), Enums.Error> {

      let sortedTournaments = Array.sort(tournaments, func(a: Types.Tournament, b: Types.Tournament) : Order.Order {
        if (a.id > b.id) { #less } 
        else if (a.id < b.id) { #greater }
        else { #equal }
      });

      var nextId: Nat16 = 1;

      if(Array.size(sortedTournaments) > 0){
        nextId := sortedTournaments[0].id + 1;
      };

      let tournamentBuffer = Buffer.fromArray<Types.Tournament>(tournaments);
      tournamentBuffer.add({
        id = nextId;
        name = dto.name;
        instances = [];
      });

      return #ok();
    };

    public func createTournamentInstance(dto: TournamentCommands.CreateTournamentInstance) : Result.Result<(), Enums.Error> {
      
      let tournament = Array.find(tournaments, func(entry: Types.Tournament) : Bool {
        entry.id == dto.tournamentId
      });
      switch(tournament){
        case (?foundTournament){
          
          let existingInstance = Array.find<Types.TournamentInstance>(foundTournament.instances, func(entry: Types.TournamentInstance) : Bool {
            entry.year == dto.year;
          });

          switch(existingInstance){
            case (?_){
              return #err(#AlreadyExists);
            };
            case (null){
              let instancesBuffer = Buffer.fromArray<Types.TournamentInstance>(foundTournament.instances);
              instancesBuffer.add({
                golfCourseId = dto.golfCourseId;
                startDate = dto.startDate;
                endDate = dto.endDate;
                leaderboard = {
                  entries = [];
                  totalEntries = 0;
                };
                populated = false;
                stage = #NotStarted;
                year = dto.year;
              });
              //set the tournament instance

              return #ok();
            }
          }
        };
        case (null){
          return #err(#NotFound); 
        }
      };
    };

    public func updateTournamentStage(dto: TournamentCommands.UpdateTournamentStage) : Result.Result<(), Enums.Error> {
      let tournament = Array.find(tournaments, func(entry: Types.Tournament) : Bool {
        entry.id == dto.tournamentId
      });
      switch(tournament){
        case (?_){
          
          tournaments := Array.map<Types.Tournament, Types.Tournament>(tournaments, func(entry: Types.Tournament){
            if(entry.id == dto.tournamentId){
              return {
                id = entry.id;
                name = entry.name;
                instances = Array.map<Types.TournamentInstance, Types.TournamentInstance>(entry.instances, func(instanceEntry: Types.TournamentInstance){
                  if(instanceEntry.year == dto.year){
                  
                    return {
                      golfCourseId = instanceEntry.golfCourseId;
                      endDate = instanceEntry.endDate;
                      leaderboard = instanceEntry.leaderboard;
                      stage = dto.stage;
                      startDate = instanceEntry.startDate;
                      year = instanceEntry.year;
                      populated = instanceEntry.populated;
                    }
                    
                  };
                  return instanceEntry;
                });
              }

            };
            return entry;
          });
          return #ok();
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func setPopulated(tournamentId: Types.TournamentId, year: Nat16) {
      let tournament = Array.find(tournaments, func(entry: Types.Tournament) : Bool {
        entry.id == tournamentId
      });
      switch(tournament){
        case (?_){
          
          tournaments := Array.map<Types.Tournament, Types.Tournament>(tournaments, func(entry: Types.Tournament){
            if(entry.id == tournamentId){
              return {
                id = entry.id;
                name = entry.name;
                instances = Array.map<Types.TournamentInstance, Types.TournamentInstance>(entry.instances, func(instanceEntry: Types.TournamentInstance){
                  if(instanceEntry.year == year){
                  
                    return {
                      golfCourseId = instanceEntry.golfCourseId;
                      endDate = instanceEntry.endDate;
                      leaderboard = instanceEntry.leaderboard;
                      stage = instanceEntry.stage;
                      startDate = instanceEntry.startDate;
                      year = instanceEntry.year;
                      populated = true;
                    }
                    
                  };
                  return instanceEntry;
                });
              }

            };
            return entry;
          });
        };
        case (null){};
      }
    };

    public func getStableTournaments() : [Types.Tournament] {
      return tournaments;
    };

    public func setStableTournaments(stable_tournaments : [Types.Tournament]) {
      tournaments := stable_tournaments;
    };

  };
};


    