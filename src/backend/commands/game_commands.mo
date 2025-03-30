import T "../data-types/app_types";
import Game "../data-types/game_types";
import GolfCourse "../data-types/golf_course_types";
import Base "mo:waterway-mops/BaseTypes";
import MopsIds "../data-types/mops_ids";

module GameCommands {
    
    public type AddGame = {
        invitedByPrincipalId: Base.PrincipalId;
        gameId: MopsIds.GameId;
        inviteIds: [Base.PrincipalId];
    };

    public type CreateGame = {
        createdById: Base.PrincipalId;
        courseId: MopsIds.GolfCourseId;
        gameType: Game.GameType;
        inviteIds: [Base.PrincipalId];
        teeOffTime: Int;
        teeGroupIndex: GolfCourse.TeeGroupIndex;
        courseVersion: GolfCourse.GolfCourseVersion;
    };

    public type UpdateGame = {
        gameId: MopsIds.GameId;
        courseId: MopsIds.GolfCourseId;
        inviteIds: [Base.PrincipalId];
        teeOffTime: Int;
        teeGroupIndex: GolfCourse.TeeGroupIndex;
        courseVersion: GolfCourse.GolfCourseVersion;
    };

    public type DeleteGame = {
        gameId: MopsIds.GameId;

    };

    public type BeginGame = {
        gameId: MopsIds.GameId;
    };

    public type InviteGolfers = {
        gameId: MopsIds.GameId;
        invitedGolferIds: [Base.PrincipalId];
    };

    public type AcceptGameInvite = {
        gameId: MopsIds.GameId;
        acceptedById: Base.PrincipalId;
    };

    public type RejectGameInvite = {
        rejectedById: Base.PrincipalId;
        gameId: MopsIds.GameId;
    };


    //Prediction Commands

    public type PredictGameScore = {
        gameId: MopsIds.GameId;
        submittedById: Base.PrincipalId;
        detail: GamePrediction
    };

    public type GamePrediction = {
        #Bands : BandsPrediction;
        #Mulligans : {};
    };

    public type BandsPrediction = {
        golferId : Base.PrincipalId;
        wontLoseBallStartHole : T.HoleNumber;
        wontHitTreeOrBunkerStartHole : T.HoleNumber;
        hit2Of3FairwaysStartHole : T.HoleNumber;
        hit2Of3GreensStartHole : T.HoleNumber;
        singlePutt2Of3GreensStartHole : T.HoleNumber;
        wontDoubleBogeyStartHole : T.HoleNumber;
        wontBogeyStartHole : T.HoleNumber;
        parOrUnderStartHole : T.HoleNumber;
        underParStartHole : T.HoleNumber;
    };

    //Add score commands

    public type AddGameScore = {
        gameId: MopsIds.GameId;
        detail: GameScoreSubmission;
        submittedById: Base.PrincipalId;
        holeNumber: T.HoleNumber;
    };

    public type GameScoreSubmission = {
      #MulligansScores: MulligansScore;
      #BandsScores: BandsScore;
    };

    public type MulligansScore = {
        hole: T.HoleNumber;
        winner: Base.PrincipalId;
        golfer1MulliganUsed: Bool;
        golfer2MulliganUsed: Bool;
    };

    public type BandsScore = {
        hole: T.HoleNumber;
        playerResults: [Game.BandsHoleResult];
    };
}

  