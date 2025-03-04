import Base "mo:waterway-mops/BaseTypes";
import Principal "mo:base/Principal";
import Result "mo:base/Result";

import BaseCommands "commands/base_commands";
import T "data-types/types";
import Environment "utilities/Environment";

import GolferManager "managers/golfer-manager";
import GolfCourseManager "managers/golf-course-manager";
import GameManager "managers/game-manager";

import GameCommands "commands/game_commands";
import GolfCourseCommands "commands/golf_course_commands";
import GolferCommands "commands/golfer_commands";

import GameQueries "queries/game_queries";
import GolfCourseQueries "queries/golf_course_queries";
import GolferQueries "queries/golfer_queries";

actor Self {

  private let golferManager = GolferManager.GolferManager();
  private let courseManager = GolfCourseManager.GolfCourseManager();
  private let gameManager = GameManager.GameManager();

  private var appStatus: Base.AppStatus = { 
    onHold = false;
    version = "0.0.1";
  };  

  public shared query func getAppStatus() : async Result.Result<BaseCommands.AppStatusDTO, T.Error> {
    return #ok(appStatus);
  };

  //SNS Validation and Callback function:

  public shared query ({ caller }) func validateAddGolfCourse(dto : GolfCourseCommands.CreateGolfCourse) : async T.RustResult {
    assert Principal.toText(caller) == Environment.SNS_GOVERNANCE_CANISTER_ID;
    
    //Todo when functionality available: Make cross subnet call to governance canister to see if proposal already exists

    return courseManager.validateAddGolfCourse(dto);
  };

  public shared ({ caller }) func executeAddGolfCourse(dto : GolfCourseCommands.CreateGolfCourse) : async () {
    assert Principal.toText(caller) == Environment.SNS_GOVERNANCE_CANISTER_ID;
    return await courseManager.executeAddGolfCourse(dto);
  };

  public shared query ({ caller }) func validateUpdateGolfCourse(dto : GolfCourseCommands.UpdateGolfCourse) : async T.RustResult {
    assert Principal.toText(caller) == Environment.SNS_GOVERNANCE_CANISTER_ID;
    
    //Todo when functionality available: Make cross subnet call to governance canister to see if proposal already exists

    return courseManager.validateUpdateGolfCourse(dto);
  };

  public shared ({ caller }) func executeUpdateGolfCourse(dto : GolfCourseCommands.UpdateGolfCourse) : async () {
    assert Principal.toText(caller) == Environment.SNS_GOVERNANCE_CANISTER_ID;
    return await courseManager.executeUpdateGolfCourse(dto);
  };

  public shared ({ caller }) func getGolfCourses(dto: GolfCourseQueries.GetGolfCourses) : async Result.Result<GolfCourseQueries.GolfCourses, T.Error>{
    assert not Principal.isAnonymous(caller);
    return await courseManager.getGolfCourses(dto);
  };

  public shared ({ caller }) func getGolfCourse(dto: GolfCourseQueries.GetGolfCourse) : async Result.Result<GolfCourseQueries.GolfCourse, T.Error>{
    assert not Principal.isAnonymous(caller);
    return await courseManager.getGolfCourse(dto); 
  };

  //Golfer Profile Commands:

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

  public shared ({ caller }) func updateProfilePicture(dto: GolferCommands.UpdateProfilePicture) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.updateProfilePicture(dto);
  };

  public shared ({ caller }) func updateHandicap(dto: GolferCommands.UpdateHandicap) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.updateHandicap(dto);
  };

  public shared ({ caller }) func updateHomeCourse(dto: GolferCommands.UpdateHomeCourse) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.updateHomeCourse(dto);
  };

  //Golfer Friend Request Commands:
    
  public shared ({ caller }) func acceptFriendRequest(dto: GolferCommands.AcceptFriendRequest) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    assert await golferManager.friendRequestExists(dto.principalId, dto.requestedBy);
    return await golferManager.acceptFriendRequest(dto);
  };
    
  public shared ({ caller }) func rejectFriendRequest(dto: GolferCommands.RejectFriendRequest) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.rejectFriendRequest(dto);
  };
    
  public shared ({ caller }) func sendFriendRequest(dto: GolferCommands.SendFriendRequest) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.sendFriendRequest(dto);
  };

  //Golfer Game Commands:
    //TODO

  //Golfer Queries:
    
  public shared query ({ caller }) func isUsernameAvailable(dto: GolferQueries.IsUsernameAvailable) : async Result.Result<GolferQueries.UsernameAvailable, T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return #ok(golferManager.isUsernameAvailable(dto));
  };
    
  public shared ({ caller }) func getProfile(dto: GolferQueries.GetProfile) : async Result.Result<GolferQueries.Profile, T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.getProfile(dto);
  };

  public shared ({ caller }) func listFriendRequests(dto: GolferQueries.ListFriendRequests) : async Result.Result<GolferQueries.FriendRequests, T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.listFriendRequests(dto);
  };

  public shared ({ caller }) func listFriends(dto: GolferQueries.ListFriends) : async Result.Result<GolferQueries.Friends, T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.listFriends(dto);
  };

  public shared ({ caller }) func listGolfers(dto: GolferQueries.ListGolfers) : async Result.Result<GolferQueries.Golfers, T.Error> {
    assert not Principal.isAnonymous(caller);
    return await golferManager.listGolfers(dto);
  };

  //Golfer Game Queries

  //Golfer Shot Managermant Functions:
    //add shot
    //predict shot
    //create a golf channel

    //Golfer Channel Management Functions:
    //update golf channel
    //delete golf channel
    //subscribe to golf channel
    //unsubscribe from golf channel
    //add golf channel video

  private stable var stable_golfer_canister_index: [(T.GolferId, Base.CanisterId)] = [];
  private stable var stable_golf_course_canister_index: [(T.GolfCourseId, Base.CanisterId)] = [];
  private stable var stable_game_canister_index: [(T.GameId, Base.CanisterId)] = [];
  
  private stable var stable_active_golfer_canister_id: Base.CanisterId = "";
  private stable var stable_active_golf_course_canister_id: Base.CanisterId = "";
  private stable var stable_active_game_canister_id: Base.CanisterId = "";

  private stable var stable_usernames : [(T.GolferId, Text)] = [];
  private stable var stable_golf_course_names : [(T.GolfCourseId, Text)] = [];
  
  private stable var stable_unique_golfer_canister_ids : [Base.CanisterId] = [];
  private stable var stable_unique_golf_course_canister_ids : [Base.CanisterId] = [];
  private stable var stable_unique_game_canister_ids : [Base.CanisterId] = [];

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
