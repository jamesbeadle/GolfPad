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
        populated = false;
        tournamentResults = [];
      });

      return #err(#NotFound);
    };

    public func updateTournamentStage(dto: TournamentCommands.UpdateTournamentStage) : Result.Result<(), Enums.Error> {
      return #err(#NotFound);
    };

    public func setPopulated(tournamentId: Types.TournamentId) {
      //TODO
    };

    public func isPopulated(tournamentId: Types.TournamentId) : Bool {
      return false;
    };

    public func getStableTournaments() : [Types.Tournament] {
      return tournaments;
    };

    public func setStableTournaments(stable_tournaments : [Types.Tournament]) {
      tournaments := stable_tournaments;
    };

  };
};


    