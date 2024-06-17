import Result "mo:base/Result";
import T "../data-types/types";
import DTOs "../dtos/DTOs";

module {
  public class GameManager() {
    
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
      return #err(#NotFound);
  };

  public func getScorecard(principalId: T.PrincipalId, dto: DTOs.GetScorecardDTO) : Result.Result<(), T.Error> {
      return #err(#NotFound);
  };

  public func getGameLeaderboard(principalId: T.PrincipalId, dto: DTOs.GetGameLeaderboardDTO) : Result.Result<DTOs.GameLeaderboardDTO, T.Error> {
      return #err(#NotFound);
  };

  public func getGameHistory(principalId: T.PrincipalId, dto: DTOs.GetGameHistoryDTO) : Result.Result<DTOs.GameLeaderboardDTO, T.Error> {
      return #err(#NotFound);
  };
  };
};


    