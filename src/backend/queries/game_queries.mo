import T "../data-types/types";

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
        playerIds: [T.GolferId];
        invites: [T.GolferId];
        winner: T.GolferId;
    };
    
}

  