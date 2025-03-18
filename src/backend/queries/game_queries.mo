import ID "../data-types/id_types";
import Game "../data-types/game_types";
import GolfCourse "../data-types/golf_course_types";
import Base "mo:waterway-mops/BaseTypes";

module GameQueries {

    public type GetGame = {
        gameId: ID.GameId;
    };


    public type Game = {
        id: ID.GameId;
        gameType: Game.GameType;
        scoreDetail: ?Game.GameScoreDetail;
        status: Game.GameStatus;
        courseId: ID.GolfCourseId;
        predictions: [Game.GamePrediction];
        events: [Game.GolferEvent];
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
        gameId: ID.GameId;
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
        id: ID.GameId;
        gameType: Game.GameType;
        date: Int;
        players: [Base.PrincipalId];
        status: Game.GameStatus;
    };

    public type GetPlayerBandsResults = {
        id: ID.GameId;
        principalId: Base.PrincipalId;
    };

    public type PlayerBandsResults = {
        results: [PlayerBandsResult];
    };

    public type PlayerBandsResult = {
        principalId: Base.PrincipalId;
        category: Game.BandsCategory;
        completed: Bool;
        points: Nat8;
    };
    
}

  