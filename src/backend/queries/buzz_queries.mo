import Game "../data-types/game_types";
import Base "mo:waterway-mops/BaseTypes";
import Bool "mo:base/Bool";
import MopsIds "../data-types/mops_ids";

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
        game_id: MopsIds.GameId;
        game_type: Game.GameType;
        game_date: Int;
    };

    public type CourseInfo = {
        course_id: MopsIds.GolfCourseId;
        course_image: Blob;
        course_name: Text;
    };

    public type MatchResultInfo = {
        #Mulligans : MulligansResultInfo;
        #Bands : BandsResultInfo;
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

    public type PlayerFeedSummary = {
      principal_id: Base.PrincipalId;
      username: Text;
      profile_picture: ?Blob;
    };
}

  