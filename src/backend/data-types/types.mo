import Ids "mo:waterway-mops/Ids";
import GolfIds "mo:waterway-mops/golf/GolfIds";

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
        tournamentId: GolfIds.TournamentId;
        year: Nat16;
        hole1GolferId: GolfIds.ProGolferId;
        hole2GolferId: GolfIds.ProGolferId;
        hole3GolferId: GolfIds.ProGolferId;
        hole4GolferId: GolfIds.ProGolferId;
        hole5GolferId: GolfIds.ProGolferId;
        hole6GolferId: GolfIds.ProGolferId;
        hole7GolferId: GolfIds.ProGolferId;
        hole8GolferId: GolfIds.ProGolferId;
        hole9GolferId: GolfIds.ProGolferId;
        hole10GolferId: GolfIds.ProGolferId;
        hole11GolferId: GolfIds.ProGolferId;
        hole12GolferId: GolfIds.ProGolferId;
        hole13GolferId: GolfIds.ProGolferId;
        hole14GolferId: GolfIds.ProGolferId;
        hole15GolferId: GolfIds.ProGolferId;
        hole16GolferId: GolfIds.ProGolferId;
        hole17GolferId: GolfIds.ProGolferId;
        hole18GolferId: GolfIds.ProGolferId;
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
        tournamentId: GolfIds.TournamentId;
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
        golferId: GolfIds.ProGolferId;
        shotCount: Nat8;
        par: Nat8;
        score: Int8;
    };

}