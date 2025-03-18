import Base "mo:waterway-mops/BaseTypes";
import ID "id_types";
import GolfCourses "golf_course_types";
import T "app_types";

module GameTypes {

  //Game Types

  public type GameInvite = {
    inviteFrom : Base.PrincipalId;
    gameId : ID.GameId;
  };

  public type PlayerSummary = {
    principal_id : Base.PrincipalId;
    username : Text;
  };

  public type TeamSummary = {
    team_id : ID.GolfTeamId;
    captain_id : Base.PrincipalId;
    team_members : [Base.PrincipalId];
    team_name : Text;
  };

  public type GameSummary = {
    #Mulligans : MulligansGameSummary;
    #Bands : BandsGameSummary;
    #NextUp : NextUpGameSummary;
    #BuildIt : BuildItGameSummary;
  };

  public type MulligansGameSummary = {
    gameId : ID.GameId;
    players : [PlayerSummary];
    status : GameStatus;
    date : Int;
    courseId : ID.GolfCourseId;
    score : Int8;
    holesPlayed : Nat8;
  };

  public type BandsGameSummary = {
    gameId : ID.GameId;
    players : [PlayerSummary];
    status : GameStatus;
    date : Int;
    courseId : ID.GolfCourseId;
    holesPlayed : Nat8;
    points : (Base.PrincipalId, Nat);
  };

  public type NextUpGameSummary = {
    gameId : ID.GameId;
    players : [PlayerSummary];
    status : GameStatus;
    date : Int;
    courseId : ID.GolfCourseId;
    holesPlayed : Nat8;
    points : (Base.PrincipalId, Nat);
  };

  public type BuildItGameSummary = {
    gameId : ID.GameId;
    teams : [TeamSummary];
    status : GameStatus;
    date : Int;
    courseId : ID.GolfCourseId;
    scores : (ID.GolfTeamId, Nat);
  };

  public type BandsCategory = {
    #NoTreeOrBunker;
    #NoLostBall;
    #Hit2Of3Fairways;
    #Hit2Of3Greens;
    #OnePutt2Of3Greens;
    #NoDoubleBogeyOrWorse;
    #NoBogeyOrWorse;
    #ParOrBetter;
    #UnderPar;
  };

  public type Game = {
    id : ID.GameId;
    gameType : GameType;
    scoreDetail : ?GameScoreDetail;
    status : GameStatus;
    courseId : ID.GolfCourseId;
    predictions : [GamePrediction];
    events : [GolferEvent];
    courseSnapshot : GolfCourses.GolfCourseSnapshot;
    teeOffTime : Int;
    playerIds : [Base.PrincipalId];
    invites : [Base.PrincipalId];
    winner : Base.PrincipalId;
  };

  public type GolferEvent = {
    golferId : Base.PrincipalId;
    hole : T.HoleNumber;
    event : T.GolfEvent;
    //the score each player gets on a hole
    //on this hole i did this
    //can then look up
    //eventType:
  };

  public type GameScoreDetail = {
    #MulligansScores : MulligansScores;
    #BandsScores : BandsScores;
  };

  public type MulligansScores = {
    results : [MulligansHoleResult];
    golfer1HolesWonCount : Nat8;
    golfer1MulligansAvailable : Nat8;
    golfer1MulligansUsed : Nat8;
    golfer2HolesWonCount : Nat8;
    golfer2MulligansAvailable : Nat8;
    golfer2MulligansUsed : Nat8;
    score : Int;
    winner : Base.PrincipalId;
    currentHole: Nat8;
  };

  public type MulligansHoleResult = {
    holeNumber : T.HoleNumber;
    winner : Base.PrincipalId;
    golfer1MulliganUsed : Bool;
    golfer2MulliganUsed : Bool;
  };

  public type BandsScores = {
    players : [BandsPlayerResult];
    currentHole: Nat8;
  };

  public type BandsPlayerResult = {
    principalId : Base.PrincipalId;
    points : Nat8;
    categories : [BandsCategoryResult];
  };

  public type BandsCategoryResult = {
    bandsCategory : BandsCategory;
    completed : Bool;
  };

  public type GamePrediction = {
    #Bands : BandsPrediction;
    #Mulligans : {};
    #NextUp : {};
    #BuildIt : {};
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

  public type GameType = {
    #Bands;
    #Mulligans;
    #NextUp;
    #BuildIt;
  };

  public type GameStatus = {
    #Unplayed;
    #Active;
    #Complete;
  };
};
