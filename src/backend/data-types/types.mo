
module Types {

  public type PrincipalId = Text;
  public type CanisterId = Text;
  public type CalendarMonth = Nat8;
  public type ImageId = Nat;
  public type HoleNumber = Nat8;
  public type CourseId = Text;

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
    id: Nat;
    gameType: GameType;
    rounds: [Round];
    entryRequirement: EntryRequirement;
    prizeSetup: PrizeSetup;
    status: GameStatus;
    courseId: CourseId;
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
