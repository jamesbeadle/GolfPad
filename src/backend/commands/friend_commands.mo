import T "../data-types/types";
import Base "mo:waterway-mops/BaseTypes";

module FriendCommands {
    
    public type RemoveFriend = {
        principalId: Base.PrincipalId;
        requestedBy: Base.PrincipalId;
    };
}

  