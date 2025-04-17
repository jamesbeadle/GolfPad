import Types "../data-types/types";
import UserQueries "../queries/user_queries";
import UserCommands "../commands/user_commands";
import Result "mo:base/Result";
import Enums "mo:waterway-mops/Enums";
import Ids "mo:waterway-mops/Ids";


module {
  public class UserManager() {

    private var profiles: [Types.Profile] = [];

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

    public func getStableProfiles() : [Types.Profile] {
      return profiles;
    };

    public func setStableNextGameId(stable_profiles : [Types.Profile]) : () {
      profiles := stable_profiles;
    };

  };
};


    