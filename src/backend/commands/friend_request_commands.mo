import Base "mo:waterway-mops/BaseTypes";

module FriendRequestCommands {
    
    public type AcceptFriendRequest = {
        principalId: Base.PrincipalId;
        requestedBy: Base.PrincipalId;
    };
    
    public type RejectFriendRequest = {
        principalId: Base.PrincipalId;
        requestedBy: Base.PrincipalId;
    };
    
    public type SendFriendRequest = {
        principalId: Base.PrincipalId;
        requestedFriend: Base.PrincipalId;
    };
}

  