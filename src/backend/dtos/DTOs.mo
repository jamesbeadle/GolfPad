import T "../data-types/types";

module DTOs {

    public type CourseDTO = {

    };

    public type CreateCourseDTO = {

    };

    public type UpdateCourseDTO = {

    };

    public type AddGameScoreDTO = {
        gameId: T.GameId;
    };

    public type CreateGameDTO = {
        gameType: T.GameType;
        players: [T.PrincipalId];
        invites: [T.PrincipalId];
        gameDate: T.DateTime;
        entryRequirement: T.EntryRequirement;
        courseId: T.CourseId;
        prizeSetup: T.PrizeSetup;
    };

    public type InviteGolferDTO = {

    };

    public type AccepteGameInviteDTO = {

    };

    public type GetScorecardDTO = {

    };

    public type GetLeaderboardDTO = {

    };

    public type LeaderboardDTO = {

    };

    public type GetGamesDTO = {
        status: T.GameStatus;
    };

    public type CreateUserDTO = {
        username: Text;
        displayName: Text;
        profilePicture: Blob;
        profilePictureExtension: Text;
        handicap: T.Handicap;
        homeCourseId: T.CourseId;
    };

    public type UpdateUserDTO = {
        username: Text;
        displayName: Text;
        profilePicture: Blob;
        profilePictureExtension: Text;
    };

    public type AddFriendDTO = {

    };
    
    public type UserDTO = {

    };

    public type GetUserGamesDTO = {
        limit : Nat;
        offset : Nat;
        gameType: T.GameType;
        status: T.GameStatus;
    };

    public type GameDTO = {
        id: Nat;
        gameType: T.GameType;
        rounds: [T.Round];
        entryRequirement: T.EntryRequirement;
        prizeSetup: T.PrizeSetup;
        status: T.GameStatus;
        courseId: T.CourseId;
    };

    public type UpdateGameStatusDTO = {

    };

    
}
