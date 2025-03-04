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
  const Handicap = IDL.Int16;
  const CreateUser = IDL.Record({
    username: IDL.Text,
    profilePictureExtension: IDL.Opt(IDL.Text),
    profilePicture: IDL.Opt(IDL.Vec(IDL.Nat8)),
    handicap: IDL.Opt(Handicap),
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
  const CreateGolfCourse = IDL.Record({
    holes: IDL.Vec(Hole),
    name: IDL.Text,
    initialTeeGroup: TeeGroup,
  });
  const GolfCourseId = IDL.Nat;
  const UpdateGolfCourse = IDL.Record({
    name: IDL.Text,
    updatedTeeGroup: IDL.Opt(TeeGroup),
    courseId: GolfCourseId,
  });
  const AppStatusDTO = IDL.Record({
    version: IDL.Text,
    onHold: IDL.Bool,
  });
  const Result_8 = IDL.Variant({ ok: AppStatusDTO, err: Error });
  const GetGolfCourse = IDL.Record({ golfCourseId: GolfCourseId });
  const GolfCourseVersion = IDL.Nat8;
  const GolfCourse = IDL.Record({
    activeVersion: GolfCourseVersion,
    name: IDL.Text,
    tees: IDL.Vec(TeeGroup),
    courseId: GolfCourseId,
  });
  const Result_7 = IDL.Variant({ ok: GolfCourse, err: Error });
  const GetGolfCourses = IDL.Record({
    offset: IDL.Nat,
    limit: IDL.Nat,
    searchTerm: IDL.Text,
  });
  const GolfCourses = IDL.Record({ entries: IDL.Vec(GolfCourse) });
  const Result_6 = IDL.Variant({ ok: GolfCourses, err: Error });
  const GetProfile = IDL.Record({ principalId: GolferId });
  const Profile = IDL.Record({
    username: IDL.Text,
    golferPicture: IDL.Opt(IDL.Vec(IDL.Nat8)),
    handicap: IDL.Opt(Handicap),
    golferPictureExtension: IDL.Text,
    principalId: GolferId,
  });
  const Result_5 = IDL.Variant({ ok: Profile, err: Error });
  const IsUsernameAvailable = IDL.Record({
    username: IDL.Text,
    principalId: GolferId,
  });
  const UsernameAvailable = IDL.Bool;
  const Result_4 = IDL.Variant({ ok: UsernameAvailable, err: Error });
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
  const Result_3 = IDL.Variant({ ok: FriendRequests, err: Error });
  const ListFriends = IDL.Record({
    totalEntries: IDL.Nat,
    offset: IDL.Nat,
    limit: IDL.Nat,
    principalId: GolferId,
  });
  const Friend = IDL.Record({ principalId: GolferId });
  const Friends = IDL.Record({ friendRequests: IDL.Vec(Friend) });
  const Result_2 = IDL.Variant({ ok: Friends, err: Error });
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
  const Result_1 = IDL.Variant({ ok: Golfers, err: Error });
  const RejectFriendRequest = IDL.Record({
    principalId: GolferId,
    requestedBy: GolferId,
  });
  const SendFriendRequest = IDL.Record({
    requestedFriend: GolferId,
    principalId: GolferId,
  });
  const UpdateFirstName = IDL.Record({
    principalId: GolferId,
    firstName: IDL.Text,
  });
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
  const RustResult = IDL.Variant({ Ok: IDL.Text, Err: IDL.Text });
  return IDL.Service({
    acceptFriendRequest: IDL.Func([AcceptFriendRequest], [Result], []),
    createUser: IDL.Func([CreateUser], [Result], []),
    executeAddGolfCourse: IDL.Func([CreateGolfCourse], [], []),
    executeUpdateGolfCourse: IDL.Func([UpdateGolfCourse], [], []),
    getAppStatus: IDL.Func([], [Result_8], ["query"]),
    getCaller: IDL.Func([], [IDL.Text], []),
    getGolfCourse: IDL.Func([GetGolfCourse], [Result_7], []),
    getGolfCourses: IDL.Func([GetGolfCourses], [Result_6], []),
    getProfile: IDL.Func([GetProfile], [Result_5], []),
    getTotalGolfers: IDL.Func([], [IDL.Nat], []),
    isUsernameAvailable: IDL.Func([IsUsernameAvailable], [Result_4], ["query"]),
    listFriendRequests: IDL.Func([ListFriendRequests], [Result_3], []),
    listFriends: IDL.Func([ListFriends], [Result_2], []),
    listGolfers: IDL.Func([ListGolfers], [Result_1], []),
    rejectFriendRequest: IDL.Func([RejectFriendRequest], [Result], []),
    sendFriendRequest: IDL.Func([SendFriendRequest], [Result], []),
    updateFirstName: IDL.Func([UpdateFirstName], [Result], []),
    updateHandicap: IDL.Func([UpdateHandicap], [Result], []),
    updateHomeCourse: IDL.Func([UpdateHomeCourse], [Result], []),
    updateLastName: IDL.Func([UpdateLastName], [Result], []),
    updateProfilePicture: IDL.Func([UpdateProfilePicture], [Result], []),
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
