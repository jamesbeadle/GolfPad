import Ids "mo:waterway-mops/Ids";
import MopsGolfIds "../mops_golf_ids";

module FantasyGolfTypes {

    public type PredictionId = Nat16;

    public type Profile = {
        principalId: Ids.PrincipalId;
        username: Text;
        joinedOn: Int;
        profilePicture : ?Blob;
    };

    public type Prediction = {
        principalId: Ids.PrincipalId;
        createdOn: Int;
        username: Text;
        tournamentId: MopsGolfIds.TournamentId;
        year: Nat16;
        hole1GolferId: MopsGolfIds.GolferId;
        hole2GolferId: MopsGolfIds.GolferId;
        hole3GolferId: MopsGolfIds.GolferId;
        hole4GolferId: MopsGolfIds.GolferId;
        hole5GolferId: MopsGolfIds.GolferId;
        hole6GolferId: MopsGolfIds.GolferId;
        hole7GolferId: MopsGolfIds.GolferId;
        hole8GolferId: MopsGolfIds.GolferId;
        hole9GolferId: MopsGolfIds.GolferId;
        hole10GolferId: MopsGolfIds.GolferId;
        hole11GolferId: MopsGolfIds.GolferId;
        hole12GolferId: MopsGolfIds.GolferId;
        hole13GolferId: MopsGolfIds.GolferId;
        hole14GolferId: MopsGolfIds.GolferId;
        hole15GolferId: MopsGolfIds.GolferId;
        hole16GolferId: MopsGolfIds.GolferId;
        hole17GolferId: MopsGolfIds.GolferId;
        hole18GolferId: MopsGolfIds.GolferId;
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
        totalShots: Nat8;
        totalScore: Int8;
        swap1Used: Bool;
        swap2Used: Bool;
        swap3Used: Bool;
    };

    public type FantasyLeaderboard = {
        tournamentId: MopsGolfIds.TournamentId;
        year: Nat16;
        entries: [FantasyLeaderboardEntry];
        totalEntries : Nat;
    };

    public type FantasyLeaderboardEntry = {
        principalId: Ids.PrincipalId;
        username: Text;
        score: Int8;
        shots: Nat8;
        holes: [FantasyPredictionHole];
        position : Nat;
        positionText : Text;
    };

    public type FantasyPredictionHole = {
        hole: Nat8;
        golferId: MopsGolfIds.GolferId;
        shotCount: Nat8;
        par: Nat8;
        score: Int8;
    };

}