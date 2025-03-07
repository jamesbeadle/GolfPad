export const idlFactory = ({ IDL }) => {
  const GolferId = IDL.Text;
  const AcceptFriendRequest = IDL.Record({
    principalId: GolferId,
    requestedBy: GolferId,
  });
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
  const AcceptGameInvite = IDL.Record({
    gameId: GameId,
    acceptedById: GolferId,
  });
  const HoleNumber = IDL.Nat8;
  const MulligansScore = IDL.Record({
    golfer2MulliganUsed: IDL.Bool,
    winner: GolferId,
    golfer1MulliganUsed: IDL.Bool,
    holeNumber: HoleNumber,
  });
  const GameScoreSubmission = IDL.Variant({
    MulligansScores: MulligansScore,
  });
  const AddGameScore = IDL.Record({
    submittedById: GolferId,
    gameId: GameId,
    detail: GameScoreSubmission,
  });
  const PrincipalId = IDL.Text;
  const AddShot = IDL.Record({ principalId: PrincipalId });
  const BeginGame = IDL.Record({ gameId: GameId });
  const GolfCourseVersion = IDL.Nat8;
  const GameType = IDL.Variant({
    Mulligans: IDL.Null,
    BuildIt: IDL.Null,
    Bands: IDL.Null,
    NextUp: IDL.Null,
    Prophet: IDL.Null,
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
    owner: GolferId,
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
    inviteIds: IDL.Vec(GolferId),
    createdById: GolferId,
    teeOffTime: IDL.Int,
    courseVersion: GolfCourseVersion,
    gameType: GameType,
    courseId: GolfCourseId,
    teeGroup: TeeGroup,
  });
  const Result_16 = IDL.Variant({ ok: GameId, err: Error });
  const CreateGolfChannel = IDL.Record({
    name: IDL.Text,
    createdById: GolferId,
  });
  const GolfChannelId = IDL.Nat;
  const Result_15 = IDL.Variant({ ok: GolfChannelId, err: Error });
  const Handicap = IDL.Int16;
  const CreateUser = IDL.Record({
    username: IDL.Text,
    profilePictureExtension: IDL.Opt(IDL.Text),
    profilePicture: IDL.Opt(IDL.Vec(IDL.Nat8)),
    handicap: IDL.Opt(Handicap),
  });
  const DeleteGame = IDL.Record({ gameId: GameId });
  const DeleteGolfChannel = IDL.Record({ channelId: GolfChannelId });
  const CreateGolfCourse = IDL.Record({
    holes: IDL.Vec(Hole),
    name: IDL.Text,
    initialTeeGroup: TeeGroup,
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
  const Result_14 = IDL.Variant({ ok: AppStatusDTO, err: Error });
  const GetGame = IDL.Record({ gameId: GameId });
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
  const Game = IDL.Record({
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
  const Result_13 = IDL.Variant({ ok: Game, err: Error });
  const GetGolfChannel = IDL.Record({ channelId: GolfChannelId });
  const GolfChannel = IDL.Record({
    channelId: GolfChannelId,
    name: IDL.Text,
  });
  const Result_12 = IDL.Variant({ ok: GolfChannel, err: Error });
  const GetGolfChannelVideo = IDL.Record({ channelId: GolfChannelId });
  const GolfChannelVideo = IDL.Record({ channelId: GolfChannelId });
  const Result_11 = IDL.Variant({ ok: GolfChannelVideo, err: Error });
  const GetGolfChannelVideos = IDL.Record({
    channelId: GolfChannelId,
    page: IDL.Nat,
  });
  const GolfChannelVideos = IDL.Record({ channelId: GolfChannelId });
  const Result_10 = IDL.Variant({ ok: GolfChannelVideos, err: Error });
  const GetGolfCourse = IDL.Record({ golfCourseId: GolfCourseId });
  const GolfCourse = IDL.Record({
    activeVersion: GolfCourseVersion,
    name: IDL.Text,
    tees: IDL.Vec(TeeGroup),
    courseId: GolfCourseId,
  });
  const Result_9 = IDL.Variant({ ok: GolfCourse, err: Error });
  const GetGolfCourses = IDL.Record({
    offset: IDL.Nat,
    limit: IDL.Nat,
    searchTerm: IDL.Text,
  });
  const GolfCourses = IDL.Record({ entries: IDL.Vec(GolfCourse) });
  const Result_8 = IDL.Variant({ ok: GolfCourses, err: Error });
  const GetProfile = IDL.Record({ principalId: GolferId });
  const Profile = IDL.Record({
    username: IDL.Text,
    golferPicture: IDL.Opt(IDL.Vec(IDL.Nat8)),
    handicap: IDL.Opt(Handicap),
    golferPictureExtension: IDL.Text,
    principalId: GolferId,
  });
  const Result_7 = IDL.Variant({ ok: Profile, err: Error });
  const GetShot = IDL.Record({ principalId: PrincipalId });
  const Shot = IDL.Record({});
  const Result_6 = IDL.Variant({ ok: Shot, err: Error });
  const InviteGolfers = IDL.Record({
    gameId: GameId,
    invitedGolferIds: IDL.Vec(GolferId),
  });
  const IsUsernameAvailable = IDL.Record({
    username: IDL.Text,
    principalId: GolferId,
  });
  const UsernameAvailable = IDL.Bool;
  const Result_5 = IDL.Variant({ ok: UsernameAvailable, err: Error });
  const ListFriendRequests = IDL.Record({
    totalEntries: IDL.Nat,
    offset: IDL.Nat,
    limit: IDL.Nat,
    principalId: GolferId,
  });
  const FriendRequest = IDL.Record({
    requestTime: IDL.Int,
    principalId: GolferId,
  });
  const FriendRequests = IDL.Record({
    friendRequests: IDL.Vec(FriendRequest),
  });
  const Result_4 = IDL.Variant({ ok: FriendRequests, err: Error });
  const ListFriends = IDL.Record({
    totalEntries: IDL.Nat,
    offset: IDL.Nat,
    limit: IDL.Nat,
    principalId: GolferId,
  });
  const Friend = IDL.Record({ principalId: GolferId });
  const Friends = IDL.Record({ friendRequests: IDL.Vec(Friend) });
  const Result_3 = IDL.Variant({ ok: Friends, err: Error });
  const ListGolfers = IDL.Record({
    totalEntries: IDL.Nat,
    offset: IDL.Nat,
    limit: IDL.Nat,
    searchTerm: IDL.Text,
  });
  const GolferSummary = IDL.Record({
    golferPrincipalId: GolferId,
    golferPicture: IDL.Opt(IDL.Vec(IDL.Nat8)),
    golferName: IDL.Text,
    handicap: IDL.Opt(Handicap),
    golferPictureExtension: IDL.Text,
  });
  const Golfers = IDL.Record({ golfers: IDL.Vec(GolferSummary) });
  const Result_2 = IDL.Variant({ ok: Golfers, err: Error });
  const PredictShot = IDL.Record({ principalId: PrincipalId });
  const PredictedShot = IDL.Record({});
  const Result_1 = IDL.Variant({ ok: PredictedShot, err: Error });
  const RejectFriendRequest = IDL.Record({
    principalId: GolferId,
    requestedBy: GolferId,
  });
  const RejectGameInvite = IDL.Record({
    rejectedById: GolferId,
    gameId: GameId,
  });
  const RemoveGolfChannelVideo = IDL.Record({ channelId: GolfChannelId });
  const SendFriendRequest = IDL.Record({
    requestedFriend: GolferId,
    principalId: GolferId,
  });
  const SubscribeToGolfChannel = IDL.Record({
    channelId: GolfChannelId,
    principalId: GolferId,
  });
  const UnsubscribeFromGolfChannel = IDL.Record({
    channelId: GolfChannelId,
    principalId: GolferId,
  });
  const UpdateFirstName = IDL.Record({
    principalId: GolferId,
    firstName: IDL.Text,
  });
  const UpdateGame = IDL.Record({ gameId: GameId });
  const UpdateGolfChannel = IDL.Record({
    channelId: GolfChannelId,
    name: IDL.Text,
    channelBanner: IDL.Opt(IDL.Vec(IDL.Nat8)),
    channelBannerExtension: IDL.Text,
    channelImageExtension: IDL.Text,
    channelImage: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const UpdateGolfChannelVideo = IDL.Record({ channelId: GolfChannelId });
  const UpdateHandicap = IDL.Record({
    handicap: IDL.Opt(Handicap),
    principalId: GolferId,
  });
  const UpdateHomeCourse = IDL.Record({
    homeCourseId: IDL.Opt(GolfCourseId),
    principalId: GolferId,
  });
  const UpdateLastName = IDL.Record({
    lastName: IDL.Text,
    principalId: GolferId,
  });
  const UpdateProfilePicture = IDL.Record({
    profilePictureExtension: IDL.Text,
    profilePicture: IDL.Opt(IDL.Vec(IDL.Nat8)),
    principalId: GolferId,
  });
  const UpdateUsername = IDL.Record({
    username: IDL.Text,
    principalId: GolferId,
  });
  const UploadGolfChannelVideo = IDL.Record({ channelId: GolfChannelId });
  const RustResult = IDL.Variant({ Ok: IDL.Text, Err: IDL.Text });
  return IDL.Service({
    acceptFriendRequest: IDL.Func([AcceptFriendRequest], [Result], []),
    acceptGameInvite: IDL.Func([AcceptGameInvite], [Result], []),
    addGameScore: IDL.Func([AddGameScore], [Result], []),
    addShot: IDL.Func([AddShot], [Result], []),
    beginGame: IDL.Func([BeginGame], [Result], []),
    createGame: IDL.Func([CreateGame], [Result_16], []),
    createGolfChannel: IDL.Func([CreateGolfChannel], [Result_15], []),
    createUser: IDL.Func([CreateUser], [Result], []),
    deleteGame: IDL.Func([DeleteGame], [Result], []),
    deleteGolfChannel: IDL.Func([DeleteGolfChannel], [Result], []),
    executeAddGolfCourse: IDL.Func([CreateGolfCourse], [], []),
    executeUpdateGolfCourse: IDL.Func([UpdateGolfCourse], [], []),
    getAppStatus: IDL.Func([], [Result_14], ["query"]),
    getGame: IDL.Func([GetGame], [Result_13], []),
    getGolfChannel: IDL.Func([GetGolfChannel], [Result_12], []),
    getGolfChannelVideo: IDL.Func([GetGolfChannelVideo], [Result_11], []),
    getGolfChannelVideos: IDL.Func([GetGolfChannelVideos], [Result_10], []),
    getGolfCourse: IDL.Func([GetGolfCourse], [Result_9], []),
    getGolfCourses: IDL.Func([GetGolfCourses], [Result_8], []),
    getProfile: IDL.Func([GetProfile], [Result_7], []),
    getShot: IDL.Func([GetShot], [Result_6], []),
    inviteGolfers: IDL.Func([InviteGolfers], [Result], []),
    isUsernameAvailable: IDL.Func([IsUsernameAvailable], [Result_5], ["query"]),
    listFriendRequests: IDL.Func([ListFriendRequests], [Result_4], []),
    listFriends: IDL.Func([ListFriends], [Result_3], []),
    listGolfers: IDL.Func([ListGolfers], [Result_2], []),
    predictShot: IDL.Func([PredictShot], [Result_1], []),
    rejectFriendRequest: IDL.Func([RejectFriendRequest], [Result], []),
    rejectGameInvite: IDL.Func([RejectGameInvite], [Result], []),
    removeGolfChannelVideo: IDL.Func([RemoveGolfChannelVideo], [Result], []),
    sendFriendRequest: IDL.Func([SendFriendRequest], [Result], []),
    subscribeToGolfChannel: IDL.Func([SubscribeToGolfChannel], [Result], []),
    unsubscribeFromGolfChannel: IDL.Func(
      [UnsubscribeFromGolfChannel],
      [Result],
      [],
    ),
    updateFirstName: IDL.Func([UpdateFirstName], [Result], []),
    updateGame: IDL.Func([UpdateGame], [Result], []),
    updateGolfChannel: IDL.Func([UpdateGolfChannel], [Result], []),
    updateGolfChannelVideo: IDL.Func([UpdateGolfChannelVideo], [Result], []),
    updateHandicap: IDL.Func([UpdateHandicap], [Result], []),
    updateHomeCourse: IDL.Func([UpdateHomeCourse], [Result], []),
    updateLastName: IDL.Func([UpdateLastName], [Result], []),
    updateProfilePicture: IDL.Func([UpdateProfilePicture], [Result], []),
    updateUsername: IDL.Func([UpdateUsername], [Result], []),
    uploadGolfChannelVideo: IDL.Func([UploadGolfChannelVideo], [Result], []),
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
