import T "../data-types/types";
import Base "mo:waterway-mops/BaseTypes";

module GameCommands {
    
    public type AddGame = {
        invitedByPrincipalId: Base.PrincipalId;
        gameId: T.GameId;
        inviteIds: [Base.PrincipalId];
    };

    public type CreateGame = {
        createdById: Base.PrincipalId;
        courseId: T.GolfCourseId;
        gameType: T.GameType;
        inviteIds: [Base.PrincipalId];
        teeOffTime: Int;
        teeGroupIndex: T.TeeGroupIndex;
        courseVersion: T.GolfCourseVersion;
    };

    public type BeginGame = {
        gameId: T.GameId;
    };

    public type PredictGame = {
        gameId: T.GameId;
    };

    public type DeleteGame = {
        gameId: T.GameId;

    };

    public type AddGameScore = {
        gameId: T.GameId;
        detail: GameScoreSubmission;
        submittedById: Base.PrincipalId;
    };

    public type GameScoreSubmission = {
      #MulligansScores: MulligansScore;
      #BandsScores: BandsScore;
    };

    public type MulligansScore = {
        holeNumber: T.HoleNumber;
        winner: Base.PrincipalId;
        golfer1MulliganUsed: Bool;
        golfer2MulliganUsed: Bool;
    };

    public type BandsScore = {
        holeNumber: T.HoleNumber;
        predictions: [BandsCategoryResult];
    };

    public type BandsCategoryResult = {
        golferId: Base.PrincipalId;
        category: T.BandsCategory;
        completed: Bool;
    };  

    public type InviteGolfers = {
        gameId: T.GameId;
        invitedGolferIds: [Base.PrincipalId];
    };

    public type AcceptGameInvite = {
        gameId: T.GameId;
        acceptedById: Base.PrincipalId;
    };

    public type RejectGameInvite = {
        rejectedById: Base.PrincipalId;
        gameId: T.GameId;
    };
}

  