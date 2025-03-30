import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Timer "mo:base/Timer";

import Environment "utilities/Environment";
import Management "utilities/Management";
import Utilities "utilities/Utilities";

//Move to mops
import MopsIds "data-types/mops_ids";
import BaseQueries "queries/base_queries";
import Membership "data-types/membership_types";

//Canister Definition Files
import GolferCanister "canister-definitions/golfer-canister";
import GolfCoursesCanister "canister-definitions/golf-courses-canister";
import GameCanister "canister-definitions/game-canister";

//Queries
import BuzzQueries "queries/buzz_queries";
import GameQueries "queries/game_queries";
import GolfCourseQueries "queries/golf_course_queries";
import GolferQueries "queries/golfer_queries";
import ShotQueries "queries/shot_queries";
import FriendQueries "queries/friend_queries";
import FriendRequestQueries "queries/friend_request_queries";
import UpcomingGamesQueries "queries/upcoming_games_queries";

//Commands
import GameCommands "commands/game_commands";
import GolfCourseCommands "commands/golf_course_commands";
import GolferCommands "commands/golfer_commands";
import ShotCommands "commands/shot_commands";
import FriendRequestCommands "commands/friend_request_commands";
import FriendCommands "commands/friend_commands";

//Managers
import GameManager "managers/game-manager";
import GolfCourseManager "managers/golf-course-manager";
import GolferManager "managers/golfer-manager";
import SNSManager "managers/sns-manager";
import StableStructure "stable_structure";

