import Base "mo:waterway-mops/BaseTypes";
import GolfEnums "golf_enums";


module Types {

  public type ImageId = Nat;
  public type HoleNumber = Nat8;
  public type GolfCourseId = Nat;
  public type GameId = Nat;
  public type DateTime = Int;
  public type Handicap = Int16;
  public type YardageSetId = Nat16;
  public type ClubIndex = Nat16;
  public type CourseHistoryId = Nat16;
  public type GolfCourseVersion = Nat8;

  public type GolferId = Base.PrincipalId;
  public type GolfShotId = Nat;
  
  public type RustResult = { #Ok : Text; #Err : Text };

  public type Error = {
    #NotFound;
    #AlreadyExists;
    #NotAuthorized;
    #NotAllowed;
    #DecodeError;
    #OutOfRange;
    #TooLong;
    #TooShort;
    #NotEnoughFunds;
    #PaymentError;
    #InvalidProfilePicture;
    #CanisterFull;
    #CreateGameError;
  };









  public type Golfer = {
    principalId: GolferId;
    username: Text;
    firstName: Text;
    lastName: Text;
    handicap: ?Handicap;
    homeCourseId: GolfCourseId;
    termsAgreed: Bool;
    profilePicture: ?Blob;
    profilePictureFileExtension: Text;
    favouriteGolfCourseIds: [GolfCourseId];
    shots: [GolfShot];


    upcomingGames: [GameId];
    activeGames: [GameId];
    completedGames: [GameId];
    gameSummaries: [GameSummary];
    scheduledGames: [GameSummary];
    friendRequests: [FriendRequest];
    friends: [Base.PrincipalId];
    buzzFeed: [BuzzFeedItem];
    gameInvites: [GameInvite];
  };

  public type GolfShot = {
    id: GolfShotId;
    golferId: GolferId;
    club: GolfEnums.GolfClub;
    yardage: Nat;
    lie: ?GolfEnums.Lie;
    shotIntention: ?GolfEnums.ShotIntention;
    shotResult: ?GolfEnums.ShotResult;
    weatherType: ?GolfEnums.WeatherType;
    shotStartPosition: ?GolfEnums.ShotPosition;
    shotEndPosition: ?GolfEnums.ShotPosition;
    swingLength: ?GolfEnums.SwingLength;
    shotTime: Int;
  }; 






  public type GameInvite = {
    inviteFrom: GolferId;
    gameId: GameId;
  };

  public type BuzzFeedItem = {
    gameType: GameType;
    date: Int;
    course: GolfCourseId;
    players: [Golfer];
    feedItemType: BuzzFeedItemType;
    //TOOD: Need a property to show score based on game types
      //mulligans is a score of up to 2 people, 1 up so both players and score like 1 up
      //build it
      //next up
      //bands
        //when a certain bands acheivement happens the best one for your round goes on your friends buzz
  };

  public type BuzzFeedItemType = {
    #Game;
    #GameEvent;
  };

  public type GameSummary = {
    gameType: GameType;
    players: [GolferId];
    status: GameStatus;
    date: Int;
  };

  public type FriendRequest = {
    requestedBy : GolferId;
    requestedOn: Int;
  };

  public type CourseType = {
    #Custom;
    #Official;
  };

  public type GolfCourse = {
    id: Nat;
    name: Text;
    teeGroups: [TeeGroup];
    dateAdded: Int;
    status: CourseStatus;
    history: [HistoricalGolfCourse];
    activeVersion: GolfCourseVersion;
  };

  public type HistoricalGolfCourse = {
    id: Nat;
    version: GolfCourseVersion;
    name: Text;
    teeGroups: [TeeGroup];
    dateAdded: Int;
    status: CourseStatus;
  };

  public type CourseStatus = {
    #Active;
    #Hidden;
    #Restricted;
    #Excluded;
  };

  public type TeeGroup = {
    name: Text;
    colour: Text;
    added: Int;
    strokeIndex: Nat8;
    holes: [Hole];
  };

  public type GolfCourseSnapshot = {
    courseId: GolfCourseId;
    courseVersion: GolfCourseVersion;
    teeGroup: TeeGroup;
  };

  public type Hole = {
    number: Nat8;
    tees: [TeeInfo];
    name: Text;
    images: [(Base.CanisterId, ImageId)];
  };

  public type TeeInfo = {
    name: Text;
    colour: Text;
    yardage: Nat;
    par: Nat8;
    strokeIndex: Nat8;
  };

  public type Round = {
    playerId: GolferId;
    courseId: GolfCourseId;
    holeScores: [HoleScore];
  };

  public type HoleScore = {
    hole: HoleNumber;
    shots: Nat;
    recorded: Nat;
    recordedBy: GolferId;
  };





  //gamification golf types

  public type Game = {
    id: GameId;
    gameType: GameType;
    scoreDetail: ?GameScoreDetail;
    status: GameStatus;
    courseId: GolfCourseId;
    predictions: [GamePrediction];
    events: [GolferEvent];
    courseSnapshot: GolfCourseSnapshot;
    teeOffTime: Int;
    playerIds: [GolferId];
    invites: [GolferId];
    winner: GolferId;
  };

  public type GameScoreDetail = {
      #MulligansScores: MulligansScores;
  };

  public type MulligansScores = {
    results: [MulligansHoleResult];
    golfer1HolesWonCount: Nat8;
    golfer2HolesWonCount: Nat8;
    winner: GolferId;
  };

  public type MulligansHoleResult = {
    holeNumber: HoleNumber;
    winner: GolferId;
    golfer1MulliganUsed: Bool;
    golfer2MulliganUsed: Bool;
  };

  public type GamePrediction = {
    #Bands : BandsPrediction;
    #Mulligans : MulligansPrediction;
    #NextUp: {};
    #BuildIt: {};
  };

  public type BandsPrediction = {
    golferId: GolferId;
    wontLoseBallStartHole: HoleNumber;
    wontHitTreeOrBunkerStartHole: HoleNumber;
    hit2Of3FairwaysStartHole: HoleNumber;
    hit2Of3GreensStartHole: HoleNumber;
    singlePutt2Of3GreensStartHole: HoleNumber;
    wontDoubleBogeyStartHole: HoleNumber;
    wontBogeyStartHole: HoleNumber;
    parOrUnderStartHole: HoleNumber;
    underParStartHole: HoleNumber;
  };

  public type MulligansPrediction = {

  };

  public type GolferEvent = {
    golferId: GolferId;
    hole: HoleNumber;
    event: GolfEvent;
    //the score each player gets on a hole
    //on this hole i did this 
      //can then look up
    //eventType: 
  };

  public type GolfEvent = {
    #LongestDrive;
    #HitFairway;
    #BallNotLost;
    #HitGreen;
    #HitBunker;
    #HitTree;
    #HitWater;
    #OnePuttGreen;
    #Scrub;
    #DoubleBogey;
    #Bogey;
    #Par;
    #Birdie;
    #Eagle;
    #Albatross;
    #TakeMulligan;
  };
  

  public type GameType = {
    #Bands;
    #Mulligans;
    #NextUp;
    #BuildIt;
    #Prophet;
  };

  public type GameStatus = {
    #Unplayed;
    #Active;
    #Complete;
  };

  public type EntryRequirement = {
    #Invite;
    #InviteAndPay;
  };

  public type PrizeSetup = {
    token: Base.CanisterId;
    prizePool: Nat;
  };

};
