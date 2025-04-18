
/* ----- Mops Packages ----- */

import BaseQueries "mo:waterway-mops/queries/BaseQueries";
import BaseTypes "mo:waterway-mops/BaseTypes";
import Enums "mo:waterway-mops/Enums";
import Ids "mo:waterway-mops/Ids";
import Int "mo:base/Int";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Timer "mo:base/Timer";
import Array "mo:base/Array";
import Iter "mo:base/Iter";

/* ----- Queries ----- */

import UserQueries "queries/user_queries";
import GolfCourseQueries "queries/golf_course_queries";
import GolferQueries "queries/golfer_queries";


/* ----- Commands ----- */

import UserCommands "commands/user_commands";
import GolfCourseCommands "commands/golf_course_commands";
import GolferCommands "commands/golfer_commands";
import TournamentCommands "commands/tournament_commands";
import FantasyLeaderboardCommands "commands/fantasy_leaderboard_commands";


/* ----- Manager ----- */

import UserManager "managers/user-manager";
import GolfCourseManager "managers/golf-course-manager";
import GolferManager "managers/golfer-manager";
import FantasyLeaderboardManager "managers/fantasy-leaderboard-manager";
import TournamentManager "managers/tournament-manager";


/* ----- Type imports for stable variables ----- */

import Types "./data-types/types";
import Environment "environment";
import FantasyLeaderboardQueries "queries/fantasy_leaderboard_queries";
import MopsBaseCommands "mops_base_commands";
import TournamentQueries "queries/tournament_queries";


