import MopsGolfIds "mops_golf_ids";
import Ids "mo:waterway-mops/Ids";

module GolfTypes {

    public type ProGolfer = {
        id: MopsGolfIds.GolferId;
        firstName: Text;
        lastName: Text;
        nationality: Ids.CountryId;
        worldRanking: Nat16;
    };  

    public type GolfCourse = {
        id: MopsGolfIds.GolfCourseId;
        name: Text;
        holes: [GolfHole];
        par: Nat8;
        totalYardage: Nat16; 
        founded : Int;
        countryId : Ids.CountryId;
    };

    public type GolfHole = {
        holeNumber: Nat8;
        par: Nat8;
        strokeIndex: Nat8;
        yardage: Nat16;
    };

    public type Tournament = {
        id: MopsGolfIds.TournamentId;
        name: Text;
        instances: [TournamentInstance];
    };

    public type TournamentInstance = {
        golfCourseId: MopsGolfIds.GolfCourseId;
        year: Nat16;
        startDate: Int;
        endDate: Int;
        leaderboard: TournamentLeaderboard;
        stage: MopsGolfEnums.TournamentStage;
        populated: Bool;
    };

    public type TournamentLeaderboard = {
        totalEntries: Nat;
        entries: [TournamentLeaderboardEntry];
    };

    public type TournamentLeaderboardEntry = {
        golferId: MopsGolfIds.GolferId;
        tournamentId: MopsGolfIds.TournamentId;
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
};
