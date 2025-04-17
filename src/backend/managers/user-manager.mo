import Types "../data-types/types";


module {
  public class UserManager() {

    private var profiles: [Types.Profile] = [];

    public func getStableProfiles() : [Types.Profile] {
      return profiles;
    };

    public func setStableNextGameId(stable_profiles : [Types.Profile]) : () {
      profiles := stable_profiles;
    };

  };
};


    