actor Self {

  /* ----- Stable Canister Variables ----- */ 

  private stable var stable_profiles: [Types.Profile] = [];
  private stable var stable_fantasy_leaderboards: [Types.FantasyLeaderboard] = [];
  private stable var stable_predictions: [Types.Prediction] = [];
  private stable var stable_golfers: [Types.Golfer] = [];
  private stable var stable_golf_courses: [Types.GolfCourse] = [];
  private stable var stable_tournaments: [Types.Tournament] = [];
  
  private stable var appStatus : BaseTypes.AppStatus = {
    onHold = false;
    version = "0.0.1";
  };

  /* ----- Manager Initialisation with Transient Canister Variables ----- */ 

  private let userManager = UserManager.UserManager();
  private let fantasyLeaderboardManager = FantasyLeaderboardManager.FantasyLeaderboardManager();
  private let golferManager = GolferManager.GolferManager();
  private let golfCourseManager = GolfCourseManager.GolfCourseManager();
  private let tournamentManager = TournamentManager.TournamentManager();


  /* ----- App Queries and Commands ----- */

  public shared query func getAppStatus() : async Result.Result<BaseQueries.AppStatus, Enums.Error> {
    return #ok(appStatus);
  };
  
  public shared ({ caller }) func updateAppStatus(dto: MopsBaseCommands.UpdateAppStatus) : async Result.Result<(), Enums.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert isAdmin(principalId);

    appStatus := {
      onHold = dto.onHold;
      version = dto.version;
    };

    return #ok();

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

  public shared query ({ caller }) func listPredictions(dto: UserQueries.ListPredictions) : async Result.Result<UserQueries.Predictions, Enums.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.listPredictions(principalId, dto);
  };

  public shared query ({ caller }) func getScorecard(dto: UserQueries.GetScorecard) : async Result.Result<UserQueries.Scorecard, Enums.Error> {
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

    //validate if the prediction can go in

    return userManager.submitPrediction(principalId, dto);  
  };

  public shared ({ caller }) func swapGolfer(dto: UserCommands.SwapGolfer) : async Result.Result<(), Enums.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

    //validate if the swap can go ahead
    
    return userManager.swapGolfer(principalId, dto);  
  };
  

  /* ----- Golf Course Queries and Commands ----- */

  public shared query ({ caller }) func getGolfCourse(dto: GolfCourseQueries.GetGolfCourse) : async Result.Result<GolfCourseQueries.GolfCourse, Enums.Error> {
    assert not Principal.isAnonymous(caller);
    return golfCourseManager.getGolfCourse(dto);
  };

  public shared query ({ caller }) func listGolfCourses(dto: GolfCourseQueries.ListGolfCourses) : async Result.Result<GolfCourseQueries.GolfCourses, Enums.Error> {
    assert not Principal.isAnonymous(caller);
    return golfCourseManager.listGolfCourses(dto);
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

  public shared query ({ caller }) func listGolfers(dto: GolferQueries.ListGolfers) : async Result.Result<GolferQueries.Golfers, Enums.Error> {
    assert not Principal.isAnonymous(caller);
    return golferManager.listGolfers(dto);
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

  public shared query ({ caller }) func getLeaderboard(dto: FantasyLeaderboardQueries.GetFantasyLeaderboard) : async Result.Result<FantasyLeaderboardQueries.FantasyLeaderboard, Enums.Error> {
    assert not Principal.isAnonymous(caller);
    return fantasyLeaderboardManager.getLeaderboard(dto);
  };


  /* ----- Tournament Queries and Commands ----- */

  public shared query ({ caller }) func getTournament(dto: TournamentQueries.GetTournament) : async Result.Result<TournamentQueries.Tournament, Enums.Error> {
    assert not Principal.isAnonymous(caller);
    return tournamentManager.getTournament(dto);
  };
  
  public shared query ({ caller }) func listTournaments(dto: TournamentQueries.ListTournaments) : async Result.Result<TournamentQueries.Tournaments, Enums.Error> {
    assert not Principal.isAnonymous(caller);
    return tournamentManager.listTournaments(dto);
  };

  public shared ({ caller }) func createTournament(dto: TournamentCommands.CreateTournament) : async Result.Result<(), Enums.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert isAdmin(principalId);
    return tournamentManager.createTournament(dto);  
  };

  public shared ({ caller }) func updateTournamentStage(dto: TournamentCommands.UpdateTournamentStage) : async Result.Result<(), Enums.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert isAdmin(principalId);
    return tournamentManager.updateTournamentStage(dto);  
  };

  public shared ({ caller }) func calculateLeaderboard(dto: FantasyLeaderboardCommands.CalculateLeaderboard) : async Result.Result<(), Enums.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert isAdmin(principalId);

    let tournamentStatus = tournamentManager.getTournamentStatus();
    switch(tournamentStatus){
      case (#ok foundTournamentStatus){
        if(foundTournamentStatus == #Completed){
          
          let totalEntries: Nat = userManager.getTotalLeaderboardEntries(dto.tournamentId);
          var totalChunks = totalEntries / Environment.ENTRY_TRANSFER_LIMIT;
          let remainder = totalEntries % Environment.ENTRY_TRANSFER_LIMIT; 
          
          if (remainder > 0) { totalChunks += 1 };

          for(chunk in Iter.range(0, totalChunks - 1)){
            let leaderboardChunk = userManager.getLeaderboardChunk(dto.tournamentId, chunk);
            fantasyLeaderboardManager.addChunkToLeaderboard(dto.tournamentId, leaderboardChunk);
          };  

          fantasyLeaderboardManager.calculateLeaderboard(dto.tournamentId);
          return #ok();
        };
        return #err(#NotAllowed);
      };
      case (#err error){
        return #err(error);
      }
    };
  };

  
  /* ----- Private Functions ----- */

  private func isAdmin(principalId: Text) : Bool {
    let foundPrincipalId = Array.find(Environment.ADMIN_PRINCIPAL_IDS, func(entry: Ids.PrincipalId) : Bool {
      entry == principalId
    });
    switch(foundPrincipalId){
      case (?foundPrincipalId){
        return true;
      };
      case (null){
        return false; 
      }
    };
  };
  

  /* ----- Canister Lifecycle ----- */

  system func preupgrade() {
    stable_profiles := userManager.getStableProfiles();
    stable_predictions := userManager.getStablePredictions();
    stable_golfers := golferManager.getStableGolfers();
    stable_golf_courses := golfCourseManager.getStableGolfCourses();
    stable_fantasy_leaderboards := fantasyLeaderboardManager.getStableLeaderboards();
    stable_tournaments := tournamentManager.getStableTournaments();
  };

  system func postupgrade() {
    ignore Timer.setTimer<system>(#nanoseconds(Int.abs(1)), postUpgradeCallback);
  };
  

  private func postUpgradeCallback() : async () {
    userManager.setStableProfiles(stable_profiles);
    userManager.setStablePredictions(stable_predictions);
    golferManager.setStableGolfers(stable_golfers);
    golfCourseManager.setStableGolfCourses(stable_golf_courses);
    fantasyLeaderboardManager.setStableLeaderboards(stable_fantasy_leaderboards);
    tournamentManager.setStableTournaments(stable_tournaments);
  };


};
