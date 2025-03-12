import T "../data-types/types";
import Base "mo:waterway-mops/BaseTypes";
import Bool "mo:base/Bool";

module UpcomingGamesQueries {

    public type GetUpcomingGames = {
        user_id: Base.PrincipalId;
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
        game_id: T.GameId;
        game_type: T.GameType;
        game_date: Int;
    };

    public type CourseInfo = {
        course_id: T.GolfCourseId;
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
        team_id: T.GolfTeamId;
        captain_id: Base.PrincipalId;
        team_members: [Base.PrincipalId];
        team_name: Text;
        team_image: ?Blob;
        team_image_extension: Text;
    };
}

  