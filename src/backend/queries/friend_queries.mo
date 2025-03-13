import Base "mo:waterway-mops/BaseTypes";

module FriendQueries {
    
    public type GetFriends = {
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
}

  