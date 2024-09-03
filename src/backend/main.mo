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
    
  public shared ({ caller }) func saveProfile(dto: DTOs.SaveProfileDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.saveProfile(principalId, dto);
  };

  public shared ({ caller }) func saveProfileProfilePicture(dto: DTOs.SaveProfilePictureDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.saveProfileProfilePicture(principalId, dto);
  };

  public shared query ({ caller }) func getProfile() : async Result.Result<DTOs.ProfileDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return golferManager.getProfile(principalId);
  };

  public shared query ({ caller }) func getGolferBuzz(dto: DTOs.GetGolferBuzzDTO) : async Result.Result<DTOs.GolferBuzzDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return golferManager.getBuzz(principalId, dto);
  };

  public shared query ({ caller }) func getUpcomingGames(dto: DTOs.GetUpcomingGamesDTO) : async Result.Result<DTOs.UpcomingGamesDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return gameManager.getUpcomingGames(principalId, dto);
  };
    
  public shared ({ caller }) func createYardageSet(dto: DTOs.CreateYardageSetDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return golferManager.createYardageSet(principalId, dto);
  };
    
  public shared ({ caller }) func updateYardageSet(dto: DTOs.UpdateYardageSetDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return golferManager.updateYardageSet(principalId, dto);
  };
    
  public shared ({ caller }) func deleteYardageSet(dto: DTOs.DeleteYardageSetDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return golferManager.deleteYardageSet(principalId, dto);
  };

  public shared query ({ caller }) func getYardageSet(dto: DTOs.GetYardageSetDTO) : async Result.Result<DTOs.YardageSetDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return golferManager.getYardageSet(principalId, dto);
  };
    
  public shared ({ caller }) func addYardageSetClub(dto: DTOs.AddYardageSetClubDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return golferManager.addYardageSetClub(principalId, dto);
  };
    
  public shared ({ caller }) func deleteYardageSetClub(dto: DTOs.DeleteYardageSetClubDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return golferManager.deleteYardageSetClub(principalId, dto);
  };
    
  public shared ({ caller }) func updateYardage(dto: DTOs.AddYardageDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return golferManager.updateYardage(principalId, dto);
  };

  public shared query ({ caller }) func listGolfers(dto: DTOs.ListGolfersDTO) : async Result.Result<DTOs.GolfersDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    return golferManager.listGolfers(dto);
  };

  public shared query ({ caller }) func listFriendRequests(dto: DTOs.ListFriendRequestsDTO) : async Result.Result<DTOs.FriendRequestsDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return golferManager.listFriendRequests(principalId, dto);
  };
    
  public shared ({ caller }) func acceptFriendRequest(dto: DTOs.AcceptFriendRequestDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return golferManager.acceptFriendRequest(principalId, dto);
  };
    
  public shared ({ caller }) func rejectFriendRequest(dto: DTOs.RejectFriendRequestDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return golferManager.rejectFriendRequest(principalId, dto);
  };
    
  public shared ({ caller }) func sendFriendRequest(dto: DTOs.SendFriendRequestDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return golferManager.sendFriendRequest(principalId, dto);
  };

  public shared query ({ caller }) func getGolfer(dto: DTOs.GetGolferDTO) : async Result.Result<DTOs.GolferDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return golferManager.getGolfer(principalId, dto);
  };

  public shared query ({ caller }) func getGolferGameHistory(dto: DTOs.GetGolferGameHistoryDTO) : async Result.Result<DTOs.GolferGameHistoryDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return golferManager.getGolferGameHistory(principalId, dto);
  };
    
  public shared query ({ caller }) func getMyGames(dto: DTOs.GetMyGamesDTO) : async Result.Result<DTOs.MyGamesDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return golferManager.getMyGames(principalId, dto);
  };
    
  public shared query ({ caller }) func getGame(dto: DTOs.GetGameDTO) : async Result.Result<DTOs.GameDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return gameManager.getGame(principalId, dto);
  };

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

    assert golferManager.hasFriends(dto.inviteIds);
    
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

  //stable storage

  private stable var stable_profile_canister_index: [(T.PrincipalId, T.CanisterId)] = [];
  private stable var stable_active_canister_id: T.CanisterId = "";

  private stable var stable_usernames : [(T.PrincipalId, Text)] = [];
  private stable var stable_unique_profile_canister_ids : [T.CanisterId] = [];
  private stable var stable_total_profiles : Nat = 0;
  

  private stable var stable_courses: [T.Course] = [];
  private stable var stable_games: [T.Game] = [];
  private stable var stable_next_game_id = 1;
  
  system func preupgrade() {
    stable_profile_canister_index := golferManager.getStableProfileCanisterIndex();
    stable_active_canister_id := golferManager.getStableActiveCanisterId();

    stable_courses := courseManager.getStableCourses();
    stable_games := gameManager.getStableGames();
  };

  system func postupgrade() {
    golferManager.setStableProfileCanisterIndex(stable_profile_canister_index);
    golferManager.setStableUniqueProfileCanisterIds(stable_unique_profile_canister_ids);
    golferManager.setStableActiveCanisterId(stable_active_canister_id);
    golferManager.setStableUsernames(stable_usernames);
    golferManager.setStableTotalProfiles(stable_total_profiles);
    courseManager.setStableCourses(stable_courses);
    gameManager.setStableGames(stable_games);
    gameManager.setStableNextGameId(stable_next_game_id);
  };

};
