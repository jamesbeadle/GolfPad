import T "../data-types/types";
import Base "mo:waterway-mops/BaseTypes";

module GolferCommands {

    public type CreateUser = {
        username: Text;
        handicap: ?T.Handicap;
        profilePicture: ?Blob;
        profilePictureExtension: ?Text;
    };

    public type UpdateUsername = {
        principalId: Base.PrincipalId;
        username: Text;
    };

    public type UpdateFirstName = {
        principalId: Base.PrincipalId;
        firstName: Text;
    };

    public type UpdateLastName = {
        principalId: Base.PrincipalId;
        lastName: Text;
    };

    public type UpdateProfilePicture = {
        principalId: Base.PrincipalId;
        profilePicture: ?Blob;
        profilePictureExtension: Text;
    };
    
    public type UpdateHandicap = {
        principalId: Base.PrincipalId;
        handicap: ?T.Handicap;
    };
    
    public type UpdateHomeCourse = {
        principalId: Base.PrincipalId;
        homeCourseId: ?T.GolfCourseId;
    };
    
    public type DeleteGolfer = {
        principalId: Base.PrincipalId;
        confirm: Bool;
    };
}

  