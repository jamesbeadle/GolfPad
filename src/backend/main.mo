import Result "mo:base/Result";
import Principal "mo:base/Principal";
import DTOs "dtos/DTOs";
import T "data-types/types";
import GolferManager "managers/golfer-manager";
import CourseManager "managers/course-manager";
import GameManager "managers/game-manager";

actor Self {

  private let golferManager = GolferManager.GolferManager();
  private let courseManager = CourseManager.CourseManager();
  private let gameManager = GameManager.GameManager();
    
  //Golfer Functions

  public shared ({ caller }) func saveGolfer(dto: DTOs.SaveGolferDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.saveGolfer(principalId, dto);
  };

  public shared ({ caller }) func saveGolferPicture(dto: DTOs.SaveGolferPictureDTO) : async Result.Result<(), T.Error> {
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

  public shared ({ caller }) func getGolferGameHistory(dto: DTOs.GetGolferGameHistoryDTO) : async Result.Result<DTOs.GolferGameHistoryDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.getGolferGameHistory(principalId, dto);
  };

  //Homepage DTOs

  public shared ({ caller }) func getGolferBuzz(dto: DTOs.GetGolferBuzzDTO) : async Result.Result<DTOs.GolferBuzzDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.getBuzz(principalId, dto);
  };

  public shared ({ caller }) func getUpcomingGames(dto: DTOs.GetUpcomingGamesDTO) : async Result.Result<DTOs.UpcomingGamesDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.getUpcomingGames(principalId, dto);
  };

  //Yardage Sets
    
  public shared ({ caller }) func saveYardageSet(dto: DTOs.SaveYardageSetDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.saveYardageSet(principalId, dto);
  };
    
  public shared ({ caller }) func deleteYardageSet(dto: DTOs.DeleteYardageSetDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.deleteYardageSet(principalId, dto);
  };

  public shared ({ caller }) func getYardageSet(dto: DTOs.GetYardageSetDTO) : async Result.Result<DTOs.YardageSetDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.getYardageSet(principalId, dto);
  };
    
  public shared ({ caller }) func saveYardageSetClub(dto: DTOs.SaveYardageSetClubDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.saveYardageSetClub(principalId, dto);
  };
    
  public shared ({ caller }) func deleteYardageSetClub(dto: DTOs.DeleteYardageSetClubDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.deleteYardageSetClub(principalId, dto);
  };

  //Friend requests

  public shared ({ caller }) func listGolfers(dto: DTOs.ListGolfersDTO) : async Result.Result<DTOs.GolfersDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    return await golferManager.listGolfers(dto);
  };

  public shared ({ caller }) func listFriendRequests(dto: DTOs.ListFriendRequestsDTO) : async Result.Result<DTOs.FriendRequestsDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.listFriendRequests(principalId, dto);
  };
    
  public shared ({ caller }) func acceptFriendRequest(dto: DTOs.AcceptFriendRequestDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);



          //TODO: Check the friend request actually exists before accepting


    return await golferManager.acceptFriendRequest(principalId, dto);
  };
    
  public shared ({ caller }) func rejectFriendRequest(dto: DTOs.RejectFriendRequestDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.rejectFriendRequest(principalId, dto);
          //TODO: Check the friend request actually exists before rejecting
  };
    
  public shared ({ caller }) func sendFriendRequest(dto: DTOs.SendFriendRequestDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.sendFriendRequest(principalId, dto);
  };

  //Golf courses

  public shared query ({ caller }) func listCourses(dto: DTOs.ListCoursesDTO) : async Result.Result<DTOs.CoursesDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    return courseManager.listCourses(dto);
  };

  public shared query ({ caller }) func listGolferCourses(dto: DTOs.ListGolferCoursesDTO) : async Result.Result<DTOs.GolferCoursesDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return courseManager.listGolferCourses(principalId, dto);
  };
    
  public shared ({ caller }) func addGolferCourse(dto: DTOs.AddGolferCourseDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return courseManager.addGolferCourse(principalId, dto);
  };
    
  public shared ({ caller }) func deleteGolferCourse(dto: DTOs.DeleteGolferCourseDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return courseManager.deleteGolferCourse(principalId, dto);
  };
    
  public shared ({ caller }) func addCustomCourse(dto: DTOs.AddCustomCourseDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return courseManager.addCustomCourse(principalId, dto);
  };
    
  public shared ({ caller }) func updateCustomCourse(dto: DTOs.UpdateCustomCourseDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return courseManager.updateCustomCourse(principalId, dto);
  };
    
  public shared ({ caller }) func deleteCustomCourse(dto: DTOs.DeleteCustomCourseDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return courseManager.deleteCustomCourse(principalId, dto);
  };

  //Game
    
  public shared ({ caller }) func getMyGames(dto: DTOs.GetMyGamesDTO) : async Result.Result<DTOs.MyGamesDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.getMyGames(principalId, dto);
  };
    
  public shared query ({ caller }) func getGame(dto: DTOs.GetGameDTO) : async Result.Result<DTOs.GameDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return gameManager.getGame(principalId, dto);
  };

  public shared ({ caller }) func createGame(dto: DTOs.CreateGameDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    
    switch(dto.courseType){
      case (#Custom){
        assert courseManager.customCourseExists(dto.courseId);
      };
      case (#Official){
        assert courseManager.officialCourseExists(dto.courseId);
      };
    };

    assert await golferManager.hasFriends(principalId, dto.inviteIds);
    
    return gameManager.createGame(principalId, dto);
  };

  public shared ({ caller }) func sendGameInvite(dto: DTOs.InviteGolferDTO) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return gameManager.sendGameInvite(principalId, dto);
  };

  public shared ({ caller }) func acceptGameInvite(dto: DTOs.AccepteGameInviteDTO) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return gameManager.acceptGameInvite(principalId, dto);
  };

  public shared ({ caller }) func addGameScore(dto: DTOs.AddGameScoreDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return gameManager.addGameScore(principalId, dto);
  };

  public shared ({ caller }) func submitBandsPrediction(dto: DTOs.BandsPredictionDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return gameManager.submitBandsPrediction(principalId, dto);
  };

  public shared ({ caller }) func createTeam(dto: DTOs.CreateTeamDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return gameManager.createTeam(principalId, dto);
  };
    
  public shared query ({ caller }) func getTeam(dto: DTOs.GetTeamDTO) : async Result.Result<DTOs.TeamDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return gameManager.getTeam(principalId, dto);
  };

  public shared ({ caller }) func updateTeam(dto: DTOs.UpdateTeamDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return gameManager.updateTeam(principalId, dto);
  };

  //stable storage

  private stable var stable_golfer_canister_index: [(T.PrincipalId, T.CanisterId)] = [];
  private stable var stable_active_canister_id: T.CanisterId = "";

  private stable var stable_usernames : [(T.PrincipalId, Text)] = [];
  private stable var stable_unique_golfer_canister_ids : [T.CanisterId] = [];
  private stable var stable_total_golfers : Nat = 0;
  

  private stable var stable_courses: [T.Course] = [];
  private stable var stable_games: [T.Game] = [];
  private stable var stable_next_game_id = 1;
  
  system func preupgrade() {
    stable_golfer_canister_index := golferManager.getStableGolferCanisterIndex();
    stable_active_canister_id := golferManager.getStableActiveCanisterId();

    stable_courses := courseManager.getStableCourses();
    stable_games := gameManager.getStableGames();
  };

  system func postupgrade() {
    golferManager.setStableGolferCanisterIndex(stable_golfer_canister_index);
    golferManager.setStableUniqueGolferCanisterIds(stable_unique_golfer_canister_ids);
    golferManager.setStableActiveCanisterId(stable_active_canister_id);
    golferManager.setStableUsernames(stable_usernames);
    golferManager.setStableTotalGolfers(stable_total_golfers);
    courseManager.setStableCourses(stable_courses);
    gameManager.setStableGames(stable_games);
    gameManager.setStableNextGameId(stable_next_game_id);
  };

};
