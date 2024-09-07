
module Types {

  public type PrincipalId = Text;
  public type CanisterId = Text;
  public type CalendarMonth = Nat8;
  public type ImageId = Nat;
  public type HoleNumber = Nat8;
  public type CourseId = Nat;
  public type GameId = Nat;
  public type DateTime = Int;
  public type Handicap = Nat16;
  public type YardageSetId = Nat16;
  public type ClubIndex = Nat16;
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
  };

  public type Golfer = {
    principalId: PrincipalId;
    username: Text;
    profilePicture: ?Blob;
    profilePictureFileExtension: Text;
    handicap: ?Float;
    homeCourseId: CourseId;
    upcomingGames: [GameId];
    activeGames: [GameId];
    completedGames: [GameId];
    yardageSets: [YardageSet];
    friendRequests: [FriendRequest];
    friends: [PrincipalId];
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

  public type Course = {
    id: Nat;
    name: Text;
    holes: [Hole];
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
  };

  public type Round = {
    playerId: PrincipalId;
    courseId: CourseId;
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
    rounds: [Round];
    status: GameStatus;
    courseId: CourseId;
    predictions: [GamePrediction];
    events: [GolferEvent];
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
  

  //Todo Phase 2: Official golf types to handle club competitions
  



};
