
/* ----- Mops Packages ----- */

import Int "mo:base/Int";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Timer "mo:base/Timer";
import Enums "mo:waterway-mops/Enums";

/* ----- Queries ----- */

import UserQueries "queries/user_queries";
import LeaderboardQueries "queries/leaderboard_queries";
import GolfCourseCommands "commands/golf_course_commands";
import GolferCommands "commands/golfer_commands";


/* ----- Commands ----- */

import UserCommands "commands/user_commands";
import LeaderboardCommands "commands/leaderboard_commands";
import GolfCourseCommands "commands/golf_course_commands";
import GolferCommands "commands/golfer_commands";

import Environment "utilities/Environment";
import Management "utilities/Management";
import Utilities "utilities/Utilities";


/* ----- Manager ----- */

import UserManager "managers/game-manager";
import GolfCourseManager "managers/golf-course-manager";
import GolferManager "managers/golfer-manager";
import GolfCourseQueries "queries/golf_course_queries";


actor Self {

  /* ----- Stable Canister Variables ----- */ 

  private stable var profiles: [AppTypes.User] = [];
  private stable var predictions: [AppTypes.Prediction] = [];
  private stable var leaderboards: [AppTypes.Leaderboard] = [];
  private stable var courses: [AppTypes.GolfCourse] = [];
  private stable var golfers: [AppTypes.Golfers] = [];
  private stable var tournaments: [AppTypes.Tournament] = [];
  private stable var tournamentResults: [AppTypes.TournamentResult] = [];

  private stable var stable_usernames : [(MopsIds.PrincipalId, Text)] = [];
  private stable var stable_next_golf_course_id : Nat = 0;
  private stable var stable_next_golfer_course_id : Nat = 0;
  private stable var stable_next_tournament_course_id : Nat = 0;
  private stable var stable_next_game_id : Nat = 0;
  private stable var appStatus : BaseTypes.AppStatus = {
    onHold = false;
    version = "0.0.1";
  };

  /* ----- Manager Initialisation with Transient Canister Variables ----- */ 

  private let userManager = UserManager.UserManager();
  private let predictionManager = PredictionManager.PredictionManager();
  private let leaderboardManager = LeaderboardManager.LeaderboardManager();
  private let golferManager = GolferManager.GolferManager();
  private let golfCourseManager = GolfCourseManager.GolfCourseManager();


  /* ----- App Queries and Commands ----- */

  public shared query func getAppStatus() : async Result.Result<BaseQueries.AppStatusDTO, AppTypes.Error> {
    return #ok(appStatus);
  };


  /* ----- User Queries and Commands ----- */

  public shared query ({ caller }) func getProfile(_: UserQueries.GetProfile) : async Result.Result<UserQueries.Profile, Enums.Error> {
    assert not Principal.isAnonymous(caller);
    return userManager.getProfile(Principal.toText(caller));
  };

  public shared ({ caller }) func createProfile(dto: UserCommands.CreateProfile) : async Result.Result<(), Enums.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.createProfile(principalId, dto);  
  };

  public shared ({ caller }) func updateProfilePicture(dto: UserCommands.UpdateProfilePicture) : async Result.Result<(), Enums.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.updateProfilePicture(principalId, dto);  
  };

  public shared ({ caller }) func updateUsername(dto: UserCommands.UpdateUsername) : async Result.Result<(), Enums.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.updateUsername(principalId, dto);  
  };

  public shared ({ caller }) func submitPrediction(dto: UserCommands.SubmitPrediction) : async Result.Result<(), Enums.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.submitPrediction(principalId, dto);  
  };

  public shared ({ caller }) func swapGolfer(dto: UserCommands.SwapGolfer) : async Result.Result<(), Enums.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.swapGolfer(principalId, dto);  
  };
  

  /* ----- Golf Course Queries and Commands ----- */

  public shared query ({ caller }) func getGolfCourse(dto: GolfCourseQueries.GetGolfCourse) : async Result.Result<GolfCourseQueries.GolfCourse, Enums.Error> {
    assert not Principal.isAnonymous(caller);
    return golfCourseManager.getGolfCourse(dto);
  };

  public shared ({ caller }) func createGolfCourse(dto: GolfCourseCommands.CreateGolfCourse) : async Result.Result<(), Enums.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert isAdmin(principalId);
    return golfCourseManager.createGolfCourse(dto);  
  };

  public shared ({ caller }) func updateGolfCourse(dto: GolfCourseCommands.UpdateGolfCourse) : async Result.Result<(), Enums.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert isAdmin(principalId);
    return golfCourseManager.updateGolfCourse(dto);  
  };


  /* ----- Golfer Queries and Commands ----- */

  public shared query ({ caller }) func getGolfer(dto: GolferQueries.GetGolfer) : async Result.Result<GolferQueries.Golfer, Enums.Error> {
    assert not Principal.isAnonymous(caller);
    return golferManager.getGolfer(dto);
  };

  public shared ({ caller }) func createGolfer(dto: GolferQueries.CreateGolfer) : async Result.Result<(), Enums.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert isAdmin(principalId);
    return userManager.createProfile(dto);  
  };

  public shared ({ caller }) func updateGolfer(dto: GolferQueries.UpdateGolfer) : async Result.Result<(), Enums.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.updateGolfCourse(dto);  
  };

  /* ----- Prediction Commands and Queries ----- */

  //get leaderboard
  //get prediction
  //get scorecard
  

  system func preupgrade() {
    store();
    getGolfCourseData();
    getUserData();
  };

  system func postupgrade() {
    ignore Timer.setTimer<system>(#nanoseconds(Int.abs(1)), postUpgradeCallback);
  };
  

  private func postUpgradeCallback() : async () {
  
  };


};
