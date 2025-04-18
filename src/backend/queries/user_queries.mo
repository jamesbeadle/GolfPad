import Ids "mo:waterway-mops/Ids";
import Types "../data-types/types";
module UserQueries {
   
    public type GetProfile = {};

    public type Profile = {
        principalId: Ids.PrincipalId;
        username: Text;
        joinedOn: Int;
    };

    public type GetPrediction = {
        tournamentId: Types.TournamentId;
        year: Nat16;
    };

    public type Prediction = {
        principalId: Ids.PrincipalId;
        username: Text;
        tournamentId: Types.TournamentId;
        year: Nat16;
        hole1GolferId: Types.GolferId;
        hole2GolferId: Types.GolferId;
        hole3GolferId: Types.GolferId;
        hole4GolferId: Types.GolferId;
        hole5GolferId: Types.GolferId;
        hole6GolferId: Types.GolferId;
        hole7GolferId: Types.GolferId;
        hole8GolferId: Types.GolferId;
        hole9GolferId: Types.GolferId;
        hole10GolferId: Types.GolferId;
        hole11GolferId: Types.GolferId;
        hole12GolferId: Types.GolferId;
        hole13GolferId: Types.GolferId;
        hole14GolferId: Types.GolferId;
        hole15GolferId: Types.GolferId;
        hole16GolferId: Types.GolferId;
        hole17GolferId: Types.GolferId;
        hole18GolferId: Types.GolferId;
        hole1Score: Nat8;
        hole2Score: Nat8;
        hole3Score: Nat8;
        hole4Score: Nat8;
        hole5Score: Nat8;
        hole6Score: Nat8;
        hole7Score: Nat8;
        hole8Score: Nat8;
        hole9Score: Nat8;
        hole10Score: Nat8;
        hole11Score: Nat8;
        hole12Score: Nat8;
        hole13Score: Nat8;
        hole14Score: Nat8;
        hole15Score: Nat8;
        hole16Score: Nat8;
        hole17Score: Nat8;
        hole18Score: Nat8;
    };

    public type ListPredictions = {
        page: Nat;
    };

    public type Predictions = {
        entries: [PredictionSummary];
        totalEntries: Nat;
        page: Nat;
    };

    public type PredictionSummary = {
        principalId: Ids.PrincipalId;
        tournamentId: Types.TournamentId;
        year: Nat16;
        totalShots: Nat8;
        totalScore: Int8;
        createdOn: Int;
    };

    public type GetScorecard = {
        principalId: Ids.PrincipalId;
        tournamentId: Types.TournamentId;
        year: Nat16;
    };
}

  