
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

  public type Error = {
    #NotFound;
    #AlreadyExists;
    #NotAuthorized;
    #NotAllowed;
    #DecodeError;
    #InvalidData;
    #NotEnoughFunds;
    #PaymentError;
  };

  public type User = {
    userId: PrincipalId;
    username: Text;
    profilePicture: ?Blob;
    profilePictureFileExtension: Text;
    upcomingGames: [GameId];
    activeGames: [GameId];
    completedGames: [GameId];
    
    
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
    entryRequirement: EntryRequirement;
    prizeSetup: PrizeSetup;
    status: GameStatus;
    courseId: CourseId;
    predictions: [GamePrediction];
    events: [GolferEvent];
  };

  public type GamePrediction = {
    #Bands : BandsPrediction;
    #Prophet : ProphetPrediction;
    #Mulligans : MulligansPrediction;
    #NextUp: {};
    #BuildIt: {};
    #CallIt: CallItPrediction;
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

  public type ProphetPrediction = {

  };

  public type MulligansPrediction = {

  };

  public type CallItPrediction = {

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
    #Prophet;
    #Mulligans;
    #NextUp;
    #BuildIt;
    #CallIt;
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
