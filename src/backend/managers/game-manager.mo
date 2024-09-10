import Result "mo:base/Result";
import List "mo:base/List";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Time "mo:base/Time";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import T "../data-types/types";
import DTOs "../dtos/DTOs";

module {
  public class GameManager() {

    private var gameCanisterIndex: TrieMap.TrieMap<T.PrincipalId, T.CanisterId> = TrieMap.TrieMap<T.PrincipalId, T.CanisterId>(Text.equal, Text.hash);
    private var activeCanisterId: T.CanisterId = "";
    private var uniqueGameCanisterIds : List.List<T.CanisterId> = List.nil();
    private var totalGames : Nat = 0;

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
        courseSnapshot = {
          courseId = 0;
          dateAdded = Time.now(); holes = []; id = 0; name = ""; 
          teeGroup = {
            added = 0;
            colour = "";
            difficultyIndex = 0;
            holes = [];
            name = "";
          }; //todo
        }
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

    public func createTeam(principalId: T.PrincipalId, dto: DTOs.CreateTeamDTO  ) : Result.Result<(), T.Error>{
      //TODO: Checks
        return #err(#NotFound);
    };

    public func getTeam(principalId: T.PrincipalId, dto: DTOs.GetTeamDTO) : Result.Result<DTOs.TeamDTO, T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func updateTeam(principalId: T.PrincipalId, dto: DTOs.UpdateTeamDTO  ) : Result.Result<(), T.Error>{
      //TODO: Checks
        return #err(#NotFound);
    };
    

    //Stable variable backup:
    
    

    //stable storage getters and setters

    public func getStableCanisterIndex() : [(T.PrincipalId, T.CanisterId)]{
      return Iter.toArray(gameCanisterIndex.entries());
    };

    public func setStableCanisterIndex(stable_game_canister_index: [(T.PrincipalId, T.CanisterId)]){
      let canisterIds : TrieMap.TrieMap<T.PrincipalId, T.CanisterId> = TrieMap.TrieMap<T.PrincipalId, T.CanisterId>(Text.equal, Text.hash);

      for (canisterId in Iter.fromArray(stable_game_canister_index)) {
        canisterIds.put(canisterId);
      };
      gameCanisterIndex := canisterIds;
    };

    public func getStableActiveCanisterId() : T.CanisterId {
      return activeCanisterId;
    };

    public func setStableActiveCanisterId(stable_active_canister_id: T.CanisterId){
      activeCanisterId := stable_active_canister_id;
    };  

    public func getStableUniqueCanisterIds() : [T.CanisterId] {
      return List.toArray(uniqueGameCanisterIds);
    };

    public func setStableUniqueCanisterIds(stable_unique_canister_ids : [T.CanisterId]) : () {
      let canisterIdBuffer = Buffer.fromArray<T.CanisterId>([]);

      for (canisterId in Iter.fromArray(stable_unique_canister_ids)) {
        canisterIdBuffer.add(canisterId);
      };
      uniqueGameCanisterIds := List.fromArray(Buffer.toArray(canisterIdBuffer));
    };

    public func getStableTotalGames() : Nat {
      return totalGames;
    };

    public func setStableTotalGames(stable_total_games : Nat) : () {
      totalGames := stable_total_games;
    };

    

  };
};


    