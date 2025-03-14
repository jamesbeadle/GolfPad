import Base "mo:waterway-mops/BaseTypes";
import Blob "mo:base/Blob";
import GolfEnums "golf_enums";

module Types {
  
  public type GolfCourseId = Nat;
  public type GameId = Nat;
  public type GolfTeamId = Nat;
  public type GolfShotId = Nat;
  public type GolfChannelId = Nat;
  public type CourseHistoryId = Nat16;
  public type GolfCourseVersion = Nat8;
  
  public type Handicap = Int16;
  public type HoleNumber = Nat8;
  public type DateTime = Int;
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
    #InvalidGolfTeamPicture;
    #CanisterFull;
    #CreateGameError;
  };


  public type Golfer = {
    principalId: Base.PrincipalId;
    username: Text;
    firstName: Text;
    lastName: Text;
    handicap: ?Handicap;
    homeCourseId: ?GolfCourseId;
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
    totalFriends: Nat;
  };

  public type GolfShot = {
    id: GolfShotId;
    golferId: Base.PrincipalId;
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
    inviteFrom: Base.PrincipalId;
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
      //bands
        //when a certain bands acheivement happens the best one for your round goes on your friends buzz
  };

  public type PlayerSummary = {
      principal_id: Base.PrincipalId;
      username: Text;
  };

  public type TeamSummary = {
      team_id: GolfTeamId;
      captain_id: Base.PrincipalId;
      team_members: [Base.PrincipalId];
      team_name: Text;
  };

  public type BuzzFeedItemType = {
    #Game;
    #GameEvent;
  };

  public type GameSummary = {
    #Mulligans: MulligansGameSummary;
    #Bands: BandsGameSummary;
    #NextUp: NextUpGameSummary;
    #BuildIt: BuildItGameSummary;
  };

  public type MulligansGameSummary = {
    gameId: GameId;
    players: [PlayerSummary];
    status: GameStatus;
    date: Int;
    courseId: GolfCourseId;
    score: Int8;
    holesPlayed: Nat8;
  };

  public type BandsGameSummary = {
    gameId: GameId;
    players: [PlayerSummary];
    status: GameStatus;
    date: Int;
    courseId: GolfCourseId;
    holesPlayed: Nat8;
    points: (Base.PrincipalId, Nat);
  };

  public type NextUpGameSummary = {
    gameId: GameId;
    players: [PlayerSummary];
    status: GameStatus;
    date: Int;
    courseId: GolfCourseId;
    holesPlayed: Nat8;
    points: (Base.PrincipalId, Nat);
  };

  public type BuildItGameSummary = {
    gameId: GameId;
    teams: [TeamSummary];
    status: GameStatus;
    date: Int;
    courseId: GolfCourseId;
    scores: (GolfTeamId, Nat);
  };

  public type FriendRequest = {
    requestedBy : Base.PrincipalId;
    requestedOn: Int;
  };

  public type GolfCourse = {
    id: Nat;
    name: Text;
    totalHoles: Nat8;
    teeGroups: [TeeGroup];
    dateAdded: Int;
    status: CourseStatus;
    history: [HistoricalGolfCourse];
    activeVersion: GolfCourseVersion;
    mainImage: Blob;
    bannerImage: Blob;
    courseAlbums: [GolfCourseAlbum];
    courseImages: [GolfCourseImage];
  };

  public type GolfCourseImage = {
    image_id: Nat;
    album_id: Nat;
    added: Int;
    visible: Bool;
  };

  public type GolfCourseAlbum = {
    album_title: Text;
    image_ids: [Nat];
    created_by: Base.PrincipalId;
    created_on: Int;
    visible: Bool;
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
    images: [HoleImage];
  };

  public type HoleImage = {
    uploaded: Int;
    owner: Base.PrincipalId;
    image: Blob;
  };

  public type TeeInfo = {
    name: Text;
    colour: Text;
    yardage: Nat;
    par: Nat8;
    strokeIndex: Nat8;
  };

  public type Round = {
    playerId: Base.PrincipalId;
    courseId: GolfCourseId;
    holeScores: [HoleScore];
  };

  public type HoleScore = {
    hole: HoleNumber;
    shots: Nat;
    recorded: Nat;
    recordedBy: Base.PrincipalId;
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
    playerIds: [Base.PrincipalId];
    invites: [Base.PrincipalId];
    winner: Base.PrincipalId;
  };

  public type GameScoreDetail = {
      #MulligansScores: MulligansScores;
  };

  public type MulligansScores = {
    results: [MulligansHoleResult];
    golfer1HolesWonCount: Nat8;
    golfer2HolesWonCount: Nat8;
    winner: Base.PrincipalId;
  };

  public type MulligansHoleResult = {
    holeNumber: HoleNumber;
    winner: Base.PrincipalId;
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
    golferId: Base.PrincipalId;
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
    golferId: Base.PrincipalId;
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
    token: Base.CanisterId;
    prizePool: Nat;
  };

  public type GolfChannel = {
    id: GolfChannelId;
    name: Text;
    createdBy: Base.PrincipalId;
    createdOn: Int;
    channelImage: ?Blob;
    channelImageExtension: Text;
    channelBanner: ?Blob;
    channelBannerExtension: Text;
    golfTeamId: ?GolfTeamId;
  };

  public type GolfTeam = {
    id: GolfTeamId;
    name: Text;
    owner: Base.PrincipalId;
    members: [Base.PrincipalId];
    teamPicture: ?Blob;
    teamPictureExtension: Text;
  };
};
