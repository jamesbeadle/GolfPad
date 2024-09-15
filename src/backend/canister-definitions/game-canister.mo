import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Nat8 "mo:base/Nat8";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Int "mo:base/Int";
import Int8 "mo:base/Int8";

import DTOs "../dtos/DTOs";
import Environment "../utilities/Environment";
import T "../data-types/types";

actor class _GameCanister() {

  private stable var stable_game_group_indexes: [(T.GameId, Nat8)] = [];

  private var activeGroupIndex: Nat8 = 1;
  private var nextGameId: T.GameId = 0;
  private var totalGames = 0;
  private stable var MAX_GAMES_PER_GROUP: Nat = 250000;
  private stable var MAX_GAMES_PER_CANISTER: Nat = 12500000;

  private stable var gameGroup1 : [T.Game] = [];
  private stable var gameGroup2 : [T.Game] = [];
  private stable var gameGroup3 : [T.Game] = [];
  private stable var gameGroup4 : [T.Game] = [];
  private stable var gameGroup5 : [T.Game] = [];
  private stable var gameGroup6 : [T.Game] = [];
  private stable var gameGroup7 : [T.Game] = [];
  private stable var gameGroup8 : [T.Game] = [];
  private stable var gameGroup9 : [T.Game] = [];
  private stable var gameGroup10 : [T.Game] = [];
  private stable var gameGroup11 : [T.Game] = [];
  private stable var gameGroup12 : [T.Game] = [];
  private stable var gameGroup13 : [T.Game] = [];
  private stable var gameGroup14 : [T.Game] = [];
  private stable var gameGroup15 : [T.Game] = [];
  private stable var gameGroup16 : [T.Game] = [];
  private stable var gameGroup17 : [T.Game] = [];
  private stable var gameGroup18 : [T.Game] = [];
  private stable var gameGroup19 : [T.Game] = [];
  private stable var gameGroup20 : [T.Game] = [];
  private stable var gameGroup21 : [T.Game] = [];
  private stable var gameGroup22 : [T.Game] = [];
  private stable var gameGroup23 : [T.Game] = [];
  private stable var gameGroup24 : [T.Game] = [];
  private stable var gameGroup25 : [T.Game] = [];
  private stable var gameGroup26 : [T.Game] = [];
  private stable var gameGroup27 : [T.Game] = [];
  private stable var gameGroup28 : [T.Game] = [];
  private stable var gameGroup29 : [T.Game] = [];
  private stable var gameGroup30 : [T.Game] = [];
  private stable var gameGroup31 : [T.Game] = [];
  private stable var gameGroup32 : [T.Game] = [];
  private stable var gameGroup33 : [T.Game] = [];
  private stable var gameGroup34 : [T.Game] = [];
  private stable var gameGroup35 : [T.Game] = [];
  private stable var gameGroup36 : [T.Game] = [];
  private stable var gameGroup37 : [T.Game] = [];
  private stable var gameGroup38 : [T.Game] = [];
  private stable var gameGroup39 : [T.Game] = [];
  private stable var gameGroup40 : [T.Game] = [];
  private stable var gameGroup41 : [T.Game] = [];
  private stable var gameGroup42 : [T.Game] = [];
  private stable var gameGroup43 : [T.Game] = [];
  private stable var gameGroup44 : [T.Game] = [];
  private stable var gameGroup45 : [T.Game] = [];
  private stable var gameGroup46 : [T.Game] = [];
  private stable var gameGroup47 : [T.Game] = [];
  private stable var gameGroup48 : [T.Game] = [];
  private stable var gameGroup49 : [T.Game] = [];
  private stable var gameGroup50 : [T.Game] = [];


  public shared ({ caller }) func updateNextId(nextId: T.GameId) : async (){
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    nextGameId := nextId;
  };

  public shared ({ caller }) func createGame(dto: DTOs.CreateGameDTO, courseSnapshot: DTOs.GolfCourseSnaphotDTO) : async Result.Result<T.GameId, T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    if(totalGames >= MAX_GAMES_PER_CANISTER){
      return #err(#CanisterFull);
    };

    if(getGameCountInGroup(activeGroupIndex) >= MAX_GAMES_PER_GROUP){
      activeGroupIndex += 1;
    };

    let newGame: T.Game = {
      id = nextGameId;
      gameType = dto.gameType;
      scoreDetail = null;
      status = #Unplayed;
      courseId = dto.courseId;
      predictions = [];
      events = [];
      courseSnapshot = {
        courseId = courseSnapshot.id;
        teeGroup = courseSnapshot.teeGroup;
        courseVersion = courseSnapshot.courseVersion;
      };
      teeOffTime = dto.teeOffTime;
      playerIds = [dto.createdById];
      invites = dto.inviteIds;
      winner = "";
    };

    switch(activeGroupIndex){
      case 0{
        let group1Buffer = Buffer.fromArray<T.Game>(gameGroup1);
        group1Buffer.add(newGame);
        gameGroup1 := Buffer.toArray(group1Buffer);
      };
      case 1{
        let group2Buffer = Buffer.fromArray<T.Game>(gameGroup2);
        group2Buffer.add(newGame);
        gameGroup2 := Buffer.toArray(group2Buffer);
      };
      case 2{
        let group3Buffer = Buffer.fromArray<T.Game>(gameGroup3);
        group3Buffer.add(newGame);
        gameGroup3 := Buffer.toArray(group3Buffer);
      };
      case 3{
        let group4Buffer = Buffer.fromArray<T.Game>(gameGroup4);
        group4Buffer.add(newGame);
        gameGroup4 := Buffer.toArray(group4Buffer);
      };
      case 4{
        let group5Buffer = Buffer.fromArray<T.Game>(gameGroup5);
        group5Buffer.add(newGame);
        gameGroup5 := Buffer.toArray(group5Buffer);
      };
      case 5{
        let group6Buffer = Buffer.fromArray<T.Game>(gameGroup6);
        group6Buffer.add(newGame);
        gameGroup6 := Buffer.toArray(group6Buffer);
      };
      case 6{
        let group7Buffer = Buffer.fromArray<T.Game>(gameGroup7);
        group7Buffer.add(newGame);
        gameGroup7 := Buffer.toArray(group7Buffer);
      };
      case 7{
        let group8Buffer = Buffer.fromArray<T.Game>(gameGroup8);
        group8Buffer.add(newGame);
        gameGroup8 := Buffer.toArray(group8Buffer);
      };
      case 8{
        let group9Buffer = Buffer.fromArray<T.Game>(gameGroup9);
        group9Buffer.add(newGame);
        gameGroup9 := Buffer.toArray(group9Buffer);
      };
      case 9{
        let group10Buffer = Buffer.fromArray<T.Game>(gameGroup10);
        group10Buffer.add(newGame);
        gameGroup10 := Buffer.toArray(group10Buffer);
      };
      case 10{
        let group11Buffer = Buffer.fromArray<T.Game>(gameGroup11);
        group11Buffer.add(newGame);
        gameGroup11 := Buffer.toArray(group11Buffer);
      };
      case 11{
        let group12Buffer = Buffer.fromArray<T.Game>(gameGroup12);
        group12Buffer.add(newGame);
        gameGroup12 := Buffer.toArray(group12Buffer);
      };
      case 12{
        let group13Buffer = Buffer.fromArray<T.Game>(gameGroup13);
        group13Buffer.add(newGame);
        gameGroup13 := Buffer.toArray(group13Buffer);
      };
      case 13{
        let group14Buffer = Buffer.fromArray<T.Game>(gameGroup14);
        group14Buffer.add(newGame);
        gameGroup14 := Buffer.toArray(group14Buffer);
      };
      case 14{
        let group15Buffer = Buffer.fromArray<T.Game>(gameGroup15);
        group15Buffer.add(newGame);
        gameGroup15 := Buffer.toArray(group15Buffer);
      };
      case 15{
        let group16Buffer = Buffer.fromArray<T.Game>(gameGroup16);
        group16Buffer.add(newGame);
        gameGroup16 := Buffer.toArray(group16Buffer);
      };
      case 16{
        let group17Buffer = Buffer.fromArray<T.Game>(gameGroup17);
        group17Buffer.add(newGame);
        gameGroup17 := Buffer.toArray(group17Buffer);
      };
      case 17{
        let group18Buffer = Buffer.fromArray<T.Game>(gameGroup18);
        group18Buffer.add(newGame);
        gameGroup18 := Buffer.toArray(group18Buffer);
      };
      case 18{
        let group19Buffer = Buffer.fromArray<T.Game>(gameGroup19);
        group19Buffer.add(newGame);
        gameGroup19 := Buffer.toArray(group19Buffer);
      };
      case 19{
        let group20Buffer = Buffer.fromArray<T.Game>(gameGroup20);
        group20Buffer.add(newGame);
        gameGroup20 := Buffer.toArray(group20Buffer);
      };
      case 20{
        let group21Buffer = Buffer.fromArray<T.Game>(gameGroup21);
        group21Buffer.add(newGame);
        gameGroup21 := Buffer.toArray(group21Buffer);
      };
      case 21{
        let group22Buffer = Buffer.fromArray<T.Game>(gameGroup22);
        group22Buffer.add(newGame);
        gameGroup22 := Buffer.toArray(group22Buffer);
      };
      case 22{
        let group23Buffer = Buffer.fromArray<T.Game>(gameGroup23);
        group23Buffer.add(newGame);
        gameGroup23 := Buffer.toArray(group23Buffer);
      };
      case 23{
        let group24Buffer = Buffer.fromArray<T.Game>(gameGroup24);
        group24Buffer.add(newGame);
        gameGroup24 := Buffer.toArray(group24Buffer);
      };
      case 24{
        let group25Buffer = Buffer.fromArray<T.Game>(gameGroup25);
        group25Buffer.add(newGame);
        gameGroup25 := Buffer.toArray(group25Buffer);
      };
      case 25{
        let group26Buffer = Buffer.fromArray<T.Game>(gameGroup26);
        group26Buffer.add(newGame);
        gameGroup26 := Buffer.toArray(group26Buffer);
      };
      case 26{
        let group27Buffer = Buffer.fromArray<T.Game>(gameGroup27);
        group27Buffer.add(newGame);
        gameGroup27 := Buffer.toArray(group27Buffer);
      };
      case 27{
        let group28Buffer = Buffer.fromArray<T.Game>(gameGroup28);
        group28Buffer.add(newGame);
        gameGroup28 := Buffer.toArray(group28Buffer);
      };
      case 28{
        let group29Buffer = Buffer.fromArray<T.Game>(gameGroup29);
        group29Buffer.add(newGame);
        gameGroup29 := Buffer.toArray(group29Buffer);
      };
      case 29{
        let group30Buffer = Buffer.fromArray<T.Game>(gameGroup30);
        group30Buffer.add(newGame);
        gameGroup30 := Buffer.toArray(group30Buffer);
      };
      case 30{
        let group31Buffer = Buffer.fromArray<T.Game>(gameGroup31);
        group31Buffer.add(newGame);
        gameGroup31 := Buffer.toArray(group31Buffer);
      };
      case 31{
        let group32Buffer = Buffer.fromArray<T.Game>(gameGroup32);
        group32Buffer.add(newGame);
        gameGroup32 := Buffer.toArray(group32Buffer);
      };
      case 32{
        let group33Buffer = Buffer.fromArray<T.Game>(gameGroup33);
        group33Buffer.add(newGame);
        gameGroup33 := Buffer.toArray(group33Buffer);
      };
      case 33{
        let group34Buffer = Buffer.fromArray<T.Game>(gameGroup34);
        group34Buffer.add(newGame);
        gameGroup34 := Buffer.toArray(group34Buffer);
      };
      case 34{
        let group35Buffer = Buffer.fromArray<T.Game>(gameGroup35);
        group35Buffer.add(newGame);
        gameGroup35 := Buffer.toArray(group35Buffer);
      };
      case 35{
        let group36Buffer = Buffer.fromArray<T.Game>(gameGroup36);
        group36Buffer.add(newGame);
        gameGroup36 := Buffer.toArray(group36Buffer);
      };
      case 36{
        let group37Buffer = Buffer.fromArray<T.Game>(gameGroup37);
        group37Buffer.add(newGame);
        gameGroup37 := Buffer.toArray(group37Buffer);
      };
      case 37{
        let group38Buffer = Buffer.fromArray<T.Game>(gameGroup38);
        group38Buffer.add(newGame);
        gameGroup38 := Buffer.toArray(group38Buffer);
      };
      case 38{
        let group39Buffer = Buffer.fromArray<T.Game>(gameGroup39);
        group39Buffer.add(newGame);
        gameGroup39 := Buffer.toArray(group39Buffer);
      };
      case 39{
        let group40Buffer = Buffer.fromArray<T.Game>(gameGroup40);
        group40Buffer.add(newGame);
        gameGroup40 := Buffer.toArray(group40Buffer);
      };
      case 40{
        let group41Buffer = Buffer.fromArray<T.Game>(gameGroup41);
        group41Buffer.add(newGame);
        gameGroup41 := Buffer.toArray(group41Buffer);
      };
      case 41{
        let group42Buffer = Buffer.fromArray<T.Game>(gameGroup42);
        group42Buffer.add(newGame);
        gameGroup42 := Buffer.toArray(group42Buffer);
      };
      case 42{
        let group43Buffer = Buffer.fromArray<T.Game>(gameGroup43);
        group43Buffer.add(newGame);
        gameGroup43 := Buffer.toArray(group43Buffer);
      };
      case 43{
        let group44Buffer = Buffer.fromArray<T.Game>(gameGroup44);
        group44Buffer.add(newGame);
        gameGroup44 := Buffer.toArray(group44Buffer);
      };
      case 44{
        let group45Buffer = Buffer.fromArray<T.Game>(gameGroup45);
        group45Buffer.add(newGame);
        gameGroup45 := Buffer.toArray(group45Buffer);
      };
      case 45{
        let group46Buffer = Buffer.fromArray<T.Game>(gameGroup46);
        group46Buffer.add(newGame);
        gameGroup46 := Buffer.toArray(group46Buffer);
      };
      case 46{
        let group47Buffer = Buffer.fromArray<T.Game>(gameGroup47);
        group47Buffer.add(newGame);
        gameGroup47 := Buffer.toArray(group47Buffer);
      };
      case 47{
        let group48Buffer = Buffer.fromArray<T.Game>(gameGroup48);
        group48Buffer.add(newGame);
        gameGroup48 := Buffer.toArray(group48Buffer);
      };
      case 48{
        let group49Buffer = Buffer.fromArray<T.Game>(gameGroup49);
        group49Buffer.add(newGame);
        gameGroup49 := Buffer.toArray(group49Buffer);
      };
      case 49{
        let group50Buffer = Buffer.fromArray<T.Game>(gameGroup50);
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

  public shared ({ caller }) func getLatestId() : async T.GameId{
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

  public shared ({ caller }) func getGame(dto: DTOs.GetGameDTO) : async Result.Result<DTOs.GameDTO, T.Error>{
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
              events = foundGame.events;
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

  public shared ({ caller }) func addGameInvites(dto: DTOs.AddGameInvitesDTO) : async Result.Result<(), T.Error>{
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
            let updatedInvitesBuffer = Buffer.fromArray<T.PrincipalId>(foundGame.invites);
            updatedInvitesBuffer.append(Buffer.fromArray(dto.golferIds));
            
            let updatedGame: T.Game = {
              courseId = foundGame.courseId;
              courseSnapshot = foundGame.courseSnapshot;
              events = foundGame.events;
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

  public shared ({ caller }) func acceptGameInvite(dto: DTOs.AcceptGameInviteDTO) : async Result.Result<(), T.Error>{
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
            
            let updatedInvites = Array.filter<T.PrincipalId>(foundGame.invites, func(invite: T.PrincipalId){
              invite != dto.acceptedById
            });

            let updatedPlayerIdsBuffer = Buffer.fromArray<T.PrincipalId>(foundGame.playerIds);
            updatedPlayerIdsBuffer.add(dto.acceptedById);

            let updatedGame: T.Game = {
              courseId = foundGame.courseId;
              courseSnapshot = foundGame.courseSnapshot;
              events = foundGame.events;
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

  public shared ({ caller }) func addGameScore(dto: DTOs.AddGameScoreDTO) : async Result.Result<(), T.Error>{
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

            var updatedScoreInfo: ?T.GameScoreDetail = null;
            switch(dto.detail){
              case (#MulligansScores updatedScore){
                
                switch(foundGame.scoreDetail){
                  case (?(#MulligansScores currentScore)){
                    var golfer1HolesWon = currentScore.golfer1HolesWonCount;
                    var golfer2HolesWon = currentScore.golfer2HolesWonCount;
                    
                    if(updatedScore.winner == foundGame.playerIds[0]){
                      golfer1HolesWon += 1;
                    };
                    
                    if(updatedScore.winner == foundGame.playerIds[1]){
                      golfer2HolesWon += 1;
                    };

                    var mulliganHoleResultBuffer = Buffer.fromArray<T.MulligansHoleResult>(currentScore.results);
                    mulliganHoleResultBuffer.add({
                      holeNumber = updatedScore.holeNumber;
                      winner = updatedScore.winner;
                      golfer1MulliganUsed = updatedScore.golfer1MulliganUsed;
                      golfer2MulliganUsed = updatedScore.golfer2MulliganUsed;
                    });

                    var difference: Int = Int8.toInt(Int8.fromNat8(golfer1HolesWon)) - Int8.toInt(Int8.fromNat8(golfer2HolesWon));
                    if(difference < 0){
                      difference := -difference;
                    };
                    
                    let remainingHoles: Int = 18 - Int8.toInt(Int8.fromNat8(updatedScore.holeNumber)); 

                    var gameWinner = "";
                    var gameStatus: T.GameStatus = foundGame.status;
                    if(difference > remainingHoles or updatedScore.holeNumber == 18){
                      if(golfer1HolesWon > golfer2HolesWon){
                        gameWinner := foundGame.playerIds[0];
                      };
                      if(golfer2HolesWon > golfer1HolesWon){
                        gameWinner := foundGame.playerIds[1];
                      };
                      gameStatus := #Complete;
                    };

                    updatedScoreInfo := ?(#MulligansScores {
                      results = Buffer.toArray(mulliganHoleResultBuffer);
                      golfer1HolesWonCount = golfer1HolesWon;
                      golfer2HolesWonCount = golfer2HolesWon;
                      winner = gameWinner;
                    });
            
                    let updatedGame: T.Game = {
                      courseId = foundGame.courseId;
                      courseSnapshot = foundGame.courseSnapshot;
                      events = foundGame.events;
                      gameType = foundGame.gameType;
                      id = foundGame.id;
                      invites = foundGame.invites;
                      playerIds = foundGame.playerIds;
                      predictions = foundGame.predictions;
                      scoreDetail = updatedScoreInfo;
                      status = gameStatus;
                      teeOffTime = foundGame.teeOffTime;
                      winner = gameWinner;
                    };
                    saveGame(foundGroupIndex, updatedGame);
                  };
                  case (null){ return #err(#NotFound); }
                };
              };
            };


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

  private func findGame(gameGroupIndex: Nat8, gameId: T.GameId) : ?T.Game {
    switch(gameGroupIndex){
      case 0{
        let foundGame = Array.find<T.Game>(gameGroup1, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 1{
        let foundGame = Array.find<T.Game>(gameGroup2, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 2{
        let foundGame = Array.find<T.Game>(gameGroup3, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 3{
        let foundGame = Array.find<T.Game>(gameGroup4, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 4{
        let foundGame = Array.find<T.Game>(gameGroup5, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 5{
        let foundGame = Array.find<T.Game>(gameGroup6, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 6{
        let foundGame = Array.find<T.Game>(gameGroup7, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 7{
        let foundGame = Array.find<T.Game>(gameGroup8, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 8{
        let foundGame = Array.find<T.Game>(gameGroup9, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 9{
        let foundGame = Array.find<T.Game>(gameGroup10, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 10{
        let foundGame = Array.find<T.Game>(gameGroup11, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 11{
        let foundGame = Array.find<T.Game>(gameGroup12, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 12{
        let foundGame = Array.find<T.Game>(gameGroup13, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 13{
        let foundGame = Array.find<T.Game>(gameGroup14, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 14{
        let foundGame = Array.find<T.Game>(gameGroup15, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 15{
        let foundGame = Array.find<T.Game>(gameGroup16, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 16{
        let foundGame = Array.find<T.Game>(gameGroup17, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 17{
        let foundGame = Array.find<T.Game>(gameGroup18, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 18{
        let foundGame = Array.find<T.Game>(gameGroup19, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 19{
        let foundGame = Array.find<T.Game>(gameGroup20, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 20{
        let foundGame = Array.find<T.Game>(gameGroup21, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 21{
        let foundGame = Array.find<T.Game>(gameGroup22, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 22{
        let foundGame = Array.find<T.Game>(gameGroup23, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 23{
        let foundGame = Array.find<T.Game>(gameGroup24, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 24{
        let foundGame = Array.find<T.Game>(gameGroup25, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 25{
        let foundGame = Array.find<T.Game>(gameGroup26, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 26{
        let foundGame = Array.find<T.Game>(gameGroup27, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 27{
        let foundGame = Array.find<T.Game>(gameGroup28, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 28{
        let foundGame = Array.find<T.Game>(gameGroup29, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 29{
        let foundGame = Array.find<T.Game>(gameGroup30, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 30{
        let foundGame = Array.find<T.Game>(gameGroup31, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 31{
        let foundGame = Array.find<T.Game>(gameGroup32, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 32{
        let foundGame = Array.find<T.Game>(gameGroup33, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 33{
        let foundGame = Array.find<T.Game>(gameGroup34, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 34{
        let foundGame = Array.find<T.Game>(gameGroup35, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 35{
        let foundGame = Array.find<T.Game>(gameGroup36, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 36{
        let foundGame = Array.find<T.Game>(gameGroup37, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 37{
        let foundGame = Array.find<T.Game>(gameGroup38, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 38{
        let foundGame = Array.find<T.Game>(gameGroup39, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 39{
        let foundGame = Array.find<T.Game>(gameGroup40, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 40{
        let foundGame = Array.find<T.Game>(gameGroup41, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 41{
        let foundGame = Array.find<T.Game>(gameGroup42, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 42{
        let foundGame = Array.find<T.Game>(gameGroup43, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 43{
        let foundGame = Array.find<T.Game>(gameGroup44, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 44{
        let foundGame = Array.find<T.Game>(gameGroup45, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 45{
        let foundGame = Array.find<T.Game>(gameGroup46, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 46{
        let foundGame = Array.find<T.Game>(gameGroup47, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 47{
        let foundGame = Array.find<T.Game>(gameGroup48, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 48{
        let foundGame = Array.find<T.Game>(gameGroup49, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case 49{
        let foundGame = Array.find<T.Game>(gameGroup50, func(game: T.Game){
          game.id == gameId
        });
        return foundGame;
      };
      case _ {
        return null;
      }
    }
  };

  private func addGame(gameGroupIndex: Nat8, newGame: T.Game) : Result.Result<(), T.Error> {
    return #err(#NotFound); //TODO
  };

  private func saveGame(gameGroupIndex: Nat8, updatedGame: T.Game) : Result.Result<(), T.Error> {
    switch(gameGroupIndex){
      case 0{
        gameGroup1 := Array.map<T.Game, T.Game>(gameGroup1, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 1{
        gameGroup2 := Array.map<T.Game, T.Game>(gameGroup2, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 2{
        gameGroup3 := Array.map<T.Game, T.Game>(gameGroup3, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 3{
        gameGroup4 := Array.map<T.Game, T.Game>(gameGroup4, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 4{
        gameGroup5 := Array.map<T.Game, T.Game>(gameGroup5, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 5{
        gameGroup6 := Array.map<T.Game, T.Game>(gameGroup6, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 6{
        gameGroup7 := Array.map<T.Game, T.Game>(gameGroup7, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 7{
        gameGroup8 := Array.map<T.Game, T.Game>(gameGroup8, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 8{
        gameGroup9 := Array.map<T.Game, T.Game>(gameGroup9, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 9{
        gameGroup10 := Array.map<T.Game, T.Game>(gameGroup10, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 10{
        gameGroup11 := Array.map<T.Game, T.Game>(gameGroup11, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 11{
        gameGroup12 := Array.map<T.Game, T.Game>(gameGroup12, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 12{
        gameGroup13 := Array.map<T.Game, T.Game>(gameGroup13, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 13{
        gameGroup14 := Array.map<T.Game, T.Game>(gameGroup14, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 14{
        gameGroup15 := Array.map<T.Game, T.Game>(gameGroup15, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 15{
        gameGroup16 := Array.map<T.Game, T.Game>(gameGroup16, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 16{
        gameGroup17 := Array.map<T.Game, T.Game>(gameGroup17, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 17{
        gameGroup18 := Array.map<T.Game, T.Game>(gameGroup18, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 18{
        gameGroup19 := Array.map<T.Game, T.Game>(gameGroup19, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 19{
        gameGroup20 := Array.map<T.Game, T.Game>(gameGroup20, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 20{
        gameGroup21 := Array.map<T.Game, T.Game>(gameGroup21, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 21{
        gameGroup22 := Array.map<T.Game, T.Game>(gameGroup22, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 22{
        gameGroup23 := Array.map<T.Game, T.Game>(gameGroup23, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 23{
        gameGroup24 := Array.map<T.Game, T.Game>(gameGroup24, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 24{
        gameGroup25 := Array.map<T.Game, T.Game>(gameGroup25, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 25{
        gameGroup26 := Array.map<T.Game, T.Game>(gameGroup26, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 26{
        gameGroup27 := Array.map<T.Game, T.Game>(gameGroup27, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 27{
        gameGroup28 := Array.map<T.Game, T.Game>(gameGroup28, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 28{
        gameGroup29 := Array.map<T.Game, T.Game>(gameGroup29, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 29{
        gameGroup30 := Array.map<T.Game, T.Game>(gameGroup30, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 30{
        gameGroup31 := Array.map<T.Game, T.Game>(gameGroup31, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 31{
        gameGroup32 := Array.map<T.Game, T.Game>(gameGroup32, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 32{
        gameGroup33 := Array.map<T.Game, T.Game>(gameGroup33, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 33{
        gameGroup34 := Array.map<T.Game, T.Game>(gameGroup34, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 34{
        gameGroup35 := Array.map<T.Game, T.Game>(gameGroup35, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 35{
        gameGroup36 := Array.map<T.Game, T.Game>(gameGroup36, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 36{
        gameGroup37 := Array.map<T.Game, T.Game>(gameGroup37, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 37{
        gameGroup38 := Array.map<T.Game, T.Game>(gameGroup38, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 38{
        gameGroup39 := Array.map<T.Game, T.Game>(gameGroup39, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 39{
        gameGroup40 := Array.map<T.Game, T.Game>(gameGroup40, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 40{
        gameGroup41 := Array.map<T.Game, T.Game>(gameGroup41, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 41{
        gameGroup42 := Array.map<T.Game, T.Game>(gameGroup42, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 42{
        gameGroup43 := Array.map<T.Game, T.Game>(gameGroup43, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 43{
        gameGroup44 := Array.map<T.Game, T.Game>(gameGroup44, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 44{
        gameGroup45 := Array.map<T.Game, T.Game>(gameGroup45, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 45{
        gameGroup46 := Array.map<T.Game, T.Game>(gameGroup46, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 46{
        gameGroup47 := Array.map<T.Game, T.Game>(gameGroup47, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 47{
        gameGroup48 := Array.map<T.Game, T.Game>(gameGroup48, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 48{
        gameGroup49 := Array.map<T.Game, T.Game>(gameGroup49, func(game: T.Game){
          if(game.id == updatedGame.id){
            return updatedGame;
          } else {
            return game;
          };
        });
      };
      case 49{
        gameGroup50 := Array.map<T.Game, T.Game>(gameGroup50, func(game: T.Game){
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

  private func removeGame(gameGroupIndex: Nat8, gameId: T.GameId) : Result.Result<(), T.Error>{
    return #err(#NotFound); //TODO
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

  //TODO
  //post upgrade
  
};
