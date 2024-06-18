import Result "mo:base/Result";
import List "mo:base/List";
import T "../data-types/types";
import DTOs "../dtos/DTOs";

module {
  public class GameManager() {

    private var games: List.List<T.Game> = List.fromArray([]);

    public func getStableGames() : [T.Game] {
      return List.toArray(games);
    };

    public func setStableGames(stable_games: [T.Game]){
      games := List.fromArray(stable_games);
    };
        
    public func createGame(principalId: T.PrincipalId, dto: DTOs.CreateGameDTO) : Result.Result<(), T.Error> {
        return #err(#NotFound);
    };

    public func sendGameInvite(principalId: T.PrincipalId, dto: DTOs.InviteGolferDTO) : Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public func aceceptGameInvite(principalId: T.PrincipalId, dto: DTOs.AccepteGameInviteDTO) : Result.Result<(), T.Error>{
        return #err(#NotFound);
    };

    public func addGameScore(principalId: T.PrincipalId, dto: DTOs.AddGameScoreDTO) : Result.Result<(), T.Error> {
        
        //anyone in the group can add it unless score updated by creator of game then cannot be overridden
        
        return #err(#NotFound);
    };

    public func getScorecard(principalId: T.PrincipalId, dto: DTOs.GetScorecardDTO) : Result.Result<(), T.Error> {
        return #err(#NotFound);
    };

    public func getUserGames(principalId: T.PrincipalId, dto: DTOs.GetUserGamesDTO) : Result.Result<[DTOs.GameDTO], T.Error> {
        return #err(#NotFound);
    };
  };
};


    