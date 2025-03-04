import T "../data-types/types";

module FriendRequestCommands {
    
    public type AcceptFriendRequest = {
        principalId: T.GolferId;
        requestedBy: T.GolferId;
    };
    
    public type RejectFriendRequest = {
        principalId: T.GolferId;
        requestedBy: T.GolferId;
    };
    
    public type SendFriendRequest = {
        principalId: T.GolferId;
        requestedFriend: T.GolferId;
    };
}

  