import T "../data-types/types";

module GolfTeamQueries {
    
    public type GetGolfTeam = {
        golfTeamId: T.GolfTeamId;
    };

    public type GolfTeam = {
        golfTeamId: T.GolfTeamId;
        golfTeamName: Text;
        golfTeamPicture: ?Blob;
        golfTeamPictureExtension: Text;
    };

    public type IsTeamNameAvailable = {
        golfTeamName: Text;
        golfTeamId: T.GolfTeamId;
    };

    public type TeamNameAvailable = Bool;

    
}

  