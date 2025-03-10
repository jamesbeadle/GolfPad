import T "../data-types/types";

module GolferQueries {
    
    public type GetProfile = {
        principalId: T.GolferId;
    };

    public type Profile = {
        principalId: T.GolferId;
        username: Text;
        golferPicture: ?Blob;
        golferPictureExtension: Text;
        handicap: ?T.Handicap;
    };

    public type GetBuzz = {
        principalId: T.GolferId;

    };

    public type Buzz = {
        principalId: T.GolferId;

    };

    public type GetUpcomingGames = {
        principalId: T.GolferId;

    };

    public type UpcomingGames = {
        principalId: T.GolferId;

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
        golferPrincipalId: T.GolferId;
        golferName: Text;
        golferPicture: ?Blob;
        golferPictureExtension: Text;
        handicap: ?T.Handicap;
    };
    
    public type ListFriends = {
        principalId: T.GolferId;
        totalEntries: Nat;
        limit: Nat;
        offset: Nat;
    };

    public type Friends = {
        friendRequests: [Friend];
    };

    public type Friend = {
        principalId: T.GolferId;
    };

    public type GetGolfer = {
        principalId: T.GolferId;
    };

    public type Golfer = {
        principalId: T.GolferId;
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
        principalId: T.GolferId;
        entries: [T.GameSummary];
        totalEntries: Nat;
        limit: Nat;
        offset: Nat;
    };

    public type IsUsernameAvailable = {
        username: Text;
        principalId: T.GolferId;
    };

    public type UsernameAvailable = Bool;

    
}

  