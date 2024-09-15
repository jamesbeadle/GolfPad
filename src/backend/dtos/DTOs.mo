import T "../data-types/types";

module DTOs {

    public type PaginationFilters = {
        limit : Nat;
        offset : Nat;
    };

    public type SaveGolferDTO = {
        username: Text;
        handicap: ?T.Handicap;
    };

    public type UpdateGolferDTO = {
        username: Text;
        handicap: Float;
    };

    public type SaveGolferPictureDTO = {
        golferPicture: Blob;
        golferPictureExtension: Text;
    };

    public type GolferDTO = {
        principalId: T.PrincipalId;
        username: Text;
        golferPicture: ?Blob;
        golferPictureExtension: Text;
        handicap: ?T.Handicap;
        upcomingGames: [T.GameId];
        activeGames: [T.GameId];
        completedGames: [T.GameId];
        gameInvites: [T.GameInvite];
    };

    public type GolferBuzzDTO = {

    };

    public type GetUpcomingGamesDTO = {

    };

    public type UpcomingGamesDTO = {

    };

    public type SaveYardageSetDTO = {
        yardageSetId: ?T.YardageSetId;
        name: Text;
        clubs: [T.YardageClub];
    };

    public type DeleteYardageSetDTO = {
        yardageSetId: T.YardageSetId;
    };

    public type GetYardageSetDTO = {
        yardageSetId: T.YardageSetId;
    };

    public type YardageSetDTO = {

    };

    public type SaveYardageSetClubDTO = {
        index: ?T.ClubIndex;
        yardageSetId: T.YardageSetId;
        name: Text;
        yards: Nat16;
    };

    public type DeleteYardageSetClubDTO = {
        index: T.ClubIndex;
        yardageSetId: T.YardageSetId;

    };

    public type AddYardageDTO = {

    };

    public type ListGolfersDTO = {
        searchTerm: Text;
    };

    public type MyGolferDTO = {
        principalId: T.PrincipalId;
        username: Text;
        golferPicture: ?Blob;
        golferPictureExtension: Text;
        handicap: ?T.Handicap;
    };

    public type GolfersDTO = {
        golfers: [GolferSummaryDTO];
    };

    public type GolferSummaryDTO = {
        golferPrincipalId: T.PrincipalId;
        golferName: Text;
        golferPicture: ?Blob;
        golferPictureExtension: Text;
        handicap: ?T.Handicap;
    };

    public type FriendRequestsDTO = {
        friendRequests: [FriendRequestDTO];
    };

    public type FriendRequestDTO = {
        principalId: T.PrincipalId;
        requestTime: Int;
    };

    public type AcceptFriendRequestDTO = {
        requestedBy: T.PrincipalId;
    };

    public type RejectFriendRequestDTO = {
        requestedBy: T.PrincipalId;
    };

    public type SendFriendRequestDTO = {
        requestedFriend: T.PrincipalId;

    };

    public type GetMyGolferDTO = {

    };

    public type GetGolferDTO = {
        golferPrincipalId: T.PrincipalId;
    };

    public type GolferGameSummariesDTO = {
        entries: [T.GameSummary];
        totalEntries: Nat;
        limit: Nat;
        offset: Nat;
    };

    public type GetGameDTO = {
        gameId: T.GameId;
    };

    public type GameDTO = {
        id: T.GameId;
        gameType: T.GameType;
        scoreDetail: ?T.GameScoreDetail;
        status: T.GameStatus;
        courseId: T.GolfCourseId;
        predictions: [T.GamePrediction];
        events: [T.GolferEvent];
        courseSnapshot: T.GolfCourseSnapshot;
        teeOffTime: Int;
        playerIds: [T.PrincipalId];
        invites: [T.PrincipalId];
        winner: T.PrincipalId;
    };

    public type CoursesDTO = {
        courses: [GolfCourseDTO];
    };

    public type SaveGolfCourse = {

    };

    public type CreateGameDTO = {
        createdById: T.PrincipalId;
        courseType: T.CourseType;
        courseId: T.GolfCourseId;
        gameType: T.GameType;
        inviteIds: [T.PrincipalId];
        teeOffTime: Int;
        teeGroup: Text;
    };

    public type InviteGolfersDTO = {
        gameId: T.GameId;
        invitedGolferIds: [T.PrincipalId];
    };

    public type AddGameInvitesDTO = {
        gameId: T.GameId;
        golferIds: [T.PrincipalId];
    };

    public type AccepteGameInviteDTO = {
        gameId: T.GameId;
        acceptedById: T.PrincipalId;
    };

    public type AddGameScoreDTO = {
        submittedById: T.PrincipalId;
        gameId: T.GameId;
        detail: AddScoreDetailDTO;
    };

    public type AddScoreDetailDTO = {
        #MulligansAddScoreDTO : MulligansAddScoreDTO;
    };

    public type MulligansAddScoreDTO = {
        hole: T.HoleNumber;
        golferId: T.PrincipalId;
        golfer1MulliganUsed: Bool;
        golfer2MulliganUsed: Bool;
        holeWinner: T.PrincipalId;
    };

    public type BandsPredictionDTO = {

    };

    public type AddGolfCourseDTO = {
        name: Text;
        initialTeeGroup: T.TeeGroup;
        holes: [T.Hole]
    };

    public type UpdateGolfCourseDTO = {
        courseId: T.GolfCourseId;
        name: Text;
        updatedTeeGroup: ?T.TeeGroup;
    };

    public type SaveGolfCourseDTO = {
        courseId: ?T.GolfCourseId;
        holes: [T.Hole];
        name: Text;
        teeGroup: ?T.TeeGroup;
    };

    public type DeleteGolfCourseDTO = {
        courseId: T.GolfCourseId;
    };

    public type GetGolfCourseDTO = {
        courseId: T.GolfCourseId;
    };

    public type GolfCourseDTO = {
        courseId: T.GolfCourseId;
        name: Text;
        tees: [T.TeeGroup];
        activeVersion: T.GolfCourseVersion;
    };

    public type GolfCourseSnaphotDTO = {
        id: Nat;
        name: Text;
        teeGroup: T.TeeGroup;
        courseVersion: T.GolfCourseVersion;
    };
}
