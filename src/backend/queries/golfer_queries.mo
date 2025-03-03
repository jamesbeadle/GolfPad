import T "../data-types/types";

module GolferQueries {
    
    public type GetMyGolfer = {
        principalId: T.GolferId;
    };
    
    public type ListGolfers = {
        searchTerm: Text;
        totalEntries: Nat;
        limit: Nat;
        offset: Nat;
    };
    
    public type ListFriendRequests = {
        principalId: T.GolferId;
        totalEntries: Nat;
        limit: Nat;
        offset: Nat;
    };

    public type GetGolfer = {
        principalId: T.GolferId;
    };

    public type FriendRequestExists = {
        principalId: T.GolferId;
        requestedById: T.GolferId;
    };

    public type GetGameSummaries = {
        principalId: T.GolferId;
        entries: [T.GameSummary];
        totalEntries: Nat;
        limit: Nat;
        offset: Nat;
    }

    
}

  