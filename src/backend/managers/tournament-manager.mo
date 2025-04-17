import Types "../data-types/types";
import TournamentCommands "../commands/tournament_commands";
import Result "mo:base/Result";
import Enums "mo:waterway-mops/Enums";


module {
  public class TournamentManager() {

    private var tournaments: [Types.Tournament] = [];

    public func updateTournamentStage(dto: TournamentCommands.UpdateTournamentStage) : Result.Result<(), Enums.Error> {
      return #err(#NotFound);
    };

    public func getStableTournaments() : [Types.Tournament] {
      return tournaments;
    };

    public func setStableTournaments(stable_tournaments : [Types.Tournament]) : () {
      tournaments := stable_tournaments;
    };

  };
};


    