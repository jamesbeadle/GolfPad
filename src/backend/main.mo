import Base "mo:waterway-mops/BaseTypes";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Timer "mo:base/Timer";
import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";

import T "data-types/types";
import Environment "utilities/Environment";

import GolferManager "managers/golfer-manager";
import GolfCourseManager "managers/golf-course-manager";
import GameManager "managers/game-manager";
import GolfChannelManager "managers/golf-channel-manager";

import GameCommands "commands/game_commands";
import GolfCourseCommands "commands/golf_course_commands";
import GolferCommands "commands/golfer_commands";
import ShotCommands "commands/shot_commands";
import GolfChannelCommands "commands/golf_channel_commands";
import FriendRequestCommands "commands/friend_request_commands";

import BaseQueries "queries/base_queries";
import GameQueries "queries/game_queries";
import GolfCourseQueries "queries/golf_course_queries";
import GolferQueries "queries/golfer_queries";
import ShotQueries "queries/shot_queries";
import GolfChannelQueries "queries/golf_channel_queries";

import Management "utilities/Management";

import GolferCanister "canister-definitions/golfer-canister";
import GolfCoursesCanister "canister-definitions/golf-courses-canister";
import GameCanister "canister-definitions/game-canister";
import GolfChannelsCanister "canister-definitions/golf-channels-canister";
import FriendRequestQueries "queries/friend_request_queries";

