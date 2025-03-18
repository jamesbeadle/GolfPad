export const idlFactory = ({ IDL }) => {
  const PrincipalId = IDL.Text;
  const AcceptFriendRequest = IDL.Record({
    principalId: PrincipalId,
    requestedBy: PrincipalId,
  });
  const Error = IDL.Variant({
    DecodeError: IDL.Null,
    TooLong: IDL.Null,
    NotAllowed: IDL.Null,
    NotEnoughFunds: IDL.Null,
    TooShort: IDL.Null,
    NotFound: IDL.Null,
    NotAuthorized: IDL.Null,
    AlreadyExists: IDL.Null,
    CreateGameError: IDL.Null,
    OutOfRange: IDL.Null,
    InvalidPicture: IDL.Null,
    PaymentError: IDL.Null,
    CanisterFull: IDL.Null,
    InEligible: IDL.Null,
  });
  const Result = IDL.Variant({ ok: IDL.Null, err: Error });
  const GameId = IDL.Nat;
  const AcceptGameInvite = IDL.Record({
    gameId: GameId,
    acceptedById: PrincipalId,
  });
  const HoleNumber = IDL.Nat8;
  const BandsCategory = IDL.Variant({
    NoLostBall: IDL.Null,
    NoDoubleBogeyOrWorse: IDL.Null,
    ParOrBetter: IDL.Null,
    UnderPar: IDL.Null,
    OnePutt2Of3Greens: IDL.Null,
    NoBogeyOrWorse: IDL.Null,
    NoTreeOrBunker: IDL.Null,
    Hit2Of3Fairways: IDL.Null,
    Hit2Of3Greens: IDL.Null,
  });
  const BandsHoleResult = IDL.Record({
    golferId: PrincipalId,
    completed: IDL.Bool,
    category: BandsCategory,
    failed: IDL.Bool,
  });
  const BandsScore = IDL.Record({
    hole: HoleNumber,
    playerResults: IDL.Vec(BandsHoleResult),
  });
  const MulligansScore = IDL.Record({
    golfer2MulliganUsed: IDL.Bool,
    hole: HoleNumber,
    winner: PrincipalId,
    golfer1MulliganUsed: IDL.Bool,
  });
  const GameScoreSubmission = IDL.Variant({
    BandsScores: BandsScore,
    MulligansScores: MulligansScore,
  });
  const AddGameScore = IDL.Record({
    submittedById: PrincipalId,
    gameId: GameId,
    detail: GameScoreSubmission,
    holeNumber: HoleNumber,
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
  const MembershipType = IDL.Variant({
    NotClaimed: IDL.Null,
    Seasonal: IDL.Null,
    Lifetime: IDL.Null,
    Monthly: IDL.Null,
    Expired: IDL.Null,
  });
  const MembershipClaim = IDL.Record({
    expiresOn: IDL.Opt(IDL.Int),
    claimedOn: IDL.Int,
    membershipType: MembershipType,
  });
  const Result_24 = IDL.Variant({ ok: MembershipClaim, err: Error });
  const TeeGroupIndex = IDL.Nat8;
  const GolfCourseVersion = IDL.Nat8;
  const GameType = IDL.Variant({ Mulligans: IDL.Null, Bands: IDL.Null });
  const GolfCourseId = IDL.Nat;
  const CreateGame = IDL.Record({
    inviteIds: IDL.Vec(PrincipalId),
    createdById: PrincipalId,
    teeOffTime: IDL.Int,
    teeGroupIndex: TeeGroupIndex,
    courseVersion: GolfCourseVersion,
    gameType: GameType,
    courseId: GolfCourseId,
  });
  const Result_23 = IDL.Variant({ ok: GameId, err: Error });
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
  const HoleImage = IDL.Record({
    owner: PrincipalId,
    uploaded: IDL.Int,
    image: IDL.Vec(IDL.Nat8),
  });
  const Hole = IDL.Record({
    par: IDL.Nat8,
    name: IDL.Text,
    yardage: IDL.Nat,
    number: IDL.Nat8,
    colour: IDL.Text,
    strokeIndex: IDL.Nat8,
    images: IDL.Vec(HoleImage),
  });
  const CountryId = IDL.Nat8;
  const TeeGroup = IDL.Record({
    added: IDL.Int,
    holes: IDL.Vec(Hole),
    name: IDL.Text,
    index: TeeGroupIndex,
    colour: IDL.Text,
  });
  const CreateGolfCourse = IDL.Record({
    holes: IDL.Vec(Hole),
    totalHoles: IDL.Nat8,
    name: IDL.Text,
    countryId: CountryId,
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
  const Result_22 = IDL.Variant({ ok: AppStatusDTO, err: Error });
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
  const BandsResultInfo = IDL.Record({
    holesPlayed: IDL.Nat8,
    players: IDL.Vec(PlayerFeedSummary__1),
    points: IDL.Tuple(PrincipalId, IDL.Nat),
  });
  const MatchResultInfo = IDL.Variant({
    Mulligans: MulligansResultInfo,
    Bands: BandsResultInfo,
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
  const Result_21 = IDL.Variant({ ok: Buzz, err: Error });
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
  const Result_20 = IDL.Variant({ ok: ClubShots, err: Error });
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
  const Result_19 = IDL.Variant({ ok: FriendRequests, err: Error });
  const GetFriends = IDL.Record({
    page: IDL.Nat,
    principalId: PrincipalId,
  });
  const Friend = IDL.Record({
    username: IDL.Text,
    profilePicture: IDL.Opt(IDL.Vec(IDL.Nat8)),
    lastName: IDL.Text,
    principalId: PrincipalId,
    firstName: IDL.Text,
  });
  const Friends = IDL.Record({
    total: IDL.Nat,
    page: IDL.Nat,
    pageSize: IDL.Nat,
    friends: IDL.Vec(Friend),
  });
  const Result_18 = IDL.Variant({ ok: Friends, err: Error });
  const GetGame = IDL.Record({ gameId: GameId });
  const GameStatus = IDL.Variant({
    Unplayed: IDL.Null,
    Active: IDL.Null,
    Complete: IDL.Null,
  });
  const BandsCategoryResult = IDL.Record({
    completed: IDL.Bool,
    bandsCategory: BandsCategory,
  });
  const BandsPlayerResult = IDL.Record({
    categories: IDL.Vec(BandsCategoryResult),
    principalId: PrincipalId,
    points: IDL.Nat8,
  });
  const BandsScores = IDL.Record({
    currentHole: IDL.Nat8,
    players: IDL.Vec(BandsPlayerResult),
  });
  const MulligansHoleResult = IDL.Record({
    golfer2MulliganUsed: IDL.Bool,
    winner: PrincipalId,
    score: IDL.Int,
    golfer1MulliganUsed: IDL.Bool,
    holeNumber: HoleNumber,
  });
  const MulligansScores = IDL.Record({
    winner: PrincipalId,
    results: IDL.Vec(MulligansHoleResult),
    score: IDL.Int,
    currentHole: IDL.Nat8,
    golfer2MulligansUsed: IDL.Nat8,
    golfer2HolesWonCount: IDL.Nat8,
    golfer1MulligansAvailable: IDL.Nat8,
    golfer2MulligansAvailable: IDL.Nat8,
    golfer1MulligansUsed: IDL.Nat8,
    golfer1HolesWonCount: IDL.Nat8,
  });
  const GameScoreDetail = IDL.Variant({
    BandsScores: BandsScores,
    MulligansScores: MulligansScores,
  });
  const BandsPrediction__1 = IDL.Record({
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
  const GamePrediction__1 = IDL.Variant({
    Mulligans: IDL.Record({}),
    Bands: BandsPrediction__1,
  });
  const GolfCourseSnapshot = IDL.Record({
    teeGroupIndex: TeeGroupIndex,
    courseVersion: GolfCourseVersion,
    courseId: GolfCourseId,
  });
  const Game = IDL.Record({
    id: GameId,
    playerIds: IDL.Vec(PrincipalId),
    status: GameStatus,
    scoreDetail: IDL.Opt(GameScoreDetail),
    invites: IDL.Vec(PrincipalId),
    predictions: IDL.Vec(GamePrediction__1),
    winner: PrincipalId,
    teeOffTime: IDL.Int,
    courseSnapshot: GolfCourseSnapshot,
    gameType: GameType,
    courseId: GolfCourseId,
  });
  const Result_17 = IDL.Variant({ ok: Game, err: Error });
  const GetGameGolferSummaries = IDL.Record({ gameId: GameId });
  const GolfCourseSummary = IDL.Record({
    id: GolfCourseId,
    name: IDL.Text,
    countryId: CountryId,
    version: GolfCourseVersion,
    mainImageExtension: IDL.Text,
    founded: IDL.Int,
    mainImage: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const GolferSummary = IDL.Record({
    name: IDL.Text,
    joinedOn: IDL.Int,
    homeCourse: IDL.Opt(GolfCourseSummary),
    profilePictureExtension: IDL.Text,
    profilePicture: IDL.Opt(IDL.Vec(IDL.Nat8)),
    handicap: IDL.Opt(Handicap),
    principalId: PrincipalId,
  });
  const GameGolferSummaries = IDL.Record({
    entries: IDL.Vec(GolferSummary),
  });
  const Result_16 = IDL.Variant({ ok: GameGolferSummaries, err: Error });
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
  const Result_15 = IDL.Variant({ ok: GameInvites, err: Error });
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
  const Result_14 = IDL.Variant({ ok: GameSummaries, err: Error });
  const GetGolfCourse = IDL.Record({ id: GolfCourseId });
  const HoleSummary = IDL.Record({
    par: IDL.Nat8,
    name: IDL.Text,
    yardage: IDL.Nat,
    number: IDL.Nat8,
    colour: IDL.Text,
    strokeIndex: IDL.Nat8,
  });
  const GolfCourseTeeGroup = IDL.Record({
    added: IDL.Int,
    holes: IDL.Vec(HoleSummary),
    totalHoles: IDL.Nat8,
    golfCourseId: GolfCourseId,
    name: IDL.Text,
    index: TeeGroupIndex,
    colour: IDL.Text,
    mainImage: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const GolfCourse = IDL.Record({
    id: GolfCourseId,
    totalHoles: IDL.Nat8,
    activeVersion: GolfCourseVersion,
    name: IDL.Text,
    tees: IDL.Vec(GolfCourseTeeGroup),
    countryId: CountryId,
    mainImageExtension: IDL.Text,
    founded: IDL.Int,
    mainImage: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const Result_13 = IDL.Variant({ ok: GolfCourse, err: Error });
  const GetGolfCourseCanisterId = IDL.Record({ id: GolfCourseId });
  const CanisterId = IDL.Text;
  const GolfCourseCanisterId = IDL.Record({ canisterId: CanisterId });
  const Result_12 = IDL.Variant({ ok: GolfCourseCanisterId, err: Error });
  const GetGolfCourseSummary = IDL.Record({ id: GolfCourseId });
  const Result_11 = IDL.Variant({ ok: GolfCourseSummary, err: Error });
  const GetGolfCourseTeeGroup = IDL.Record({
    id: GolfCourseId,
    index: TeeGroupIndex,
  });
  const Result_10 = IDL.Variant({ ok: GolfCourseTeeGroup, err: Error });
  const GetGolfCourseTees = IDL.Record({ golfCourseId: GolfCourseId });
  const GolfCourseTees = IDL.Record({
    id: GolfCourseId,
    tees: IDL.Vec(TeeGroup),
  });
  const Result_9 = IDL.Variant({ ok: GolfCourseTees, err: Error });
  const GetGolfCourses = IDL.Record({
    page: IDL.Nat,
    searchTerm: IDL.Text,
    principalId: PrincipalId,
  });
  const GolfCourses = IDL.Record({
    total: IDL.Nat,
    page: IDL.Nat,
    pageSize: IDL.Nat,
    entries: IDL.Vec(GolfCourseSummary),
  });
  const Result_8 = IDL.Variant({ ok: GolfCourses, err: Error });
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
  const Result_7 = IDL.Variant({ ok: Golfer, err: Error });
  const GetGolfers = IDL.Record({
    page: IDL.Nat,
    searchTerm: IDL.Text,
    principalId: PrincipalId,
  });
  const Golfers = IDL.Record({
    total: IDL.Nat,
    page: IDL.Nat,
    pageSize: IDL.Nat,
    entries: IDL.Vec(GolferSummary),
  });
  const Result_6 = IDL.Variant({ ok: Golfers, err: Error });
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
  const Result_5 = IDL.Variant({ ok: Profile, err: Error });
  const GetShotAverages = IDL.Record({ principalId: PrincipalId });
  const AverageShot = IDL.Record({
    club: GolfClub,
    yardage: IDL.Nat,
    index: IDL.Nat8,
  });
  const ShotAverages = IDL.Record({ shots: IDL.Vec(AverageShot) });
  const Result_4 = IDL.Variant({ ok: ShotAverages, err: Error });
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
  const OpponentInfo = IDL.Variant({
    Mulligans: PlayerOpponentInfo,
    Bands: PlayerOpponentInfo,
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
  const Result_3 = IDL.Variant({ ok: UpcomingGames, err: Error });
  const GetUserFavouriteCourses = IDL.Record({
    searchTerm: IDL.Text,
    principalId: PrincipalId,
  });
  const FavouriteCourse = IDL.Record({
    id: GolfCourseId,
    name: IDL.Text,
    mainImageExtension: IDL.Text,
    mainImage: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const UserFavouriteCourses = IDL.Record({
    total: IDL.Nat,
    page: IDL.Nat,
    pageSize: IDL.Nat,
    entries: IDL.Vec(FavouriteCourse),
  });
  const Result_2 = IDL.Variant({ ok: UserFavouriteCourses, err: Error });
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
    Mulligans: IDL.Record({}),
    Bands: BandsPrediction,
  });
  const PredictGameScore = IDL.Record({
    submittedById: PrincipalId,
    gameId: GameId,
    detail: GamePrediction,
  });
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
  const RemoveUserGolfCourse = IDL.Record({
    golfCourseId: GolfCourseId,
    principalId: PrincipalId,
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
    claimMembership: IDL.Func([], [Result_24], []),
    createGame: IDL.Func([CreateGame], [Result_23], []),
    createUser: IDL.Func([CreateUser], [Result], []),
    deleteGame: IDL.Func([DeleteGame], [Result], []),
    deleteShot: IDL.Func([DeleteShot], [Result], []),
    executeAddGolfCourse: IDL.Func([CreateGolfCourse], [], []),
    executeUpdateGolfCourse: IDL.Func([UpdateGolfCourse], [], []),
    getAppStatus: IDL.Func([], [Result_22], ["query"]),
    getBuzz: IDL.Func([GetBuzz], [Result_21], []),
    getClubShots: IDL.Func([GetClubShots], [Result_20], []),
    getFriendRequests: IDL.Func([GetFriendRequests], [Result_19], []),
    getFriends: IDL.Func([GetFriends], [Result_18], []),
    getGame: IDL.Func([GetGame], [Result_17], []),
    getGameGolferSummaries: IDL.Func([GetGameGolferSummaries], [Result_16], []),
    getGameInvites: IDL.Func([GetGameInvites], [Result_15], []),
    getGameSummaries: IDL.Func([GetGameSummaries], [Result_14], []),
    getGolfCourse: IDL.Func([GetGolfCourse], [Result_13], []),
    getGolfCourseCanisterId: IDL.Func(
      [GetGolfCourseCanisterId],
      [Result_12],
      [],
    ),
    getGolfCourseSummary: IDL.Func([GetGolfCourseSummary], [Result_11], []),
    getGolfCourseTeeGroup: IDL.Func([GetGolfCourseTeeGroup], [Result_10], []),
    getGolfCourseTees: IDL.Func([GetGolfCourseTees], [Result_9], []),
    getGolfCourses: IDL.Func([GetGolfCourses], [Result_8], []),
    getGolfer: IDL.Func([GetGolfer], [Result_7], []),
    getGolfers: IDL.Func([GetGolfers], [Result_6], []),
    getProfile: IDL.Func([GetProfile], [Result_5], []),
    getShotAverages: IDL.Func([GetShotAverages], [Result_4], []),
    getUpcomingGames: IDL.Func([GetUpcomingGames], [Result_3], []),
    getUserFavouriteCourses: IDL.Func(
      [GetUserFavouriteCourses],
      [Result_2],
      [],
    ),
    inviteGolfers: IDL.Func([InviteGolfers], [Result], []),
    isUsernameAvailable: IDL.Func([IsUsernameAvailable], [Result_1], ["query"]),
    predictGameScore: IDL.Func([PredictGameScore], [Result], []),
    rejectFriendRequest: IDL.Func([RejectFriendRequest], [Result], []),
    rejectGameInvite: IDL.Func([RejectGameInvite], [Result], []),
    removeFriend: IDL.Func([RemoveFriend], [Result], []),
    removeUserGolfCourse: IDL.Func([RemoveUserGolfCourse], [Result], []),
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
