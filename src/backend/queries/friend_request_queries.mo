import T "../data-types/types";

module GolferQueries {
    
    public type ListFriendRequests = {
        principalId: T.GolferId;
        totalEntries: Nat;
        limit: Nat;
        offset: Nat;
    };

    public type FriendRequests = {
        friendRequests: [FriendRequest];
    };

    public type FriendRequest = {
        principalId: T.GolferId;
        requestTime: Int;
    };
    
    public type ListFriends = {
        principalId: T.GolferId;
        totalEntries: Nat;
        limit: Nat;
        offset: Nat;
    };

    public type FriendRequestExists = {
        principalId: T.GolferId;
        requestedById: T.GolferId;
    };
}

  