import T "../data-types/types";

module GolfTeamCommands {

    public type CreateGolfTeam = {
        golfTeamName: Text;
        golfTeamPicture: ?Blob;
        golfTeamPictureExtension: Text;
    };

    public type UpdateGolfTeamName = {
        golfTeamId: T.GolfTeamId;
        golfTeamName: Text;
    };

    public type UpdateGolfTeamPicture = {
        golfTeamId: T.GolfTeamId;
        golfTeamPicture: ?Blob;
        golfTeamPictureExtension: Text;
    };
    
    public type DeleteGolfTeam = {
        golfTeamId: T.GolfTeamId;
        confirm: Bool;
    };
}

  