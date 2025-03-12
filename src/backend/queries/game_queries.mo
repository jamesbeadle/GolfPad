import T "../data-types/types";
import Base "mo:waterway-mops/BaseTypes";

module GameQueries {

    public type GetGame = {
        gameId: T.GameId;
    };


    public type Game = {
        id: T.GameId;
        gameType: T.GameType;
        scoreDetail: ?T.GameScoreDetail;
        status: T.GameStatus;
        courseId: T.GolfCourseId;
        predictions: [T.GamePrediction];
        events: [T.GolferEvent];
        courseSnapshot: T.GolfCourseSnapshot;
        teeOffTime: Int;
        playerIds: [Base.PrincipalId];
        invites: [Base.PrincipalId];
        winner: Base.PrincipalId;
    };

    public type GetGameSummaries = {
        user_id: Base.PrincipalId;
        page: Nat;
    };

    public type GameSummaries = {
        entries: [GameSummary];
        page: Nat;
        total: Nat;
        pageSize: Nat;
    };

    public type GameSummary = {
        id: T.GameId;
    };
    
}

  