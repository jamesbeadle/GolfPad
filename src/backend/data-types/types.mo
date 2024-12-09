
module Types {

  public type PrincipalId = Text;
  public type CanisterId = Text;
  public type CalendarMonth = Nat8;
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
    principalId: PrincipalId;
    username: Text;
    profilePicture: ?Blob;
    profilePictureFileExtension: Text;
    handicap: ?Handicap;
    homeCourseId: GolfCourseId;
    upcomingGames: [GameId];
    activeGames: [GameId];
    completedGames: [GameId];
    gameSummaries: [GameSummary];
    scheduledGames: [GameSummary];
    yardageSets: [YardageSet];
    friendRequests: [FriendRequest];
    friends: [PrincipalId];
    courses: [GolfCourse];
    buzzFeed: [BuzzFeedItem];
    gameInvites: [GameInvite];
  };

  public type GameInvite = {
    inviteFrom: PrincipalId;
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
    players: [PrincipalId];
    status: GameStatus;
    date: Int;
  };

  public type YardageSet = {
    id: YardageSetId;
    name: Text;
    clubs: [YardageClub];
  };

  public type YardageClub = {
    index: ClubIndex;
    name: Text;
    yards: Nat16;
  };

  public type FriendRequest = {
    requestedBy : PrincipalId;
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
    images: [(CanisterId, ImageId)];
  };

  public type TeeInfo = {
    name: Text;
    colour: Text;
    yardage: Nat;
    par: Nat8;
    strokeIndex: Nat8;
  };

  public type Round = {
    playerId: PrincipalId;
    courseId: GolfCourseId;
    holeScores: [HoleScore];
  };

  public type HoleScore = {
    hole: HoleNumber;
    shots: Nat;
    recorded: Nat;
    recordedBy: PrincipalId;
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
    playerIds: [PrincipalId];
    invites: [PrincipalId];
    winner: PrincipalId;
  };

  public type GameScoreDetail = {
      #MulligansScores: MulligansScores;
  };

  public type MulligansScores = {
    results: [MulligansHoleResult];
    golfer1HolesWonCount: Nat8;
    golfer2HolesWonCount: Nat8;
    winner: PrincipalId;
  };

  public type MulligansHoleResult = {
    holeNumber: HoleNumber;
    winner: PrincipalId;
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
    golferId: PrincipalId;
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
    golferId: PrincipalId;
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
    token: CanisterId;
    prizePool: Nat;
  };

};
