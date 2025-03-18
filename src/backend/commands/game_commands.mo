import T "../data-types/app_types";
import ID "../data-types/id_types";
import Game "../data-types/game_types";
import GolfCourse "../data-types/golf_course_types";
import Base "mo:waterway-mops/BaseTypes";

module GameCommands {
    
    public type AddGame = {
        invitedByPrincipalId: Base.PrincipalId;
        gameId: ID.GameId;
        inviteIds: [Base.PrincipalId];
    };

    public type CreateGame = {
        createdById: Base.PrincipalId;
        courseId: ID.GolfCourseId;
        gameType: Game.GameType;
        inviteIds: [Base.PrincipalId];
        teeOffTime: Int;
        teeGroupIndex: GolfCourse.TeeGroupIndex;
        courseVersion: GolfCourse.GolfCourseVersion;
    };

    public type DeleteGame = {
        gameId: ID.GameId;

    };

    public type BeginGame = {
        gameId: ID.GameId;
    };

    public type InviteGolfers = {
        gameId: ID.GameId;
        invitedGolferIds: [Base.PrincipalId];
    };

    public type AcceptGameInvite = {
        gameId: ID.GameId;
        acceptedById: Base.PrincipalId;
    };

    public type RejectGameInvite = {
        rejectedById: Base.PrincipalId;
        gameId: ID.GameId;
    };


    //Prediction Commands

    public type PredictGameScore = {
        gameId: ID.GameId;
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
        gameId: ID.GameId;
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
        playerResults: [BandsHoleResult];
    };

    public type BandsHoleResult = {
        golferId: Base.PrincipalId;
        category: Game.BandsCategory;
        completed: Bool;
        failed: Bool;
    };  
}

  