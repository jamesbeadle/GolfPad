
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
  };


  public type GameType = {
    #RangeFinder;
      //Pick ranges of 3 holes
        //can't pick the same group of 3 holes and they must be consecutive

        //Won't double bogey or worse
        //Won't bogie or worse
        //Be par or under (handicap adjusted)
        //Be under par (handicap adjusted)
        //Will hit 2/3 fairways
        //Will hit 2/3 greens
        //Will 1 putt 2/3 greens
        //Won't lose a ball
        //Won't enter a bunker (on any hole)
    
    #Oracle;
      //predict your exact score a hole for small points
      //pick 9 holes you will get a net par or better
      //pick 3 holes you will get a net birdie or better
      //pick your best hole
      //pick your worst hole
      //pick 3 fairways you will hit
      //pick 3 holes in which you will reach the green in regulation (handicap adjusted, assumes 2 shots per green)
      //any 3 holes you 1 putt

    #Mulligans;
      //Get a certain number of mulligans to start with
        //if you make them count you can get more but if you waste them you get less
      //start with 1 mulligan every 3 holes
        //hit handicap or better on the hole you use the mulligan then get another mulligan on the following hole only
        //hit bogey or worse (hanidcap adjusted then you have to wait for the next 3rd hole interval to get a mulligan)
          //taking a mulligan on a first hole for instant would mean you have to start well to get one on the second hole
        //you can either take the original shot or the mulligan shot without penalty interchangeably
      //

    #Randomiser;
      //the holes are divided up randomly and a player is selected on each tee to lead the way, 
        //any players who beat them on the hole get points
        //you can only get points if you are attempting to beat a player
        //if no one beats you then you get points
        //remainder 


    #CardBuilder;
      //Setup a team where you build a card
      //Play against other teams on a course
      //Set the game up for a period or multiple periods of time
        //best score card over a date range, month, year etc
    //team games involving alternate shots

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
