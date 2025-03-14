export const idlFactory = ({ IDL }) => {
  const PrincipalId = IDL.Text;
  const AcceptFriendRequest = IDL.Record({
    principalId: PrincipalId,
    requestedBy: PrincipalId,
  });
  const Error = IDL.Variant({
    InvalidProfilePicture: IDL.Null,
    DecodeError: IDL.Null,
    TooLong: IDL.Null,
    NotAllowed: IDL.Null,
    NotEnoughFunds: IDL.Null,
    TooShort: IDL.Null,
    InvalidGolfTeamPicture: IDL.Null,
    NotFound: IDL.Null,
    NotAuthorized: IDL.Null,
    AlreadyExists: IDL.Null,
    CreateGameError: IDL.Null,
    OutOfRange: IDL.Null,
    PaymentError: IDL.Null,
    CanisterFull: IDL.Null,
  });
  const Result = IDL.Variant({ ok: IDL.Null, err: Error });
  const GameId = IDL.Nat;
  const AcceptGameInvite = IDL.Record({
    gameId: GameId,
    acceptedById: PrincipalId,
  });
  const HoleNumber = IDL.Nat8;
  const MulligansScore = IDL.Record({
    golfer2MulliganUsed: IDL.Bool,
    winner: PrincipalId,
    golfer1MulliganUsed: IDL.Bool,
    holeNumber: HoleNumber,
  });
  const GameScoreSubmission = IDL.Variant({
    MulligansScores: MulligansScore,
  });
  const AddGameScore = IDL.Record({
    submittedById: PrincipalId,
    gameId: GameId,
    detail: GameScoreSubmission,
  });
  const GolfClub = IDL.Variant({
    AW: IDL.Null,
    GW: IDL.Null,
    LW: IDL.Null,
    PW: IDL.Null,
    SW: IDL.Null,
    EIGHT_IRON: IDL.Null,
    TWO_HYBRID: IDL.Null,
    THREE_HYBRID: IDL.Null,
    TWO_IRON: IDL.Null,
    THREE_IRON: IDL.Null,
    FIVE_IRON: IDL.Null,
    THREE_WOOD: IDL.Null,
    FIVE_WOOD: IDL.Null,
    SIX_IRON: IDL.Null,
    FOUR_HYBRID: IDL.Null,
    DRIVER: IDL.Null,
    SEVEN_IRON: IDL.Null,
    NINE_IRON: IDL.Null,
    SEVEN_WOOD: IDL.Null,
    NINE_WOOD: IDL.Null,
    FOUR_IRON: IDL.Null,
    FIVE_HYBRID: IDL.Null,
  });
  const AddShot = IDL.Record({
    club: GolfClub,
    yardage: IDL.Nat,
    principalId: PrincipalId,
  });
  const BeginGame = IDL.Record({ gameId: GameId });
  const GolfCourseVersion = IDL.Nat8;
  const GameType = IDL.Variant({
    Mulligans: IDL.Null,
    BuildIt: IDL.Null,
    Bands: IDL.Null,
    NextUp: IDL.Null,
  });
  const GolfCourseId = IDL.Nat;
  const TeeInfo = IDL.Record({
    par: IDL.Nat8,
    name: IDL.Text,
    yardage: IDL.Nat,
    colour: IDL.Text,
    strokeIndex: IDL.Nat8,
  });
  const HoleImage = IDL.Record({
    owner: PrincipalId,
    uploaded: IDL.Int,
    image: IDL.Vec(IDL.Nat8),
  });
  const Hole = IDL.Record({
    name: IDL.Text,
    tees: IDL.Vec(TeeInfo),
    number: IDL.Nat8,
    images: IDL.Vec(HoleImage),
  });
  const TeeGroup = IDL.Record({
    added: IDL.Int,
    holes: IDL.Vec(Hole),
    name: IDL.Text,
    colour: IDL.Text,
    strokeIndex: IDL.Nat8,
  });
  const CreateGame = IDL.Record({
    name: IDL.Text,
    inviteIds: IDL.Vec(PrincipalId),
    createdById: PrincipalId,
    teeOffTime: IDL.Int,
    courseVersion: GolfCourseVersion,
    gameType: GameType,
    courseId: GolfCourseId,
    teeGroup: TeeGroup,
  });
  const Result_18 = IDL.Variant({ ok: GameId, err: Error });
  const Handicap = IDL.Int16;
  const CreateUser = IDL.Record({
    username: IDL.Text,
    profilePictureExtension: IDL.Opt(IDL.Text),
    profilePicture: IDL.Opt(IDL.Vec(IDL.Nat8)),
    handicap: IDL.Opt(Handicap),
  });
  const DeleteGame = IDL.Record({ gameId: GameId });
  const GolfShotId = IDL.Nat;
  const DeleteShot = IDL.Record({
    golfShotId: GolfShotId,
    principalId: PrincipalId,
  });
  const CreateGolfCourse = IDL.Record({
    holes: IDL.Vec(Hole),
    totalHoles: IDL.Nat8,
    name: IDL.Text,
    mainImageExtension: IDL.Text,
    initialTeeGroup: TeeGroup,
    founded: IDL.Int,
    bannerImage: IDL.Opt(IDL.Vec(IDL.Nat8)),
    mainImage: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const UpdateGolfCourse = IDL.Record({
    name: IDL.Text,
    updatedTeeGroup: IDL.Opt(TeeGroup),
    courseId: GolfCourseId,
  });
  const AppStatusDTO = IDL.Record({
    version: IDL.Text,
    onHold: IDL.Bool,
  });
  const Result_17 = IDL.Variant({ ok: AppStatusDTO, err: Error });
  const GetBuzz = IDL.Record({ page: IDL.Nat, principalId: PrincipalId });
  const CourseInfo__1 = IDL.Record({
    course_name: IDL.Text,
    course_id: GolfCourseId,
    course_image: IDL.Vec(IDL.Nat8),
  });
  const PlayerFeedSummary__1 = IDL.Record({
    username: IDL.Text,
    profile_picture: IDL.Opt(IDL.Vec(IDL.Nat8)),
    principal_id: PrincipalId,
  });
  const MulligansResultInfo = IDL.Record({
    holesPlayed: IDL.Nat8,
    player2Wins: IDL.Bool,
    score: IDL.Int8,
    players: IDL.Vec(PlayerFeedSummary__1),
    gameOver: IDL.Bool,
    player1Wins: IDL.Bool,
  });
  const GolfTeamId = IDL.Nat;
  const TeamFeedSummary__1 = IDL.Record({
    team_image_extension: IDL.Text,
    team_id: GolfTeamId,
    team_image: IDL.Opt(IDL.Vec(IDL.Nat8)),
    team_name: IDL.Text,
    team_members: IDL.Vec(PrincipalId),
    captain_id: PrincipalId,
  });
  const BuildItResultInfo = IDL.Record({
    teams: IDL.Vec(TeamFeedSummary__1),
    scores: IDL.Tuple(GolfTeamId, IDL.Nat),
  });
  const BandsResultInfo = IDL.Record({
    holesPlayed: IDL.Nat8,
    players: IDL.Vec(PlayerFeedSummary__1),
    points: IDL.Tuple(PrincipalId, IDL.Nat),
  });
  const NextUpResultInfo = IDL.Record({
    holesPlayed: IDL.Nat8,
    players: IDL.Vec(PlayerFeedSummary__1),
    points: IDL.Tuple(PrincipalId, IDL.Nat),
  });
  const MatchResultInfo = IDL.Variant({
    Mulligans: MulligansResultInfo,
    BuildIt: BuildItResultInfo,
    Bands: BandsResultInfo,
    NextUp: NextUpResultInfo,
  });
  const GameInfo__1 = IDL.Record({
    game_id: GameId,
    game_date: IDL.Int,
    game_type: GameType,
  });
  const BuzzEntry = IDL.Record({
    course_info: CourseInfo__1,
    match_result: MatchResultInfo,
    game_info: GameInfo__1,
  });
  const Buzz = IDL.Record({
    total: IDL.Nat,
    page: IDL.Nat,
    pageSize: IDL.Nat,
    entries: IDL.Vec(BuzzEntry),
  });
  const Result_16 = IDL.Variant({ ok: Buzz, err: Error });
  const GetClubShots = IDL.Record({
    club: GolfClub,
    page: IDL.Nat,
    principalId: PrincipalId,
  });
  const GolfShot = IDL.Record({
    id: GolfShotId,
    hitOn: IDL.Int,
    club: GolfClub,
    yardage: IDL.Nat,
  });
  const ClubShots = IDL.Record({
    total: IDL.Nat,
    club: GolfClub,
    page: IDL.Nat,
    pageSize: IDL.Nat,
    entries: IDL.Vec(GolfShot),
  });
  const Result_15 = IDL.Variant({ ok: ClubShots, err: Error });
  const GetFriendRequests = IDL.Record({
    totalEntries: IDL.Nat,
    offset: IDL.Nat,
    limit: IDL.Nat,
    principalId: PrincipalId,
  });
  const FriendRequest = IDL.Record({
    requestTime: IDL.Int,
    principalId: PrincipalId,
  });
  const FriendRequests = IDL.Record({
    friendRequests: IDL.Vec(FriendRequest),
  });
  const Result_14 = IDL.Variant({ ok: FriendRequests, err: Error });
  const GetFriends = IDL.Record({
    totalEntries: IDL.Nat,
    offset: IDL.Nat,
    limit: IDL.Nat,
    principalId: PrincipalId,
  });
  const Friend = IDL.Record({ principalId: PrincipalId });
  const Friends = IDL.Record({ friendRequests: IDL.Vec(Friend) });
  const Result_13 = IDL.Variant({ ok: Friends, err: Error });
  const GetGame = IDL.Record({ gameId: GameId });
  const GameStatus = IDL.Variant({
    Unplayed: IDL.Null,
    Active: IDL.Null,
    Complete: IDL.Null,
  });
  const MulligansHoleResult = IDL.Record({
    golfer2MulliganUsed: IDL.Bool,
    winner: PrincipalId,
    golfer1MulliganUsed: IDL.Bool,
    holeNumber: HoleNumber,
  });
  const MulligansScores = IDL.Record({
    winner: PrincipalId,
    results: IDL.Vec(MulligansHoleResult),
    golfer2HolesWonCount: IDL.Nat8,
    golfer1HolesWonCount: IDL.Nat8,
  });
  const GameScoreDetail = IDL.Variant({ MulligansScores: MulligansScores });
  const MulligansPrediction = IDL.Record({});
  const BandsPrediction = IDL.Record({
    wontHitTreeOrBunkerStartHole: HoleNumber,
    underParStartHole: HoleNumber,
    golferId: PrincipalId,
    wontDoubleBogeyStartHole: HoleNumber,
    singlePutt2Of3GreensStartHole: HoleNumber,
    wontBogeyStartHole: HoleNumber,
    parOrUnderStartHole: HoleNumber,
    hit2Of3FairwaysStartHole: HoleNumber,
    hit2Of3GreensStartHole: HoleNumber,
    wontLoseBallStartHole: HoleNumber,
  });
  const GamePrediction = IDL.Variant({
    Mulligans: MulligansPrediction,
    BuildIt: IDL.Record({}),
    Bands: BandsPrediction,
    NextUp: IDL.Record({}),
  });
  const GolfCourseSnapshot = IDL.Record({
    courseVersion: GolfCourseVersion,
    courseId: GolfCourseId,
    teeGroup: TeeGroup,
  });
  const GolfEvent = IDL.Variant({
    Par: IDL.Null,
    Scrub: IDL.Null,
    DoubleBogey: IDL.Null,
    Birdie: IDL.Null,
    BallNotLost: IDL.Null,
    Bogey: IDL.Null,
    HitFairway: IDL.Null,
    Albatross: IDL.Null,
    HitBunker: IDL.Null,
    HitTree: IDL.Null,
    HitGreen: IDL.Null,
    TakeMulligan: IDL.Null,
    HitWater: IDL.Null,
    LongestDrive: IDL.Null,
    Eagle: IDL.Null,
    OnePuttGreen: IDL.Null,
  });
  const GolferEvent = IDL.Record({
    golferId: PrincipalId,
    hole: HoleNumber,
    event: GolfEvent,
  });
  const Game = IDL.Record({
    id: GameId,
    playerIds: IDL.Vec(PrincipalId),
    status: GameStatus,
    scoreDetail: IDL.Opt(GameScoreDetail),
    invites: IDL.Vec(PrincipalId),
    predictions: IDL.Vec(GamePrediction),
    winner: PrincipalId,
    teeOffTime: IDL.Int,
    courseSnapshot: GolfCourseSnapshot,
    events: IDL.Vec(GolferEvent),
    gameType: GameType,
    courseId: GolfCourseId,
  });
  const Result_12 = IDL.Variant({ ok: Game, err: Error });
  const GetGameInvites = IDL.Record({ principalId: PrincipalId });
  const GameInvite__1 = IDL.Record({
    invited: PrincipalId,
    gameId: GameId,
    sentBy: PrincipalId,
    sentOn: IDL.Int,
  });
  const GameInvites = IDL.Record({
    total: IDL.Nat,
    page: IDL.Nat,
    pageSize: IDL.Nat,
    entries: IDL.Vec(GameInvite__1),
  });
  const Result_11 = IDL.Variant({ ok: GameInvites, err: Error });
  const GetGameSummaries = IDL.Record({
    page: IDL.Nat,
    principalId: PrincipalId,
  });
  const GameSummary = IDL.Record({
    id: GameId,
    status: GameStatus,
    date: IDL.Int,
    players: IDL.Vec(PrincipalId),
    gameType: GameType,
  });
  const GameSummaries = IDL.Record({
    total: IDL.Nat,
    page: IDL.Nat,
    pageSize: IDL.Nat,
    entries: IDL.Vec(GameSummary),
  });
  const Result_10 = IDL.Variant({ ok: GameSummaries, err: Error });
  const GetGolfCourse = IDL.Record({ id: GolfCourseId });
  const GolfCourse = IDL.Record({
    id: GolfCourseId,
    totalHoles: IDL.Nat8,
    activeVersion: GolfCourseVersion,
    name: IDL.Text,
    tees: IDL.Vec(TeeGroup),
    mainImageExtension: IDL.Text,
    founded: IDL.Int,
    mainImage: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const Result_9 = IDL.Variant({ ok: GolfCourse, err: Error });
  const GetGolfCourseCanisterId = IDL.Record({ id: GolfCourseId });
  const CanisterId = IDL.Text;
  const GolfCourseCanisterId = IDL.Record({ canisterId: CanisterId });
  const Result_8 = IDL.Variant({ ok: GolfCourseCanisterId, err: Error });
  const GetGolfCourses = IDL.Record({
    page: IDL.Nat,
    searchTerm: IDL.Text,
    principalId: PrincipalId,
  });
  const GolfCourseSummary = IDL.Record({
    id: GolfCourseId,
    name: IDL.Text,
    mainImageExtension: IDL.Text,
    founded: IDL.Int,
    mainImage: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const GolfCourses = IDL.Record({
    total: IDL.Nat,
    page: IDL.Nat,
    pageSize: IDL.Nat,
    entries: IDL.Vec(GolfCourseSummary),
  });
  const Result_7 = IDL.Variant({ ok: GolfCourses, err: Error });
  const GetGolfer = IDL.Record({ principalId: PrincipalId });
  const GameInvite = IDL.Record({
    gameId: GameId,
    inviteFrom: PrincipalId,
  });
  const Golfer = IDL.Record({
    username: IDL.Text,
    gameInvites: IDL.Vec(GameInvite),
    joinedOn: IDL.Int,
    upcomingGames: IDL.Vec(GameId),
    homeCourse: IDL.Text,
    homeCourseId: IDL.Opt(GolfCourseId),
    golferPicture: IDL.Opt(IDL.Vec(IDL.Nat8)),
    completedGames: IDL.Vec(GameId),
    handicap: IDL.Opt(Handicap),
    lastName: IDL.Text,
    golferPictureExtension: IDL.Text,
    principalId: PrincipalId,
    activeGames: IDL.Vec(GameId),
    homeCourseImage: IDL.Opt(IDL.Vec(IDL.Nat8)),
    firstName: IDL.Text,
  });
  const Result_6 = IDL.Variant({ ok: Golfer, err: Error });
  const GetGolfers = IDL.Record({
    page: IDL.Nat,
    searchTerm: IDL.Text,
    principalId: PrincipalId,
  });
  const GolferSummary = IDL.Record({
    name: IDL.Text,
    joinedOn: IDL.Int,
    profilePictureExtension: IDL.Text,
    profilePicture: IDL.Opt(IDL.Vec(IDL.Nat8)),
    handicap: IDL.Opt(Handicap),
    principalId: PrincipalId,
  });
  const Golfers = IDL.Record({
    total: IDL.Nat,
    page: IDL.Nat,
    pageSize: IDL.Nat,
    entries: IDL.Vec(GolferSummary),
  });
  const Result_5 = IDL.Variant({ ok: Golfers, err: Error });
  const GetProfile = IDL.Record({ principalId: PrincipalId });
  const Profile = IDL.Record({
    username: IDL.Text,
    homeCourseId: IDL.Opt(GolfCourseId),
    golferPicture: IDL.Opt(IDL.Vec(IDL.Nat8)),
    handicap: IDL.Opt(Handicap),
    lastName: IDL.Text,
    golferPictureExtension: IDL.Text,
    principalId: PrincipalId,
    firstName: IDL.Text,
  });
  const Result_4 = IDL.Variant({ ok: Profile, err: Error });
  const GetShotAverages = IDL.Record({ principalId: PrincipalId });
  const AverageShot = IDL.Record({
    club: GolfClub,
    yardage: IDL.Nat,
    index: IDL.Nat8,
  });
  const ShotAverages = IDL.Record({ shots: IDL.Vec(AverageShot) });
  const Result_3 = IDL.Variant({ ok: ShotAverages, err: Error });
  const GetUpcomingGames = IDL.Record({
    page: IDL.Nat,
    principalId: PrincipalId,
  });
  const CourseInfo = IDL.Record({
    course_name: IDL.Text,
    course_id: GolfCourseId,
    course_image: IDL.Vec(IDL.Nat8),
  });
  const PlayerFeedSummary = IDL.Record({
    username: IDL.Text,
    profile_picture: IDL.Opt(IDL.Vec(IDL.Nat8)),
    principal_id: PrincipalId,
  });
  const PlayerOpponentInfo = IDL.Record({
    players: IDL.Vec(PlayerFeedSummary),
  });
  const TeamFeedSummary = IDL.Record({
    team_image_extension: IDL.Text,
    team_id: GolfTeamId,
    team_image: IDL.Opt(IDL.Vec(IDL.Nat8)),
    team_name: IDL.Text,
    team_members: IDL.Vec(PrincipalId),
    captain_id: PrincipalId,
  });
  const TeamOpponentInfo = IDL.Record({ teams: IDL.Vec(TeamFeedSummary) });
  const OpponentInfo = IDL.Variant({
    Mulligans: PlayerOpponentInfo,
    BuildIt: TeamOpponentInfo,
    Bands: PlayerOpponentInfo,
    NextUp: PlayerOpponentInfo,
  });
  const GameInfo = IDL.Record({
    game_id: GameId,
    game_date: IDL.Int,
    game_type: GameType,
  });
  const UpcomingGame = IDL.Record({
    course_info: CourseInfo,
    opponent_info: OpponentInfo,
    game_info: GameInfo,
  });
  const UpcomingGames = IDL.Record({
    page: IDL.Nat,
    entries: IDL.Vec(UpcomingGame),
  });
  const Result_2 = IDL.Variant({ ok: UpcomingGames, err: Error });
  const InviteGolfers = IDL.Record({
    gameId: GameId,
    invitedGolferIds: IDL.Vec(PrincipalId),
  });
  const IsUsernameAvailable = IDL.Record({
    username: IDL.Text,
    principalId: PrincipalId,
  });
  const UsernameAvailable = IDL.Bool;
  const Result_1 = IDL.Variant({ ok: UsernameAvailable, err: Error });
  const PredictGame = IDL.Record({ gameId: GameId });
  const RejectFriendRequest = IDL.Record({
    principalId: PrincipalId,
    requestedBy: PrincipalId,
  });
  const RejectGameInvite = IDL.Record({
    rejectedById: PrincipalId,
    gameId: GameId,
  });
  const RemoveFriend = IDL.Record({
    principalId: PrincipalId,
    requestedBy: PrincipalId,
  });
  const SendFriendRequest = IDL.Record({
    requestedFriend: PrincipalId,
    principalId: PrincipalId,
  });
  const UpdateFirstName = IDL.Record({
    principalId: PrincipalId,
    firstName: IDL.Text,
  });
  const UpdateHandicap = IDL.Record({
    handicap: IDL.Opt(Handicap),
    principalId: PrincipalId,
  });
  const UpdateHomeCourse = IDL.Record({
    homeCourseId: IDL.Opt(GolfCourseId),
    principalId: PrincipalId,
  });
  const UpdateLastName = IDL.Record({
    lastName: IDL.Text,
    principalId: PrincipalId,
  });
  const UpdateProfilePicture = IDL.Record({
    profilePictureExtension: IDL.Text,
    profilePicture: IDL.Opt(IDL.Vec(IDL.Nat8)),
    principalId: PrincipalId,
  });
  const UpdateShot = IDL.Record({
    club: GolfClub,
    yardage: IDL.Nat,
    golfShotId: GolfShotId,
    principalId: PrincipalId,
  });
  const UpdateUsername = IDL.Record({
    username: IDL.Text,
    principalId: PrincipalId,
  });
  const RustResult = IDL.Variant({ Ok: IDL.Text, Err: IDL.Text });
  return IDL.Service({
    acceptFriendRequest: IDL.Func([AcceptFriendRequest], [Result], []),
    acceptGameInvite: IDL.Func([AcceptGameInvite], [Result], []),
    addGameScore: IDL.Func([AddGameScore], [Result], []),
    addShot: IDL.Func([AddShot], [Result], []),
    beginGame: IDL.Func([BeginGame], [Result], []),
    createGame: IDL.Func([CreateGame], [Result_18], []),
    createUser: IDL.Func([CreateUser], [Result], []),
    deleteGame: IDL.Func([DeleteGame], [Result], []),
    deleteShot: IDL.Func([DeleteShot], [Result], []),
    executeAddGolfCourse: IDL.Func([CreateGolfCourse], [], []),
    executeUpdateGolfCourse: IDL.Func([UpdateGolfCourse], [], []),
    getAppStatus: IDL.Func([], [Result_17], ["query"]),
    getBuzz: IDL.Func([GetBuzz], [Result_16], []),
    getClubShots: IDL.Func([GetClubShots], [Result_15], []),
    getFriendRequests: IDL.Func([GetFriendRequests], [Result_14], []),
    getFriends: IDL.Func([GetFriends], [Result_13], []),
    getGame: IDL.Func([GetGame], [Result_12], []),
    getGameInvites: IDL.Func([GetGameInvites], [Result_11], []),
    getGameSummaries: IDL.Func([GetGameSummaries], [Result_10], []),
    getGolfCourse: IDL.Func([GetGolfCourse], [Result_9], []),
    getGolfCourseCanisterId: IDL.Func(
      [GetGolfCourseCanisterId],
      [Result_8],
      [],
    ),
    getGolfCourses: IDL.Func([GetGolfCourses], [Result_7], []),
    getGolfer: IDL.Func([GetGolfer], [Result_6], []),
    getGolfers: IDL.Func([GetGolfers], [Result_5], []),
    getProfile: IDL.Func([GetProfile], [Result_4], []),
    getShotAverages: IDL.Func([GetShotAverages], [Result_3], []),
    getUpcomingGames: IDL.Func([GetUpcomingGames], [Result_2], []),
    inviteGolfers: IDL.Func([InviteGolfers], [Result], []),
    isUsernameAvailable: IDL.Func([IsUsernameAvailable], [Result_1], ["query"]),
    predictGame: IDL.Func([PredictGame], [Result], []),
    rejectFriendRequest: IDL.Func([RejectFriendRequest], [Result], []),
    rejectGameInvite: IDL.Func([RejectGameInvite], [Result], []),
    removeFriend: IDL.Func([RemoveFriend], [Result], []),
    sendFriendRequest: IDL.Func([SendFriendRequest], [Result], []),
    updateFirstName: IDL.Func([UpdateFirstName], [Result], []),
    updateHandicap: IDL.Func([UpdateHandicap], [Result], []),
    updateHomeCourse: IDL.Func([UpdateHomeCourse], [Result], []),
    updateLastName: IDL.Func([UpdateLastName], [Result], []),
    updateProfilePicture: IDL.Func([UpdateProfilePicture], [Result], []),
    updateShot: IDL.Func([UpdateShot], [Result], []),
    updateUsername: IDL.Func([UpdateUsername], [Result], []),
    validateAddGolfCourse: IDL.Func(
      [CreateGolfCourse],
      [RustResult],
      ["query"],
    ),
    validateUpdateGolfCourse: IDL.Func(
      [UpdateGolfCourse],
      [RustResult],
      ["query"],
    ),
  });
};
export const init = ({ IDL }) => {
  return [];
};
