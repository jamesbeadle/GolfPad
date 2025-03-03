import T "../data-types/types";

module DTOs {

    public type PaginationFilters = {
        limit : Nat;
        offset : Nat;
    };

    //Golf Course DTOs

    public type GolfCourseDTO = {
        courseId: T.GolfCourseId;
        name: Text;
        tees: [T.TeeGroup];
        activeVersion: T.GolfCourseVersion;
    };

    public type GetGolfCourseDTO = {
        courseId: T.GolfCourseId;
    };

    public type CreateGolfCourseDTO = {
        name: Text;
        initialTeeGroup: T.TeeGroup;
        holes: [T.Hole]
    };

    public type UpdateGolfCourseDTO = {
        courseId: T.GolfCourseId;
        name: Text;
        updatedTeeGroup: ?T.TeeGroup;
    };

    public type DeleteGolfCourseDTO = {
        courseId: T.GolfCourseId;
    };

    public type GolfCourseSnaphotDTO = {
        id: Nat;
        name: Text;
        teeGroup: T.TeeGroup;
        courseVersion: T.GolfCourseVersion;
    };

    //Golfer DTOs

    public type GolferDTO = {
        principalId: T.GolferId;
        username: Text;
        golferPicture: ?Blob;
        golferPictureExtension: Text;
        handicap: ?T.Handicap;
        upcomingGames: [T.GameId];
        activeGames: [T.GameId];
        completedGames: [T.GameId];
        gameInvites: [T.GameInvite];
    };

    public type GetGolferDTO = {
        golferPrincipalId: T.GolferId;
    };

    public type CreateGolferDTO = {
        username: Text;
        handicap: ?T.Handicap;
    };

    public type UpdateGolferDTO = {
        username: Text;
        handicap: ?T.Handicap;
    };

    public type DeleteGolferDTO = {
        golferPrincipalId: T.GolferId;
    };

    public type UpdateGolferPictureDTO = {
        golferPicture: Blob;
        golferPictureExtension: Text;
    };

    //Game DTOs

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
        playerIds: [T.GolferId];
        invites: [T.GolferId];
        winner: T.GolferId;
    };

    public type GetGameDTO = {
        gameId: T.GameId;
    };

    public type CreateGameDTO = {
        createdById: T.GolferId;
        courseType: T.CourseType;
        courseId: T.GolfCourseId;
        gameType: T.GameType;
        inviteIds: [T.GolferId];
        teeOffTime: Int;
        teeGroup: Text;
    };

    public type BeginGameDTO = {
        gameId: T.GameId;
    };

    public type UpdateGameDTO = {
        gameId: T.GameId;
    };

    public type DeleteGameDTO = {
        gameId: T.GameId;

    };

    public type AddGameScoreDTO = {
        gameId: T.GameId;
        detail: GameScoreSubmissionDTO;
    };

    public type GameScoreSubmissionDTO = {
      #MulligansScores: MulligansScoreDTO;
    };

    public type MulligansScoreDTO = {
        holeNumber: T.HoleNumber;
        winner: T.GolferId;
        golfer1MulliganUsed: Bool;
        golfer2MulliganUsed: Bool;
    };

    //Friend Request DTOs
    
    public type FriendRequestsDTO = {
        friendRequests: [FriendRequestDTO];
    };

    public type FriendRequestDTO = {
        principalId: T.GolferId;
        requestTime: Int;
    };

    public type SendFriendRequestDTO = {
        requestedFriend: T.GolferId;
    };

    public type AcceptFriendRequestDTO = {
        requestedBy: T.GolferId;
    };

    public type RejectFriendRequestDTO = {
        requestedBy: T.GolferId;
    };

    //Game Invite DTOs


    public type InviteGolfersDTO = {
        gameId: T.GameId;
        invitedGolferIds: [T.GolferId];
    };

    public type AddGameInvitesDTO = {
        gameId: T.GameId;
        golferIds: [T.GolferId];
    };

    public type AcceptGameInviteDTO = {
        gameId: T.GameId;
        acceptedById: T.GolferId;
    };

    public type RejectGameInviteDTO = {
        gameId: T.GameId;
    };

    //Dashboard DTOs

    public type UpcomingGamesDTO = {

    };
    
    public type GolferBuzzDTO = {

    };

    public type ListGolfersDTO = {
        searchTerm: Text;
    };

    public type GolfersDTO = {
        golfers: [GolferSummaryDTO];
    };

    public type MyGolferDTO = {
        principalId: T.GolferId;
        username: Text;
        golferPicture: ?Blob;
        golferPictureExtension: Text;
        handicap: ?T.Handicap;
    };

    public type GolferSummaryDTO = {
        golferPrincipalId: T.GolferId;
        golferName: Text;
        golferPicture: ?Blob;
        golferPictureExtension: Text;
        handicap: ?T.Handicap;
    };

    public type GetMyGolferDTO = {

    };

    public type GolferGameSummariesDTO = {
        entries: [T.GameSummary];
        totalEntries: Nat;
        limit: Nat;
        offset: Nat;
    };

    public type CoursesDTO = {
        courses: [GolfCourseDTO];
    };

    //Gameplay DTOs

    public type CreateGameScoreDTO = {
        submittedById: T.GolferId;
        gameId: T.GameId;
        detail: AddScoreDetailDTO;
    };

    public type AddScoreDetailDTO = {
        #MulligansAddScoreDTO : MulligansAddScoreDTO;
    };

    public type MulligansAddScoreDTO = {
        hole: T.HoleNumber;
        golferId: T.GolferId;
        golfer1MulliganUsed: Bool;
        golfer2MulliganUsed: Bool;
        holeWinner: T.GolferId;
    };

}
