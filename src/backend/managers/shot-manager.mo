import T "../data-types/types";
import Result "mo:base/Result";
import ShotCommands "../commands/shot_commands";
import ShotQueries "../queries/shot_queries";

module {
  public class ShotManager() {

    var shots: [T.GolfShot] = [];

    public func addShot(dto: ShotCommands.AddShot) : async Result.Result<(), T.Error> {
      return #err(#NotFound); //TODO
    };

    public func getShot(dto: ShotQueries.GetShot) : async Result.Result<ShotQueries.Shot, T.Error> {
      return #err(#NotFound); //TODO
    };

    public func predictShot(dto: ShotQueries.PredictShot) : async Result.Result<ShotQueries.PredictedShot, T.Error> {
      return #err(#NotFound); //TODO
    };

    public func getStableShots() : [T.GolfShot] {
      return shots;
    };

    public func setStableShots(stable_shots : [T.GolfShot]) : () {
      shots := stable_shots;
    };

    

  };
};


    