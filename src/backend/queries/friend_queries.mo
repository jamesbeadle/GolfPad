import Base "mo:waterway-mops/BaseTypes";

module FriendQueries {
    
    public type GetFriends = {
        principalId: Base.PrincipalId;
        page: Nat;
    };

    public type Friends = {
        friends: [Friend];
        page: Nat;
        total: Nat;
        pageSize: Nat;
    };

    public type Friend = {
        principalId: Base.PrincipalId;
        username: Text;
        firstName: Text;
        lastName: Text;
        profilePicture: ?Blob;
    };
}

  