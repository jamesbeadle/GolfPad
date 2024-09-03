import Result "mo:base/Result";
import List "mo:base/List";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import T "../data-types/types";
import DTOs "../dtos/DTOs";

module {
  public class GameManager() {
    
    private var games: List.List<T.Game> = List.fromArray([]);
    private var nextGameId: T.GameId = 1;


    public func createGame(principalId: T.PrincipalId, dto: DTOs.CreateGameDTO) : Result.Result<(), T.Error> {

      //check the people invited to play are your friends

      //check date of game is in the today or later

      switch(dto.gameType){
        case (#Mulligans game){
          
      //check the correct number of people have been invited to play
        //max 3 including yourself
        };
        case (#Bands game){

      //check the correct number of people have been invited to play
        //max 3 including yourself
        };
        case (#BuildIt game){

        //since team game only one opponent team should have been selected
        };
        case (#NextUp game){

      //check the correct number of people have been invited to play
        //max 3 including yourself
        }
      };

      let newGame: T.Game = {
        courseId = dto.courseId;
        events = [];
        gameType = dto.gameType;
        id = 0;
        predictions = [];
        rounds = [];
        status = #Unplayed;
      };

      //create game canister instance and create game

      //send invites to the game


      return #err(#NotFound);
    };

    public func getUpcomingGames(principalId: T.PrincipalId, dto: DTOs.GetUpcomingGamesDTO) : Result.Result<DTOs.UpcomingGamesDTO, T.Error> {
      return #err(#NotFound);
    };

    public func getGame(principalId: T.PrincipalId, dto: DTOs.GetGameDTO) : Result.Result<DTOs.GameDTO, T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func sendGameInvite(principalId: T.PrincipalId, dto: DTOs.InviteGolferDTO) : Result.Result<(), T.Error>{
      //TODO: Checks
        return #err(#NotFound);
    };

    public func acceptGameInvite(principalId: T.PrincipalId, dto: DTOs.AccepteGameInviteDTO) : Result.Result<(), T.Error>{
      //TODO: Checks
        return #err(#NotFound);
    };

    public func submitBandsPrediction(principalId: T.PrincipalId, dto: DTOs.BandsPredictionDTO) : Result.Result<(), T.Error>{
      //TODO: Checks
        return #err(#NotFound);
    };

    public func addGameScore(principalId: T.PrincipalId, dto: DTOs.AddGameScoreDTO) : Result.Result<(), T.Error> {
        return #err(#NotFound);
    };

    //Stable variable backup:
    
    public func getStableGames() : [T.Game] {
      return List.toArray(games);
    };

    public func setStableGames(stable_games: [T.Game]){
      games := List.fromArray(stable_games);
    };

    public func getStableNextGameId() : T.GameId {
      return nextGameId;
    };

    public func setStableNextGameId(stable_next_game_id: T.GameId){
      nextGameId := stable_next_game_id;
    };

    

  };
};


    