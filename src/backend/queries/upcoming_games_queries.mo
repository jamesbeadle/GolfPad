import ID "../data-types/id_types";
import Game "../data-types/game_types";
import Base "mo:waterway-mops/BaseTypes";

module UpcomingGamesQueries {

    public type GetUpcomingGames = {
        principalId: Base.PrincipalId;
        page: Nat;
    };

    
    public type UpcomingGames = {
        entries: [UpcomingGame];
        page: Nat;
    };

    public type UpcomingGame = {
        game_info: GameInfo;
        opponent_info: OpponentInfo;
        course_info: CourseInfo;
    };

    public type GameInfo = {
        game_id: ID.GameId;
        game_type: Game.GameType;
        game_date: Int;
    };

    public type CourseInfo = {
        course_id: ID.GolfCourseId;
        course_image: Blob;
        course_name: Text;
    };

    public type OpponentInfo = {
        #Mulligans : PlayerOpponentInfo;
        #Bands : PlayerOpponentInfo;
        #BuildIt : TeamOpponentInfo;
        #NextUp : PlayerOpponentInfo;
    };

    public type PlayerOpponentInfo = {
        players: [PlayerFeedSummary];
    };

    public type TeamOpponentInfo = {
        teams: [TeamFeedSummary];
    };
    
    public type PlayerFeedSummary = {
      principal_id: Base.PrincipalId;
      username: Text;
      profile_picture: ?Blob;
    };

    public type TeamFeedSummary = {
        team_id: ID.GolfTeamId;
        captain_id: Base.PrincipalId;
        team_members: [Base.PrincipalId];
        team_name: Text;
        team_image: ?Blob;
        team_image_extension: Text;
    };
}

  