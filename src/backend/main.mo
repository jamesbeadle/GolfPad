import Base "mo:waterway-mops/BaseTypes";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Timer "mo:base/Timer";

import Environment "utilities/Environment";
import Management "utilities/Management";
import T "data-types/types";

import GameManager "managers/game-manager";
import GolfCourseManager "managers/golf-course-manager";
import GolferManager "managers/golfer-manager";

import GameCommands "commands/game_commands";
import GolfCourseCommands "commands/golf_course_commands";
import GolferCommands "commands/golfer_commands";
import ShotCommands "commands/shot_commands";
import FriendRequestCommands "commands/friend_request_commands";
import FriendCommands "commands/friend_commands";

import BaseQueries "queries/base_queries";

import BuzzQueries "queries/buzz_queries";
import GameQueries "queries/game_queries";
import GolfCourseQueries "queries/golf_course_queries";
import GolferQueries "queries/golfer_queries";
import ShotQueries "queries/shot_queries";
import FriendQueries "queries/friend_queries";
import FriendRequestQueries "queries/friend_request_queries";
import UpcomingGamesQueries "queries/upcoming_games_queries";

import GolferCanister "canister-definitions/golfer-canister";
import GolfCoursesCanister "canister-definitions/golf-courses-canister";
import GameCanister "canister-definitions/game-canister";

