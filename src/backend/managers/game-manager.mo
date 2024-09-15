import Result "mo:base/Result";
import List "mo:base/List";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import T "../data-types/types";
import DTOs "../dtos/DTOs";
import Management "../utilities/Management";
import GameCanister "../canister-definitions/game-canister";
import Utilities "../utilities/Utilities";
import Environment "../utilities/Environment";
import Cycles "mo:base/ExperimentalCycles";
import Option "mo:base/Option";

module {
  public class GameManager() {

    private var gameCanisterIndex: TrieMap.TrieMap<T.GameId, T.CanisterId> = TrieMap.TrieMap<T.GameId, T.CanisterId>(Utilities.eqNat, Utilities.hashNat);
    private var activeCanisterId: T.CanisterId = "";
    private var uniqueGameCanisterIds : List.List<T.CanisterId> = List.nil();
    private var totalGames : Nat = 0;

    public func createGame(dto: DTOs.CreateGameDTO, courseSnapshot: DTOs.GolfCourseSnaphotDTO) : async Result.Result<T.GameId, T.Error> {
      
      assert Option.isNull(Array.find<T.PrincipalId>(dto.inviteIds, func(playerId: T.PrincipalId){ playerId == dto.createdById  }));
      
      let totalPlayers = 1 + Array.size(dto.inviteIds); 

      switch(dto.gameType){
        case (#Mulligans){
          assert totalPlayers == 1;
        };
        case (#Bands){
          assert totalPlayers >= 1 and totalPlayers <= 4;
        };
        case (#NextUp){
          assert totalPlayers >= 1 and totalPlayers <= 4;
        };
        case _ {
          return #err(#NotFound);
        } 
      };

      var game_canister = actor (activeCanisterId) : actor {
        createGame : (dto: DTOs.CreateGameDTO, courseSnapshot: DTOs.GolfCourseSnaphotDTO) -> async Result.Result<T.GameId, T.Error>;
        getLatestId : () -> async T.GameId;
        isCanisterFull : () -> async Bool;
      };

      switch(activeCanisterId){
        case "" {
          await createNewCanister(1);
          game_canister := actor (activeCanisterId) : actor {
            createGame : (dto: DTOs.CreateGameDTO, courseSnapshot: DTOs.GolfCourseSnaphotDTO) -> async Result.Result<T.GameId, T.Error>;
            getLatestId : () -> async T.GameId;
            isCanisterFull : () -> async Bool;
          };
        };
        case _ {
          let isCanisterFull = await game_canister.isCanisterFull(); 
          if(isCanisterFull){
            let latestId = await game_canister.getLatestId();
            let nextId: T.GameId = latestId + 1;
            await createNewCanister(nextId);
            game_canister := actor (activeCanisterId) : actor {
              createGame : (dto: DTOs.CreateGameDTO, courseSnapshot: DTOs.GolfCourseSnaphotDTO) -> async Result.Result<T.GameId, T.Error>;
              getLatestId : () -> async T.GameId;
              isCanisterFull : () -> async Bool;
            };
          };
        }
      };

      return await game_canister.createGame(dto, courseSnapshot);
    };

    public func getGame(dto: DTOs.GetGameDTO) : async Result.Result<DTOs.GameDTO, T.Error> {
      let gameCanisterId = gameCanisterIndex.get(dto.gameId);
      switch(gameCanisterId){
        case (?foundCanisterId){
          let game_canister = actor (foundCanisterId) : actor {
            getGame : (dto: DTOs.GetGameDTO) -> async Result.Result<DTOs.GameDTO, T.Error>;
          };
          return await game_canister.getGame(dto);
        };
        case _ { }
      };     
      return #err(#NotFound);
    };

    public func addGameInvites(dto: DTOs.AddGameInvitesDTO) : async Result.Result<(), T.Error>{
      let gameCanisterId = gameCanisterIndex.get(dto.gameId);
      switch(gameCanisterId){
        case (?foundCanisterId){
          let game_canister = actor (foundCanisterId) : actor {
            addGameInvites : (dto: DTOs.AddGameInvitesDTO) -> async Result.Result<(), T.Error>;
          };
          return await game_canister.addGameInvites(dto);
        };
        case _ { }
      };  
      return #err(#NotFound);
    };

    public func acceptGameInvite( dto: DTOs.AcceptGameInviteDTO) : async Result.Result<(), T.Error>{
      let gameCanisterId = gameCanisterIndex.get(dto.gameId);
      switch(gameCanisterId){
        case (?foundCanisterId){
          let game_canister = actor (foundCanisterId) : actor {
            acceptGameInvite : (dto: DTOs.AcceptGameInviteDTO) -> async Result.Result<(), T.Error>;
          };
          return await game_canister.acceptGameInvite(dto);
        };
        case _ { }
      };  
      return #err(#NotFound);
    };

    public func addGameScore(submittedById: T.PrincipalId, dto: DTOs.AddGameScoreDTO) :async  Result.Result<(), T.Error> {
      
      let existingGame = await getGame({ gameId = dto.gameId });

      switch(existingGame){
        case (#ok foundGame){

          let playerInGame = Option.isSome(Array.find<T.PrincipalId>(foundGame.playerIds, func(playerId: T.PrincipalId){
            playerId == submittedById;
          }));

          if(not playerInGame){
            return #err(#NotAllowed);
          };

          let gameCanisterId = gameCanisterIndex.get(foundGame.id);
          switch(gameCanisterId){
            case (?foundCanisterId){
              let game_canister = actor (foundCanisterId) : actor {
                addGameScore : (dto: DTOs.AddGameScoreDTO) -> async Result.Result<(), T.Error>;
              };
              return await game_canister.addGameScore(dto);
            };
            case _ { }
          };  
          return #err(#NotFound);
        };
        case (#err _) { return #err(#NotFound) };
      };
      
      
    };

    public func beginGame(golferPrincipalId: T.PrincipalId, dto: DTOs.BeginGameDTO) : async Result.Result<(), T.Error> {
      let existingGame = await getGame({ gameId = dto.gameId });

      switch(existingGame){
        case (#ok foundGame){
          
          if(foundGame.status != #Unplayed){
            return #err(#NotAllowed);
          };

          if(golferPrincipalId != foundGame.playerIds[0]){
            return #err(#NotAllowed);
          };

          let gameCanisterId = gameCanisterIndex.get(foundGame.id);
          switch(gameCanisterId){
            case (?foundCanisterId){
              let game_canister = actor (foundCanisterId) : actor {
                beginGame : (dto: DTOs.BeginGameDTO) -> async Result.Result<(), T.Error>;
              };
              return await game_canister.beginGame(dto);
            };
            case _ { }
          };  
          return #err(#NotFound);
        };
        case (#err _) { return #err(#NotFound) };
      };
    };

    private func createNewCanister(nextId: T.GameId) : async (){
      Cycles.add<system>(10_000_000_000_000);
      let canister = await GameCanister._GameCanister();
      let IC : Management.Management = actor (Environment.Default);
      let principal = ?Principal.fromText(Environment.BACKEND_CANISTER_ID);
      let _ = await Utilities.updateCanister_(canister, principal, IC);

      let canister_principal = Principal.fromActor(canister);
      let canisterId = Principal.toText(canister_principal);

      if (canisterId == "") {
        return;
      };

      var new_canister = actor (canisterId) : actor {
        updateNextId : (nextId: T.GameId) -> async ();
      };

      await new_canister.updateNextId(nextId);

      let uniqueCanisterIdBuffer = Buffer.fromArray<T.CanisterId>(List.toArray(uniqueGameCanisterIds));
      uniqueCanisterIdBuffer.add(canisterId);
      uniqueGameCanisterIds := List.fromArray(Buffer.toArray(uniqueCanisterIdBuffer));
      activeCanisterId := canisterId;
      return;
    };
    
    //stable storage getters and setters

    public func getStableCanisterIndex() : [(T.GameId, T.CanisterId)]{
      return Iter.toArray(gameCanisterIndex.entries());
    };

    public func setStableCanisterIndex(stable_game_canister_index: [(T.GameId, T.CanisterId)]){
      let canisterIds : TrieMap.TrieMap<T.GameId, T.CanisterId> = TrieMap.TrieMap<T.GameId, T.CanisterId>(Utilities.eqNat, Utilities.hashNat);

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


    