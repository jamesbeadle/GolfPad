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

  public shared query ({ caller }) func getGolfer(principalId: Text) : async Result.Result<DTOs.ProfileDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    return golferManager.getGolfer(principalId);
  };

  public shared query ({ caller }) func getGolferBuzz(dto: GetGolferBuzzDTO) : async Result.Result<DTOs.GolferBuzzDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    return golferManager.getBuzz(Principal.toText(caller));
  };

  public shared query ({ caller }) func getUpcomingGames(dto: GetUpcomingGamesDTO) : async Result.Result<DTOs.UpcomingGamesDTO, T.Error> {
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

  public shared query ({ caller }) func getYardageSet(dto: T.GetYardageSetDTO) : async Result.Result<DTOs.YardageSetDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return golferManager.getYardageSet(principalId, dto);
  };
    
  public shared ({ caller }) func addYardageSetClub(dto: DTOs.AddYardageSetClubDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.addYardageSetClub(principalId, dto);
  };
    
  public shared ({ caller }) func removeYardageSetClub(dto: DTOs.RemoveYardageSetClubDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.removeYardageSetClub(principalId, dto);
  };
    
  public shared ({ caller }) func updateYardage(dto: DTOs.AddYardageDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.updateYardage(principalId, dto);
  };
  
  //search golfers
  //get friend requests
  //accept friend request
  //reject friend request
  //send friend request
  //get golfer details
  //get golfer game history
  
  //get my games
  //get game details






  //search courses
  //create home course
  //update home course
  
  //get golf course
  //edit golf course
  
  



  //create mulligans game
  //get mulligans game
  //update mulligans game
  //delete mulligans game
  //add mulligans score
  //update mulligans score

  //create bands game
  //get bands game
  //update bands game
  //delete bands game
  //add bands prediction
  //update bands prediction
  //add bands score
  //update bands score

  //create prophet game
  //add prophpet prediction
  //add prophet result
  //get prophet game

  //next up

  //biuld it


  

  //User public endpoints:
  
  public shared query ({ caller }) func getUser() : async Result.Result<DTOs.UserDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.getUser(principalId);
  };

  public shared ({ caller }) func addFriend(dto: DTOs.AddFriendDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.addFriend(principalId, dto);
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

  public shared ({ caller }) func aceceptGameInvite(dto: DTOs.AccepteGameInviteDTO) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return gameManager.aceceptGameInvite(principalId, dto);
  };

  public shared ({ caller }) func updateGameStatus(dto: DTOs.UpdateGameStatusDTO) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return gameManager.updateGameStatus(principalId, dto);
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

  public shared ({ caller }) func getGameLeaderboard(dto: DTOs.GetLeaderboardDTO) : async Result.Result<DTOs.LeaderboardDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    return gameManager.getLeaderboard(dto);
  };

  public shared ({ caller }) func getGames(dto: DTOs.GetGamesDTO) : async Result.Result<[DTOs.GameDTO], T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return gameManager.getGames(principalId, dto);
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
