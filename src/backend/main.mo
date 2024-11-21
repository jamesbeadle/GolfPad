import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
import Option "mo:base/Option";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import DTOs "dtos/DTOs";
import T "data-types/types";
import GolferManager "managers/golfer-manager";
import GolfCourseManager "managers/golf-course-manager";
import GameManager "managers/game-manager";
import Environment "utilities/Environment";

actor Self {

  private let golferManager = GolferManager.GolferManager();
  private let courseManager = GolfCourseManager.GolfCourseManager();
  private let gameManager = GameManager.GameManager();

  private stable var golfCourses: [DTOs.GolfCourseDTO] = [
      {
          courseId = 1;
          name = "Pebble Beach Golf Links";
          tees = [
              {
                  name = "Blue";
                  colour = "#0000FF";
                  added = Time.now();
                  strokeIndex = 1;
                  holes = [
                      {
                          name = "Hole 1";
                          number = 1;
                          strokeIndex = 1;
                          tees = [
                              {
                                  par = 4;
                                  name = "Blue";
                                  yardage = 400;
                                  colour = "#0000FF";
                                  strokeIndex = 1
                              }
                          ];
                          images = [
                              ("canister-id", 1) 
                          ]
                      }
                  ]
              }
          ];
          activeVersion = 1
      },
      {
          courseId = 2;
          name = "St. Andrews Links";
          tees = [
              {
                  name = "Gold";
                  colour = "#FFD700";
                  added = Time.now();
                  strokeIndex = 1;
                  holes = [
                      {
                          name = "Hole 1";
                          number = 1;
                          strokeIndex = 1;
                          tees = [
                              {
                                  par = 4;
                                  name = "Gold";
                                  yardage = 420;
                                  colour = "#FFD700";
                                  strokeIndex = 1
                              }
                          ];
                          images = [
                              ("canister-id", 2) 
                          ]
                      }
                  ]
              }
          ];
          activeVersion = 1
      },
      {
          courseId = 3;
          name = "Augusta National Golf Club";
          tees = [
              {
                  name = "Green";
                  colour = "#008000";
                  added = Time.now();
                  strokeIndex = 1;
                  holes = [
                      {
                          name = "Hole 1";
                          number = 1;
                          strokeIndex = 1;
                          tees = [
                              {
                                  par = 4;
                                  name = "Green";
                                  yardage = 450;
                                  colour = "#008000";
                                  strokeIndex = 1
                              }
                          ];
                          images = [
                              ("canister-id", 3)
                          ]
                      }
                  ]
              }
          ];
          activeVersion = 1
      }
  ];

  private stable var golfers: [DTOs.GolferDTO] = [
      {
          principalId = "Zoe-Duffy";
          username = "Zoe Duffy";
          golferPicture = null; // No picture for now
          golferPictureExtension = "jpg";
          handicap = null;
          upcomingGames = [];
          activeGames = [];
          completedGames = [];
          gameInvites = [];
      },
      {
          principalId = "Kelly-Howlett";
          username = "Kelly Howlett";
          golferPicture = null; // No picture for now
          golferPictureExtension = "jpeg";
          handicap = null;
          upcomingGames = [];
          activeGames = [];
          completedGames = [];
          gameInvites = [];
      },
      {
          principalId = "James-Beadle";
          username = "James Beadle";
          golferPicture = null; // No picture for now
          golferPictureExtension = "jpg";
          handicap = null;
          upcomingGames = [];
          activeGames = [];
          completedGames = [];
          gameInvites = [];
      },
      {
          principalId = "Thilly-Thana";
          username = "Thilly Thana";
          golferPicture = null; // No picture for now
          golferPictureExtension = "jpg";
          handicap = null;
          upcomingGames = [];
          activeGames = [];
          completedGames = [];
          gameInvites = [];
      }
  ];

  private stable var games: [DTOs.GameDTO] = [
    {
        id = 1;
        gameType = #Mulligans;
        scoreDetail = null;  // Assume no score details yet
        status = #Unplayed; // Set all games to 'Unplayed'
        courseId = 1; // Pebble Beach Golf Links
        predictions = [];
        events = [];
        courseSnapshot = {
            courseId = 1;
            courseVersion = 1;
            name = "Pebble Beach Golf Links";
            teeGroup = {
                name = "Blue";
                colour = "#0000FF";
                added = Time.now();
                strokeIndex = 1;
                holes = [
                    {
                        name = "Hole 1";
                        number = 1;
                        strokeIndex = 1;
                        tees = [
                            {
                                par = 4;
                                name = "Blue";
                                yardage = 400;
                                colour = "#0000FF";
                                strokeIndex = 1
                            }
                        ];
                        images = [("canister-id", 1)]
                    }
                ]
            };
        };
        teeOffTime = Time.now() + 100000000; // Future tee-off time
        playerIds = ["James-Beadle", "Zoe-Duffy"];
        invites = ["Kelly-Howlett"];
        winner = ""; // No winner yet
    },
    {
        id = 2;
        gameType = #BuildIt;
        scoreDetail = null;
        status = #Unplayed; // Set to 'Unplayed'
        courseId = 2; // St. Andrews Links
        predictions = [];
        events = [];
        courseSnapshot = {
            courseId = 2;
            courseVersion = 1;
            name = "St. Andrews Links";
            teeGroup = {
                name = "Gold";
                colour = "#FFD700";
                added = Time.now();
                strokeIndex = 1;
                holes = [
                    {
                        name = "Hole 1";
                        number = 1;
                        strokeIndex = 1;
                        tees = [
                            {
                                par = 4;
                                name = "Gold";
                                yardage = 420;
                                colour = "#FFD700";
                                strokeIndex = 1
                            }
                        ];
                        images = [("canister-id", 2)]
                    }
                ]
            };
        };
        teeOffTime = Time.now() + 200000000; // Future tee-off time
        playerIds = ["Kelly-Howlett", "Thilly-Thana"];
        invites = ["James-Beadle"];
        winner = "";
    },
    {
        id = 3;
        gameType = #Bands;
        scoreDetail = null;
        status = #Unplayed; // Set to 'Unplayed'
        courseId = 3; // Augusta National Golf Club
        predictions = [];
        events = [];
        courseSnapshot = {
            courseId = 3;
            courseVersion = 1;
            name = "Augusta National Golf Club";
            teeGroup = {
                name = "Green";
                colour = "#008000";
                added = Time.now();
                strokeIndex = 1;
                holes = [
                    {
                        name = "Hole 1";
                        number = 1;
                        strokeIndex = 1;
                        tees = [
                            {
                                par = 4;
                                name = "Green";
                                yardage = 450;
                                colour = "#008000";
                                strokeIndex = 1
                            }
                        ];
                        images = [("canister-id", 3)]
                    }
                ]
            };
        };
        teeOffTime = Time.now() + 300000000; // Future tee-off time
        playerIds = ["Thilly-Thana"];
        invites = ["Kelly-Howlett"];
        winner = "";
    }
];

  private stable var golferGameSummaries: DTOs.GolferGameSummariesDTO = {
      entries = [
          {
              gameType = #Mulligans;
              players = ["James-Beadle", "Zoe-Duffy"];
              status = #Unplayed; // Game has not been played yet
              date = 1735197120000000000; // Future date for tee-off
          },
          {
              gameType = #BuildIt;
              players = ["Kelly-Howlett", "Thilly-Thana"];
              status = #Unplayed; // Game has not been played yet
              date = 1765197120000000000; // Future date for tee-off
          }
      ];
      totalEntries = 2;
      limit = 10;
      offset = 0;
  };


  
  //Golfer Functions

  public shared ({ caller }) func createGolfer(dto: DTOs.CreateGolferDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.createGolfer(principalId, dto);
  };

  public shared ({ caller }) func updateGolfer(dto: DTOs.UpdateGolferDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.updateGolfer(principalId, dto);
  };

  public shared ({ caller }) func saveGolferPicture(dto: DTOs.UpdateGolferPictureDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.saveGolferPicture(principalId, dto);
  };

  public shared ({ caller }) func getMyGolfer() : async Result.Result<DTOs.MyGolferDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.getMyGolfer(principalId);
  };

  public shared ({ caller }) func getGolfer(dto: DTOs.GetGolferDTO) : async Result.Result<DTOs.GolferDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    return await golferManager.getGolfer(dto);
  };

  public shared ({ caller }) func getGolferGameHistory(dto: DTOs.PaginationFilters) : async Result.Result<DTOs.GolferGameSummariesDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.getGolferGameSummaries(principalId, dto);
  };

  //Homepage DTOs

  public shared ({ caller }) func getGolferBuzz(dto: DTOs.PaginationFilters) : async Result.Result<DTOs.GolferBuzzDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.getBuzz(principalId, dto);
  };

  public shared ({ caller }) func getUpcomingGames(dto: DTOs.PaginationFilters) : async Result.Result<DTOs.UpcomingGamesDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.getUpcomingGames(principalId, dto);
  };

  //Yardage Sets

  public shared ({ caller }) func getYardageSet(dto: DTOs.GetYardageSetDTO) : async Result.Result<DTOs.YardageSetDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.getYardageSet(principalId, dto);
  };
    
  public shared ({ caller }) func createYardageSet(dto: DTOs.CreateYardageSetDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.createYardageSet(principalId, dto);
  };
    
  public shared ({ caller }) func updateYardageSet(dto: DTOs.UpdateYardageSetDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.updateYardageSet(principalId, dto);
  };
    
  public shared ({ caller }) func deleteYardageSet(dto: DTOs.DeleteYardageSetDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.deleteYardageSet(principalId, dto);
  };

  //Friend requests

  public shared ({ caller }) func listGolfers(dto: DTOs.ListGolfersDTO) : async Result.Result<[DTOs.GolferDTO], T.Error> {
    /* assert not Principal.isAnonymous(caller);
    return await golferManager.listGolfers(dto); */
    return #ok(golfers);
  };

  public shared ({ caller }) func listFriendRequests(dto: DTOs.PaginationFilters) : async Result.Result<DTOs.FriendRequestsDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.listFriendRequests(principalId, dto);
  };
    
  public shared ({ caller }) func acceptFriendRequest(dto: DTOs.AcceptFriendRequestDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert await golferManager.friendRequestExists(principalId, dto.requestedBy);
    return await golferManager.acceptFriendRequest(principalId, dto);
  };
    
  public shared ({ caller }) func rejectFriendRequest(dto: DTOs.RejectFriendRequestDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.rejectFriendRequest(principalId, dto);
  };
    
  public shared ({ caller }) func sendFriendRequest(dto: DTOs.SendFriendRequestDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.sendFriendRequest(principalId, dto);
  };

  //Golf courses

  public shared ({ caller }) func listCourses(dto: DTOs.PaginationFilters) : async Result.Result<DTOs.CoursesDTO, T.Error> {
    /* assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.listCourses(principalId, dto); */
    return #ok({courses = golfCourses});
  };
    
  public shared ({ caller }) func createGolfCourse(dto: DTOs.CreateGolfCourseDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.createGolfCourse(principalId, dto);
  };
    
  public shared ({ caller }) func updateGolfCourse(dto: DTOs.UpdateGolfCourseDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.updateGolfCourse(principalId, dto);
  };
    
  public shared ({ caller }) func deleteGolfCourse(dto: DTOs.DeleteGolfCourseDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.deleteGolfCourse(principalId, dto);
  };
      
  //Game
    
  public shared ({ caller }) func getMyGames(dto: DTOs.PaginationFilters) : async Result.Result<DTOs.GolferGameSummariesDTO, T.Error> {
    /* assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.getGolferGameSummaries(principalId, dto); */
    return #ok(golferGameSummaries);
  };

  public shared ({ caller }) func getDummyGames(dto: DTOs.PaginationFilters) : async Result.Result<[DTOs.GameDTO], T.Error> {
    return #ok(games);
  };
    
  public shared ({ caller }) func getGame(dto: DTOs.GetGameDTO) : async Result.Result<DTOs.GameDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    return await gameManager.getGame(dto);
  };

  public shared ({ caller }) func createGame(dto: DTOs.CreateGameDTO) : async Result.Result<(), T.Error> {
    //assert not Principal.isAnonymous(caller);
    assert dto.teeOffTime > Time.now();
    
    let principalId = Principal.toText(caller);
    
    switch(dto.courseType){
      case (#Custom){
        assert await golferManager.customCourseExists(principalId, dto.courseId);
      };
      case (#Official){
        assert courseManager.courseExists(dto.courseId);
      };
    };

    assert await golferManager.hasFriends(principalId, dto.inviteIds);

    var golfCourse: ?DTOs.GolfCourseDTO = null;

    switch(dto.courseType){
      case (#Custom){
        let result = await golferManager.getGolfCourse(principalId, dto.courseId);
        switch(result){
          case (#ok foundCourse){
            golfCourse := ?foundCourse;
          };
          case (#err _){
            return #err(#NotFound);
          }
        }
      };
      case (#Official){
        let result = await courseManager.getCourse({courseId = dto.courseId});
        switch(result){
          case (#ok foundCourse){
            golfCourse := ?foundCourse;
          };
          case (#err _){
            return #err(#NotFound);
          }
        }
      }
    };

    switch(golfCourse){
      case (?foundCourse){
        let teeGroup = Array.find<T.TeeGroup>(foundCourse.tees, func(teeGroup: T.TeeGroup){
          teeGroup.name == dto.teeGroup;
        });

        switch(teeGroup){
          case (?foundTeeGroup){
            let result = await gameManager.createGame(dto, {
              id = foundCourse.courseId;
              courseVersion = foundCourse.activeVersion;
              name = foundCourse.name;
              teeGroup = foundTeeGroup;
            });

            switch(result){
              case (#ok gameId){
                return await golferManager.addGame(principalId, gameId, dto.inviteIds);
              };
              case (#err _){
                return #err(#CreateGameError);
              }
            };
          };
          case (null){
            return #err(#CreateGameError);
          }
        };

      };
      case (null){
        return #err(#NotFound);
      }
    };
  };

  public shared ({ caller }) func sendGameInvites(dto: DTOs.InviteGolfersDTO) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert Option.isNull(Array.find<T.PrincipalId>(dto.invitedGolferIds, func(golferId: T.PrincipalId){ golferId == principalId }));
    
    let existingGame = await gameManager.getGame({ gameId = dto.gameId });

    switch(existingGame){
      case (#ok game) {

        assert game.status == #Unplayed;

        for(golferPrincipalId in Iter.fromArray(dto.invitedGolferIds)){
          assert Option.isNull(Array.find<T.PrincipalId>(game.playerIds, func(playerId: T.PrincipalId){ playerId ==  golferPrincipalId}));
        };

        for(golferPrincipalId in Iter.fromArray(dto.invitedGolferIds)){
      
          let invitedGolfer = await golferManager.getGolfer({
            golferPrincipalId = golferPrincipalId;
          });
        
          switch(invitedGolfer){
            case (#ok foundGolfer){
              assert Option.isNull(Array.find<T.GameId>(foundGolfer.upcomingGames, func(foundGameId: T.GameId){
                foundGameId == game.id
              }));
              
              assert Option.isNull(Array.find<T.GameInvite>(foundGolfer.gameInvites, func(foundInvite: T.GameInvite){
                foundInvite.gameId == game.id
              }));        
            };
            case (#err _) {
              return #err(#NotFound);
            }
          };
        };

        return await gameManager.addGameInvites({gameId = dto.gameId; golferIds = dto.invitedGolferIds});
      };
      case (#err _) {
        return #err(#NotFound);
      };
    };
  };

  public shared ({ caller }) func acceptGameInvite(dto: DTOs.AcceptGameInviteDTO) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert principalId == dto.acceptedById;
    return await gameManager.acceptGameInvite(dto);
  };

  public shared ({ caller }) func addGameScore(dto: DTOs.AddGameScoreDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await gameManager.addGameScore(principalId, dto);
  };

  public shared ({ caller }) func beginGame(dto: DTOs.BeginGameDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await gameManager.beginGame(principalId, dto);
  };

  //DAO Validation & Execution Functions

  public shared query ({ caller }) func validateAddGolfCourse(dto : DTOs.CreateGolfCourseDTO) : async T.RustResult {
    assert Principal.toText(caller) == Environment.SNS_GOVERNANCE_CANISTER_ID;
    
    //Todo when functionality available: Make cross subnet call to governance canister to see if proposal already exists

    return courseManager.validateAddGolfCourse(dto);
  };

  public shared ({ caller }) func executeAddGolfCourse(dto : DTOs.CreateGolfCourseDTO) : async () {
    assert Principal.toText(caller) == Environment.SNS_GOVERNANCE_CANISTER_ID;
    return await courseManager.executeAddGolfCourse(dto);
  };

  public shared query ({ caller }) func validateUpdateGolfCourse(dto : DTOs.UpdateGolfCourseDTO) : async T.RustResult {
    assert Principal.toText(caller) == Environment.SNS_GOVERNANCE_CANISTER_ID;
    
    //Todo when functionality available: Make cross subnet call to governance canister to see if proposal already exists

    return courseManager.validateUpdateGolfCourse(dto);
  };

  public shared ({ caller }) func executeUpdateGolfCourse(dto : DTOs.UpdateGolfCourseDTO) : async () {
    assert Principal.toText(caller) == Environment.SNS_GOVERNANCE_CANISTER_ID;
    return await courseManager.executeUpdateGolfCourse(dto);
  };

  //stable storage

  private stable var stable_golfer_canister_index: [(T.PrincipalId, T.CanisterId)] = [];
  private stable var stable_golf_course_canister_index: [(T.GolfCourseId, T.CanisterId)] = [];
  private stable var stable_game_canister_index: [(T.GameId, T.CanisterId)] = [];
  
  private stable var stable_active_golfer_canister_id: T.CanisterId = "";
  private stable var stable_active_golf_course_canister_id: T.CanisterId = "";
  private stable var stable_active_game_canister_id: T.CanisterId = "";

  private stable var stable_usernames : [(T.PrincipalId, Text)] = [];
  private stable var stable_golf_course_names : [(T.GolfCourseId, Text)] = [];
  
  private stable var stable_unique_golfer_canister_ids : [T.CanisterId] = [];
  private stable var stable_unique_golf_course_canister_ids : [T.CanisterId] = [];
  private stable var stable_unique_game_canister_ids : [T.CanisterId] = [];

  private stable var stable_total_golfers : Nat = 0;
  private stable var stable_total_golf_courses : Nat = 0;
  private stable var stable_total_games : Nat = 0;
  
  system func preupgrade() {
    stable_golfer_canister_index := golferManager.getStableCanisterIndex();
    stable_golf_course_canister_index := courseManager.getStableCanisterIndex();
    stable_game_canister_index := gameManager.getStableCanisterIndex();
    
    stable_active_golfer_canister_id := golferManager.getStableActiveCanisterId();
    stable_active_golf_course_canister_id := courseManager.getStableActiveCanisterId();
    stable_active_game_canister_id := gameManager.getStableActiveCanisterId();

    stable_usernames := golferManager.getStableUsernames();
    stable_golf_course_names := courseManager.getStableGolfCourseNames();
    
    stable_unique_golfer_canister_ids := golferManager.getStableUniqueCanisterIds();
    stable_unique_golf_course_canister_ids := courseManager.getStableUniqueCanisterIds();
    stable_unique_game_canister_ids := gameManager.getStableUniqueCanisterIds();

    stable_total_golfers := golferManager.getStableTotalGolfers();
    stable_total_golf_courses := courseManager.getStableTotalGolfCourses();
    stable_total_games := gameManager.getStableTotalGames();
  };

  system func postupgrade() {
    
    golferManager.setStableCanisterIndex(stable_golfer_canister_index);
    courseManager.setStableCanisterIndex(stable_golf_course_canister_index);
    gameManager.setStableCanisterIndex(stable_game_canister_index);
    
    golferManager.setStableActiveCanisterId(stable_active_golfer_canister_id);
    courseManager.setStableActiveCanisterId(stable_active_golf_course_canister_id);
    gameManager.setStableActiveCanisterId(stable_active_game_canister_id);

    golferManager.setStableUsernames(stable_usernames);
    courseManager.setStableGolfCourseNames(stable_golf_course_names);
    
    golferManager.setStableUniqueCanisterIds(stable_unique_golfer_canister_ids);
    courseManager.setStableUniqueCanisterIds(stable_unique_golf_course_canister_ids);
    gameManager.setStableUniqueCanisterIds(stable_unique_game_canister_ids);
  };

};
