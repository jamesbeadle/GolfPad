import Enums "mo:waterway-mops/Enums";
import Result "mo:base/Result";
import GolferQueries "../queries/golfer_queries";
import GolferCommands "../commands/golfer_commands";
module {
  public class GolferManager() {

    public func getGolfer(dto: GolferQueries.GetGolfer) : Result.Result<GolferQueries.Golfer, Enums.Error> {
      return #err(#NotFound);
    };

    public func createGolfer(dto: GolferCommands.CreateGolfer) : Result.Result<(), Enums.Error> {
      return #err(#NotFound);
    };  

    public func updateGolfer(dto: GolferCommands.UpdateGolfer) : Result.Result<(), Enums.Error> {
      return #err(#NotFound);
    };  


  };
};
