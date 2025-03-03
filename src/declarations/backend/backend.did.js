export const idlFactory = ({ IDL }) => {
  const GolferId = IDL.Text;
  const AcceptFriendRequestDTO = IDL.Record({ requestedBy: GolferId });
  const Error = IDL.Variant({
    InvalidProfilePicture: IDL.Null,
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
    PaymentError: IDL.Null,
    CanisterFull: IDL.Null,
  });
  const Result = IDL.Variant({ ok: IDL.Null, err: Error });
  const GameId = IDL.Nat;
  const AcceptGameInviteDTO = IDL.Record({
    gameId: GameId,
    acceptedById: GolferId,
  });
  const HoleNumber = IDL.Nat8;
  const MulligansScoreDTO = IDL.Record({
    golfer2MulliganUsed: IDL.Bool,
    winner: GolferId,
    golfer1MulliganUsed: IDL.Bool,
    holeNumber: HoleNumber,
  });
  const GameScoreSubmissionDTO = IDL.Variant({
    MulligansScores: MulligansScoreDTO,
  });
  const AddGameScoreDTO = IDL.Record({
    gameId: GameId,
    detail: GameScoreSubmissionDTO,
  });
  const BeginGameDTO = IDL.Record({ gameId: GameId });
  const GameType = IDL.Variant({
    Mulligans: IDL.Null,
    BuildIt: IDL.Null,
    Bands: IDL.Null,
    NextUp: IDL.Null,
    Prophet: IDL.Null,
  });
  const CourseType = IDL.Variant({
    Custom: IDL.Null,
    Official: IDL.Null,
  });
  const GolfCourseId = IDL.Nat;
  const CreateGameDTO = IDL.Record({
    inviteIds: IDL.Vec(GolferId),
    createdById: GolferId,
    teeOffTime: IDL.Int,
    gameType: GameType,
    courseType: CourseType,
    courseId: GolfCourseId,
    teeGroup: IDL.Text,
  });
  const TeeInfo = IDL.Record({
    par: IDL.Nat8,
    name: IDL.Text,
    yardage: IDL.Nat,
    colour: IDL.Text,
    strokeIndex: IDL.Nat8,
  });
  const CanisterId = IDL.Text;
  const ImageId = IDL.Nat;
  const Hole = IDL.Record({
    name: IDL.Text,
    tees: IDL.Vec(TeeInfo),
    number: IDL.Nat8,
    images: IDL.Vec(IDL.Tuple(CanisterId, ImageId)),
  });
  const TeeGroup = IDL.Record({
    added: IDL.Int,
    holes: IDL.Vec(Hole),
    name: IDL.Text,
    colour: IDL.Text,
    strokeIndex: IDL.Nat8,
  });
  const CreateGolfCourseDTO = IDL.Record({
    holes: IDL.Vec(Hole),
    name: IDL.Text,
    initialTeeGroup: TeeGroup,
  });
  const Handicap = IDL.Int16;
  const CreateGolferDTO = IDL.Record({
    username: IDL.Text,
    handicap: IDL.Opt(Handicap),
  });
  const DeleteGolfCourseDTO = IDL.Record({ courseId: GolfCourseId });
  const UpdateGolfCourseDTO = IDL.Record({
    name: IDL.Text,
    updatedTeeGroup: IDL.Opt(TeeGroup),
    courseId: GolfCourseId,
  });
  const AppStatusDTO = IDL.Record({
    version: IDL.Text,
    onHold: IDL.Bool,
  });
  const Result_10 = IDL.Variant({ ok: AppStatusDTO, err: Error });
  const GetGameDTO = IDL.Record({ gameId: GameId });
  const GameStatus = IDL.Variant({
    Unplayed: IDL.Null,
    Active: IDL.Null,
    Complete: IDL.Null,
  });
  const MulligansHoleResult = IDL.Record({
    golfer2MulliganUsed: IDL.Bool,
    winner: GolferId,
    golfer1MulliganUsed: IDL.Bool,
    holeNumber: HoleNumber,
  });
  const MulligansScores = IDL.Record({
    winner: GolferId,
    results: IDL.Vec(MulligansHoleResult),
    golfer2HolesWonCount: IDL.Nat8,
    golfer1HolesWonCount: IDL.Nat8,
  });
  const GameScoreDetail = IDL.Variant({ MulligansScores: MulligansScores });
  const MulligansPrediction = IDL.Record({});
  const BandsPrediction = IDL.Record({
    wontHitTreeOrBunkerStartHole: HoleNumber,
    underParStartHole: HoleNumber,
    golferId: GolferId,
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
  const GolfCourseVersion = IDL.Nat8;
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
    golferId: GolferId,
    hole: HoleNumber,
    event: GolfEvent,
  });
  const GameDTO = IDL.Record({
    id: GameId,
    playerIds: IDL.Vec(GolferId),
    status: GameStatus,
    scoreDetail: IDL.Opt(GameScoreDetail),
    invites: IDL.Vec(GolferId),
    predictions: IDL.Vec(GamePrediction),
    winner: GolferId,
    teeOffTime: IDL.Int,
    courseSnapshot: GolfCourseSnapshot,
    events: IDL.Vec(GolferEvent),
    gameType: GameType,
    courseId: GolfCourseId,
  });
  const Result_9 = IDL.Variant({ ok: GameDTO, err: Error });
  const GetGolferDTO = IDL.Record({ golferPrincipalId: GolferId });
  const GameInvite = IDL.Record({ gameId: GameId, inviteFrom: GolferId });
  const GolferDTO = IDL.Record({
    username: IDL.Text,
    gameInvites: IDL.Vec(GameInvite),
    upcomingGames: IDL.Vec(GameId),
    golferPicture: IDL.Opt(IDL.Vec(IDL.Nat8)),
    completedGames: IDL.Vec(GameId),
    handicap: IDL.Opt(Handicap),
    golferPictureExtension: IDL.Text,
    principalId: GolferId,
    activeGames: IDL.Vec(GameId),
  });
  const Result_8 = IDL.Variant({ ok: GolferDTO, err: Error });
  const PaginationFilters = IDL.Record({
    offset: IDL.Nat,
    limit: IDL.Nat,
  });
  const GolferBuzzDTO = IDL.Record({});
  const Result_7 = IDL.Variant({ ok: GolferBuzzDTO, err: Error });
  const GameSummary = IDL.Record({
    status: GameStatus,
    date: IDL.Int,
    players: IDL.Vec(GolferId),
    gameType: GameType,
  });
  const GolferGameSummariesDTO = IDL.Record({
    totalEntries: IDL.Nat,
    offset: IDL.Nat,
    limit: IDL.Nat,
    entries: IDL.Vec(GameSummary),
  });
  const Result_6 = IDL.Variant({
    ok: GolferGameSummariesDTO,
    err: Error,
  });
  const MyGolferDTO = IDL.Record({
    username: IDL.Text,
    golferPicture: IDL.Opt(IDL.Vec(IDL.Nat8)),
    handicap: IDL.Opt(Handicap),
    golferPictureExtension: IDL.Text,
    principalId: GolferId,
  });
  const Result_5 = IDL.Variant({ ok: MyGolferDTO, err: Error });
  const UpcomingGamesDTO = IDL.Record({});
  const Result_4 = IDL.Variant({ ok: UpcomingGamesDTO, err: Error });
  const GolfCourseDTO = IDL.Record({
    activeVersion: GolfCourseVersion,
    name: IDL.Text,
    tees: IDL.Vec(TeeGroup),
    courseId: GolfCourseId,
  });
  const CoursesDTO = IDL.Record({ courses: IDL.Vec(GolfCourseDTO) });
  const Result_3 = IDL.Variant({ ok: CoursesDTO, err: Error });
  const FriendRequestDTO = IDL.Record({
    requestTime: IDL.Int,
    principalId: GolferId,
  });
  const FriendRequestsDTO = IDL.Record({
    friendRequests: IDL.Vec(FriendRequestDTO),
  });
  const Result_2 = IDL.Variant({ ok: FriendRequestsDTO, err: Error });
  const ListGolfersDTO = IDL.Record({ searchTerm: IDL.Text });
  const GolferSummaryDTO = IDL.Record({
    golferPrincipalId: GolferId,
    golferPicture: IDL.Opt(IDL.Vec(IDL.Nat8)),
    golferName: IDL.Text,
    handicap: IDL.Opt(Handicap),
    golferPictureExtension: IDL.Text,
  });
  const GolfersDTO = IDL.Record({ golfers: IDL.Vec(GolferSummaryDTO) });
  const Result_1 = IDL.Variant({ ok: GolfersDTO, err: Error });
  const RejectFriendRequestDTO = IDL.Record({ requestedBy: GolferId });
  const UpdateGolferPictureDTO = IDL.Record({
    golferPicture: IDL.Vec(IDL.Nat8),
    golferPictureExtension: IDL.Text,
  });
  const SendFriendRequestDTO = IDL.Record({ requestedFriend: GolferId });
  const InviteGolfersDTO = IDL.Record({
    gameId: GameId,
    invitedGolferIds: IDL.Vec(GolferId),
  });
  const UpdateGolferDTO = IDL.Record({
    username: IDL.Text,
    handicap: IDL.Opt(Handicap),
  });
  const RustResult = IDL.Variant({ Ok: IDL.Text, Err: IDL.Text });
  return IDL.Service({
    acceptFriendRequest: IDL.Func([AcceptFriendRequestDTO], [Result], []),
    acceptGameInvite: IDL.Func([AcceptGameInviteDTO], [Result], []),
    addGameScore: IDL.Func([AddGameScoreDTO], [Result], []),
    beginGame: IDL.Func([BeginGameDTO], [Result], []),
    createGame: IDL.Func([CreateGameDTO], [Result], []),
    createGolfCourse: IDL.Func([CreateGolfCourseDTO], [Result], []),
    createGolfer: IDL.Func([CreateGolferDTO], [Result], []),
    deleteGolfCourse: IDL.Func([DeleteGolfCourseDTO], [Result], []),
    executeAddGolfCourse: IDL.Func([CreateGolfCourseDTO], [], []),
    executeUpdateGolfCourse: IDL.Func([UpdateGolfCourseDTO], [], []),
    getAppStatus: IDL.Func([], [Result_10], ["query"]),
    getGame: IDL.Func([GetGameDTO], [Result_9], []),
    getGolfer: IDL.Func([GetGolferDTO], [Result_8], []),
    getGolferBuzz: IDL.Func([PaginationFilters], [Result_7], []),
    getGolferGameHistory: IDL.Func([PaginationFilters], [Result_6], []),
    getMyGolfer: IDL.Func([], [Result_5], []),
    getUpcomingGames: IDL.Func([PaginationFilters], [Result_4], []),
    listCourses: IDL.Func([PaginationFilters], [Result_3], []),
    listFriendRequests: IDL.Func([PaginationFilters], [Result_2], []),
    listGolfers: IDL.Func([ListGolfersDTO], [Result_1], []),
    rejectFriendRequest: IDL.Func([RejectFriendRequestDTO], [Result], []),
    saveGolferPicture: IDL.Func([UpdateGolferPictureDTO], [Result], []),
    sendFriendRequest: IDL.Func([SendFriendRequestDTO], [Result], []),
    sendGameInvites: IDL.Func([InviteGolfersDTO], [Result], []),
    updateGolfCourse: IDL.Func([UpdateGolfCourseDTO], [Result], []),
    updateGolfer: IDL.Func([UpdateGolferDTO], [Result], []),
    validateAddGolfCourse: IDL.Func(
      [CreateGolfCourseDTO],
      [RustResult],
      ["query"],
    ),
    validateUpdateGolfCourse: IDL.Func(
      [UpdateGolfCourseDTO],
      [RustResult],
      ["query"],
    ),
  });
};
export const init = ({ IDL }) => {
  return [];
};
