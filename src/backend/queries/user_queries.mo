import Ids "mo:waterway-mops/Ids";
module UserQueries {
   
    public type GetProfile = {};

    public type Profile = {
        principalId: Ids.PrincipalId;
        username: Text;
        joinedOn: Int;
    };

    public type GetPrediction = {

    };

    public type Prediction = {
        
    };

    public type GetScorecard = {
        principalId: Ids.PrincipalId;
    };

    public type Scorecard = {
        
    };
}

  