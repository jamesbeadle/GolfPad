/* ----- Mops Packages ----- */

import BaseQueries "mo:waterway-mops/base/queries";
import BaseTypes "mo:waterway-mops/base/types";
import Enums "mo:waterway-mops/base/enums";
import Ids "mo:waterway-mops/base/ids";
import CanisterQueries "mo:waterway-mops/product/wwl/canister-management/queries";
import CanisterCommands "mo:waterway-mops/product/wwl/canister-management/commands";
import CanisterManager "mo:waterway-mops/product/wwl/canister-management/manager";
import CanisterIds "mo:waterway-mops/product/wwl/ids";
import GolfIds "mo:waterway-mops/domain/golf/ids";
import Int "mo:base/Int";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Timer "mo:base/Timer";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Nat8 "mo:base/Nat8";
import Text "mo:base/Text";

/* ----- Queries ----- */

import UserQueries "queries/user_queries";

/* ----- Commands ----- */

import UserCommands "commands/user_commands";
import FantasyLeaderboardCommands "commands/fantasy_leaderboard_commands";

/* ----- Manager ----- */

import UserManager "managers/user-manager";
import FantasyLeaderboardManager "managers/fantasy-leaderboard-manager";
import TournamentManager "managers/tournament-manager";

/* ----- Type imports for stable variables ----- */

import Types "./data-types/types";
import Environment "environment";
import FantasyLeaderboardQueries "queries/fantasy_leaderboard_queries";

