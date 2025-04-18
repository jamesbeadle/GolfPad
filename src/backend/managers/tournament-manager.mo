import Types "../data-types/types";
import TournamentCommands "../commands/tournament_commands";
import TournamentQueries "../queries/tournament_queries";
import Result "mo:base/Result";
import Enums "mo:waterway-mops/Enums";


module {
  public class TournamentManager() {

    private var tournaments: [Types.Tournament] = [];


    public func getTournament(_: TournamentQueries.GetTournament) : Result.Result<TournamentQueries.Tournament, Enums.Error> {
      return #err(#NotFound);
    };
    
    public func listTournaments(dto: TournamentQueries.ListTournaments) : Result.Result<TournamentQueries.Tournaments, Enums.Error> {
      return #err(#NotFound);
    };

    public func createTournament(dto: TournamentCommands.CreateTournament) : Result.Result<(), Enums.Error> {
      return #err(#NotFound);
    };

    public func updateTournamentStage(dto: TournamentCommands.UpdateTournamentStage) : Result.Result<(), Enums.Error> {
      return #err(#NotFound);
    };

    public func getTournamentStatus() : Result.Result<Types.TournamentStage, Enums.Error> {
      //find and get status
      return #err(#NotFound);
    };

    public func getStableTournaments() : [Types.Tournament] {
      return tournaments;
    };

    public func setStableTournaments(stable_tournaments : [Types.Tournament]) {
      tournaments := stable_tournaments;
    };

  };
};


    