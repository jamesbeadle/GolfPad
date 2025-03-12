import T "../data-types/types";
import Base "mo:waterway-mops/BaseTypes";

module GolfTeamCommands {

    public type CreateGolfTeam = {
        golfTeamName: Text;
        golfTeamPicture: ?Blob;
        golfTeamPictureExtension: Text;
        createdById: Base.PrincipalId;
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

    public type AddGolfTeamMember = {
        golfTeamId: T.GolfTeamId;
        addTeamMember: Base.PrincipalId;
    };

    public type RemoveGolfTeamMember = {
        golfTeamId: T.GolfTeamId;
        addTeamMember: Base.PrincipalId;
    };

    public type AcceptTeamRequest = {

    };

    public type RejectTeamRequest = {

    };
}

  