actor Self {

  private let golferManager = GolferManager.GolferManager();
  private let courseManager = GolfCourseManager.GolfCourseManager();
  private let gameManager = GameManager.GameManager();
  
  private var appStatus: Base.AppStatus = { 
    onHold = false;
    version = "0.0.1";
  }; 


  /* App CQRS */

  //App Queries:

  public shared query func getAppStatus() : async Result.Result<BaseQueries.AppStatusDTO, T.Error> {
    return #ok(appStatus);
  };


  /* Friend Request CQRS */

  //Golfer Friend Request Queries:

  public shared ({ caller }) func getFriendRequests(dto: FriendRequestQueries.GetFriendRequests) : async Result.Result<FriendRequestQueries.FriendRequests, T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.getFriendRequests(dto);
  };

  //Golfer Friend Request Commands:
    
  public shared ({ caller }) func acceptFriendRequest(dto: FriendRequestCommands.AcceptFriendRequest) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    assert await golferManager.friendRequestExists(dto.principalId, dto.requestedBy);
    return await golferManager.acceptFriendRequest(dto);
  };
    
  public shared ({ caller }) func rejectFriendRequest(dto: FriendRequestCommands.RejectFriendRequest) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.rejectFriendRequest(dto);
  };
    
  public shared ({ caller }) func sendFriendRequest(dto: FriendRequestCommands.SendFriendRequest) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.sendFriendRequest(dto);
  };


  /* Friend CQRS */

  //Friend Queries:

  public shared ({ caller }) func getFriends(dto: FriendQueries.GetFriends) : async Result.Result<FriendQueries.Friends, T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.getFriends(dto);
  };

  //Friend Commands:
    
  public shared ({ caller }) func removeFriend(dto: FriendCommands.RemoveFriend) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.removeFriend(dto);
  };


  /* Game CQRS */
  
  //Game Queries:

  public shared ({ caller }) func getGameSummaries(dto: GameQueries.GetGameSummaries) : async Result.Result<GameQueries.GameSummaries, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert dto.principalId == principalId;
    return await golferManager.getGameSummaries(dto);
  };

  public shared ({ caller }) func getGame(dto: GameQueries.GetGame) : async Result.Result<GameQueries.Game, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert await gameManager.isGameMember(dto.gameId, principalId);
    return await gameManager.getGame(dto);
  };
  
  public shared ({ caller }) func getGameInvites(dto: GameQueries.GetGameInvites) : async Result.Result<GameQueries.GameInvites, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.getGameInvites(dto);
  };

  //Game Commands:

  public shared ({ caller }) func createGame(dto: GameCommands.CreateGame) : async Result.Result<T.GameId, T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.createdById == Principal.toText(caller);
    return await gameManager.createGame(dto);
  };

  public shared ({ caller }) func beginGame(dto: GameCommands.BeginGame) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert await gameManager.isGameMember(dto.gameId, principalId);
    return await gameManager.beginGame(dto);
  };

  public shared ({ caller }) func predictGame(dto: GameCommands.PredictGame) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert await gameManager.isGameMember(dto.gameId, principalId);
    return await gameManager.predictGame(dto);
  };

  public shared ({ caller }) func addGameScore(dto: GameCommands.AddGameScore) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert await gameManager.isGameMember(dto.gameId, principalId);
    return await gameManager.addGameScore(dto);
  };

  public shared ({ caller }) func deleteGame(dto: GameCommands.DeleteGame) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert await gameManager.isGameOwner(dto.gameId, principalId);
    return await gameManager.deleteGame(dto);
  };
  
  public shared ({ caller }) func inviteGolfers(dto: GameCommands.InviteGolfers) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert await gameManager.isGameOwner(dto.gameId, principalId);
    return await gameManager.inviteGolfers(dto);
  };
  
  public shared ({ caller }) func acceptGameInvite(dto: GameCommands.AcceptGameInvite) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.acceptedById == Principal.toText(caller);
    return await gameManager.acceptGameInvite(dto);
  };
  
  public shared ({ caller }) func rejectGameInvite(dto: GameCommands.RejectGameInvite) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.rejectedById == Principal.toText(caller);
    return await gameManager.rejectGameInvite(dto);
  };

  /* Golf Course CQRS */

  //Golf Course Queries:

  public shared ({ caller }) func getGolfCourses(dto: GolfCourseQueries.GetGolfCourses) : async Result.Result<GolfCourseQueries.GolfCourses, T.Error>{
    assert not Principal.isAnonymous(caller);
     //- List all the courses that i have favourited as a user
       
    return await courseManager.getGolfCourses(dto);
  };

  public shared ({ caller }) func getGolfCourse(dto: GolfCourseQueries.GetGolfCourse) : async Result.Result<GolfCourseQueries.GolfCourse, T.Error>{
    assert not Principal.isAnonymous(caller);
    return await courseManager.getGolfCourse(dto); 
  };

  public shared ({ caller }) func  getGolfCourseCanisterId(dto: GolfCourseQueries.GetGolfCourseCanisterId) : async Result.Result<GolfCourseQueries.GolfCourseCanisterId, T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert golferManager.isGolferCanisterId(principalId);
    return await courseManager.getGolfCourseCanisterId(dto);
  };
               

  //Golf Course Commands - SNS Validation and Callback functions:

  public shared query ({ caller }) func validateAddGolfCourse(dto : GolfCourseCommands.CreateGolfCourse) : async T.RustResult {
    assert Principal.toText(caller) == Environment.SNS_GOVERNANCE_CANISTER_ID;
    
    //Note: When functionality available: Make cross subnet call to governance canister to see if proposal already exists

    return courseManager.validateAddGolfCourse(dto);
  };

  public shared ({ caller }) func executeAddGolfCourse(dto : GolfCourseCommands.CreateGolfCourse) : async () {
    assert Principal.toText(caller) == Environment.SNS_GOVERNANCE_CANISTER_ID;
    return await courseManager.executeAddGolfCourse(dto);
  };

  public shared query ({ caller }) func validateUpdateGolfCourse(dto : GolfCourseCommands.UpdateGolfCourse) : async T.RustResult {
    assert Principal.toText(caller) == Environment.SNS_GOVERNANCE_CANISTER_ID;
    
    //Note: When functionality available: Make cross subnet call to governance canister to see if proposal already exists

    return courseManager.validateUpdateGolfCourse(dto);
  };

  public shared ({ caller }) func executeUpdateGolfCourse(dto : GolfCourseCommands.UpdateGolfCourse) : async () {
    assert Principal.toText(caller) == Environment.SNS_GOVERNANCE_CANISTER_ID;
    return await courseManager.executeUpdateGolfCourse(dto);
  };

  /* Golfer CQRS */

  //Golfer Queries:

  public shared ({ caller }) func getGolfers(dto: GolferQueries.GetGolfers) : async Result.Result<GolferQueries.Golfers, T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert dto.principalId == principalId;
    return await golferManager.getGolfers(dto);
  };

  public shared ({ caller }) func getGolfer(dto: GolferQueries.GetGolfer) : async Result.Result<GolferQueries.Golfer, T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert dto.principalId == principalId;
    return await golferManager.getGolfer(dto);
  };


  /* User CQRS */

  //User Query Functions:
    
  public shared ({ caller }) func getProfile(dto: GolferQueries.GetProfile) : async Result.Result<GolferQueries.Profile, T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.getProfile(dto);
  };

  public shared func getBuzz(dto: BuzzQueries.GetBuzz) : async Result.Result<BuzzQueries.Buzz, T.Error> {
    return await golferManager.getBuzz(dto);
  };

  public shared func getUpcomingGames(dto: UpcomingGamesQueries.GetUpcomingGames) : async Result.Result<UpcomingGamesQueries.UpcomingGames, T.Error> {
    return await golferManager.getUpcomingGames(dto);
  };
    
  public shared query ({ caller }) func isUsernameAvailable(dto: GolferQueries.IsUsernameAvailable) : async Result.Result<GolferQueries.UsernameAvailable, T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return #ok(golferManager.isUsernameAvailable(dto));
  };

  public shared ({ caller }) func getShotAverages(dto: ShotQueries.GetShotAverages) : async Result.Result<ShotQueries.ShotAverages, T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.getShotAverages(dto);
  };
    
  public shared ({ caller }) func getClubShots(dto: ShotQueries.GetClubShots) : async Result.Result<ShotQueries.ClubShots, T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.getClubShots(dto);
  };

  //User Commands:

  public shared ({ caller }) func createUser(dto: GolferCommands.CreateUser) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.createUser(principalId, dto);
  };

  public shared ({ caller }) func updateUsername(dto: GolferCommands.UpdateUsername) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.updateUsername(dto);
  };

  public shared ({ caller }) func updateHandicap(dto: GolferCommands.UpdateHandicap) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.updateHandicap(dto);
  };

  public shared ({ caller }) func updateFirstName(dto: GolferCommands.UpdateFirstName) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.updateFirstName(dto);
  };

  public shared ({ caller }) func updateLastName(dto: GolferCommands.UpdateLastName) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.updateLastName(dto);
  };

  public shared ({ caller }) func updateHomeCourse(dto: GolferCommands.UpdateHomeCourse) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.updateHomeCourse(dto);
  };

  public shared ({ caller }) func updateProfilePicture(dto: GolferCommands.UpdateProfilePicture) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.updateProfilePicture(dto);
  };
    
  public shared ({ caller }) func addShot(dto: ShotCommands.AddShot) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.addShot(dto);
  };
    
  public shared ({ caller }) func updateShot(dto: ShotCommands.UpdateShot) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.updateShot(dto);
  };
    
  public shared ({ caller }) func deleteShot(dto: ShotCommands.DeleteShot) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.deleteShot(dto);
  };


  //Stable Storage & System Functions:

  //Stable Entity Structures
  private stable var stable_golfer_canister_index: [(Base.PrincipalId, Base.CanisterId)] = [];
  private stable var stable_active_golfer_canister_id: Base.CanisterId = "";
  private stable var stable_usernames : [(Base.PrincipalId, Text)] = [];
  private stable var stable_unique_golfer_canister_ids : [Base.CanisterId] = [];
  private stable var stable_total_golfers : Nat = 0;
  
  private stable var stable_golf_course_canister_index: [(T.GolfCourseId, Base.CanisterId)] = [];
  private stable var stable_active_golf_course_canister_id: Base.CanisterId = "";
  private stable var stable_golf_course_names : [(T.GolfCourseId, Text)] = [];
  private stable var stable_unique_golf_course_canister_ids : [Base.CanisterId] = [];
  private stable var stable_total_golf_courses : Nat = 0;
  private stable var stable_next_golf_course_id : Nat = 0;
  
  private stable var stable_game_canister_index: [(T.GameId, Base.CanisterId)] = [];
  private stable var stable_active_game_canister_id: Base.CanisterId = "";
  private stable var stable_unique_game_canister_ids : [Base.CanisterId] = [];
  private stable var stable_total_games : Nat = 0;
  private stable var stable_next_game_id : Nat = 0;
  //Stable structures for views
  private stable var stable_game_summaries: [T.GameSummary] = [];
  

  //System Backup and Upgrade Functions:

  system func preupgrade() {

    backupGolferData();
    backupGolfCourseData();
    backupGameData();
    backupViewData();

  };

  private func backupGolferData(){

    stable_golfer_canister_index := golferManager.getStableCanisterIndex();
    stable_active_golfer_canister_id := golferManager.getStableActiveCanisterId();
    stable_usernames := golferManager.getStableUsernames();    
    stable_unique_golfer_canister_ids := golferManager.getStableUniqueCanisterIds();
    stable_total_golfers := golferManager.getStableTotalGolfers();
  };

  private func backupGolfCourseData(){
    stable_golf_course_canister_index := courseManager.getStableCanisterIndex();
    stable_active_golf_course_canister_id := courseManager.getStableActiveCanisterId();
    stable_golf_course_names := courseManager.getStableGolfCourseNames();
    stable_unique_golf_course_canister_ids := courseManager.getStableUniqueCanisterIds();
    stable_total_golf_courses := courseManager.getStableTotalGolfCourses();
    stable_next_golf_course_id := courseManager.getStableNextGolfCourseId();

  };

  private func backupGameData(){
    stable_game_canister_index := gameManager.getStableCanisterIndex();
    stable_active_game_canister_id := gameManager.getStableActiveCanisterId();
    stable_unique_game_canister_ids := gameManager.getStableUniqueCanisterIds();
    stable_total_games := gameManager.getStableTotalGames();
    stable_next_game_id := gameManager.getStableNextGameId();

  };

  private func backupViewData(){
    stable_game_summaries := gameManager.getStableGameSummaries();
  };

  system func postupgrade() {
    setGolferData();
    setGolfCourseData();
    setGameData();
    setViewData();

   ignore Timer.setTimer<system>(#nanoseconds(Int.abs(1)), postUpgradeCallback); 
  };

  private func setGolferData(){
    golferManager.setStableCanisterIndex(stable_golfer_canister_index);
    golferManager.setStableActiveCanisterId(stable_active_golfer_canister_id);
    golferManager.setStableUsernames(stable_usernames);    
    golferManager.setStableUniqueCanisterIds(stable_unique_golfer_canister_ids);
    golferManager.setStableTotalGolfers(stable_total_golfers);
  };

  private func setGolfCourseData(){
    courseManager.setStableCanisterIndex(stable_golf_course_canister_index);
    courseManager.setStableActiveCanisterId(stable_active_golf_course_canister_id);
    courseManager.setStableGolfCourseNames(stable_golf_course_names);
    courseManager.setStableUniqueCanisterIds(stable_unique_golf_course_canister_ids);
    courseManager.setStableTotalGolfCourses(stable_total_golf_courses);
    courseManager.setStableNextGolfCourseId(stable_next_golf_course_id);
  };

  private func setGameData(){
    gameManager.setStableCanisterIndex(stable_game_canister_index);
    gameManager.setStableActiveCanisterId(stable_active_game_canister_id);
    gameManager.setStableUniqueCanisterIds(stable_unique_game_canister_ids);
    gameManager.setStableTotalGames(stable_total_games);
    gameManager.setStableNextGameId(stable_next_game_id);
  };

  private func setViewData(){
    gameManager.setStableGameSummaries(stable_game_summaries);
  };

  private func postUpgradeCallback() : async (){
    await updateGolferCanisterWasms();
    await updateGolfCoursesCanisterWasms();
    await updateGameCanisterWasms();
  };

  //Canister Update Functions

  private func updateGolferCanisterWasms() : async (){
    let golferCanisterIds = golferManager.getStableUniqueCanisterIds();
    let IC : Management.Management = actor (Environment.Default);
    for(canisterId in Iter.fromArray(golferCanisterIds)){
      await IC.stop_canister({ canister_id = Principal.fromText(canisterId); });
      let oldCanister = actor (canisterId) : actor {};
      let _ = await (system GolferCanister._GolferCanister)(#upgrade oldCanister)();
      await IC.start_canister({ canister_id = Principal.fromText(canisterId); });
    };
  };

  private func updateGolfCoursesCanisterWasms() : async (){
    let golfCourseCanisterIds = courseManager.getStableUniqueCanisterIds();
    let IC : Management.Management = actor (Environment.Default);
    for(canisterId in Iter.fromArray(golfCourseCanisterIds)){
      await IC.stop_canister({ canister_id = Principal.fromText(canisterId); });
      let oldCanister = actor (canisterId) : actor {};
      let _ = await (system GolfCoursesCanister._GolfCoursesCanister)(#upgrade oldCanister)();
      await IC.start_canister({ canister_id = Principal.fromText(canisterId); });
    };
  };

  private func updateGameCanisterWasms() : async (){
    let gameCanisterIds = gameManager.getStableUniqueCanisterIds();
    let IC : Management.Management = actor (Environment.Default);
    for(canisterId in Iter.fromArray(gameCanisterIds)){
      await IC.stop_canister({ canister_id = Principal.fromText(canisterId); });
      let oldCanister = actor (canisterId) : actor {};
      let _ = await (system GameCanister._GameCanister)(#upgrade oldCanister)();
      await IC.start_canister({ canister_id = Principal.fromText(canisterId); });
    };
  };

};