actor Self {

  private let golferManager = GolferManager.GolferManager();
  private let courseManager = GolfCourseManager.GolfCourseManager();
  private let gameManager = GameManager.GameManager();
  private let golfChannelManager = GolfChannelManager.GolfChannelManager();

  private var appStatus: Base.AppStatus = { 
    onHold = false;
    version = "0.0.1";
  };  

  public shared query func getAppStatus() : async Result.Result<BaseQueries.AppStatusDTO, T.Error> {
    return #ok(appStatus);
  };

  //SNS Validation and Callback function:

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

  //System Golf Course Data Getters:

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

  //Golfer Profile Queries:
    
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

  public shared ({ caller }) func listGolfers(dto: GolferQueries.ListGolfers) : async Result.Result<GolferQueries.Golfers, T.Error> {
    assert not Principal.isAnonymous(caller);
    return await golferManager.listGolfers(dto);
  };

  public shared ({ caller }) func listFriends(dto: GolferQueries.ListFriends) : async Result.Result<GolferQueries.Friends, T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.listFriends(dto);
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

  //Golfer Friend Request Queries:

  public shared ({ caller }) func listFriendRequests(dto: FriendRequestQueries.ListFriendRequests) : async Result.Result<FriendRequestQueries.FriendRequests, T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.listFriendRequests(dto);
  };

  //Golfer Shot Management Commands:
    
  public shared ({ caller }) func addShot(dto: ShotCommands.AddShot) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.addShot(dto);
  };

  //Golfer Shot Management Queries:

  public shared ({ caller }) func getShot(dto: ShotQueries.GetShot) : async Result.Result<ShotQueries.Shot, T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.getShot(dto);
  };

  public shared ({ caller }) func predictShot(dto: ShotQueries.PredictShot) : async Result.Result<ShotQueries.PredictedShot, T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.predictShot(dto);
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

  public shared ({ caller }) func updateGame(dto: GameCommands.UpdateGame) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert await gameManager.isGameMember(dto.gameId, principalId);
    return await gameManager.updateGame(dto);
  };

  public shared ({ caller }) func deleteGame(dto: GameCommands.DeleteGame) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert await gameManager.isGameOwner(dto.gameId, principalId);
    return await gameManager.deleteGame(dto);
  };
  
  public shared ({ caller }) func addGameScore(dto: GameCommands.AddGameScore) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert await gameManager.isGameMember(dto.gameId, principalId);
    return await gameManager.addGameScore(dto);
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
  
  //Game Queries:

  public shared ({ caller }) func getGame(dto: GameQueries.GetGame) : async Result.Result<GameQueries.Game, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert await gameManager.isGameMember(dto.gameId, principalId);
    return await gameManager.getGame(dto);
  };

  //Golf Channel Commands:

  public shared ({ caller }) func createGolfChannel(dto: GolfChannelCommands.CreateGolfChannel) : async Result.Result<T.GolfChannelId, T.Error>{
    assert not Principal.isAnonymous(caller);
    assert dto.createdById == Principal.toText(caller);
    return await golfChannelManager.createGolfChannel(dto);
  };

  public shared ({ caller }) func updateGolfChannel(dto: GolfChannelCommands.UpdateGolfChannel) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert await golfChannelManager.isChannelOwner({principalId; channelId = dto.channelId});
    return await golfChannelManager.updateGolfChannel(dto);
  };

  public shared ({ caller }) func deleteGolfChannel(dto: GolfChannelCommands.DeleteGolfChannel) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert await golfChannelManager.isChannelOwner({ channelId = dto.channelId; principalId; });
    return await golfChannelManager.deleteGolfChannel(dto);
  };

  public shared ({ caller }) func subscribeToGolfChannel(dto: GolfChannelCommands.SubscribeToGolfChannel) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golfChannelManager.subscribeToGolfChannel(dto);
  };

  public shared ({ caller }) func unsubscribeFromGolfChannel(dto: GolfChannelCommands.UnsubscribeFromGolfChannel) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golfChannelManager.unsubscribeFromGolfChannel(dto);
  };

  public shared ({ caller }) func uploadGolfChannelVideo(dto: GolfChannelCommands.UploadGolfChannelVideo) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert await golfChannelManager.isChannelOwner({ channelId = dto.channelId; principalId; });
    return await golfChannelManager.uploadGolfChannelVideo(dto);
  };

  public shared ({ caller }) func updateGolfChannelVideo(dto: GolfChannelCommands.UpdateGolfChannelVideo) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert await golfChannelManager.isChannelOwner({ channelId = dto.channelId; principalId; });
    return await golfChannelManager.updateGolfChannelVideo(dto);
  };

  public shared ({ caller }) func removeGolfChannelVideo(dto: GolfChannelCommands.RemoveGolfChannelVideo) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert await golfChannelManager.isChannelOwner({ channelId = dto.channelId; principalId; });
    return await golfChannelManager.removeGolfChannelVideo(dto);
  };

  //Golf Channel Queries:

  public shared ({ caller }) func getGolfChannel(dto: GolfChannelQueries.GetGolfChannel) : async Result.Result<GolfChannelQueries.GolfChannel, T.Error> {
    assert not Principal.isAnonymous(caller);
    return await golfChannelManager.getGolfChannel(dto); 
  };

  public shared ({ caller }) func getGolfChannelVideos(dto: GolfChannelQueries.GetGolfChannelVideos) : async Result.Result<GolfChannelQueries.GolfChannelVideos, T.Error> {
    assert not Principal.isAnonymous(caller);
    return await golfChannelManager.getGolfChannelVideos(dto); 
  };

  public shared ({ caller }) func getGolfChannelVideo(dto: GolfChannelQueries.GetGolfChannelVideo) : async Result.Result<GolfChannelQueries.GolfChannelVideo, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert await golfChannelManager.isSubscribed({channelId = dto.channelId; principalId});
    return await golfChannelManager.getGolfChannelVideo(dto); 
  };

  //Stable Storage & System Functions:

  private stable var stable_golfer_canister_index: [(T.GolferId, Base.CanisterId)] = [];
  private stable var stable_golf_course_canister_index: [(T.GolfCourseId, Base.CanisterId)] = [];
  private stable var stable_game_canister_index: [(T.GameId, Base.CanisterId)] = [];
  private stable var stable_golf_channel_canister_index: [(T.GolfChannelId, Base.CanisterId)] = [];
    
  private stable var stable_active_golfer_canister_id: Base.CanisterId = "";
  private stable var stable_active_golf_course_canister_id: Base.CanisterId = "";
  private stable var stable_active_game_canister_id: Base.CanisterId = "";
  private stable var stable_active_golf_channel_canister_id: Base.CanisterId = "";

  private stable var stable_usernames : [(T.GolferId, Text)] = [];
  private stable var stable_golf_course_names : [(T.GolfCourseId, Text)] = [];
  private stable var stable_golf_channel_names : [(T.GolfChannelId, Text)] = [];
  
  private stable var stable_unique_golfer_canister_ids : [Base.CanisterId] = [];
  private stable var stable_unique_golf_course_canister_ids : [Base.CanisterId] = [];
  private stable var stable_unique_game_canister_ids : [Base.CanisterId] = [];
  private stable var stable_unique_golf_channel_canister_ids : [Base.CanisterId] = [];

  private stable var stable_total_golfers : Nat = 0;
  private stable var stable_total_golf_courses : Nat = 0;
  private stable var stable_total_golf_channels : Nat = 0;
  private stable var stable_total_games : Nat = 0;
  
  system func preupgrade() {
    stable_golfer_canister_index := golferManager.getStableCanisterIndex();
    stable_golf_course_canister_index := courseManager.getStableCanisterIndex();
    stable_golf_channel_canister_index := golfChannelManager.getStableCanisterIndex();
    stable_game_canister_index := gameManager.getStableCanisterIndex();
    
    
    stable_active_golfer_canister_id := golferManager.getStableActiveCanisterId();
    stable_active_golf_course_canister_id := courseManager.getStableActiveCanisterId();
    stable_active_game_canister_id := gameManager.getStableActiveCanisterId();
    stable_active_golf_channel_canister_id := golfChannelManager.getStableActiveCanisterId();

    stable_usernames := golferManager.getStableUsernames();
    stable_golf_course_names := courseManager.getStableGolfCourseNames();
    stable_golf_channel_names := golfChannelManager.getStableGolfChannelNames();
    
    stable_unique_golfer_canister_ids := golferManager.getStableUniqueCanisterIds();
    stable_unique_golf_course_canister_ids := courseManager.getStableUniqueCanisterIds();
    stable_unique_golf_channel_canister_ids := golfChannelManager.getStableUniqueCanisterIds();
    stable_unique_game_canister_ids := gameManager.getStableUniqueCanisterIds();

    stable_total_golfers := golferManager.getStableTotalGolfers();
    stable_total_golf_courses := courseManager.getStableTotalGolfCourses();
    stable_total_golf_channels := golfChannelManager.getStableTotalGolfChannels();
    stable_total_games := gameManager.getStableTotalGames();
  };

  system func postupgrade() {
    
    golferManager.setStableCanisterIndex(stable_golfer_canister_index);
    courseManager.setStableCanisterIndex(stable_golf_course_canister_index);
    gameManager.setStableCanisterIndex(stable_game_canister_index);
    golfChannelManager.setStableCanisterIndex(stable_golf_channel_canister_index);
    
    golferManager.setStableActiveCanisterId(stable_active_golfer_canister_id);
    courseManager.setStableActiveCanisterId(stable_active_golf_course_canister_id);
    gameManager.setStableActiveCanisterId(stable_active_game_canister_id);
    golfChannelManager.setStableActiveCanisterId(stable_active_golf_channel_canister_id);

    golferManager.setStableUsernames(stable_usernames);
    courseManager.setStableGolfCourseNames(stable_golf_course_names);
    golfChannelManager.setStableGolfChannelNames(stable_golf_channel_names);
    
    golferManager.setStableUniqueCanisterIds(stable_unique_golfer_canister_ids);
    courseManager.setStableUniqueCanisterIds(stable_unique_golf_course_canister_ids);
    gameManager.setStableUniqueCanisterIds(stable_unique_game_canister_ids);
    golfChannelManager.setStableUniqueCanisterIds(stable_unique_golf_channel_canister_ids);

   ignore Timer.setTimer<system>(#nanoseconds(Int.abs(1)), postUpgradeCallback); 
  };

  private func postUpgradeCallback() : async (){
    await updateGolferCanisterWasms();
    await updateGolfCoursesCanisterWasms();
    await updateGameCanisterWasms();
    await updateGolfChannelsCanisterWasms();
  };

  //Canister Update Functions

  private func updateGolferCanisterWasms() : async (){
    let golferCanisterIds = golferManager.getStableUniqueCanisterIds();
    Debug.print(debug_show golferCanisterIds);
    let IC : Management.Management = actor (Environment.Default);
    for(canisterId in Iter.fromArray(golferCanisterIds)){
      await IC.stop_canister({ canister_id = Principal.fromText(canisterId); });
      let oldProfileCanister = actor (canisterId) : actor {};
      let _ = await (system GolferCanister._GolferCanister)(#upgrade oldProfileCanister)();
      await IC.start_canister({ canister_id = Principal.fromText(canisterId); });
    };
  };

  private func updateGolfCoursesCanisterWasms() : async (){
    let golfCourseCanisterIds = courseManager.getStableUniqueCanisterIds();
    let IC : Management.Management = actor (Environment.Default);
    for(canisterId in Iter.fromArray(golfCourseCanisterIds)){
      await IC.stop_canister({ canister_id = Principal.fromText(canisterId); });
      let oldProfileCanister = actor (canisterId) : actor {};
      let _ = await (system GolfCoursesCanister._GolfCoursesCanister)(#upgrade oldProfileCanister)();
      await IC.start_canister({ canister_id = Principal.fromText(canisterId); });
    };
  };

  private func updateGameCanisterWasms() : async (){
    let gameCanisterIds = gameManager.getStableUniqueCanisterIds();
    let IC : Management.Management = actor (Environment.Default);
    for(canisterId in Iter.fromArray(gameCanisterIds)){
      await IC.stop_canister({ canister_id = Principal.fromText(canisterId); });
      let oldProfileCanister = actor (canisterId) : actor {};
      let _ = await (system GameCanister._GameCanister)(#upgrade oldProfileCanister)();
      await IC.start_canister({ canister_id = Principal.fromText(canisterId); });
    };
  };

  private func updateGolfChannelsCanisterWasms() : async (){
    let golfChannelCanisterIds = golfChannelManager.getStableUniqueCanisterIds();
    let IC : Management.Management = actor (Environment.Default);
    for(canisterId in Iter.fromArray(golfChannelCanisterIds)){
      await IC.stop_canister({ canister_id = Principal.fromText(canisterId); });
      let oldProfileCanister = actor (canisterId) : actor {};
      let _ = await (system GolfChannelsCanister._GolfChannelsCanister)(#upgrade oldProfileCanister)();
      await IC.start_canister({ canister_id = Principal.fromText(canisterId); });
    };
  };

};
