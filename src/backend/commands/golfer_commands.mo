import T "../data-types/app_types";
import ID "../data-types/id_types";
import Base "mo:waterway-mops/BaseTypes";

module GolferCommands {

    public type CreateUser = {
        username : Text;
        handicap : ?T.Handicap;
        profilePicture : ?Blob;
        profilePictureExtension : ?Text;
    };

    public type UpdateUsername = {
        principalId : Base.PrincipalId;
        username : Text;
    };

    public type UpdateFirstName = {
        principalId : Base.PrincipalId;
        firstName : Text;
    };

    public type UpdateLastName = {
        principalId : Base.PrincipalId;
        lastName : Text;
    };

    public type UpdateProfilePicture = {
        principalId : Base.PrincipalId;
        profilePicture : ?Blob;
        profilePictureExtension : Text;
    };

    public type UpdateHandicap = {
        principalId : Base.PrincipalId;
        handicap : ?T.Handicap;
    };

    public type UpdateHomeCourse = {
        principalId : Base.PrincipalId;
        homeCourseId : ?ID.GolfCourseId;
    };

    public type DeleteGolfer = {
        principalId : Base.PrincipalId;
        confirm : Bool;
    };

    public type RemoveUserGolfCourse = {
        principalId : Base.PrincipalId;
        golfCourseId : ID.GolfCourseId;
    };

    public type ClaimMembership = {
        principalId : Base.PrincipalId;
    };

    public type UpdateMembership = {
        principalId : Base.PrincipalId;
        membershipType : T.MembershipType;
    };

};