persistent actor Self {

  /* ----- Transient Canister Variables ----- */ 

  transient var users = StableStructure.ScalableType();
  transient var courses = StableStructure.ScalableType();
  transient var games = StableStructure.ScalableType();

  private let golferManager = GolferManager.GolferManager(users);
  private let courseManager = GolfCourseManager.GolfCourseManager(courses);
  private let gameManager = GameManager.GameManager(games);
  private let snsManager = SNSManager.SNSManager();


  /* ----- Stable Canister Variables ----- */ 

  private stable var access_codes: [(Text, Base.PrincipalId)] = [];


  //Stable Entity Structures
  private stable var stable_golfer_canister_index : [(Base.PrincipalId, Base.CanisterId)] = [];
  private stable var stable_active_golfer_canister_id : Base.CanisterId = "";
  private stable var stable_unique_golfer_canister_ids : [Base.CanisterId] = [];
  private stable var stable_total_golfers : Nat = 0;


  private stable var stable_usernames : [(Base.PrincipalId, Text)] = [];

  private stable var stable_golf_course_canister_index : [(ID.GolfCourseId, Base.CanisterId)] = [];
  private stable var stable_active_golf_course_canister_id : Base.CanisterId = "";
  private stable var stable_golf_course_names : [(ID.GolfCourseId, Text)] = [];
  private stable var stable_unique_golf_course_canister_ids : [Base.CanisterId] = [];
  private stable var stable_total_golf_courses : Nat = 0;
  private stable var stable_next_golf_course_id : Nat = 0;

  private stable var stable_game_canister_index : [(ID.GameId, Base.CanisterId)] = [];
  private stable var stable_active_game_canister_id : Base.CanisterId = "";
  private stable var stable_unique_game_canister_ids : [Base.CanisterId] = [];
  private stable var stable_total_games : Nat = 0;
  private stable var stable_next_game_id : Nat = 0;

  private stable var stable_game_summaries : [Game.GameSummary] = [];

  private stable var appStatus : Base.AppStatus = {
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

  public shared ({ caller }) func getFriendRequests(dto : FriendRequestQueries.GetFriendRequests) : async Result.Result<FriendRequestQueries.FriendRequests, T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.getFriendRequests(dto);
  };

  //Golfer Friend Request Commands:

  public shared ({ caller }) func acceptFriendRequest(dto : FriendRequestCommands.AcceptFriendRequest) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    assert await golferManager.friendRequestExists(dto.principalId, dto.requestedBy);
    return await golferManager.acceptFriendRequest(dto);
  };

  public shared ({ caller }) func rejectFriendRequest(dto : FriendRequestCommands.RejectFriendRequest) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.rejectFriendRequest(dto);
  };

  public shared ({ caller }) func sendFriendRequest(dto : FriendRequestCommands.SendFriendRequest) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.sendFriendRequest(dto);
  };

  /* Friend CQRS */

  //Friend Queries:

  public shared ({ caller }) func getFriends(dto : FriendQueries.GetFriends) : async Result.Result<FriendQueries.Friends, T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.getFriends(dto);
  };

  //Friend Commands:

  public shared ({ caller }) func removeFriend(dto : FriendCommands.RemoveFriend) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.removeFriend(dto);
  };

  /* Game CQRS */

  //Game Queries:

  public shared ({ caller }) func getGameSummaries(dto : GameQueries.GetGameSummaries) : async Result.Result<GameQueries.GameSummaries, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert dto.principalId == principalId;
    return await golferManager.getGameSummaries(dto);
  };

  public shared ({ caller }) func getGame(dto : GameQueries.GetGame) : async Result.Result<GameQueries.Game, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert await gameManager.isGameMember(dto.gameId, principalId);
    return await gameManager.getGame(dto);
  };

  public shared ({ caller }) func getGameInvites(dto : GameQueries.GetGameInvites) : async Result.Result<GameQueries.GameInvites, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert dto.principalId == principalId;
    return await golferManager.getGameInvites(dto);
  };

  //Game Commands:

  public shared ({ caller }) func createGame(dto : GameCommands.CreateGame) : async Result.Result<ID.GameId, T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.createdById == Principal.toText(caller);
    return await gameManager.createGame(dto);
  };

  public shared ({ caller }) func updateGame(dto : GameCommands.UpdateGame) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert await gameManager.isGameOwner(dto.gameId, principalId);
    return await gameManager.updateGame(dto);
  };

  public shared ({ caller }) func beginGame(dto : GameCommands.BeginGame) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert await gameManager.isGameMember(dto.gameId, principalId);
    return await gameManager.beginGame(dto);
  };

  public shared ({ caller }) func predictGameScore(dto : GameCommands.PredictGameScore) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert await gameManager.isGameMember(dto.gameId, principalId);
    return await gameManager.predictGameScore(dto);
  };

  public shared ({ caller }) func addGameScore(dto : GameCommands.AddGameScore) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert await gameManager.isGameMember(dto.gameId, principalId);
    return await gameManager.addGameScore(dto);
  };

  public shared ({ caller }) func deleteGame(dto : GameCommands.DeleteGame) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert await gameManager.isGameOwner(dto.gameId, principalId);
    return await gameManager.deleteGame(dto);
  };

  public shared ({ caller }) func inviteGolfers(dto : GameCommands.InviteGolfers) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert await gameManager.isGameOwner(dto.gameId, principalId);
    return await gameManager.inviteGolfers(dto);
  };

  public shared ({ caller }) func acceptGameInvite(dto : GameCommands.AcceptGameInvite) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.acceptedById == Principal.toText(caller);
    return await gameManager.acceptGameInvite(dto);
  };

  public shared ({ caller }) func rejectGameInvite(dto : GameCommands.RejectGameInvite) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.rejectedById == Principal.toText(caller);
    return await gameManager.rejectGameInvite(dto);
  };

  /* Golf Course CQRS */

  //Golf Course Queries:

  public shared ({ caller }) func getGolfCourses(dto : GolfCourseQueries.GetGolfCourses) : async Result.Result<GolfCourseQueries.GolfCourses, T.Error> {
    assert not Principal.isAnonymous(caller);
    //- List all the courses that i have favourited as a user

    return await courseManager.getGolfCourses(dto);
  };

  public shared ({ caller }) func getGolfCourseSummary(dto : GolfCourseQueries.GetGolfCourseSummary) : async Result.Result<GolfCourseQueries.GolfCourseSummary, T.Error> {
    assert not Principal.isAnonymous(caller);
    return await courseManager.getGolfCourseSummary(dto);
  };

  public shared ({ caller }) func getGolfCourse(dto : GolfCourseQueries.GetGolfCourse) : async Result.Result<GolfCourseQueries.GolfCourse, T.Error> {
    assert not Principal.isAnonymous(caller);
    return await courseManager.getGolfCourse(dto);
  };

  public shared ({ caller }) func getGolfCourseTeeGroup(dto : GolfCourseQueries.GetGolfCourseTeeGroup) : async Result.Result<GolfCourseQueries.GolfCourseTeeGroup, T.Error> {
    assert not Principal.isAnonymous(caller);
    return await courseManager.getGolfCourseTeeGroup(dto);
  };

  public shared ({ caller }) func getGolfCourseCanisterId(dto : GolfCourseQueries.GetGolfCourseCanisterId) : async Result.Result<GolfCourseQueries.GolfCourseCanisterId, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert golferManager.isGolferCanisterId(principalId);
    return await courseManager.getGolfCourseCanisterId(dto);
  };

  public shared ({ caller }) func getGolfCourseTees(dto : GolfCourseQueries.GetGolfCourseTees) : async Result.Result<GolfCourseQueries.GolfCourseTees, T.Error> {
    assert not Principal.isAnonymous(caller);
    return await courseManager.getGolfCourseTees(dto);
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

  public shared ({ caller }) func getGolfers(dto : GolferQueries.GetGolfers) : async Result.Result<GolferQueries.Golfers, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert dto.principalId == principalId;

    return await golferManager.getGolfers(dto, null);
  };

  public shared ({ caller }) func getGameGolferSummaries(dto: GolferQueries.GetGameGolferSummaries) : async Result.Result<GolferQueries.GameGolferSummaries, T.Error>{
    assert not Principal.isAnonymous(caller);
    assert isMember();
    return await golferManager.getGameGolferSummaries(dto);
  };

  public shared ({ caller }) func getGolfer(dto: GolferQueries.GetGolfer) : async Result.Result<GolferQueries.Golfer, T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert dto.principalId == principalId;
    return await golferManager.getGolfer(dto);
  };

  /* User CQRS */

  //User Query Functions:

  public shared ({ caller }) func getProfile(dto : GolferQueries.GetProfile) : async Result.Result<GolferQueries.Profile, T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.getProfile(dto);
  };

  public shared func getBuzz(dto : BuzzQueries.GetBuzz) : async Result.Result<BuzzQueries.Buzz, T.Error> {
    return await golferManager.getBuzz(dto);
  };

  public shared func getUpcomingGames(dto : UpcomingGamesQueries.GetUpcomingGames) : async Result.Result<UpcomingGamesQueries.UpcomingGames, T.Error> {
    return await golferManager.getUpcomingGames(dto);
  };

  public shared query ({ caller }) func isUsernameAvailable(dto : GolferQueries.IsUsernameAvailable) : async Result.Result<GolferQueries.UsernameAvailable, T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return #ok(golferManager.isUsernameAvailable(dto));
  };

  public shared ({ caller }) func getShotAverages(dto : ShotQueries.GetShotAverages) : async Result.Result<ShotQueries.ShotAverages, T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.getShotAverages(dto);
  };

  public shared ({ caller }) func getClubShots(dto : ShotQueries.GetClubShots) : async Result.Result<ShotQueries.ClubShots, T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.getClubShots(dto);
  };

  public shared ({ caller }) func getUserFavouriteCourses(dto : GolfCourseQueries.GetUserFavouriteCourses) : async Result.Result<GolfCourseQueries.UserFavouriteCourses, T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);

    return await golferManager.getUserFavouriteCourses(dto);
  };

  //User Commands:

  public shared ({ caller }) func claimMembership() : async Result.Result<(T.MembershipClaim), T.Error> {
    assert not Principal.isAnonymous(caller);
    let dto : GolferCommands.ClaimMembership = {
      principalId = Principal.toText(caller);
    };
    return await golferManager.claimMembership(dto);
  };

  public shared ({ caller }) func createUser(dto : GolferCommands.CreateUser) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return await golferManager.createUser(principalId, dto);
  };

  public shared ({ caller }) func updateUsername(dto : GolferCommands.UpdateUsername) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.updateUsername(dto);
  };

  public shared ({ caller }) func updateHandicap(dto : GolferCommands.UpdateHandicap) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.updateHandicap(dto);
  };

  public shared ({ caller }) func updateFirstName(dto : GolferCommands.UpdateFirstName) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.updateFirstName(dto);
  };

  public shared ({ caller }) func updateLastName(dto : GolferCommands.UpdateLastName) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.updateLastName(dto);
  };

  public shared ({ caller }) func updateHomeCourse(dto : GolferCommands.UpdateHomeCourse) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.updateHomeCourse(dto);
  };

  public shared ({ caller }) func updateProfilePicture(dto : GolferCommands.UpdateProfilePicture) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.updateProfilePicture(dto);
  };

  public shared ({ caller }) func addShot(dto : ShotCommands.AddShot) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.addShot(dto);
  };

  public shared ({ caller }) func updateShot(dto : ShotCommands.UpdateShot) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.updateShot(dto);
  };

  public shared ({ caller }) func deleteShot(dto : ShotCommands.DeleteShot) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.deleteShot(dto);
  };

  public shared ({ caller }) func removeUserGolfCourse(dto : GolferCommands.RemoveUserGolfCourse) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.removeUserGolfCourse(dto);
  };

  //Membership Functinos

  public shared ({ caller }) func getUserNeurons() : async Result.Result<GolferQueries.GolferNeurons, T.Error> {
    assert not Principal.isAnonymous(caller);

    let neurons = await snsManager.getUsersNeurons(caller);
    let userEligibility : Membership.EligibleMembership = Utilities.getMembershipType(neurons);
    let totalMaxStaked = Utilities.getTotalMaxStaked(neurons);

    let result : GolferQueries.GolferNeurons = {
      userNeurons = neurons;
      totalMaxStaked;
      userMembershipEligibility = userEligibility;
    };
    return #ok(result);

  };

  private func isMember() : Bool {
    return false; //TODO: John - Please implement using the proof-of-stake membership
  };

  //Stable Storage & System Functions:

  //Stable structures for views

  //System Backup and Upgrade Functions:

  system func preupgrade() {

    backupGolferData();
    backupGolfCourseData();
    backupGameData();
    backupViewData();

  };

  private func backupGolferData() {

    stable_golfer_canister_index := golferManager.getStableCanisterIndex();
    stable_active_golfer_canister_id := golferManager.getStableActiveCanisterId();
    stable_usernames := golferManager.getStableUsernames();
    stable_unique_golfer_canister_ids := golferManager.getStableUniqueCanisterIds();
    stable_total_golfers := golferManager.getStableTotalGolfers();
  };

  private func backupGolfCourseData() {
    stable_golf_course_canister_index := courseManager.getStableCanisterIndex();
    stable_active_golf_course_canister_id := courseManager.getStableActiveCanisterId();
    stable_golf_course_names := courseManager.getStableGolfCourseNames();
    stable_unique_golf_course_canister_ids := courseManager.getStableUniqueCanisterIds();
    stable_total_golf_courses := courseManager.getStableTotalGolfCourses();
    stable_next_golf_course_id := courseManager.getStableNextGolfCourseId();

  };

  private func backupGameData() {
    stable_game_canister_index := gameManager.getStableCanisterIndex();
    stable_active_game_canister_id := gameManager.getStableActiveCanisterId();
    stable_unique_game_canister_ids := gameManager.getStableUniqueCanisterIds();
    stable_total_games := gameManager.getStableTotalGames();
    stable_next_game_id := gameManager.getStableNextGameId();

  };

  private func backupViewData() {
    stable_game_summaries := gameManager.getStableGameSummaries();
  };

  system func postupgrade() {
    users := StableUsers();

    setGolferData();
    setGolfCourseData();
    setGameData();
    setViewData();

    ignore Timer.setTimer<system>(#nanoseconds(Int.abs(1)), postUpgradeCallback);

    access_codes := [
      ("B1W5V6P9", ""),
      ("B2V4M8F3", ""),
      ("B3W5V1P9", ""),
      ("B5F9L2D3", ""),
      ("B6W5L9P3", ""),
      ("B9H3W2P4", ""),
      ("D6M9F3L1", ""),
      ("D7K5F8T2", ""),
      ("D7K5M6T1", ""),
      ("D8F4M3P1", ""),
      ("F1D7M3K9", ""),
      ("F1M6D8K5", ""),
      ("F3D6L9P7", ""),
      ("F4D5M1K7", ""),
      ("F4D7M9K6", ""),
      ("F4P1M8D6", ""),
      ("F6D2M8K7", ""),
      ("F6D8M3K5", ""),
      ("F8P6J2V4", ""),
      ("F9D8M5K4", ""),
      ("H2N7J4W5", ""),
      ("H2W4J1B5", ""),
      ("H3L5B9W1", ""),
      ("H4N6J8W2", ""),
      ("H5W2B8V4", ""),
      ("H7M4D6P3", ""),
      ("H7N1J4W8", ""),
      ("H7N5J6W8", ""),
      ("H7V3W5B9", ""),
      ("H8N4J6W2", ""),
      ("H8N9J1W3", ""),
      ("H9P6T1Q8", ""),
      ("J2W1V8P4", ""),
      ("J2W4V9P7", ""),
      ("J2W5V1P8", ""),
      ("J4V2F8T7", ""),
      ("J5N7W9H6", ""),
      ("J5R3N4L2", ""),
      ("J5W2V9P6", ""),
      ("J6B2W1P7", ""),
      ("J6R7N4H8", ""),
      ("J6W8V3P1", ""),
      ("J8W9H5B2", ""),
      ("J9W2V6P3", ""),
      ("K1M3D5P2", ""),
      ("K2N8F3L9", ""),
      ("K3M9D2T7", ""),
      ("K3Q8R7N2", ""),
      ("K5M3D8T1", ""),
      ("K6M9D2T8", ""),
      ("K7Q2R6N8", ""),
      ("K8M4D5T2", ""),
      ("K9M2D7T6", ""),
      ("K9M7D1T8", ""),
      ("K9P2M4J7", ""),
      ("L2F4B7D9", ""),
      ("L4F7B5D8", ""),
      ("L5F3B9D6", ""),
      ("L5N7H9B3", ""),
      ("L6F3B5D1", ""),
      ("L6N2J1W5", ""),
      ("L7P9J4T2", ""),
      ("L8F3B1D7", ""),
      ("L9F3B4D7", ""),
      ("L9P6D1T5", ""),
      ("M1V9D3T5", ""),
      ("M4F2D7K3", ""),
      ("M6B3F8P2", ""),
      ("M8F2D6K3", ""),
      ("N1R2H6J5", ""),
      ("N1R7H5J4", ""),
      ("N3K5R8Q6", ""),
      ("N3R7H5J8", ""),
      ("N3R9H2J7", ""),
      ("N4Q9J6W3", ""),
      ("N5H8J2W6", ""),
      ("N6R3H9J2", ""),
      ("N7R8H2J5", ""),
      ("N8R5H6J9", ""),
      ("N9R5H8L4", ""),
      ("P1W3V2B7", ""),
      ("P1W9V2B4", ""),
      ("P2W5V8B1", ""),
      ("P3F8B4V9", ""),
      ("P3W9V4B1", ""),
      ("P5W4V8B6", ""),
      ("P6D4M1V7", ""),
      ("P7K2R5T8", ""),
      ("P8M6V9F3", ""),
      ("P9W2V6B8", ""),
      ("P9W3V8B2", ""),
      ("Q1W5B9V2", ""),
      ("Q2T4L9R1", ""),
      ("Q3T6L9R2", ""),
      ("Q3T9J1N7", ""),
      ("Q4T9H8R7", ""),
      ("Q6T2L5R4", ""),
      ("Q6T9L3R8", ""),
      ("Q8T2K6R1", ""),
      ("Q9K1M3D5", ""),
      ("Q9K2T3L5", ""),
      ("Q9T1L3R5", ""),
      ("Q9T5L1R3", ""),
      ("R1N8Q4H2", ""),
      ("R1Q4H7N3", ""),
      ("R2N8Q6J1", ""),
      ("R3T5N8Q1", ""),
      ("R4Q5H9N2", ""),
      ("R5Q1H8N4", ""),
      ("R5Q8H1N3", ""),
      ("R6Q9H3N7", ""),
      ("R6Q9L3N7", ""),
      ("R6T3J8N1", ""),
      ("R7N3J8H4", ""),
      ("R7Q4H9N6", ""),
      ("R9Q2H3N8", ""),
      ("T1K6M3Q9", ""),
      ("T1L9Q7R4", ""),
      ("T3D1K7Q2", ""),
      ("T3R7Q1N4", ""),
      ("T6K8M2Q3", ""),
      ("T6Q9L2K5", ""),
      ("T7K2M4Q1", ""),
      ("T8K1M6Q5", ""),
      ("T8K7M9Q4", ""),
      ("T8M1K4Q7", ""),
      ("T8R4K1Q2", ""),
      ("T9D3M7K5", ""),
      ("T9D5L7K4", ""),
      ("T9K6M4Q2", ""),
      ("V1B3P7F9", ""),
      ("V1H8B2M5", ""),
      ("V3B5P7F1", ""),
      ("V4B1P3F9", ""),
      ("V4B6P2F7", ""),
      ("V5B2P6F3", ""),
      ("V5Q7T6R1", ""),
      ("V8B6P1F3", ""),
      ("V8B7W9F6", ""),
      ("V9B3P4M1", ""),
      ("W1V4J7P6", ""),
      ("W2P4J8F6", ""),
      ("W2V1H9B7", ""),
      ("W5J1H4V9", ""),
      ("W6B9V2H4", ""),
      ("X4K9P2M7", ""),
      ("X8K4P6M2", ""),
      ("Z1L7F3D5", ""),
      ("Z9L2F8K5", ""),
      ("B2H8W3P7", ""),
      ("B6F1L7D3", ""),
      ("D9F3M7P6", ""),
      ("F1D2M8K4", ""),
      ("F1D6M2K5", ""),
      ("F2D4M7K8", ""),
      ("F3D6M4K9", ""),
      ("F4D7M8K2", ""),
      ("F6D3M8K5", ""),
      ("F8D3M6K5", ""),
      ("F8D6M2K9", ""),
      ("F9D5M8K2", ""),
      ("H1N4J6W3", ""),
      ("H1N6J2W4", ""),
      ("H1N8J2W4", ""),
      ("H2N7J3W1", ""),
      ("H2N8J4W9", ""),
      ("H5N4J3W6", ""),
      ("H5N4J7W9", ""),
      ("H6P3T8Q4", ""),
      ("F5M9D6K1", ""),
      ("T8M5K9Q2", ""),
      ("T5Q8L1K4", ""),
      ("Q7T3L6R9", ""),
      ("Q7T4L8R9", ""),
      ("Q3T5L9R1", ""),
      ("Q5T2L7R8", ""),
      ("Q5T2L9R1", ""),
      ("Q9T4L2R1", ""),
      ("Q1T7L9R2", ""),
      ("Q2T5L3R7", ""),
      ("Q7T4L3R1", ""),
      ("V8B5P9F1", ""),
      ("V5B9P7F3", ""),
      ("V5B9P3F7", ""),
      ("V6B8P5F4", ""),
      ("V5B1P6F3", ""),
      ("V8B2P9F1", ""),
      ("V2B6P1F8", ""),
      ("J1R9N5L2", ""),
      ("L4P7J2T8", ""),
      ("N4R7H1J6", ""),
      ("R2N6J9H7", ""),
      ("H5N1J4W8", ""),
      ("H5N1J3W2", ""),
      ("H9N6J2W4", ""),
      ("H1N3J6W4", ""),
      ("H6N3J4W8", ""),
      ("H7N1J5W8", ""),
      ("H4N6J5W8", ""),
      ("H4N8J1W6", ""),
      ("H2N6J9W8", ""),
      ("K2M3D7T6", ""),
      ("K8M2D6T1", ""),
      ("K6M4D8T2", ""),
      ("K9M3D2T7", ""),
      ("K9M7D2T8", ""),
      ("K6M7D5T3", ""),
      ("K3M8D5T4", ""),
      ("V7B4W6F8", ""),
      ("N6K3R9Q5", ""),
      ("P9W3V8B5", ""),
      ("B8W4V3P1", ""),
      ("V2B9P7F3", ""),
      ("V4B8P6F7", ""),
      ("V8B1P7F3", ""),
      ("V9B8P5F2", ""),
      ("V1B5P7F2", ""),
      ("V4B6P9F3", ""),
      ("V3B2P4F9", ""),
      ("V9B3P5F2", ""),
      ("V5B3P7F4", ""),
      ("R5Q1H8N4", ""),
      ("R4Q5H9N7", ""),
      ("R7Q1H9N5", ""),
      ("R1Q6H4N5", ""),
      ("R6Q4H5N1", ""),
      ("R1Q4H9N8", ""),
      ("R7Q9H1N2", ""),
      ("K9M2D3P5", ""),
      ("W1V8H4B2", ""),
      ("F2D6M4K7", ""),
      ("M5F7D2K9", ""),
      ("K8M6D5T1", ""),
      ("K9M3D5T1", ""),
      ("K5M3D6T9", ""),
      ("K7M2D1T6", ""),
      ("K9M8D3T6", ""),
      ("K2M8D7T5", ""),
      ("K7M1D8T6", ""),
      ("K7M6D1T8", ""),
      ("K8M1D6T9", ""),
      ("J9W6V2P3", ""),
      ("J7W1V3P6", ""),
      ("J3W2V6P8", ""),
      ("J8W9V2P3", ""),
      ("J3W9V8P2", ""),
      ("J2W3V6P5", ""),
      ("J6W4V3P5", ""),
      ("Q4T1H7R6", "")
    ];
  };

  private func setGolferData() {
    golferManager.setStableCanisterIndex(stable_golfer_canister_index);
    golferManager.setStableActiveCanisterId(stable_active_golfer_canister_id);
    golferManager.setStableUsernames(stable_usernames);
    golferManager.setStableUniqueCanisterIds(stable_unique_golfer_canister_ids);
    golferManager.setStableTotalGolfers(stable_total_golfers);
  };

  private func setGolfCourseData() {
    courseManager.setStableCanisterIndex(stable_golf_course_canister_index);
    courseManager.setStableActiveCanisterId(stable_active_golf_course_canister_id);
    courseManager.setStableGolfCourseNames(stable_golf_course_names);
    courseManager.setStableUniqueCanisterIds(stable_unique_golf_course_canister_ids);
    courseManager.setStableTotalGolfCourses(stable_total_golf_courses);
    courseManager.setStableNextGolfCourseId(stable_next_golf_course_id);
  };

  private func setGameData() {
    gameManager.setStableCanisterIndex(stable_game_canister_index);
    gameManager.setStableActiveCanisterId(stable_active_game_canister_id);
    gameManager.setStableUniqueCanisterIds(stable_unique_game_canister_ids);
    gameManager.setStableTotalGames(stable_total_games);
    gameManager.setStableNextGameId(stable_next_game_id);
  };

  private func setViewData() {
    gameManager.setStableGameSummaries(stable_game_summaries);
  };

  private func postUpgradeCallback() : async () {
    await updateGolferCanisterWasms();
    await updateGolfCoursesCanisterWasms();
    await updateGameCanisterWasms();
  };

  //Canister Update Functions

  private func updateGolferCanisterWasms() : async () {
    let golferCanisterIds = golferManager.getStableUniqueCanisterIds();
    let IC : Management.Management = actor (Environment.Default);
    for (canisterId in Iter.fromArray(golferCanisterIds)) {
      await IC.stop_canister({ canister_id = Principal.fromText(canisterId) });
      let oldCanister = actor (canisterId) : actor {};
      let _ = await (system GolferCanister._GolferCanister)(#upgrade oldCanister)();
      await IC.start_canister({ canister_id = Principal.fromText(canisterId) });
    };
  };

  private func updateGolfCoursesCanisterWasms() : async () {
    let golfCourseCanisterIds = courseManager.getStableUniqueCanisterIds();
    let IC : Management.Management = actor (Environment.Default);
    for (canisterId in Iter.fromArray(golfCourseCanisterIds)) {
      await IC.stop_canister({ canister_id = Principal.fromText(canisterId) });
      let oldCanister = actor (canisterId) : actor {};
      let _ = await (system GolfCoursesCanister._GolfCoursesCanister)(#upgrade oldCanister)();
      await IC.start_canister({ canister_id = Principal.fromText(canisterId) });
    };
  };

  private func updateGameCanisterWasms() : async () {
    let gameCanisterIds = gameManager.getStableUniqueCanisterIds();
    let IC : Management.Management = actor (Environment.Default);
    for (canisterId in Iter.fromArray(gameCanisterIds)) {
      await IC.stop_canister({ canister_id = Principal.fromText(canisterId) });
      let oldCanister = actor (canisterId) : actor {};
      let _ = await (system GameCanister._GameCanister)(#upgrade oldCanister)();
      await IC.start_canister({ canister_id = Principal.fromText(canisterId) });
    };
  };

};
