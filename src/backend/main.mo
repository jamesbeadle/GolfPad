
/* ----- Mops Packages ----- */

import Int "mo:base/Int";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Timer "mo:base/Timer";
import Enums "mo:waterway-mops/Enums";
import BaseTypes "mo:waterway-mops/BaseTypes";
import BaseQueries "mo:waterway-mops/queries/BaseQueries";

/* ----- Queries ----- */

import UserQueries "queries/user_queries";
import GolfCourseQueries "queries/golf_course_queries";
import GolferQueries "queries/golfer_queries";
import LeaderboardQueries "queries/leaderboard_queries";


/* ----- Commands ----- */

import UserCommands "commands/user_commands";
import GolfCourseCommands "commands/golf_course_commands";
import GolferCommands "commands/golfer_commands";
import TournamentCommands "commands/tournament_commands";


/* ----- Manager ----- */

import UserManager "managers/user-manager";
import GolfCourseManager "managers/golf-course-manager";
import GolferManager "managers/golfer-manager";
import LeaderboardManager "managers/leaderboard-manager";
import TournamentManager "managers/tournament-manager";


/* ----- Type imports for stable variables ----- */

import Types "./data-types/types";


actor Self {

  /* ----- Stable Canister Variables ----- */ 

  private stable var stable_profiles: [Types.Profile] = [];
  
  private stable var appStatus : BaseTypes.AppStatus = {
    onHold = false;
    version = "0.0.1";
  };

  /* ----- Manager Initialisation with Transient Canister Variables ----- */ 

  private let userManager = UserManager.UserManager();
  private let leaderboardManager = LeaderboardManager.LeaderboardManager();
  private let golferManager = GolferManager.GolferManager();
  private let golfCourseManager = GolfCourseManager.GolfCourseManager();
  private let tournamentManager = TournamentManager.TournamentManager();


  /* ----- App Queries and Commands ----- */

  public shared query func getAppStatus() : async Result.Result<BaseQueries.AppStatus, Enums.Error> {
    return #ok(appStatus);
  };
  

  /* ----- User Queries and Commands ----- */

  public shared query ({ caller }) func getProfile(_: UserQueries.GetProfile) : async Result.Result<UserQueries.Profile, Enums.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.getProfile(principalId);
  };

  public shared query ({ caller }) func getPrediction(dto: UserQueries.GetPrediction) : async Result.Result<UserQueries.Prediction, Enums.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.getPrediction(principalId, dto);
  };

  public shared query ({ caller }) func getScorecard(dto: UserQueries.GetScorecard) : async Result.Result<LeaderboardQueries.Leaderboard, Enums.Error> {
    assert not Principal.isAnonymous(caller);
    return userManager.getScorecard(dto);
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

  public shared ({ caller }) func createGolfer(dto: GolferCommands.CreateGolfer) : async Result.Result<(), Enums.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert isAdmin(principalId);
    return golferManager.createGolfer(dto);  
  };

  public shared ({ caller }) func updateGolfer(dto: GolferCommands.UpdateGolfer) : async Result.Result<(), Enums.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert isAdmin(principalId);
    return golferManager.updateGolfer(dto);  
  };

  /* ----- Leaderboard Queries ----- */

  public shared query ({ caller }) func getLeaderboard(dto: LeaderboardQueries.GetLeaderboard) : async Result.Result<LeaderboardQueries.Leaderboard, Enums.Error> {
    assert not Principal.isAnonymous(caller);
    return leaderboardManager.getLeaderboard(dto);
  };


  /* ----- Tournament Queries and Commands ----- */

  public shared ({ caller }) func updateTournamentStage(dto: TournamentCommands.UpdateTournamentStage) : async Result.Result<(), Enums.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert isAdmin(principalId);
    return tournamentManager.updateTournamentStage(dto);  
  };

  
  /* ----- Private Functions ----- */

  private func isAdmin(principalId: Text) : Bool {
    return false;
  };
  

  system func preupgrade() {
  };

  system func postupgrade() {
    ignore Timer.setTimer<system>(#nanoseconds(Int.abs(1)), postUpgradeCallback);
  };
  

  private func postUpgradeCallback() : async () {
  
  };


};
