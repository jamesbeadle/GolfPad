import Result "mo:base/Result";
import Principal "mo:base/Principal";
import DTOs "dtos/DTOs";
import T "data-types/types";
import UserManager "managers/user-manager";
import CourseManager "managers/course-manager";
import GameManager "managers/game-manager";

actor Self {

  private let userManager = UserManager.UserManager();
  private let courseManager = CourseManager.CourseManager();
  private let gameManager = GameManager.GameManager();
  

  //User public endpoints:
  
  public shared query ({ caller }) func getUser() : async Result.Result<DTOs.UserDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.getUser(principalId);
  };
    
  public shared ({ caller }) func createUser(dto: DTOs.CreateUserDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.createUser(principalId, dto);
  };

  public shared ({ caller }) func updateUser(dto: DTOs.UpdateUserDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.updateUser(principalId, dto);
  };


  //Course public endpoints:

  public shared query ({ caller }) func getCourse(courseId: T.CourseId) : async Result.Result<DTOs.CourseDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    return courseManager.getCourse(courseId);
  };
    
  public shared ({ caller }) func createCourse(dto: DTOs.CreateCourseDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return courseManager.createCourse(principalId, dto);
  };

  public shared ({ caller }) func updateCourse(dto: DTOs.UpdateCourseDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return courseManager.updateCourse(principalId, dto);
  };


  //Game public endpoints:

  public shared ({ caller }) func createGame(dto: DTOs.CreateGameDTO) : async Result.Result<(), T.Error> {
     assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    let _ = gameManager.createGame(principalId, dto);
    return #ok;
  };

  public shared ({ caller }) func sendGameInvite(dto: DTOs.InviteGolferDTO) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return gameManager.createGame(principalId, dto);
  };

  public shared ({ caller }) func aceceptGameInvite(dto: DTOs.AccepteGameInviteDTO) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return gameManager.createGame(principalId, dto);
  };

  public shared ({ caller }) func addGameScore(dto: DTOs.AddGameScoreDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return gameManager.addGameScore(principalId, dto);
  };

  public shared ({ caller }) func getScorecard(dto: DTOs.GetScorecardDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return gameManager.getScorecard(principalId, dto);
  };

  public shared ({ caller }) func getGameLeaderboard(dto: DTOs.GetGameLeaderboardDTO) : async Result.Result<DTOs.GameLeaderboardDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return #err(#NotFound); //TODO
    //return gameManager.getGameLeaderboard(principalId, dto);
  };

  public shared ({ caller }) func getGameHistory(dto: DTOs.GetGameHistoryDTO) : async Result.Result<DTOs.GameLeaderboardDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return #err(#NotFound); //TODO
    //return gameManager.getGameHistory(principalId, dto);
  };

  
  //stable storage

  private stable var stable_users: [T.User] = [];
  private stable var stable_courses: [T.Course] = [];
  private stable var stable_games: [T.Game] = [];
  
  system func preupgrade() {
    stable_users := userManager.getStableUsers();
    stable_courses := courseManager.getStableCourses();
    stable_games := gameManager.getStableGames();
  };

  system func postupgrade() {
    userManager.setStableUsers(stable_users);
    courseManager.setStableCourses(stable_courses);
    gameManager.setStableGames(stable_games);
  };

};