actor Self {

  /* ----- Stable Canister Variables ----- */

  private stable var stable_profiles : [Types.Profile] = [];
  private stable var stable_fantasy_leaderboards : [Types.FantasyLeaderboard] = [];
  private stable var stable_predictions : [Types.Prediction] = [];

  private stable var appStatus : BaseTypes.AppStatus = {
    onHold = false;
    version = "0.0.1";
  };

  /* ----- Manager Initialisation with Transient Canister Variables ----- */

  private let userManager = UserManager.UserManager();
  private let fantasyLeaderboardManager = FantasyLeaderboardManager.FantasyLeaderboardManager();
  private let canisterManager = CanisterManager.CanisterManager();
  private let tournamentManager = TournamentManager.TournamentManager();

  /* ----- App Queries and Commands ----- */

  public shared query func getAppStatus() : async Result.Result<BaseQueries.AppStatus, Enums.Error> {
    return #ok(appStatus);
  };

  /* ----- User Queries and Commands ----- */

  public shared query ({ caller }) func getProfile(_ : UserQueries.GetProfile) : async Result.Result<UserQueries.Profile, Enums.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.getProfile(principalId);
  };

  public shared query ({ caller }) func getPrediction(dto : UserQueries.GetPrediction) : async Result.Result<UserQueries.Prediction, Enums.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.getPrediction(principalId, dto);
  };

  public shared query ({ caller }) func listPredictions(dto : UserQueries.ListPredictions) : async Result.Result<UserQueries.Predictions, Enums.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return userManager.listPredictions(principalId, dto);
  };

  public shared query ({ caller }) func getScorecard(dto : UserQueries.GetScorecard) : async Result.Result<UserQueries.Prediction, Enums.Error> {
    assert not Principal.isAnonymous(caller);
    return userManager.getScorecard(dto);
  };

  public shared ({ caller }) func createProfile(dto : UserCommands.CreateProfile) : async Result.Result<(), Enums.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

    if (Text.size(dto.username) < 3 or Text.size(dto.username) > 20) {
      return #err(#InvalidProperty);
    };

    let invalidUsername = userManager.isUsernameTaken(dto.username, principalId);
    if (invalidUsername) {
      return #err(#AlreadyExists);
    };

    return userManager.createProfile(principalId, dto);
  };

  public shared ({ caller }) func submitPrediction(dto : UserCommands.SubmitPrediction) : async Result.Result<(), Enums.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

    let golferIds = [
      dto.hole1GolferId,
      dto.hole2GolferId,
      dto.hole3GolferId,
      dto.hole4GolferId,
      dto.hole5GolferId,
      dto.hole6GolferId,
      dto.hole7GolferId,
      dto.hole8GolferId,
      dto.hole9GolferId,
      dto.hole10GolferId,
      dto.hole11GolferId,
      dto.hole12GolferId,
      dto.hole13GolferId,
      dto.hole14GolferId,
      dto.hole15GolferId,
      dto.hole16GolferId,
      dto.hole17GolferId,
      dto.hole18GolferId,
    ];
    let uniqueGolferIds = Array.sort(
      golferIds,
      func(a : GolfIds.ProGolferId, b : GolfIds.ProGolferId) : { #less; #equal; #greater } {
        if (a < b) { #less } else if (a > b) { #greater } else { #equal };
      },
    );
    for (i in Iter.range(1, Array.size(uniqueGolferIds) - 1)) {
      if (uniqueGolferIds[i] == uniqueGolferIds[i - 1]) {
        return #err(#InvalidProperty);
      };
    };

    let tournamentInstance = tournamentManager.getTournamentInstance({
      tournamentId = dto.tournamentId;
      year = dto.year;
    });

    switch (tournamentInstance) {
      case (#ok foundTournament) {
        if (foundTournament.stage != #NotStarted) {
          return #err(#NotAllowed);
        };
      };
      case (#err error) {
        return #err(error);
      };
    };

    let user = userManager.getProfile(principalId);
    switch (user) {
      case (#ok foundUser) {
        return userManager.submitPrediction(principalId, foundUser.username, dto);
      };
      case (#err error) {
        return #err(error);
      };
    };
  };

  public shared ({ caller }) func swapGolfer(dto : UserCommands.SwapGolfer) : async Result.Result<(), Enums.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);

    let tournamentInstance = tournamentManager.getTournamentInstance({
      tournamentId = dto.tournamentId;
      year = dto.year;
    });
    switch (tournamentInstance) {
      case (#ok foundTournament) {
        let (isValidStage, round) = switch (foundTournament.stage) {
          case (#Round1Complete) (true, 1);
          case (#Round2Complete) (true, 2);
          case (#Round3Complete) (true, 3);
          case (_) (false, 0);
        };

        if (not isValidStage) {
          return #err(#NotAllowed);
        };

        let predictionResult = userManager.getPrediction(principalId, { tournamentId = dto.tournamentId; year = dto.year });
        switch (predictionResult) {
          case (#ok prediction) {
            let swapUsed = switch (round) {
              case (1) prediction.swap1Used;
              case (2) prediction.swap2Used;
              case (3) prediction.swap3Used;
              case (_) false;
            };

            if (swapUsed) {
              return #err(#NotAllowed);
            };

            let golferIds = [
              prediction.hole1GolferId,
              prediction.hole2GolferId,
              prediction.hole3GolferId,
              prediction.hole4GolferId,
              prediction.hole5GolferId,
              prediction.hole6GolferId,
              prediction.hole7GolferId,
              prediction.hole8GolferId,
              prediction.hole9GolferId,
              prediction.hole10GolferId,
              prediction.hole11GolferId,
              prediction.hole12GolferId,
              prediction.hole13GolferId,
              prediction.hole14GolferId,
              prediction.hole15GolferId,
              prediction.hole16GolferId,
              prediction.hole17GolferId,
              prediction.hole18GolferId,
            ];
            if (Array.find(golferIds, func(id : Types.GolferId) : Bool { id == dto.newGolferId }) != null) {
              return #err(#InvalidProperty);
            };

            let golfCourseResult = golfCourseManager.getGolfCourse({
              golfCourseId = foundTournament.golfCourseId;
            });
            switch (golfCourseResult) {
              case (#ok golfCourse) {
                let hole = Array.find(
                  golfCourse.holes,
                  func(h : Types.GolfHole) : Bool {
                    h.holeNumber == dto.newGolferHole;
                  },
                );
                switch (hole) {
                  case (?foundHole) {
                    let golferPerformance = tournamentManager.getGolferHolePerformance({
                      tournamentId = dto.tournamentId;
                      year = dto.year;
                      golferId = dto.newGolferId;
                      holeNumber = dto.newGolferHole;
                      par = foundHole.par;
                    });
                    switch (golferPerformance) {
                      case (#ok performance) {
                        if (performance.score <= -1) {
                          return #err(#NotAllowed);
                        };
                      };
                      case (#err error) {
                        return #err(error);
                      };
                    };
                  };
                  case (null) {
                    return #err(#NotFound);
                  };
                };
              };
              case (#err error) {
                return #err(error);
              };
            };

            return userManager.swapGolfer(principalId, dto, Nat8.fromNat(round));
          };
          case (#err error) {
            return #err(error);
          };
        };

        return #err(#NotAllowed);
      };
      case (#err error) {
        return #err(error);
      };
    };

  };

  /* ----- Leaderboard Queries ----- */

  public shared query ({ caller }) func getLeaderboard(dto : FantasyLeaderboardQueries.GetFantasyLeaderboard) : async Result.Result<FantasyLeaderboardQueries.FantasyLeaderboard, Enums.Error> {
    assert not Principal.isAnonymous(caller);
    return fantasyLeaderboardManager.getLeaderboard(dto);
  };

  /* ----- Private Functions ----- */

  public func isAdmin(principalId : Text) : async Bool {
    let foundPrincipalId = Array.find(
      Environment.ADMIN_PRINCIPAL_IDS,
      func(entry : Ids.PrincipalId) : Bool {
        entry == principalId;
      },
    );
    switch (foundPrincipalId) {
      case (?foundPrincipalId) {
        return true;
      };
      case (null) {
        return false;
      };
    };
  };

  private func transferLeaderboardChunks(tournamentId : GolfIds.TournamentId, year : Nat16, golfCourse : MopsGolfCourseQueries.GolfCourse) {
    let totalEntries : Nat = userManager.getTotalLeaderboardEntries(tournamentId);
    var totalChunks = totalEntries / Environment.ENTRY_TRANSFER_LIMIT;
    let remainder = totalEntries % Environment.ENTRY_TRANSFER_LIMIT;

    if (remainder > 0) { totalChunks += 1 };

    for (chunk in Iter.range(0, totalChunks - 1)) {
      let leaderboardChunk = userManager.getLeaderboardChunk(tournamentId, year, chunk);
      fantasyLeaderboardManager.addChunkToLeaderboard(tournamentId, year, leaderboardChunk, golfCourse);
    };

    tournamentManager.setPopulated(tournamentId, year);
  };

  /* ----- Canister Lifecycle ----- */

  system func preupgrade() {
    stable_profiles := userManager.getStableProfiles();
    stable_predictions := userManager.getStablePredictions();
    stable_fantasy_leaderboards := fantasyLeaderboardManager.getStableLeaderboards();
  };

  system func postupgrade() {
    ignore Timer.setTimer<system>(#nanoseconds(Int.abs(1)), postUpgradeCallback);
  };

  private func postUpgradeCallback() : async () {
  };

    /* ----- WWL Canister Management ----- */
  public shared ({ caller }) func getProjectCanisters() : async Result.Result<CanisterQueries.ProjectCanisters, Enums.Error> {
    assert not Principal.isAnonymous(caller);
    assert Principal.toText(caller) == CanisterIds.WATERWAY_LABS_BACKEND_CANISTER_ID;

    var projectCanisters : [CanisterQueries.Canister] = [];

    var backend_dto : CanisterQueries.Canister = {
      canisterId = CanisterIds.ICGC_BACKEND_CANISTER_ID;
      canisterType = #Static;
      canisterName = "ICGC Backend Canister";
      app = #ICGC;
    };
    projectCanisters := Array.append<CanisterQueries.Canister>(projectCanisters, [backend_dto]);

    let frontend_dto : CanisterQueries.Canister = {
      canisterId = Environment.ICFC_FRONTEND_CANISTER_ID;
      canisterType = #Static;
      canisterName = "ICGC Frontend Canister";
      app = #ICGC;
    };
    projectCanisters := Array.append<CanisterQueries.Canister>(projectCanisters, [frontend_dto]);

    let res : CanisterQueries.ProjectCanisters = {
      entries = projectCanisters;
    };
    return #ok(res);
  };

};
