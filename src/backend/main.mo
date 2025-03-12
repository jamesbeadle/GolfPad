import Base "mo:waterway-mops/BaseTypes";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Timer "mo:base/Timer";
import Int "mo:base/Int";
import Iter "mo:base/Iter";

import Environment "utilities/Environment";
import Management "utilities/Management";
import T "data-types/types";

import GolferManager "managers/golfer-manager";
import GolfCourseManager "managers/golf-course-manager";
import GameManager "managers/game-manager";
import GolfChannelManager "managers/golf-channel-manager";
import GolfTeamManager "managers/golf-team-manager";

import GolferCommands "commands/golfer_commands";
import ShotCommands "commands/shot_commands";
import FriendRequestCommands "commands/friend_request_commands";

import GolfCourseCommands "commands/golf_course_commands";
import GameCommands "commands/game_commands";
import GolfChannelCommands "commands/golf_channel_commands";
import GolfTeamCommands "commands/golf_team_commands";

import BaseQueries "queries/base_queries";
import GolferQueries "queries/golfer_queries";
import ShotQueries "queries/shot_queries";
import FriendRequestQueries "queries/friend_request_queries";
import UpcomingGamesQueries "queries/upcoming_games_queries";
import GolfCourseQueries "queries/golf_course_queries";
import GameQueries "queries/game_queries";
import GolfChannelQueries "queries/golf_channel_queries";
import GolfTeamQueries "queries/golf_team_queries";
import BuzzQueries "queries/buzz_queries";

import GolferCanister "canister-definitions/golfer-canister";
import GolfCoursesCanister "canister-definitions/golf-courses-canister";
import GameCanister "canister-definitions/game-canister";
import GolfChannelsCanister "canister-definitions/golf-channels-canister";
import GolfTeamCanister "canister-definitions/golf-team-canister";

