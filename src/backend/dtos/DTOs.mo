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

    public type GetGolferDTO = {
        golferPrincipalId: T.PrincipalId;
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
        golferPrincipalId: T.PrincipalId;
    };

    public type UpdateGolferPictureDTO = {
        golferPicture: Blob;
        golferPictureExtension: Text;
    };

    //Yardage Set DTOs

    public type YardageSetDTO = {

    };

    public type GetYardageSetDTO = {
        yardageSetId: T.YardageSetId;
    };

    public type CreateYardageSetDTO = {
        name: Text;
        clubs: [T.YardageClub];
    };

    public type UpdateYardageSetDTO = {
        yardageSetId: T.YardageSetId;
        name: Text;
        clubs: [T.YardageClub];
    };

    public type DeleteYardageSetDTO = {
        yardageSetId: T.YardageSetId;
    };

    //Yardage Set Club DTOs

    public type CreateYardageSetClubDTO = {

    };

    public type UpdateYardageSetClubDTO = {
        index: T.ClubIndex;
        yardageSetId: T.YardageSetId;
        name: Text;
        yards: Nat16;
    };

    public type DeleteYardageSetClubDTO = {
        index: T.ClubIndex;
        yardageSetId: T.YardageSetId;

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
        playerIds: [T.PrincipalId];
        invites: [T.PrincipalId];
        winner: T.PrincipalId;
    };

    public type GetGameDTO = {
        gameId: T.GameId;
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
        winner: T.PrincipalId;
        golfer1MulliganUsed: Bool;
        golfer2MulliganUsed: Bool;
    };

    //Friend Request DTOs
    
    public type FriendRequestsDTO = {
        friendRequests: [FriendRequestDTO];
    };

    public type FriendRequestDTO = {
        principalId: T.PrincipalId;
        requestTime: Int;
    };

    public type SendFriendRequestDTO = {
        requestedFriend: T.PrincipalId;
    };

    public type AcceptFriendRequestDTO = {
        requestedBy: T.PrincipalId;
    };

    public type RejectFriendRequestDTO = {
        requestedBy: T.PrincipalId;
    };

    //Game Invite DTOs


    public type InviteGolfersDTO = {
        gameId: T.GameId;
        invitedGolferIds: [T.PrincipalId];
    };

    public type AddGameInvitesDTO = {
        gameId: T.GameId;
        golferIds: [T.PrincipalId];
    };

    public type AcceptGameInviteDTO = {
        gameId: T.GameId;
        acceptedById: T.PrincipalId;
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
        principalId: T.PrincipalId;
        username: Text;
        golferPicture: ?Blob;
        golferPictureExtension: Text;
        handicap: ?T.Handicap;
    };

    public type GolferSummaryDTO = {
        golferPrincipalId: T.PrincipalId;
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

}
