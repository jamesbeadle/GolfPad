import T "../data-types/types";

module GameCommands {

    public type CreateGame = {
        createdById: T.GolferId;
        courseId: T.GolfCourseId;
        gameType: T.GameType;
        inviteIds: [T.GolferId];
        teeOffTime: Int;
        name: Text;
        teeGroup: T.TeeGroup;
        courseVersion: T.GolfCourseVersion;
    };

    public type GolfCourseSnaphot = {
        id: Nat;
    };

    public type BeginGame = {
        gameId: T.GameId;
    };

    public type UpdateGame = {
        gameId: T.GameId;
    };

    public type DeleteGame = {
        gameId: T.GameId;

    };

    public type AddGameScore = {
        gameId: T.GameId;
        detail: GameScoreSubmissionDTO;
    };

    public type GameScoreSubmissionDTO = {
      #MulligansScores: MulligansScore;
    };

    public type MulligansScore = {
        holeNumber: T.HoleNumber;
        winner: T.GolferId;
        golfer1MulliganUsed: Bool;
        golfer2MulliganUsed: Bool;
    };

    public type AddGameInvites = {
        gameId: T.GameId;
        golferIds: [T.GolferId];
    };
    public type InviteGolfers = {
        gameId: T.GameId;
        invitedGolferIds: [T.GolferId];
    };

    public type AcceptGameInvite = {
        gameId: T.GameId;
        acceptedById: T.GolferId;
    };

    public type RejectGameInvite = {
        gameId: T.GameId;
    };
}

  