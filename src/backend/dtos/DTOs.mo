import T "../data-types/types";

module DTOs {

    public type SaveProfileDTO = {
        username: Text;
        handicap: Float;
    };

    public type UpdateProfileDTO = {
        username: Text;
        handicap: Float;
    };

    public type SaveProfilePictureDTO = {
        profilePicture: Blob;
        profilePictureExtension: Text;
    };

    public type ProfileDTO = {
        principalId: T.PrincipalId;
        username: Text;
    };

    public type GetGolferBuzzDTO = {

    };

    public type GolferBuzzDTO = {

    };

    public type GetUpcomingGamesDTO = {

    };

    public type UpcomingGamesDTO = {

    };

    public type CreateYardageSetDTO = {

    };

    public type UpdateYardageSetDTO = {

    };

    public type DeleteYardageSetDTO = {

    };

    public type GetYardageSetDTO = {

    };

    public type YardageSetDTO = {

    };

    public type AddYardageSetClubDTO = {

    };

    public type DeleteYardageSetClubDTO = {

    };

    public type AddYardageDTO = {

    };

    public type ListGolfersDTO = {

    };

    public type GolfersDTO = {

    };

    public type ListFriendRequestsDTO = {

    };

    public type FriendRequestsDTO = {

    };

    public type AcceptFriendRequestDTO = {

    };

    public type RejectFriendRequestDTO = {

    };

    public type SendFriendRequestDTO = {

    };

    public type GetGolferDTO = {

    };

    public type GolferDTO = {

    };

    public type GetGolferGameHistoryDTO = {

    };

    public type GolferGameHistoryDTO = {

    };

    public type GetMyGamesDTO = {

    };

    public type MyGamesDTO = {

    };

    public type GetGameDTO = {

    };

    public type GameDTO = {

    };

    public type ListCoursesDTO = {

    };

    public type CoursesDTO = {

    };

    public type ListGolferCoursesDTO = {

    };

    public type GolferCoursesDTO = {

    };

    public type AddGolferCourseDTO = {

    };

    public type DeleteGolferCourseDTO = {

    };

    public type AddCustomCourseDTO = {

    };

    public type UpdateCustomCourseDTO = {

    };

    public type DeleteCustomCourseDTO = {

    };

    public type CreateGameDTO = {
        courseType: T.CourseType;
        courseId: T.CourseId;
        gameType: T.GameType;
        inviteIds: [T.PrincipalId];
    };

    public type InviteGolferDTO = {

    };

    public type AccepteGameInviteDTO = {

    };

    public type AddGameScoreDTO = {

    };

    public type BandsPredictionDTO = {

    };




}
