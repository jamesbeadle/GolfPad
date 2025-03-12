import T "../data-types/types";
import Base "mo:waterway-mops/BaseTypes";
import Bool "mo:base/Bool";

module BuzzQueries {

    public type GetBuzz = {
        principalId: Base.PrincipalId;
        page: Nat;
    };

    
    public type Buzz = {
        entries: [BuzzEntry];
        page: Nat;
        total: Nat;
        pageSize: Nat;
    };

    public type BuzzEntry = {
        game_info: GameInfo;
        course_info: CourseInfo;
        match_result: MatchResultInfo;
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

    public type MatchResultInfo = {
        #Mulligans : MulligansResultInfo;
        #Bands : BandsResultInfo;
        #BuildIt : BuildItResultInfo;
        #NextUp : NextUpResultInfo;
    };

    public type MulligansResultInfo = {
        players: [PlayerFeedSummary];
        score: Int8;
        holesPlayed: Nat8;  
        gameOver: Bool;
        player1Wins: Bool;
        player2Wins: Bool;
    };

    public type BandsResultInfo = {
        players: [PlayerFeedSummary];
        points: (Base.PrincipalId, Nat);
        holesPlayed: Nat8;  
    };

    public type NextUpResultInfo = {
        players: [PlayerFeedSummary];
        points: (Base.PrincipalId, Nat);
        holesPlayed: Nat8;  
    };

    public type BuildItResultInfo = {
        teams: [TeamFeedSummary];
        scores: (T.GolfTeamId, Nat);
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

  