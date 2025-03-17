import Result "mo:base/Result";
import List "mo:base/List";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Cycles "mo:base/ExperimentalCycles";
import Option "mo:base/Option";

import T "../data-types/types";
import Management "../utilities/Management";
import GameCanister "../canister-definitions/game-canister";
import Utilities "../utilities/Utilities";
import Environment "../utilities/Environment";

import Debug "mo:base/Debug";
import Base "mo:waterway-mops/BaseTypes";
import GameCommands "../commands/game_commands";
import GameQueries "../queries/game_queries";
import BuzzQueries "../queries/buzz_queries";

module {
  public class GameManager() {

    private var gameCanisterIndex: TrieMap.TrieMap<T.GameId, Base.CanisterId> = TrieMap.TrieMap<T.GameId, Base.CanisterId>(Utilities.eqNat, Utilities.hashNat);
    private var activeCanisterId: Base.CanisterId = "";
    private var uniqueGameCanisterIds : List.List<Base.CanisterId> = List.nil();
    private var totalGames : Nat = 0;
    private var nextGameId: T.GameId = 1;

    private var gameSummaries: [T.GameSummary] = [];

    public func getGameSummaries(2: Nat) : [T.GameSummary] {
      
      //loop through post summaries and get the range of posts

      //get the games 

      return []
    };

    public func createGame(dto: GameCommands.CreateGame) : async Result.Result<T.GameId, T.Error> {
      
      assert Option.isNull(Array.find<Base.PrincipalId>(dto.inviteIds, func(playerId: Base.PrincipalId){ playerId == dto.createdById  }));
      
      let totalPlayers = 1 + Array.size(dto.inviteIds); 

      switch(dto.gameType){
        case (#Mulligans){
          assert totalPlayers == 2;
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
      Debug.print("Past Switch");
      var game_canister = actor (activeCanisterId) : actor {
        createGame : (dto: GameCommands.CreateGame) -> async Result.Result<T.GameId, T.Error>;
        getLatestId : () -> async T.GameId;
        isCanisterFull : () -> async Bool;
      };

      switch(activeCanisterId){
        case "" {
          await createNewCanister(totalGames + 1);
          game_canister := actor (activeCanisterId) : actor {
            createGame : (dto: GameCommands.CreateGame) -> async Result.Result<T.GameId, T.Error>;
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
              createGame : (dto: GameCommands.CreateGame) -> async Result.Result<T.GameId, T.Error>;
              getLatestId : () -> async T.GameId;
              isCanisterFull : () -> async Bool;
            };
          };
        }
      };
      Debug.print("Going to game canister");
      return await game_canister.createGame(dto);
    };

    public func getGame(dto: GameQueries.GetGame) : async Result.Result<GameQueries.Game, T.Error> {
      let gameCanisterId = gameCanisterIndex.get(dto.gameId);
      switch(gameCanisterId){
        case (?foundCanisterId){
          let game_canister = actor (foundCanisterId) : actor {
            getGame : (dto: GameQueries.GetGame) -> async Result.Result<GameQueries.Game, T.Error>;
          };
          return await game_canister.getGame(dto);
        };
        case _ { }
      };     
      return #err(#NotFound);
    };

    public func isGameOwner(gameId: T.GameId, principalId: Base.PrincipalId) : async Bool {
      let gameCanisterId = gameCanisterIndex.get(gameId);
      switch(gameCanisterId){
        case (?foundCanisterId){
          let game_canister = actor (foundCanisterId) : actor {
            isGameOwner : (gameId: T.GameId, principalId: Base.PrincipalId) -> async Bool;
          };
          return await game_canister.isGameOwner(gameId, principalId);
        };
        case _ { }
      };     
      return false;
    };

    public func isGameMember(gameId: T.GameId, principalId: Base.PrincipalId) : async Bool {
      let gameCanisterId = gameCanisterIndex.get(gameId);
      switch(gameCanisterId){
        case (?foundCanisterId){
          let game_canister = actor (foundCanisterId) : actor {
            isGameMember : (gameId: T.GameId, principalId: Base.PrincipalId) -> async Bool;
          };
          return await game_canister.isGameMember(gameId, principalId);
        };
        case _ { }
      };     
      return false;
    };

    public func inviteGolfers(dto: GameCommands.InviteGolfers) : async Result.Result<(), T.Error>{
      let gameCanisterId = gameCanisterIndex.get(dto.gameId);
      switch(gameCanisterId){
        case (?foundCanisterId){
          let game_canister = actor (foundCanisterId) : actor {
            inviteGolfers : (dto: GameCommands.InviteGolfers) -> async Result.Result<(), T.Error>;
          };
          return await game_canister.inviteGolfers(dto);
        };
        case _ { }
      };  
      return #err(#NotFound);
    };

    public func acceptGameInvite( dto: GameCommands.AcceptGameInvite) : async Result.Result<(), T.Error>{
      let gameCanisterId = gameCanisterIndex.get(dto.gameId);
      switch(gameCanisterId){
        case (?foundCanisterId){
          let game_canister = actor (foundCanisterId) : actor {
            acceptGameInvite : (dto: GameCommands.AcceptGameInvite) -> async Result.Result<(), T.Error>;
          };
          return await game_canister.acceptGameInvite(dto);
        };
        case _ { }
      };  
      return #err(#NotFound);
    };

    public func rejectGameInvite( dto: GameCommands.RejectGameInvite) : async Result.Result<(), T.Error>{
      let gameCanisterId = gameCanisterIndex.get(dto.gameId);
      switch(gameCanisterId){
        case (?foundCanisterId){
          let game_canister = actor (foundCanisterId) : actor {
            rejectGameInvite : (dto: GameCommands.RejectGameInvite) -> async Result.Result<(), T.Error>;
          };
          return await game_canister.rejectGameInvite(dto);
        };
        case _ { }
      };  
      return #err(#NotFound);
    };

    public func beginGame(dto: GameCommands.BeginGame) : async Result.Result<(), T.Error> {
      let existingGame = await getGame({ gameId = dto.gameId });

      switch(existingGame){
        case (#ok foundGame){
          
          if(foundGame.status != #Unplayed){
            return #err(#NotAllowed);
          };

          let gameCanisterId = gameCanisterIndex.get(foundGame.id);
          switch(gameCanisterId){
            case (?foundCanisterId){
              let game_canister = actor (foundCanisterId) : actor {
                beginGame : (dto: GameCommands.BeginGame) -> async Result.Result<(), T.Error>;
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

    public func predictGame(dto: GameCommands.PredictGame) : async Result.Result<(), T.Error> {
      let existingGame = await getGame({ gameId = dto.gameId });

      switch(existingGame){
        case (#ok foundGame){
          
          if(foundGame.status != #Unplayed){
            return #err(#NotAllowed);
          };

          let gameCanisterId = gameCanisterIndex.get(foundGame.id);
          switch(gameCanisterId){
            case (?foundCanisterId){
              let game_canister = actor (foundCanisterId) : actor {
                predictGame : (dto: GameCommands.PredictGame) -> async Result.Result<(), T.Error>;
              };
              return await game_canister.predictGame(dto);
            };
            case _ { }
          };  
          return #err(#NotFound);
        };
        case (#err _) { return #err(#NotFound) };
      };
    };

    public func addGameScore(dto: GameCommands.AddGameScore) :async  Result.Result<(), T.Error> {
      
      let existingGame = await getGame({ gameId = dto.gameId });

      switch(existingGame){
        case (#ok foundGame){

          let playerInGame = Option.isSome(Array.find<Base.PrincipalId>(foundGame.playerIds, func(playerId: Base.PrincipalId){
            playerId == dto.submittedById;
          }));

          if(not playerInGame){
            return #err(#NotAllowed);
          };

          let gameCanisterId = gameCanisterIndex.get(foundGame.id);
          switch(gameCanisterId){
            case (?foundCanisterId){
              let game_canister = actor (foundCanisterId) : actor {
                addGameScore : (dto: GameCommands.AddGameScore) -> async Result.Result<(), T.Error>;
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

    public func deleteGame(dto: GameCommands.DeleteGame) : async Result.Result<(), T.Error> {
      let existingGame = await getGame({ gameId = dto.gameId });

      switch(existingGame){
        case (#ok foundGame){
          
          if(foundGame.status != #Unplayed){
            return #err(#NotAllowed);
          };

          let gameCanisterId = gameCanisterIndex.get(foundGame.id);
          switch(gameCanisterId){
            case (?foundCanisterId){
              let game_canister = actor (foundCanisterId) : actor {
                deleteGame : (dto: GameCommands.DeleteGame) -> async Result.Result<(), T.Error>;
              };
              return await game_canister.deleteGame(dto);
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

      let uniqueCanisterIdBuffer = Buffer.fromArray<Base.CanisterId>(List.toArray(uniqueGameCanisterIds));
      uniqueCanisterIdBuffer.add(canisterId);
      uniqueGameCanisterIds := List.fromArray(Buffer.toArray(uniqueCanisterIdBuffer));
      activeCanisterId := canisterId;
      return;
    };
    
    //stable storage getters and setters

    public func getStableCanisterIndex() : [(T.GameId, Base.CanisterId)]{
      return Iter.toArray(gameCanisterIndex.entries());
    };

    public func setStableCanisterIndex(stable_game_canister_index: [(T.GameId, Base.CanisterId)]){
      let canisterIds : TrieMap.TrieMap<T.GameId, Base.CanisterId> = TrieMap.TrieMap<T.GameId, Base.CanisterId>(Utilities.eqNat, Utilities.hashNat);

      for (canisterId in Iter.fromArray(stable_game_canister_index)) {
        canisterIds.put(canisterId);
      };
      gameCanisterIndex := canisterIds;
    };

    public func getStableActiveCanisterId() : Base.CanisterId {
      return activeCanisterId;
    };

    public func setStableActiveCanisterId(stable_active_canister_id: Base.CanisterId){
      activeCanisterId := stable_active_canister_id;
    };  

    public func getStableUniqueCanisterIds() : [Base.CanisterId] {
      return List.toArray(uniqueGameCanisterIds);
    };

    public func setStableUniqueCanisterIds(stable_unique_canister_ids : [Base.CanisterId]) : () {
      let canisterIdBuffer = Buffer.fromArray<Base.CanisterId>([]);

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

    public func getStableGameSummaries() : [T.GameSummary] {
      return gameSummaries;
    };

    public func setStableGameSummaries(stable_game_summaries: [T.GameSummary]){
      gameSummaries := stable_game_summaries;
    };
     

    public func getStableNextGameId() : T.GameId {
      return nextGameId;
    };

    public func setStableNextGameId(stable_next_game_id : T.GameId) : () {
      nextGameId := stable_next_game_id;
    };

  };
};


    