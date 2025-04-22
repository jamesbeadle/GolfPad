import Enums "mo:waterway-mops/Enums";
import Result "mo:base/Result";
import Array "mo:base/Array";
import List "mo:base/List";
import Order "mo:base/Order";
import Buffer "mo:base/Buffer";
import GolferQueries "../queries/golfer_queries";
import GolferCommands "../commands/golfer_commands";

import Types "../data-types/types";
import Environment "../environment";
module {
  public class GolferManager() {

    private var golfers: [Types.Golfer] = [];

    public func getGolfer(dto: GolferQueries.GetGolfer) : Result.Result<GolferQueries.Golfer, Enums.Error> {
      let golfer = Array.find<Types.Golfer>(golfers, func(golfer: Types.Golfer) : Bool {
        golfer.id == dto.golferId;
      });
      switch(golfer) {
        case(?foundGolfer) { 
          return #ok({
            firstName = foundGolfer.firstName;
            golferId = foundGolfer.id;
            lastName = foundGolfer.lastName;
            nationality = foundGolfer.nationality;
            worldRanking = foundGolfer.worldRanking
          });
        };
        case(null) {
          return #err(#NotFound);
        };
      };
    };

    public func listGolfers(dto: GolferQueries.ListGolfers) : Result.Result<GolferQueries.Golfers, Enums.Error> {
      let allEntries = List.fromArray(golfers);
      let startIndex = dto.page * Environment.PAGINATION_ROW_COUNT;
      let droppedEntries = List.drop<Types.Golfer>(allEntries, startIndex);
      let paginatedEntires = List.take<Types.Golfer>(droppedEntries, Environment.PAGINATION_ROW_COUNT);
      let mappedEntries = List.map<Types.Golfer, GolferQueries.GolferSummary>(paginatedEntires, func(entry: Types.Golfer){
        return entry;
      });

      return #ok({
        entries = List.toArray<GolferQueries.GolferSummary>(mappedEntries);
        page = dto.page;
        totalEntries = List.size(allEntries);
      });
    };

    public func createGolfer(dto: GolferCommands.CreateGolfer) : Result.Result<(), Enums.Error> {

      let sortedGolfers = Array.sort(golfers, func(a: Types.Golfer, b: Types.Golfer) : Order.Order {
        if (a.id > b.id) { #less } 
        else if (a.id < b.id) { #greater }
        else { #equal }
      });

      var nextId: Nat16 = 1;

      if(Array.size(sortedGolfers) > 0){
        nextId := sortedGolfers[0].id + 1;
      };

      let golferBuffer = Buffer.fromArray<Types.Golfer>(sortedGolfers);
      golferBuffer.add({
        firstName = dto.firstName;
        id = nextId;
        lastName = dto.lastName;
        nationality = dto.nationality;
        worldRanking = dto.worldRanking;
      });

      return #ok();
    };  

    public func updateGolfer(dto: GolferCommands.UpdateGolfer) : Result.Result<(), Enums.Error> {

      //validate

      let golfer = Array.find(golfers, func(entry: Types.Golfer) : Bool {
        entry.id == dto.golferId
      });
      switch(golfer){
        case (?_){
          
          golfers := Array.map<Types.Golfer, Types.Golfer>(golfers, func(entry: Types.Golfer){
            if(entry.id == dto.golferId){
              return {
                id = entry.id;
                firstName = dto.firstName;
                lastName = dto.lastName;
                nationality = dto.nationality;
                worldRanking = dto.worldRanking;
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

    public func getStableGolfers() : [Types.Golfer] {
      return golfers;
    };

    public func setStableGolfers(stable_golfers: [Types.Golfer]) {
      golfers := stable_golfers;
    };


  };
};
