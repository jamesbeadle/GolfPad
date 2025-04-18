import Types "../data-types/types";
import UserQueries "../queries/user_queries";
import UserCommands "../commands/user_commands";
import Result "mo:base/Result";
import Array "mo:base/Array";
import Enums "mo:waterway-mops/Enums";
import Ids "mo:waterway-mops/Ids";


module {
  public class UserManager() {

    private var profiles: [Types.Profile] = [];
    private var predictions: [Types.Prediction] = [];

    public func getProfile(principalId: Ids.PrincipalId) : Result.Result<UserQueries.Profile, Enums.Error> {
      return #err(#NotFound);
    };

    public func getPrediction(principalId: Ids.PrincipalId, dto: UserQueries.GetPrediction) : Result.Result<UserQueries.Prediction, Enums.Error> {
      return #err(#NotFound);
    };

    public func getScorecard(dto: UserQueries.GetScorecard) : Result.Result<UserQueries.Scorecard, Enums.Error> {
      return #err(#NotFound);
    };

    public func createProfile(principalId: Ids.PrincipalId, dto: UserCommands.CreateProfile) : Result.Result<(), Enums.Error> {
      return #err(#NotFound);  
    };

    public func updateProfilePicture(principalId: Ids.PrincipalId, dto: UserCommands.UpdateProfilePicture) : Result.Result<(), Enums.Error> {
      return #err(#NotFound);
    };

    public func updateUsername(principalId: Ids.PrincipalId, dto: UserCommands.UpdateUsername) : Result.Result<(), Enums.Error> {
      return #err(#NotFound);
    };

    public func submitPrediction(principalId: Ids.PrincipalId, dto: UserCommands.SubmitPrediction) : Result.Result<(), Enums.Error> {
      return #err(#NotFound);
    };

    public func swapGolfer(principalId: Ids.PrincipalId, dto: UserCommands.SwapGolfer) : Result.Result<(), Enums.Error> {
      return #err(#NotFound);
    };

    public func getTotalLeaderboardEntries(tournamentId: Types.TournamentId) : Nat {
      let leaderboardEntries = Array.filter<Types.Prediction>(predictions, func(entry: Types.Prediction){
        entry.tournamentId == tournamentId
      });
      return Array.size(leaderboardEntries);
    };

    public func getLeaderboardChunk(tournamentId: Types.TournamentId, chunkIndex: Nat) : [Types.Prediction]{
      return [];
    };

    public func getStableProfiles() : [Types.Profile] {
      return profiles;
    };

    public func getStablePredictions() : [Types.Prediction] {
      return predictions;
    };

    public func setStableProfiles(stable_profiles: [Types.Profile]){
      profiles := stable_profiles;
    };

    public func setStablePredictions(stable_predictions: [Types.Prediction]){
      predictions := stable_predictions;
    };

  };
};


    