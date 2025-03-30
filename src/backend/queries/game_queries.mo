import Game "../data-types/game_types";
import GolfCourse "../data-types/golf_course_types";
import Base "mo:waterway-mops/BaseTypes";
import MopsIds "../data-types/mops_ids";

module GameQueries {

    public type GetGame = {
        gameId: MopsIds.GameId;
    };


    public type Game = {
        id: MopsIds.GameId;
        gameType: Game.GameType;
        scoreDetail: ?Game.GameScoreDetail;
        status: Game.GameStatus;
        courseId: MopsIds.GolfCourseId;
        predictions: [Game.GamePrediction];
        courseSnapshot: GolfCourse.GolfCourseSnapshot;
        teeOffTime: Int;
        playerIds: [Base.PrincipalId];
        invites: [Base.PrincipalId];
        winner: Base.PrincipalId;
    };

    public type GetGameInvites = {
        principalId: Base.PrincipalId;
    };

    public type GameInvites = {
        entries: [GameInvite];
        page: Nat;
        total: Nat;
        pageSize: Nat;
    };

    public type GameInvite = {
        sentBy: Base.PrincipalId;
        invited: Base.PrincipalId;
        sentOn: Int;
        gameId: MopsIds.GameId;
    };

    public type GetGameSummaries = {
        principalId: Base.PrincipalId;
        page: Nat;
    };

    public type GameSummaries = {
        entries: [GameSummary];
        page: Nat;
        total: Nat;
        pageSize: Nat;
    };

    public type GameSummary = {
        id: MopsIds.GameId;
        gameType: Game.GameType;
        date: Int;
        players: [Base.PrincipalId];
        status: Game.GameStatus;
    };
    
}

  