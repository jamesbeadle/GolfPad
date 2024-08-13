import Result "mo:base/Result";
import Principal "mo:base/Principal";
import DTOs "dtos/DTOs";
import T "data-types/types";
import ProfileManager "managers/profile-manager";
import CourseManager "managers/course-manager";
import GameManager "managers/game-manager";

actor Self {

  private let profileManager = ProfileManager.ProfileManager();
  private let courseManager = CourseManager.CourseManager();
  private let gameManager = GameManager.GameManager();
    
  public shared ({ caller }) func createProfile(dto: DTOs.CreateProfileDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.createProfile(principalId, dto);
  };

  public shared ({ caller }) func updateProfile(dto: DTOs.UpdateProfileDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.updateProfile(principalId, dto);
  };

  public shared ({ caller }) func updateProfilePicture(dto: DTOs.UpdateProfilePictureDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.updateProfilePicture(principalId, dto);
  };

  public shared query ({ caller }) func getProfile() : async Result.Result<DTOs.ProfileDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    return golferManager.getUpcomingGames(Principal.toText(caller));
  };

  public shared query ({ caller }) func getGolferBuzz(dto: DTOs.GetGolferBuzzDTO) : async Result.Result<DTOs.GolferBuzzDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    return golferManager.getBuzz(Principal.toText(caller));
  };

  public shared query ({ caller }) func getUpcomingGames(dto: DTOs.GetUpcomingGamesDTO) : async Result.Result<DTOs.UpcomingGamesDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    return golferManager.getUpcomingGames(Principal.toText(caller));
  };
    
  public shared ({ caller }) func createYardageSet(dto: DTOs.CreateYardageSetDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.createYardageSet(principalId, dto);
  };
    
  public shared ({ caller }) func updateYardageSet(dto: DTOs.UpdateYardageSetDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.updateYardageSet(principalId, dto);
  };
    
  public shared ({ caller }) func deleteYardageSet(dto: DTOs.DeleteYardageSetDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.deleteYardageSet(principalId, dto);
  };

  public shared query ({ caller }) func getYardageSet(dto: DTOs.GetYardageSetDTO) : async Result.Result<DTOs.YardageSetDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return golferManager.getYardageSet(principalId, dto);
  };
    
  public shared ({ caller }) func addYardageSetClub(dto: DTOs.AddYardageSetClubDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.addYardageSetClub(principalId, dto);
  };
    
  public shared ({ caller }) func deleteYardageSetClub(dto: DTOs.DeleteYardageSetClubDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.deleteYardageSetClub(principalId, dto);
  };
    
  public shared ({ caller }) func updateYardage(dto: DTOs.AddYardageDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.updateYardage(principalId, dto);
  };

  public shared query ({ caller }) func listGolfers(dto: DTOs.ListGolfersDTO) : async Result.Result<DTOs.GolfersDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    return golferManager.listGolfers(dto);
  };

  public shared query ({ caller }) func getFriendRequests(dto: DTOs.GetFriendRequestsDTO) : async Result.Result<DTOs.FriendRequestsDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return golferManager.getFriendRequests(principalId, dto);
  };
    
  public shared ({ caller }) func acceptFriendRequest(dto: DTOs.AcceptFriendRequestDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.acceptFriendRequest(principalId, dto);
  };
    
  public shared ({ caller }) func rejectFriendRequest(dto: DTOs.RejectFriendRequestDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.acceptFriendRequest(principalId, dto);
  };
    
  public shared ({ caller }) func sendFriendRequest(dto: DTOs.SendFriendRequestDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.sendFriendRequest(principalId, dto);
  };

  public shared query ({ caller }) func getGolfer(dto: DTOs.GetGolferDTO) : async Result.Result<DTOs.GolferDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    return golferManager.getGolfer(dto);
  };

  public shared query ({ caller }) func getGolferGameHistory(dto: DTOs.GetGolferGameHistoryDTO) : async Result.Result<DTOs.GolferGameHistoryDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    return golferManager.getGolferGameHistory(dto);
  };
    
  public shared query ({ caller }) func getMyGames(dto: DTOs.GetMyGamesDTO) : async Result.Result<DTOs.MyGamesDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.getMyGames(principalId, dto);
  };
    
  public shared query ({ caller }) func getGame(dto: DTOs.GetGameDTO) : async Result.Result<DTOs.GameDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.getGame(principalId, dto);
  };

  public shared query ({ caller }) func listCourses(dto: DTOs.ListCoursesDTO) : async Result.Result<DTOs.CoursesDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    return golferManager.listCourses(dto);
  };

  public shared query ({ caller }) func listGolferCourses(dto: DTOs.ListGolferCoursesDTO) : async Result.Result<DTOs.GolferCoursesDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return golferManager.listGolferCourses(principalId, dto);
  };
    
  public shared ({ caller }) func addGolferCourse(dto: DTOs.AddGolferCourse) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.addGolferCourse(principalId, dto);
  };
    
  public shared ({ caller }) func deleteGolferCourse(dto: DTOs.DeleteGolferCourse) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.deleteGolferCourse(principalId, dto);
  };
    
  public shared ({ caller }) func addCustomCourse(dto: DTOs.AddCustomCourseDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.addCustomCourse(principalId, dto);
  };
    
  public shared ({ caller }) func updateCustomCourse(dto: DTOs.AddCustomCourseDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.updateCustomCourse(principalId, dto);
  };
    
  public shared ({ caller }) func deleteCustomCourse(dto: DTOs.DeleteCustomCourseDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.deleteCustomCourse(principalId, dto);
  };
  
  public shared ({ caller }) func createGame(dto: DTOs.CreateGameDTO) : async Result.Result<(), T.Error> {
     assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

    let usersExist = userManager.checkUsersExist(dto.invites);

    if(not usersExist){
      return #err(#NotFound);
    };

    let response = gameManager.createGame(principalId, dto);
    switch(response){
      case (#ok response){

        let gameId: T.GameId = response;

        userManager.addGameReferences(gameId, dto);

        return #ok;
      };
      case (#err response){
        return #err(#InvalidData);
      };
    };  

    return #ok;
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

  public shared ({ caller }) func submitProphetPrediction(dto: DTOs.ProphetPredictionDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return gameManager.submitProphetPrediction(principalId, dto);
  };

  //stable storage

  private stable var stable_users: [T.User] = [];
  private stable var stable_courses: [T.Course] = [];
  private stable var stable_games: [T.Game] = [];
  private stable var stable_next_game_id = 1;
  
  system func preupgrade() {
    stable_users := userManager.getStableUsers();
    stable_courses := courseManager.getStableCourses();
    stable_games := gameManager.getStableGames();
  };

  system func postupgrade() {
    userManager.setStableUsers(stable_users);
    courseManager.setStableCourses(stable_courses);
    gameManager.setStableGames(stable_games);
    gameManager.setStableNextGameId(stable_next_game_id);
  };

};
