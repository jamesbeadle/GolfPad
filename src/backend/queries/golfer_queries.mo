import T "../data-types/types";
import Base "mo:waterway-mops/BaseTypes";

module GolferQueries {
    
    public type GetProfile = {
        principalId: Base.PrincipalId;
    };

    public type Profile = {
        principalId: Base.PrincipalId;
        username: Text;
        golferPicture: ?Blob;
        golferPictureExtension: Text;
        handicap: ?T.Handicap;
    };
    
    public type ListGolfers = {
        searchTerm: Text;
        totalEntries: Nat;
        limit: Nat;
        offset: Nat;
    };

    public type Golfers = {
        golfers: [GolferSummary];
    };

    public type GolferSummary = {
        golferPrincipalId: Base.PrincipalId;
        golferName: Text;
        golferPicture: ?Blob;
        golferPictureExtension: Text;
        handicap: ?T.Handicap;
    };
    
    public type ListFriends = {
        principalId: Base.PrincipalId;
        totalEntries: Nat;
        limit: Nat;
        offset: Nat;
    };

    public type Friends = {
        friendRequests: [Friend];
    };

    public type Friend = {
        principalId: Base.PrincipalId;
    };

    public type GetGolfer = {
        principalId: Base.PrincipalId;
    };

    public type Golfer = {
        principalId: Base.PrincipalId;
        username: Text;
        golferPicture: ?Blob;
        golferPictureExtension: Text;
        handicap: ?T.Handicap;
        upcomingGames: [T.GameId];
        activeGames: [T.GameId];
        completedGames: [T.GameId];
        gameInvites: [T.GameInvite];
    };

    public type GetGameSummaries = {
        principalId: Base.PrincipalId;
        entries: [T.GameSummary];
        totalEntries: Nat;
        limit: Nat;
        offset: Nat;
    };

    public type IsUsernameAvailable = {
        username: Text;
        principalId: Base.PrincipalId;
    };

    public type UsernameAvailable = Bool;

    
}

  