import T "../data-types/types";

module GolferCommands {

    public type CreateGolfer = {
        principalId: T.GolferId;
        username: Text;
        handicap: ?T.Handicap;
        profilePicture: ?Blob;
        profilePictureExtension: ?Text;
    };

    public type UpdateUsername = {
        principalId: T.GolferId;
        username: Text;
    };

    public type UpdateFirstName = {
        principalId: T.GolferId;
        firstName: Text;
    };

    public type UpdateLastName = {
        principalId: T.GolferId;
        lastName: Text;
    };

    public type UpdateProfilePicture = {
        principalId: T.GolferId;
        profilePicture: ?Blob;
        profilePictureExtension: Text;
    };
    
    public type UpdateHandicap = {
        principalId: T.GolferId;
        handicap: ?T.Handicap;
    };
    
    public type UpdateHomeCourse = {
        principalId: T.GolferId;
        homeCourseId: ?T.GolfCourseId;
    };
    
    public type DeleteGolfer = {
        principalId: T.GolferId;
        confirm: Bool;
    };
    
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
    
    public type AddGame = {
        invitedByPrincipalId: T.GolferId;
        gameId: T.GameId;
        inviteIds: [T.GolferId];
    }
}

  