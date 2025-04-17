import Types "../data-types/types";


module {
  public class TournamentManager() {

    private var tournaments: [Types.Tournament] = [];

    public func getStableTournaments() : [Types.Tournament] {
      return tournaments;
    };

    public func setStableTournaments(stable_tournaments : [Types.Tournament]) : () {
      tournaments := stable_tournaments;
    };

  };
};


    