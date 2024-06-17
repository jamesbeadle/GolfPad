import T "../data-types/types";

module DTOs {

    public type CourseDTO = {

    };

    public type CreateCourseDTO = {

    };

    public type UpdateCourseDTO = {

    };

    public type AddGameScoreDTO = {

    };

    public type CreateGameDTO = {

    };

    public type InviteGolferDTO = {

    };

    public type AccepteGameInviteDTO = {

    };

    public type GetScorecardDTO = {

    };

    public type GetGameLeaderboardDTO = {

    };

    public type CreateUserDTO = {
        username: Text;
        displayName: Text;
        profilePicture: Blob;
        profilePictureExtension: Text;
    };

    public type UpdateUserDTO = {
        username: Text;
        displayName: Text;
        profilePicture: Blob;
        profilePictureExtension: Text;
    };
    
    public type UserDTO = {

    };

    public type GameLeaderboardDTO = {

    };

    public type GetGameHistoryDTO = {

    };
}
