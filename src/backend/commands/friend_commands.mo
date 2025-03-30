import MopsIds "../data-types/mops_ids";

module FriendCommands {
    
    public type RemoveFriend = {
        principalId: MopsIds.PrincipalId;
        requestedBy: MopsIds.PrincipalId;
    };
}

  