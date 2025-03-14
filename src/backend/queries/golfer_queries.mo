import T "../data-types/types";
import Base "mo:waterway-mops/BaseTypes";

module GolferQueries {
    
    public type GetProfile = {
        principalId: Base.PrincipalId;
    };

    public type Profile = {
        principalId: Base.PrincipalId;
        username: Text;
        firstName: Text;
        lastName: Text;
        golferPicture: ?Blob;
        golferPictureExtension: Text;
        handicap: ?T.Handicap;
        homeCourseId: ?T.GolfCourseId;
    };

    public type GetGolfers = {
        principalId: Base.PrincipalId;
        page: Nat;
        searchTerm: Text;
    };

    public type Golfers = {
        entries: [GolferSummary];
        page: Nat;
        total: Nat;
        pageSize: Nat;
    };

    public type GolferSummary = {
        principalId: Base.PrincipalId;
        name: Text;
        profilePicture: ?Blob;
        profilePictureExtension: Text;
        handicap: ?T.Handicap;
        joinedOn: Int;
    };

    public type GetGolfer = {
        principalId: Base.PrincipalId;
    };

    public type Golfer = {
        principalId: Base.PrincipalId;
        joinedOn: Int;
        username: Text;
        golferPicture: ?Blob;
        golferPictureExtension: Text;
        handicap: ?T.Handicap;
        upcomingGames: [T.GameId];
        activeGames: [T.GameId];
        completedGames: [T.GameId];
        gameInvites: [T.GameInvite];
    };

    public type IsUsernameAvailable = {
        username: Text;
        principalId: Base.PrincipalId;
    };

    public type UsernameAvailable = Bool;

    
}

  