actor Self {

  private let golferManager = GolferManager.GolferManager();
  private let golfTeamManager = GolfTeamManager.GolfTeamManager();
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

  //Homepage functions

  public shared func getBuzz(dto: BuzzQueries.GetBuzz) : async Result.Result<BuzzQueries.Buzz, T.Error> {
    return await golferManager.getBuzz(dto);
  };

  public shared func getUpcomingGames(dto: UpcomingGamesQueries.GetUpcomingGames) : async Result.Result<UpcomingGamesQueries.UpcomingGames, T.Error> {
    return await golferManager.getUpcomingGames(dto);
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
     //- List all the courses that i have favourited as a user
       
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

  public shared ({ caller }) func getFriendRequests(dto: FriendRequestQueries.GetFriendRequests) : async Result.Result<FriendRequestQueries.FriendRequests, T.Error> {
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golferManager.getFriendRequests(dto);
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

  //Golf Channel Commands:

  public shared ({ caller }) func getGolfChannels(dto: GolfChannelQueries.GetGolfChannels) : async Result.Result<GolfChannelQueries.GolfChannels, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert dto.principalId == principalId;
    return await golfChannelManager.getGolfChannels(dto);
  };

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

  //Golf Team Commands

  public shared ({ caller }) func getGolfTeams(dto: GolfTeamQueries.GetGolfTeams) : async Result.Result<GolfTeamQueries.GolfTeams, T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert dto.principalId == principalId;
     
       
    return await golfTeamManager.getGolfTeams(dto);
  };

  public shared ({ caller }) func createGolfTeam(dto: GolfTeamCommands.CreateGolfTeam) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    assert dto.createdById == Principal.toText(caller);
    return await golfTeamManager.createGolfTeam(dto);
  };

  public shared ({ caller }) func updateGolfTeamName(dto: GolfTeamCommands.UpdateGolfTeamName) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert await golfTeamManager.isTeamCreator(principalId, dto.golfTeamId);
    return await golfTeamManager.updateGolfTeamName(dto);
  };

  /*

  public shared ({ caller }) func deleteGolfTeam(dto: GolfTeamCommands.DeleteGolfTeam) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert await golfTeamManager.isTeamCreator(principalId, dto.golfTeamId);
    return await golfTeamManager.deleteGolfTeam(dto);
  };

  public shared ({ caller }) func addGolfTeamMember(dto: GolfTeamCommands.AddGolfTeamMember) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    assert await golfTeamManager.isTeamCreator(principalId, dto.golfTeamId);
    return await golfTeamManager.addGolfTeamMember(dto);
  };

  public shared ({ caller }) func removeGolfTeamMember(dto: GolfTeamCommands.RemoveGolfTeamMember) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    assert await golfTeamManager.isTeamCreator(principalId, dto.golfTeamId);
    return await golfTeamManager.removeGolfTeamMember(dto);
  };

  public shared ({ caller }) func acceptTeamRequest(dto: GolfTeamCommands.AcceptTeamRequest) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golfTeamManager.acceptTeamRequest(dto);
  };

  public shared ({ caller }) func rejectTeamRequest(dto: GolfTeamCommands.RejectTeamRequest) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    assert dto.principalId == Principal.toText(caller);
    return await golfTeamManager.rejectTeamRequest(dto);
  };

  */

  //Golf Team Queries

  

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
  
  private stable var stable_golf_channel_canister_index: [(T.GolfChannelId, Base.CanisterId)] = [];  
  private stable var stable_active_golf_channel_canister_id: Base.CanisterId = "";
  private stable var stable_golf_channel_names : [(T.GolfChannelId, Text)] = [];
  private stable var stable_unique_golf_channel_canister_ids : [Base.CanisterId] = [];
  private stable var stable_total_golf_channels : Nat = 0;
  private stable var stable_next_golf_channel_id : Nat = 0;

  private stable var stable_golf_team_canister_index: [(T.GolfTeamId, Base.CanisterId)] = [];  
  private stable var stable_active_golf_team_canister_id: Base.CanisterId = "";
  private stable var stable_golf_team_names : [(T.GolfTeamId, Text)] = [];
  private stable var stable_unique_golf_team_canister_ids : [Base.CanisterId] = [];
  private stable var stable_next_golf_team_id : Nat = 0;

  //Stable structures for views
  private stable var stable_game_summaries: [T.GameSummary] = [];
  
  system func preupgrade() {

    backupGolferData();
    backupGolfCourseData();
    backupGolfChannelData();
    backupGameData();
    backupGolfTeamData();
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

  private func backupGolfChannelData(){
    stable_golf_channel_canister_index := golfChannelManager.getStableCanisterIndex();
    stable_active_golf_channel_canister_id := golfChannelManager.getStableActiveCanisterId();
    stable_golf_channel_names := golfChannelManager.getStableGolfChannelNames();
    stable_unique_golf_channel_canister_ids := golfChannelManager.getStableUniqueCanisterIds();
    stable_total_golf_channels := golfChannelManager.getStableTotalGolfChannels();
    stable_next_golf_channel_id := golfChannelManager.getStableNextGolfChannelId();

  };

  private func backupGameData(){
    stable_game_canister_index := gameManager.getStableCanisterIndex();
    stable_active_game_canister_id := gameManager.getStableActiveCanisterId();
    stable_unique_game_canister_ids := gameManager.getStableUniqueCanisterIds();
    stable_total_games := gameManager.getStableTotalGames();
    stable_next_game_id := gameManager.getStableNextGameId();

  };

  private func backupGolfTeamData(){
    stable_golf_team_canister_index := golfTeamManager.getStableCanisterIndex();
    stable_active_golf_team_canister_id := golfTeamManager.getStableActiveCanisterId();
    stable_golf_team_names := golfTeamManager.getStableGolfTeamNames();
    stable_unique_golf_team_canister_ids := golfTeamManager.getStableUniqueCanisterIds();
    stable_total_games := golfTeamManager.getStableTotalGolfTeams();
    stable_next_golf_team_id := golfTeamManager.getStableNextGolfTeamId();
  };

  private func backupViewData(){
    stable_game_summaries := gameManager.getStableGameSummaries();
  };

  system func postupgrade() {
    
    
    setGolferData();
    setGolfCourseData();
    setGolfChannelData();
    setGameData();
    setGolfTeamData();
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

  private func setGolfChannelData(){
    golfChannelManager.setStableCanisterIndex(stable_golf_channel_canister_index);
    golfChannelManager.setStableActiveCanisterId(stable_active_golf_channel_canister_id);
    golfChannelManager.setStableGolfChannelNames(stable_golf_channel_names);
    golfChannelManager.setStableUniqueCanisterIds(stable_unique_golf_channel_canister_ids);
    golfChannelManager.setStableTotalGolfChannels(stable_total_golf_channels);
    golfChannelManager.setStableNextGolfChannelId(stable_next_golf_channel_id);
  };

  private func setGameData(){
    gameManager.setStableCanisterIndex(stable_game_canister_index);
    gameManager.setStableActiveCanisterId(stable_active_game_canister_id);
    gameManager.setStableUniqueCanisterIds(stable_unique_game_canister_ids);
    gameManager.setStableTotalGames(stable_total_games);
    gameManager.setStableNextGameId(stable_next_game_id);
  };

  private func setGolfTeamData(){
    golfTeamManager.setStableCanisterIndex(stable_golf_team_canister_index);
    golfTeamManager.setStableActiveCanisterId(stable_active_golf_team_canister_id);
    golfTeamManager.setStableGolfTeamNames(stable_golf_team_names);
    golfTeamManager.setStableUniqueCanisterIds(stable_unique_golf_team_canister_ids);
    golfTeamManager.setStableTotalGolfTeams(stable_total_games);
    golfTeamManager.setStableNextGolfTeamId(stable_next_golf_team_id);
  };

  private func setViewData(){
    gameManager.setStableGameSummaries(stable_game_summaries);
  };

  private func postUpgradeCallback() : async (){
    await updateGolferCanisterWasms();
    await updateGolfCoursesCanisterWasms();
    await updateGameCanisterWasms();
    await updateGolfChannelsCanisterWasms();
    await updateGolfTeamCanisterWasms();
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

  private func updateGolfTeamCanisterWasms() : async (){
    let golfTeamCanisterIds = golfTeamManager.getStableUniqueCanisterIds();
    let IC : Management.Management = actor (Environment.Default);
    for(canisterId in Iter.fromArray(golfTeamCanisterIds)){
      await IC.stop_canister({ canister_id = Principal.fromText(canisterId); });
      let oldCanister = actor (canisterId) : actor {};
      let _ = await (system GolfTeamCanister._GolfTeamCanister)(#upgrade oldCanister)();
      await IC.start_canister({ canister_id = Principal.fromText(canisterId); });
    };
  };

};
