import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Int "mo:base/Int";
import Int8 "mo:base/Int8";
import Iter "mo:base/Iter";
import Nat8 "mo:base/Nat8";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Base "mo:waterway-mops/BaseTypes";

import Environment "../utilities/Environment";
import T "../data-types/app_types";
import ID "../data-types/id_types";
import Game "../data-types/game_types";
import GameCommands "../commands/game_commands";
import GameQueries "../queries/game_queries";


actor class _GameCanister() {

  private stable var MAX_GAMES_PER_GROUP: Nat = 250000;
  private stable var MAX_GAMES_PER_CANISTER: Nat = 12500000;

  private stable var stable_game_group_indexes: [(ID.GameId, Nat8)] = [];

  private stable var activeGroupIndex: Nat8 = 0;
  private stable var nextGameId: ID.GameId = 1;
  private stable var totalGames = 0;

  private stable var gameGroup1 : [Game.Game] = [];
  private stable var gameGroup2 : [Game.Game] = [];
  private stable var gameGroup3 : [Game.Game] = [];
  private stable var gameGroup4 : [Game.Game] = [];
  private stable var gameGroup5 : [Game.Game] = [];
  private stable var gameGroup6 : [Game.Game] = [];
  private stable var gameGroup7 : [Game.Game] = [];
  private stable var gameGroup8 : [Game.Game] = [];
  private stable var gameGroup9 : [Game.Game] = [];
  private stable var gameGroup10 : [Game.Game] = [];
  private stable var gameGroup11 : [Game.Game] = [];
  private stable var gameGroup12 : [Game.Game] = [];
  private stable var gameGroup13 : [Game.Game] = [];
  private stable var gameGroup14 : [Game.Game] = [];
  private stable var gameGroup15 : [Game.Game] = [];
  private stable var gameGroup16 : [Game.Game] = [];
  private stable var gameGroup17 : [Game.Game] = [];
  private stable var gameGroup18 : [Game.Game] = [];
  private stable var gameGroup19 : [Game.Game] = [];
  private stable var gameGroup20 : [Game.Game] = [];
  private stable var gameGroup21 : [Game.Game] = [];
  private stable var gameGroup22 : [Game.Game] = [];
  private stable var gameGroup23 : [Game.Game] = [];
  private stable var gameGroup24 : [Game.Game] = [];
  private stable var gameGroup25 : [Game.Game] = [];
  private stable var gameGroup26 : [Game.Game] = [];
  private stable var gameGroup27 : [Game.Game] = [];
  private stable var gameGroup28 : [Game.Game] = [];
  private stable var gameGroup29 : [Game.Game] = [];
  private stable var gameGroup30 : [Game.Game] = [];
  private stable var gameGroup31 : [Game.Game] = [];
  private stable var gameGroup32 : [Game.Game] = [];
  private stable var gameGroup33 : [Game.Game] = [];
  private stable var gameGroup34 : [Game.Game] = [];
  private stable var gameGroup35 : [Game.Game] = [];
  private stable var gameGroup36 : [Game.Game] = [];
  private stable var gameGroup37 : [Game.Game] = [];
  private stable var gameGroup38 : [Game.Game] = [];
  private stable var gameGroup39 : [Game.Game] = [];
  private stable var gameGroup40 : [Game.Game] = [];
  private stable var gameGroup41 : [Game.Game] = [];
  private stable var gameGroup42 : [Game.Game] = [];
  private stable var gameGroup43 : [Game.Game] = [];
  private stable var gameGroup44 : [Game.Game] = [];
  private stable var gameGroup45 : [Game.Game] = [];
  private stable var gameGroup46 : [Game.Game] = [];
  private stable var gameGroup47 : [Game.Game] = [];
  private stable var gameGroup48 : [Game.Game] = [];
  private stable var gameGroup49 : [Game.Game] = [];
  private stable var gameGroup50 : [Game.Game] = [];


  public shared ({ caller }) func updateNextId(nextId: ID.GameId) : async (){
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    nextGameId := nextId;
  };

  public shared ({ caller }) func createGame(dto: GameCommands.CreateGame) : async Result.Result<ID.GameId, T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    if(totalGames >= MAX_GAMES_PER_CANISTER){
      return #err(#CanisterFull);
    };

    if(getGameCountInGroup(activeGroupIndex) >= MAX_GAMES_PER_GROUP){
      activeGroupIndex += 1;
    };

    let newGame: Game.Game = {
      id = nextGameId;
      gameType = dto.gameType;
      scoreDetail = null;
      status = #Unplayed;
      courseId = dto.courseId;
      predictions = [];
      events = [];
      courseSnapshot = {
        courseId = dto.courseId;
        teeGroupIndex = dto.teeGroupIndex;
        courseVersion = dto.courseVersion;
      };
      teeOffTime = dto.teeOffTime;
      playerIds = [dto.createdById];
      invites = dto.inviteIds;
      winner = "";
    };

    switch(activeGroupIndex){
      case 0{
        let group1Buffer = Buffer.fromArray<Game.Game>(gameGroup1);
        group1Buffer.add(newGame);
        gameGroup1 := Buffer.toArray(group1Buffer);
      };
      case 1{
        let group2Buffer = Buffer.fromArray<Game.Game>(gameGroup2);
        group2Buffer.add(newGame);
        gameGroup2 := Buffer.toArray(group2Buffer);
      };
      case 2{
        let group3Buffer = Buffer.fromArray<Game.Game>(gameGroup3);
        group3Buffer.add(newGame);
        gameGroup3 := Buffer.toArray(group3Buffer);
      };
      case 3{
        let group4Buffer = Buffer.fromArray<Game.Game>(gameGroup4);
        group4Buffer.add(newGame);
        gameGroup4 := Buffer.toArray(group4Buffer);
      };
      case 4{
        let group5Buffer = Buffer.fromArray<Game.Game>(gameGroup5);
        group5Buffer.add(newGame);
        gameGroup5 := Buffer.toArray(group5Buffer);
      };
      case 5{
        let group6Buffer = Buffer.fromArray<Game.Game>(gameGroup6);
        group6Buffer.add(newGame);
        gameGroup6 := Buffer.toArray(group6Buffer);
      };
      case 6{
        let group7Buffer = Buffer.fromArray<Game.Game>(gameGroup7);
        group7Buffer.add(newGame);
        gameGroup7 := Buffer.toArray(group7Buffer);
      };
      case 7{
        let group8Buffer = Buffer.fromArray<Game.Game>(gameGroup8);
        group8Buffer.add(newGame);
        gameGroup8 := Buffer.toArray(group8Buffer);
      };
      case 8{
        let group9Buffer = Buffer.fromArray<Game.Game>(gameGroup9);
        group9Buffer.add(newGame);
        gameGroup9 := Buffer.toArray(group9Buffer);
      };
      case 9{
        let group10Buffer = Buffer.fromArray<Game.Game>(gameGroup10);
        group10Buffer.add(newGame);
        gameGroup10 := Buffer.toArray(group10Buffer);
      };
      case 10{
        let group11Buffer = Buffer.fromArray<Game.Game>(gameGroup11);
        group11Buffer.add(newGame);
        gameGroup11 := Buffer.toArray(group11Buffer);
      };
      case 11{
        let group12Buffer = Buffer.fromArray<Game.Game>(gameGroup12);
        group12Buffer.add(newGame);
        gameGroup12 := Buffer.toArray(group12Buffer);
      };
      case 12{
        let group13Buffer = Buffer.fromArray<Game.Game>(gameGroup13);
        group13Buffer.add(newGame);
        gameGroup13 := Buffer.toArray(group13Buffer);
      };
      case 13{
        let group14Buffer = Buffer.fromArray<Game.Game>(gameGroup14);
        group14Buffer.add(newGame);
        gameGroup14 := Buffer.toArray(group14Buffer);
      };
      case 14{
        let group15Buffer = Buffer.fromArray<Game.Game>(gameGroup15);
        group15Buffer.add(newGame);
        gameGroup15 := Buffer.toArray(group15Buffer);
      };
      case 15{
        let group16Buffer = Buffer.fromArray<Game.Game>(gameGroup16);
        group16Buffer.add(newGame);
        gameGroup16 := Buffer.toArray(group16Buffer);
      };
      case 16{
        let group17Buffer = Buffer.fromArray<Game.Game>(gameGroup17);
        group17Buffer.add(newGame);
        gameGroup17 := Buffer.toArray(group17Buffer);
      };
      case 17{
        let group18Buffer = Buffer.fromArray<Game.Game>(gameGroup18);
        group18Buffer.add(newGame);
        gameGroup18 := Buffer.toArray(group18Buffer);
      };
      case 18{
        let group19Buffer = Buffer.fromArray<Game.Game>(gameGroup19);
        group19Buffer.add(newGame);
        gameGroup19 := Buffer.toArray(group19Buffer);
      };
      case 19{
        let group20Buffer = Buffer.fromArray<Game.Game>(gameGroup20);
        group20Buffer.add(newGame);
        gameGroup20 := Buffer.toArray(group20Buffer);
      };
      case 20{
        let group21Buffer = Buffer.fromArray<Game.Game>(gameGroup21);
        group21Buffer.add(newGame);
        gameGroup21 := Buffer.toArray(group21Buffer);
      };
      case 21{
        let group22Buffer = Buffer.fromArray<Game.Game>(gameGroup22);
        group22Buffer.add(newGame);
        gameGroup22 := Buffer.toArray(group22Buffer);
      };
      case 22{
        let group23Buffer = Buffer.fromArray<Game.Game>(gameGroup23);
        group23Buffer.add(newGame);
        gameGroup23 := Buffer.toArray(group23Buffer);
      };
      case 23{
        let group24Buffer = Buffer.fromArray<Game.Game>(gameGroup24);
        group24Buffer.add(newGame);
        gameGroup24 := Buffer.toArray(group24Buffer);
      };
      case 24{
        let group25Buffer = Buffer.fromArray<Game.Game>(gameGroup25);
        group25Buffer.add(newGame);
        gameGroup25 := Buffer.toArray(group25Buffer);
      };
      case 25{
        let group26Buffer = Buffer.fromArray<Game.Game>(gameGroup26);
        group26Buffer.add(newGame);
        gameGroup26 := Buffer.toArray(group26Buffer);
      };
      case 26{
        let group27Buffer = Buffer.fromArray<Game.Game>(gameGroup27);
        group27Buffer.add(newGame);
        gameGroup27 := Buffer.toArray(group27Buffer);
      };
      case 27{
        let group28Buffer = Buffer.fromArray<Game.Game>(gameGroup28);
        group28Buffer.add(newGame);
        gameGroup28 := Buffer.toArray(group28Buffer);
      };
      case 28{
        let group29Buffer = Buffer.fromArray<Game.Game>(gameGroup29);
        group29Buffer.add(newGame);
        gameGroup29 := Buffer.toArray(group29Buffer);
      };
      case 29{
        let group30Buffer = Buffer.fromArray<Game.Game>(gameGroup30);
        group30Buffer.add(newGame);
        gameGroup30 := Buffer.toArray(group30Buffer);
      };
      case 30{
        let group31Buffer = Buffer.fromArray<Game.Game>(gameGroup31);
        group31Buffer.add(newGame);
        gameGroup31 := Buffer.toArray(group31Buffer);
      };
      case 31{
        let group32Buffer = Buffer.fromArray<Game.Game>(gameGroup32);
        group32Buffer.add(newGame);
        gameGroup32 := Buffer.toArray(group32Buffer);
      };
      case 32{
        let group33Buffer = Buffer.fromArray<Game.Game>(gameGroup33);
        group33Buffer.add(newGame);
        gameGroup33 := Buffer.toArray(group33Buffer);
      };
      case 33{
        let group34Buffer = Buffer.fromArray<Game.Game>(gameGroup34);
        group34Buffer.add(newGame);
        gameGroup34 := Buffer.toArray(group34Buffer);
      };
      case 34{
        let group35Buffer = Buffer.fromArray<Game.Game>(gameGroup35);
        group35Buffer.add(newGame);
        gameGroup35 := Buffer.toArray(group35Buffer);
      };
      case 35{
        let group36Buffer = Buffer.fromArray<Game.Game>(gameGroup36);
        group36Buffer.add(newGame);
        gameGroup36 := Buffer.toArray(group36Buffer);
      };
      case 36{
        let group37Buffer = Buffer.fromArray<Game.Game>(gameGroup37);
        group37Buffer.add(newGame);
        gameGroup37 := Buffer.toArray(group37Buffer);
      };
      case 37{
        let group38Buffer = Buffer.fromArray<Game.Game>(gameGroup38);
        group38Buffer.add(newGame);
        gameGroup38 := Buffer.toArray(group38Buffer);
      };
      case 38{
        let group39Buffer = Buffer.fromArray<Game.Game>(gameGroup39);
        group39Buffer.add(newGame);
        gameGroup39 := Buffer.toArray(group39Buffer);
      };
      case 39{
        let group40Buffer = Buffer.fromArray<Game.Game>(gameGroup40);
        group40Buffer.add(newGame);
        gameGroup40 := Buffer.toArray(group40Buffer);
      };
      case 40{
        let group41Buffer = Buffer.fromArray<Game.Game>(gameGroup41);
        group41Buffer.add(newGame);
        gameGroup41 := Buffer.toArray(group41Buffer);
      };
      case 41{
        let group42Buffer = Buffer.fromArray<Game.Game>(gameGroup42);
        group42Buffer.add(newGame);
        gameGroup42 := Buffer.toArray(group42Buffer);
      };
      case 42{
        let group43Buffer = Buffer.fromArray<Game.Game>(gameGroup43);
        group43Buffer.add(newGame);
        gameGroup43 := Buffer.toArray(group43Buffer);
      };
      case 43{
        let group44Buffer = Buffer.fromArray<Game.Game>(gameGroup44);
        group44Buffer.add(newGame);
        gameGroup44 := Buffer.toArray(group44Buffer);
      };
      case 44{
        let group45Buffer = Buffer.fromArray<Game.Game>(gameGroup45);
        group45Buffer.add(newGame);
        gameGroup45 := Buffer.toArray(group45Buffer);
      };
      case 45{
        let group46Buffer = Buffer.fromArray<Game.Game>(gameGroup46);
        group46Buffer.add(newGame);
        gameGroup46 := Buffer.toArray(group46Buffer);
      };
      case 46{
        let group47Buffer = Buffer.fromArray<Game.Game>(gameGroup47);
        group47Buffer.add(newGame);
        gameGroup47 := Buffer.toArray(group47Buffer);
      };
      case 47{
        let group48Buffer = Buffer.fromArray<Game.Game>(gameGroup48);
        group48Buffer.add(newGame);
        gameGroup48 := Buffer.toArray(group48Buffer);
      };
      case 48{
        let group49Buffer = Buffer.fromArray<Game.Game>(gameGroup49);
        group49Buffer.add(newGame);
        gameGroup49 := Buffer.toArray(group49Buffer);
      };
      case 49{
        let group50Buffer = Buffer.fromArray<Game.Game>(gameGroup50);
        group50Buffer.add(newGame);
        gameGroup50 := Buffer.toArray(group50Buffer);
      };
      case _ {
        return #err(#NotFound);
      }
    };
    totalGames += 1;
    return #ok(newGame.id);
  };

  public shared ({ caller }) func getLatestId() : async ID.GameId{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;
    return nextGameId - 1;
  };

  public shared ({ caller }) func isCanisterFull() : async Bool{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    return (totalGames >= MAX_GAMES_PER_CANISTER);
  };

  public shared ({ caller }) func getGame(dto: GameQueries.GetGame) : async Result.Result<GameQueries.Game, T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (gameGroupIndex in Iter.fromArray(stable_game_group_indexes)) {
      if(gameGroupIndex.0 == dto.gameId){
        groupIndex := ?gameGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let game = findGame(foundGroupIndex, dto.gameId);
        switch(game){
          case (?foundGame){
            return #ok({
              courseId = foundGame.courseId;
              courseSnapshot = foundGame.courseSnapshot;
              gameType = foundGame.gameType;
              id = foundGame.id;
              playerIds = foundGame.playerIds;
              predictions = foundGame.predictions;
              scoreDetail = foundGame.scoreDetail;
              status = foundGame.status;
              teeOffTime = foundGame.teeOffTime;
              invites = foundGame.invites;
              winner = foundGame.winner;
            });
          };
          case (null){
            return #err(#NotFound);
          }
        }
      };
    };
  };

  public shared ({ caller }) func inviteGolfers(dto: GameCommands.InviteGolfers) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (gameGroupIndex in Iter.fromArray(stable_game_group_indexes)) {
      if(gameGroupIndex.0 == dto.gameId){
        groupIndex := ?gameGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (?foundGroupIndex){
        let game = await getGame({gameId = dto.gameId});
        switch(game){
          case (#ok foundGame){
            let updatedInvitesBuffer = Buffer.fromArray<Base.PrincipalId>(foundGame.invites);
            updatedInvitesBuffer.append(Buffer.fromArray(dto.invitedGolferIds));
            
            let updatedGame: Game.Game = {
              courseId = foundGame.courseId;
              courseSnapshot = foundGame.courseSnapshot;
              gameType = foundGame.gameType;
              id = foundGame.id;
              invites = Buffer.toArray(updatedInvitesBuffer);
              playerIds = foundGame.playerIds;
              predictions = foundGame.predictions;
              scoreDetail = foundGame.scoreDetail;
              status = foundGame.status;
              teeOffTime = foundGame.teeOffTime;
              winner = foundGame.winner;
            };
            saveGame(foundGroupIndex, updatedGame);
          };
          case (#err _){
            return #err(#NotFound);
          }
        };
      };
      case (null){
        return #err(#NotFound);
      }
    };
  };

  public shared ({ caller }) func acceptGameInvite(dto: GameCommands.AcceptGameInvite) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (gameGroupIndex in Iter.fromArray(stable_game_group_indexes)) {
      if(gameGroupIndex.0 == dto.gameId){
        groupIndex := ?gameGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (?foundGroupIndex){
        let game = await getGame({gameId = dto.gameId});
        switch(game){
          case (#ok foundGame){
            
            let updatedInvites = Array.filter<Base.PrincipalId>(foundGame.invites, func(invite: Base.PrincipalId){
              invite != dto.acceptedById
            });

            let updatedPlayerIdsBuffer = Buffer.fromArray<Base.PrincipalId>(foundGame.playerIds);
            updatedPlayerIdsBuffer.add(dto.acceptedById);

            let updatedGame: Game.Game = {
              courseId = foundGame.courseId;
              courseSnapshot = foundGame.courseSnapshot;
              gameType = foundGame.gameType;
              id = foundGame.id;
              invites = updatedInvites;
              playerIds = Buffer.toArray(updatedPlayerIdsBuffer);
              predictions = foundGame.predictions;
              scoreDetail = foundGame.scoreDetail;
              status = foundGame.status;
              teeOffTime = foundGame.teeOffTime;
              winner = foundGame.winner;
            };
            saveGame(foundGroupIndex, updatedGame);
          };
          case (#err _){
            return #err(#NotFound);
          }
        };
      };
      case (null){
        return #err(#NotFound);
      }
    };
  };

  public shared ({ caller }) func addGameScore(dto: GameCommands.AddGameScore) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (gameGroupIndex in Iter.fromArray(stable_game_group_indexes)) {
      if(gameGroupIndex.0 == dto.gameId){
        groupIndex := ?gameGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (?foundGroupIndex){
        let game = await getGame({gameId = dto.gameId});
        switch(game){
          case (#ok foundGame){
            if(foundGame.status != #Active){
              return #err(#NotAllowed);
            };
            
            switch(foundGame.gameType){
              case (#Mulligans _){
                let updatedGame: Game.Game = addBandsScore(dto, foundGame);
                return saveGame(foundGroupIndex, updatedGame);
              };
              case (#Bands _){
                let updatedGame: Game.Game = addMulligansScore(dto, foundGame);
                return saveGame(foundGroupIndex, updatedGame);
              };
              case (_){}
            };  
          };
          case (#err _){}
        };
      };
      case (null){}
    };
    return #err(#NotFound);
  };

  public shared ({ caller }) func beginGame(dto: GameCommands.BeginGame) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (gameGroupIndex in Iter.fromArray(stable_game_group_indexes)) {
      if(gameGroupIndex.0 == dto.gameId){
        groupIndex := ?gameGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (?foundGroupIndex){
        let game = await getGame({gameId = dto.gameId});
        switch(game){
          case (#ok foundGame){
            
            let updatedGame: Game.Game = {
              courseId = foundGame.courseId;
              courseSnapshot = foundGame.courseSnapshot;
              gameType = foundGame.gameType;
              id = foundGame.id;
              invites = foundGame.invites;
              playerIds = foundGame.playerIds;
              predictions = foundGame.predictions;
              scoreDetail = foundGame.scoreDetail;
              status = #Active;
              teeOffTime = foundGame.teeOffTime;
              winner = foundGame.winner;
            };
            saveGame(foundGroupIndex, updatedGame);
          };
          case (#err _){
            return #err(#NotFound);
          }
        };
      };
      case (null){
        return #err(#NotFound);
      }
    };
  };

  //Private functions:

  private func findGame(gameGroupIndex: Nat8, gameId: ID.GameId) : ?Game.Game {
    switch(gameGroupIndex){
      case 0{
        let foundGame = Array.find<Game.Game>(gameGroup1, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 1{
        let foundGame = Array.find<Game.Game>(gameGroup2, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 2{
        let foundGame = Array.find<Game.Game>(gameGroup3, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 3{
        let foundGame = Array.find<Game.Game>(gameGroup4, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 4{
        let foundGame = Array.find<Game.Game>(gameGroup5, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 5{
        let foundGame = Array.find<Game.Game>(gameGroup6, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 6{
        let foundGame = Array.find<Game.Game>(gameGroup7, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 7{
        let foundGame = Array.find<Game.Game>(gameGroup8, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 8{
        let foundGame = Array.find<Game.Game>(gameGroup9, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 9{
        let foundGame = Array.find<Game.Game>(gameGroup10, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 10{
        let foundGame = Array.find<Game.Game>(gameGroup11, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 11{
        let foundGame = Array.find<Game.Game>(gameGroup12, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 12{
        let foundGame = Array.find<Game.Game>(gameGroup13, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 13{
        let foundGame = Array.find<Game.Game>(gameGroup14, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 14{
        let foundGame = Array.find<Game.Game>(gameGroup15, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 15{
        let foundGame = Array.find<Game.Game>(gameGroup16, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 16{
        let foundGame = Array.find<Game.Game>(gameGroup17, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 17{
        let foundGame = Array.find<Game.Game>(gameGroup18, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 18{
        let foundGame = Array.find<Game.Game>(gameGroup19, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 19{
        let foundGame = Array.find<Game.Game>(gameGroup20, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 20{
        let foundGame = Array.find<Game.Game>(gameGroup21, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 21{
        let foundGame = Array.find<Game.Game>(gameGroup22, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 22{
        let foundGame = Array.find<Game.Game>(gameGroup23, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 23{
        let foundGame = Array.find<Game.Game>(gameGroup24, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 24{
        let foundGame = Array.find<Game.Game>(gameGroup25, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 25{
        let foundGame = Array.find<Game.Game>(gameGroup26, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 26{
        let foundGame = Array.find<Game.Game>(gameGroup27, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 27{
        let foundGame = Array.find<Game.Game>(gameGroup28, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 28{
        let foundGame = Array.find<Game.Game>(gameGroup29, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 29{
        let foundGame = Array.find<Game.Game>(gameGroup30, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 30{
        let foundGame = Array.find<Game.Game>(gameGroup31, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 31{
        let foundGame = Array.find<Game.Game>(gameGroup32, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 32{
        let foundGame = Array.find<Game.Game>(gameGroup33, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 33{
        let foundGame = Array.find<Game.Game>(gameGroup34, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 34{
        let foundGame = Array.find<Game.Game>(gameGroup35, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 35{
        let foundGame = Array.find<Game.Game>(gameGroup36, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 36{
        let foundGame = Array.find<Game.Game>(gameGroup37, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 37{
        let foundGame = Array.find<Game.Game>(gameGroup38, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 38{
        let foundGame = Array.find<Game.Game>(gameGroup39, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 39{
        let foundGame = Array.find<Game.Game>(gameGroup40, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 40{
        let foundGame = Array.find<Game.Game>(gameGroup41, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 41{
        let foundGame = Array.find<Game.Game>(gameGroup42, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 42{
        let foundGame = Array.find<Game.Game>(gameGroup43, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 43{
        let foundGame = Array.find<Game.Game>(gameGroup44, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 44{
        let foundGame = Array.find<Game.Game>(gameGroup45, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 45{
        let foundGame = Array.find<Game.Game>(gameGroup46, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 46{
        let foundGame = Array.find<Game.Game>(gameGroup47, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 47{
        let foundGame = Array.find<Game.Game>(gameGroup48, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 48{
        let foundGame = Array.find<Game.Game>(gameGroup49, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 49{
        let foundGame = Array.find<Game.Game>(gameGroup50, func(game: Game.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case _ {
        return null;
      }
    }
  };

  private func saveGame(gameGroupIndex: Nat8, updatedGame: Game.Game) : Result.Result<(), T.Error> {
    switch(gameGroupIndex){
      case 0{
        gameGroup1 := Array.map<Game.Game, Game.Game>(gameGroup1, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 1{
        gameGroup2 := Array.map<Game.Game, Game.Game>(gameGroup2, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 2{
        gameGroup3 := Array.map<Game.Game, Game.Game>(gameGroup3, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 3{
        gameGroup4 := Array.map<Game.Game, Game.Game>(gameGroup4, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 4{
        gameGroup5 := Array.map<Game.Game, Game.Game>(gameGroup5, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 5{
        gameGroup6 := Array.map<Game.Game, Game.Game>(gameGroup6, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 6{
        gameGroup7 := Array.map<Game.Game, Game.Game>(gameGroup7, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 7{
        gameGroup8 := Array.map<Game.Game, Game.Game>(gameGroup8, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 8{
        gameGroup9 := Array.map<Game.Game, Game.Game>(gameGroup9, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 9{
        gameGroup10 := Array.map<Game.Game, Game.Game>(gameGroup10, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 10{
        gameGroup11 := Array.map<Game.Game, Game.Game>(gameGroup11, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 11{
        gameGroup12 := Array.map<Game.Game, Game.Game>(gameGroup12, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 12{
        gameGroup13 := Array.map<Game.Game, Game.Game>(gameGroup13, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 13{
        gameGroup14 := Array.map<Game.Game, Game.Game>(gameGroup14, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 14{
        gameGroup15 := Array.map<Game.Game, Game.Game>(gameGroup15, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 15{
        gameGroup16 := Array.map<Game.Game, Game.Game>(gameGroup16, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 16{
        gameGroup17 := Array.map<Game.Game, Game.Game>(gameGroup17, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 17{
        gameGroup18 := Array.map<Game.Game, Game.Game>(gameGroup18, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 18{
        gameGroup19 := Array.map<Game.Game, Game.Game>(gameGroup19, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 19{
        gameGroup20 := Array.map<Game.Game, Game.Game>(gameGroup20, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 20{
        gameGroup21 := Array.map<Game.Game, Game.Game>(gameGroup21, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 21{
        gameGroup22 := Array.map<Game.Game, Game.Game>(gameGroup22, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 22{
        gameGroup23 := Array.map<Game.Game, Game.Game>(gameGroup23, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 23{
        gameGroup24 := Array.map<Game.Game, Game.Game>(gameGroup24, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 24{
        gameGroup25 := Array.map<Game.Game, Game.Game>(gameGroup25, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 25{
        gameGroup26 := Array.map<Game.Game, Game.Game>(gameGroup26, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 26{
        gameGroup27 := Array.map<Game.Game, Game.Game>(gameGroup27, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 27{
        gameGroup28 := Array.map<Game.Game, Game.Game>(gameGroup28, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 28{
        gameGroup29 := Array.map<Game.Game, Game.Game>(gameGroup29, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 29{
        gameGroup30 := Array.map<Game.Game, Game.Game>(gameGroup30, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 30{
        gameGroup31 := Array.map<Game.Game, Game.Game>(gameGroup31, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 31{
        gameGroup32 := Array.map<Game.Game, Game.Game>(gameGroup32, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 32{
        gameGroup33 := Array.map<Game.Game, Game.Game>(gameGroup33, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 33{
        gameGroup34 := Array.map<Game.Game, Game.Game>(gameGroup34, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 34{
        gameGroup35 := Array.map<Game.Game, Game.Game>(gameGroup35, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 35{
        gameGroup36 := Array.map<Game.Game, Game.Game>(gameGroup36, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 36{
        gameGroup37 := Array.map<Game.Game, Game.Game>(gameGroup37, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 37{
        gameGroup38 := Array.map<Game.Game, Game.Game>(gameGroup38, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 38{
        gameGroup39 := Array.map<Game.Game, Game.Game>(gameGroup39, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 39{
        gameGroup40 := Array.map<Game.Game, Game.Game>(gameGroup40, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 40{
        gameGroup41 := Array.map<Game.Game, Game.Game>(gameGroup41, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 41{
        gameGroup42 := Array.map<Game.Game, Game.Game>(gameGroup42, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 42{
        gameGroup43 := Array.map<Game.Game, Game.Game>(gameGroup43, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 43{
        gameGroup44 := Array.map<Game.Game, Game.Game>(gameGroup44, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 44{
        gameGroup45 := Array.map<Game.Game, Game.Game>(gameGroup45, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 45{
        gameGroup46 := Array.map<Game.Game, Game.Game>(gameGroup46, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 46{
        gameGroup47 := Array.map<Game.Game, Game.Game>(gameGroup47, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 47{
        gameGroup48 := Array.map<Game.Game, Game.Game>(gameGroup48, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 48{
        gameGroup49 := Array.map<Game.Game, Game.Game>(gameGroup49, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 49{
        gameGroup50 := Array.map<Game.Game, Game.Game>(gameGroup50, func(game: Game.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case _ {
        return #err(#NotFound);
      }
    };
    return #ok();
  };

  private func getGameCountInGroup(groupIndex: Nat8) : Nat {
    switch(groupIndex){
      case 0{
        return gameGroup1.size();
      };
      case 1{
        return gameGroup2.size();
      };
      case 2{
        return gameGroup3.size();
      };
      case 3{
        return gameGroup4.size();
      };
      case 4{
        return gameGroup5.size();
      };
      case 5{
        return gameGroup6.size();
      };
      case 6{
        return gameGroup7.size();
      };
      case 7{
        return gameGroup8.size();
      };
      case 8{
        return gameGroup9.size();
      };
      case 9{
        return gameGroup10.size();
      };
      case 10{
        return gameGroup11.size();
      };
      case 11{
        return gameGroup12.size();
      };
      case 12{
        return gameGroup13.size();
      };
      case 13{
        return gameGroup14.size();
      };
      case 14{
        return gameGroup15.size();
      };
      case 15{
        return gameGroup16.size();
      };
      case 16{
        return gameGroup17.size();
      };
      case 17{
        return gameGroup18.size();
      };
      case 18{
        return gameGroup19.size();
      };
      case 19{
        return gameGroup20.size();
      };
      case 20{
        return gameGroup21.size();
      };
      case 21{
        return gameGroup22.size();
      };
      case 22{
        return gameGroup23.size();
      };
      case 23{
        return gameGroup24.size();
      };
      case 24{
        return gameGroup25.size();
      };
      case 25{
        return gameGroup26.size();
      };
      case 26{
        return gameGroup27.size();
      };
      case 27{
        return gameGroup28.size();
      };
      case 28{
        return gameGroup29.size();
      };
      case 29{
        return gameGroup30.size();
      };
      case 30{
        return gameGroup31.size();
      };
      case 31{
        return gameGroup32.size();
      };
      case 32{
        return gameGroup33.size();
      };
      case 33{
        return gameGroup34.size();
      };
      case 34{
        return gameGroup35.size();
      };
      case 35{
        return gameGroup36.size();
      };
      case 36{
        return gameGroup37.size();
      };
      case 37{
        return gameGroup38.size();
      };
      case 38{
        return gameGroup39.size();
      };
      case 39{
        return gameGroup40.size();
      };
      case 40{
        return gameGroup41.size();
      };
      case 41{
        return gameGroup42.size();
      };
      case 42{
        return gameGroup43.size();
      };
      case 43{
        return gameGroup44.size();
      };
      case 44{
        return gameGroup45.size();
      };
      case 45{
        return gameGroup46.size();
      };
      case 46{
        return gameGroup47.size();
      };
      case 47{
        return gameGroup48.size();
      };
      case 48{
        return gameGroup49.size();
      };
      case 49{
        return gameGroup50.size();
      };
      case _{
        return 0;
      }
    }
  };

  private func addMulligansScore(dto: GameCommands.AddGameScore, game: Game.Game) : Game.Game {

    var nextHole = dto.holeNumber + 1;
    if(nextHole > 18){
      nextHole := 18;
    };

    var updatedScores: ?Game.GameScoreDetail = null;
    switch(game.scoreDetail){
      case (?foundScoreDetail){
        switch(foundScoreDetail){
          case (#MulligansScores scores){

            var winner = "";
            var golfer1HolesWon = scores.golfer1HolesWonCount;
            var golfer2HolesWon = scores.golfer2HolesWonCount;
            var golfer1MulligansAvailable = scores.golfer1MulligansAvailable;
            var golfer2MulligansAvailable = scores.golfer2MulligansAvailable;
            var gameWinner = "";
            var gameStatus: Game.GameStatus = game.status;

            let golfer1Wins = scores.winner == game.playerIds[0];
            let golfer2Wins = scores.winner == game.playerIds[1];

            if(golfer1Wins){
              golfer1HolesWon += 1;
              winner := game.playerIds[0]; 
            };
            
            if(golfer2Wins){
              golfer2HolesWon += 1;
              winner := game.playerIds[1]; 
            };
            
            var mulliganHoleResultBuffer = Buffer.fromArray<Game.MulligansHoleResult>(scores.results);
            
            var golfer1MulligansUsed: Nat8 = 0;
            var golfer2MulligansUsed: Nat8 = 0;

            var difference: Int = Int8.toInt(Int8.fromNat8(golfer1HolesWon)) - Int8.toInt(Int8.fromNat8(golfer2HolesWon));
            if(difference < 0){
              difference := -difference;
            };

            switch(dto.detail){
              case (#MulligansScores data){

                if(data.golfer1MulliganUsed){ golfer1MulligansUsed := 1; };
                if(data.golfer2MulliganUsed){ golfer2MulligansUsed := 1; };

                mulliganHoleResultBuffer.add({
                  holeNumber = dto.holeNumber;
                  winner = winner;
                  golfer1MulliganUsed = data.golfer1MulliganUsed;
                  golfer2MulliganUsed = data.golfer2MulliganUsed;
                  score = difference;
                });
              };
              case (#BandsScores _){ return game; }
            };
            
            let remainingHoles: Int = 18 - Int8.toInt(Int8.fromNat8(dto.holeNumber)); 

            if(difference > remainingHoles or dto.holeNumber == 18){
              if(golfer1HolesWon > golfer2HolesWon){
                gameWinner := game.playerIds[0];
              };
              if(golfer2HolesWon > golfer1HolesWon){
                gameWinner := game.playerIds[1];
              };
              gameStatus := #Complete;
            };

            updatedScores := ?(#MulligansScores{
              results = Buffer.toArray(mulliganHoleResultBuffer);
              golfer1HolesWonCount = golfer1HolesWon;
              golfer2HolesWonCount = golfer2HolesWon;
              winner = gameWinner;
              golfer1MulligansAvailable = golfer1MulligansAvailable;
              golfer1MulligansUsed = golfer1MulligansUsed;
              golfer2MulligansAvailable = golfer2MulligansAvailable;
              golfer2MulligansUsed = golfer2MulligansUsed;
              score = difference;
              currentHole = nextHole;
            });

            let updatedGame: Game.Game = {
              courseId = game.courseId;
              courseSnapshot = game.courseSnapshot;
              gameType = game.gameType;
              id = game.id;
              invites = game.invites;
              playerIds = game.playerIds;
              predictions = game.predictions;
              scoreDetail = updatedScores;
              status = gameStatus;
              teeOffTime = game.teeOffTime;
              winner = gameWinner;
            };
            return updatedGame;
          };
          case (_){
            return game;
          }
        };
      };
      case (null){
        switch(dto.detail){
          case (#MulligansScores data){
            
            let golfer1Wins = data.winner == game.playerIds[0];
            let golfer2Wins = data.winner == game.playerIds[1];
            var golfer1HolesWon: Nat8 = 0;
            var golfer2HolesWon: Nat8 = 0;
            var golfer1MulligansAvailable: Nat8 = 1;
            var golfer2MulligansAvailable: Nat8 = 1;
            var gameStatus: Game.GameStatus = #Active;
            var winner = "";
            var difference: Int = 0;
            

            if(golfer1Wins){
              golfer1HolesWon := 1;
              winner := game.playerIds[0];
              difference := 1;
            };
            
            if(golfer2Wins){
              golfer2HolesWon := 1;
              winner := game.playerIds[1];
              difference := -1;
            };
            
            if(difference < 0){
              difference := -difference;
            };

            var mulliganHoleResultBuffer = Buffer.fromArray<Game.MulligansHoleResult>([]);

            
            mulliganHoleResultBuffer.add({
              holeNumber = dto.holeNumber;
              winner = winner;
              golfer1MulliganUsed = data.golfer1MulliganUsed;
              golfer2MulliganUsed = data.golfer2MulliganUsed;
              score = difference;
            });

            var golfer1MulligansUsed: Nat8 = 0;
            var golfer2MulligansUsed: Nat8 = 0;

            if(data.golfer1MulliganUsed){ golfer1MulligansUsed := 1; };
            if(data.golfer2MulliganUsed){ golfer2MulligansUsed := 1; };

            updatedScores := ?(#MulligansScores{
              results = Buffer.toArray(mulliganHoleResultBuffer);
              golfer1HolesWonCount = golfer1HolesWon;
              golfer2HolesWonCount = golfer2HolesWon;
              winner = "";
              golfer1MulligansAvailable = golfer1MulligansAvailable;
              golfer1MulligansUsed = golfer1MulligansUsed;
              golfer2MulligansAvailable = golfer2MulligansAvailable;
              golfer2MulligansUsed = golfer2MulligansUsed;
              score = difference;
              currentHole = nextHole;
            });


            let updatedGame: Game.Game = {
              courseId = game.courseId;
              courseSnapshot = game.courseSnapshot;
              gameType = game.gameType;
              id = game.id;
              invites = game.invites;
              playerIds = game.playerIds;
              predictions = game.predictions;
              scoreDetail = updatedScores;
              status = gameStatus;
              teeOffTime = game.teeOffTime;
              winner = "";
            };
            return updatedGame;

          };
          case (#BandsScores _){ return game; }
        };
      };
    };
  };

  private func addBandsScore(dto: GameCommands.AddGameScore, game: Game.Game) : Game.Game {
    return game;
    /*
    var nextHole = dto.holeNumber + 1;
    if(nextHole > 18){
      nextHole := 18;
    };

    var updatedScores: ?Game.GameScoreDetail = null;
    switch(game.scoreDetail){
      case (?foundScoreDetail){
        switch(foundScoreDetail){
          case (#BandsScores scores){

            let updatedPlayerResults = Buffer.fromArray<Game.BandsPlayerResult>(scores.players);

            switch(dto.detail){
              case (#MulligansScores _){ return game; };
              case (#BandsScores data){ 
                  
                for(result in Iter.fromArray(data.playerResults)){

                  let bandsPlayerResult = Array.find<Game.BandsPlayerResult>(Buffer.toArray(updatedPlayerResults), func(entry: Game.BandsPlayerResult) : Bool{
                    entry.principalId == result.golferId;
                  });

                  switch(bandsPlayerResult){
                    case (?foundBandsPlayer){
                      let filteredPlayerHoles = Array.filter<Game.BandsHoleResult>(foundBandsPlayer.holeResults, func(categoryEntry: Game.BandsHoleResult){
                        return categoryEntry.category != result.category and categoryEntry.hole != result.hole;
                      });

                      //add the new result for this category

                    };
                    case (null){

                    }
                  };
                };


              }
            };
            

            updatedScores := ?(#BandsScores{
              currentHole = dto.holeNumber;
              players = [];
            });

            let updatedGame: Game.Game = {
              courseId = game.courseId;
              courseSnapshot = game.courseSnapshot;
              gameType = game.gameType;
              id = game.id;
              invites = game.invites;
              playerIds = game.playerIds;
              predictions = game.predictions;
              scoreDetail = updatedScores;
              status = game.status;
              teeOffTime = game.teeOffTime;
              winner = gameWinner;
            };
            return updatedGame;
          };
          case (_){
            return game;
          }
        };
      };
      case (null){
        switch(dto.detail){
          case (#MulligansScores _){ return game; };
          case (#BandsScores data){ 
            let updatedGame: Game.Game = {
              courseId = game.courseId;
              courseSnapshot = game.courseSnapshot;
              gameType = game.gameType;
              id = game.id;
              invites = game.invites;
              playerIds = game.playerIds;
              predictions = game.predictions;
              scoreDetail = updatedScores;
              status = gameStatus;
              teeOffTime = game.teeOffTime;
              winner = "";
            };
            return updatedGame;           
          }
        };
      };
    };
      */
  };
  
};
