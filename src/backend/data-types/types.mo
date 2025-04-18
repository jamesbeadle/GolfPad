import Ids "mo:waterway-mops/Ids";

module FantasyGolfTypes {

    public type GolferId = Nat16;
    public type GolfCourseId = Nat16;
    public type TournamentId = Nat16;
    public type PredictionId = Nat16;

    public type Profile = {
        principalId: Ids.PrincipalId;
        username: Text;
        joinedOn: Int;
        profilePicture : ?Blob;
    };

    public type Prediction = {
        principalId: Ids.PrincipalId;
        tournamentId: TournamentId;
        hole1GolferId: GolferId;
        hole2GolferId: GolferId;
        hole3GolferId: GolferId;
        hole4GolferId: GolferId;
        hole5GolferId: GolferId;
        hole6GolferId: GolferId;
        hole7GolferId: GolferId;
        hole8GolferId: GolferId;
        hole9GolferId: GolferId;
        hole10GolferId: GolferId;
        hole11GolferId: GolferId;
        hole12GolferId: GolferId;
        hole13GolferId: GolferId;
        hole14GolferId: GolferId;
        hole15GolferId: GolferId;
        hole16GolferId: GolferId;
        hole17GolferId: GolferId;
        hole18GolferId: GolferId;
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

    public type Golfer = {
        id: GolferId;
        firstName: Text;
        lastName: Text;
        nationality: Ids.CountryId;
        worldRanking: Nat16;
    };  

    public type GolfCourse = {
        id: GolfCourseId;
        name: Text;
        holes: [GolfHole];
        par: Nat8;
        yardages: Nat16; 
        founded : Int;
        mainImage : ?Blob;
        bannerImage : ?Blob;
        countryId : Ids.CountryId;
    };

    public type GolfHole = {
        holeNumber: Nat8;
        strokeIndex: Nat8;
        yardage: Nat16;
    };

    public type Tournament = {
        id: TournamentId;
        name: Text;
        tournamentResults: [TournamentInstance];
        populated: Bool;
    };

    public type TournamentInstance = {
        courseId: GolfCourseId;
        year: Nat16;
        startDate: Int;
        endDate: Int;
        leaderboard: TournamentLeaderboard;
    };

    public type TournamentLeaderboard = {
        totalEntries: Nat;
        entries: [TournamentLeaderboardEntry];
    };

    public type TournamentLeaderboardEntry = {
        golferId: GolferId;
        tournamentId: TournamentId;
        rounds: [GolfRound];
        totalShots: Nat;
    };

    public type GolfRound = {
        teeTime: Int;
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
        totalShots: Nat;
    };

    public type TournamentStage = {
        #NotStarted;
        #Round1Active;
        #Round1Complete;
        #Round2Active;
        #Round2Complete;
        #Round3Active;
        #Round3Complete;
        #Round4Active;
        #Completed;
    };

    public type FantasyLeaderboard = {
        tournamentId: TournamentId;
        entries: [FantasyLeaderboardEntry];
    };

    public type FantasyLeaderboardEntry = {
        principalId: Ids.PrincipalId;
        score: Int8;
        shots: Nat8;
        holes: [FantasyPredictionHole];
    };

    public type FantasyPredictionHole = {
        golferId: GolferId;
        shotCount: Nat8;
        par: Nat8;
        score: Int8;
    };

}