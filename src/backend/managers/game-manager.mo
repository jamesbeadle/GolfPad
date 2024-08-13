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
        
    public func createGame(principalId: T.PrincipalId, dto: DTOs.CreateGameDTO) : Result.Result<T.GameId, T.Error> {

      //TODO: Checks
      //TODO: check game setup is valid


      
        //check game type
        //a valid game selection
        //date in the future
        //more than one player
        //check course exists


      let gamesBuffer = Buffer.fromArray<T.Game>(List.toArray(games));
      let newGame: T.Game = {
        courseId = dto.courseId;
        entryRequirement = dto.entryRequirement;
        gameType = dto.gameType;
        id = nextGameId;
        prizeSetup = dto.prizeSetup;
        rounds = [];
        status = #Unplayed;
        events = [];
        predictions = [];
      };
      gamesBuffer.add(newGame);

      games := List.fromArray(Buffer.toArray<T.Game>(gamesBuffer));

      nextGameId := nextGameId + 1;
      
      return #ok(newGame.id); 
    };

    public func sendGameInvite(principalId: T.PrincipalId, dto: DTOs.InviteGolferDTO) : Result.Result<(), T.Error>{
      //TODO: Checks
        return #err(#NotFound);
    };

    public func aceceptGameInvite(principalId: T.PrincipalId, dto: DTOs.AccepteGameInviteDTO) : Result.Result<(), T.Error>{
      //TODO: Checks
        return #err(#NotFound);
    };

    public func updateGameStatus(principalId: T.PrincipalId, dto: DTOs.UpdateGameStatusDTO) : Result.Result<(), T.Error> {
      //TODO: Checks
        
        return #err(#NotFound);
    };

    public func addGameScore(principalId: T.PrincipalId, dto: DTOs.AddGameScoreDTO) : Result.Result<(), T.Error> {
      //TODO: Checks on the dto data


      let game: ?T.Game = List.find<T.Game>(games, func(game: T.Game){
        game.id == dto.gameId;
      });

      switch(game){
        case (null){
          return #err(#NotFound);
        };
        case (?foundGame){

          //TODO: Check principal id is in group

          //TODO: Override existing score unless group creator has added the score then it can't be done
          
          calculateGame(foundGame);
          return #ok;
        }
      };

    };

    public func getScorecard(principalId: T.PrincipalId, dto: DTOs.GetScorecardDTO) : Result.Result<(), T.Error> {
      //TODO: Checks
        return #err(#NotFound);
    };

    public func getGames(principalId: T.PrincipalId, dto: DTOs.GetGamesDTO) : Result.Result<[DTOs.GameDTO], T.Error> {
      //TODO: Checks
        return #err(#NotFound);
    };

    public func getLeaderboard(dto: DTOs.GetLeaderboardDTO) : Result.Result<DTOs.LeaderboardDTO, T.Error> {
      //TODO: Checks
        return #err(#NotFound);
    };


    //Data manipulation functions

    private func calculateGame(game: T.Game){
      switch(game.gameType){
        case (#Bands){
          calculateBands(game);
        };
        case (#Prophet){
          calculateProphet(game);
        };
        case (#Mulligans){
          calculateMulligans(game);
        };
        case (#NextUp){
          calculateNextUp(game);
        };
        case (#CallIt){
          calculateCallIt(game);
        };
        case (#BuildIt){
          calculateBuildIt(game);
        };
      };
    };

    private func calculateBands(game: T.Game){



      switch(game.gameType){
        case (#Bands){

          for(prediction in Iter.fromArray(game.predictions)){

            let golferEvents = Array.filter<T.GolferEvent>(game.events, func(golferEvent: T.GolferEvent){
              switch(prediction){
                case (#Bands bandsPrediction){
                  golferEvent.golferId == bandsPrediction.golferId;
                };
                case _ {
                  return false;
                };
              };
            });

            /*

            let nonLoseBallEvents = Array.filter<T.GolferEvent>(golferEvents, func(golferEvent: T.GolferEvent)){
              
            }
            */

            //for non lose ball
              //get the hole they said they would not lose a ball on
                //confirm there is no ball lost event for this user for this hole and the next 2 holes
                  //if so add 10 point


            //Get the events for the prediction related to this player
            
            //

            //calculate the score for the current prediction

            //update the points on the prediction

          //get the actual scores and compare what they said they would get against what they actually got

          };

          //product a leaderboard from the predictions


        };
        case _ { };
      };

      //TODO: calculate based on rules

      //TODO: set the score for each player

      //TODO: produce game leaderboard
      
    };

    private func calculateProphet(game: T.Game){
      
    };

    private func calculateMulligans(game: T.Game){
      //set mulligans
      //calculate score
    };

    private func calculateNextUp(game: T.Game){
      
    };

    private func calculateCallIt(game: T.Game){
      
    };

    private func calculateBuildIt(game: T.Game){
      
    };
  };
};


    