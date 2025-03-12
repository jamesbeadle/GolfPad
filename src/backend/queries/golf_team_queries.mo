import T "../data-types/types";
import Base "mo:waterway-mops/BaseTypes";

module GolfTeamQueries {

    public type GetGolfTeams = {
        principalId: Base.PrincipalId;
        page: Nat;
        searchTerm: Text;
    };

    public type GolfTeams = {
        entries: [GolfTeam];
        page: Nat;
        total: Nat;
        pageSize: Nat;
    };
    
    public type GetGolfTeam = {
        golfTeamId: T.GolfTeamId;
    };

    public type GolfTeam = {
        golfTeamId: T.GolfTeamId;
        golfTeamName: Text;
        golfTeamPicture: ?Blob;
        golfTeamPictureExtension: Text;
    };

    public type GolfTeamImage = {
        golfTeamPicture: ?Blob;
        golfTeamPictureExtension: Text;
    };

    public type IsTeamNameAvailable = {
        golfTeamName: Text;
        golfTeamId: T.GolfTeamId;
    };

    public type TeamNameAvailable = Bool;

    
}

  