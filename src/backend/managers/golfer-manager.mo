import Enums "mo:waterway-mops/Enums";
import Result "mo:base/Result";
import Array "mo:base/Array";
import GolferQueries "../queries/golfer_queries";
import GolferCommands "../commands/golfer_commands";

import Types "../data-types/types";
module {
  public class GolferManager() {

    private var golfers: [Types.Golfer] = [];

    public func getGolfer(dto: GolferQueries.GetGolfer) : Result.Result<GolferQueries.Golfer, Enums.Error> {
      let golfer = Array.find<Types.Golfer>(golfers, func(golfer: Types.Golfer) : Bool {
        golfer.id == dto.golferId;
      });
      switch(golfer) {
        case(?foundGolfer) { 
          return #ok(foundGolfer);
        };
        case(null) {
          return #err(#NotFound);
        };
      };
    };

    public func createGolfer(dto: GolferCommands.CreateGolfer) : Result.Result<(), Enums.Error> {

      //validate

      //add

      return #err(#NotFound);
    };  

    public func updateGolfer(dto: GolferCommands.UpdateGolfer) : Result.Result<(), Enums.Error> {

      //validate

      //update

      return #err(#NotFound);
    };  

    public func getStableGolfers() : [Types.Golfer] {
      return golfers;
    };

    public func setStableGolfers(stable_golfers: [Types.Golfer]) {
      golfers := stable_golfers;
    };


  };
};
