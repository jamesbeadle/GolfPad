import Base "mo:waterway-mops/BaseTypes";

module GolferQueries {
    
    public type GetFriendRequests = {
        principalId: Base.PrincipalId;
        totalEntries: Nat;
        limit: Nat;
        offset: Nat;
    };

    public type FriendRequests = {
        friendRequests: [FriendRequest];
    };

    public type FriendRequest = {
        principalId: Base.PrincipalId;
        requestTime: Int;
    };
    
    public type ListFriends = {
        principalId: Base.PrincipalId;
        totalEntries: Nat;
        limit: Nat;
        offset: Nat;
    };

    public type FriendRequestExists = {
        principalId: Base.PrincipalId;
        requestedById: Base.PrincipalId;
    };
}

  