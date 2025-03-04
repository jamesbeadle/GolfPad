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
  const CreateGolfer = IDL.Record({
    username: IDL.Text,
    profilePictureExtension: IDL.Opt(IDL.Text),
    profilePicture: IDL.Opt(IDL.Vec(IDL.Nat8)),
    handicap: IDL.Opt(Handicap),
    principalId: GolferId,
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
  const Result_3 = IDL.Variant({ ok: AppStatusDTO, err: Error });
  const GetGolfCourses = IDL.Record({
    offset: IDL.Nat,
    limit: IDL.Nat,
    searchTerm: IDL.Text,
  });
  const GolfCourses = IDL.Record({});
  const Result_2 = IDL.Variant({ ok: GolfCourses, err: Error });
  const ListFriendRequests = IDL.Record({
    totalEntries: IDL.Nat,
    offset: IDL.Nat,
    limit: IDL.Nat,
    principalId: GolferId,
  });
  const FriendRequestDTO = IDL.Record({
    requestTime: IDL.Int,
    principalId: GolferId,
  });
  const FriendRequestsDTO = IDL.Record({
    friendRequests: IDL.Vec(FriendRequestDTO),
  });
  const Result_1 = IDL.Variant({ ok: FriendRequestsDTO, err: Error });
  const RejectFriendRequest = IDL.Record({
    principalId: GolferId,
    requestedBy: GolferId,
  });
  const SendFriendRequest = IDL.Record({
    requestedFriend: GolferId,
    principalId: GolferId,
  });
  const UpdateHandicap = IDL.Record({
    handicap: IDL.Opt(Handicap),
    principalId: GolferId,
  });
  const UpdateHomeCourse = IDL.Record({
    homeCourseId: IDL.Opt(GolfCourseId),
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
    createGolfer: IDL.Func([CreateGolfer], [Result], []),
    executeAddGolfCourse: IDL.Func([CreateGolfCourse], [], []),
    executeUpdateGolfCourse: IDL.Func([UpdateGolfCourse], [], []),
    getAppStatus: IDL.Func([], [Result_3], ["query"]),
    getGolfCourses: IDL.Func([GetGolfCourses], [Result_2], []),
    listFriendRequests: IDL.Func([ListFriendRequests], [Result_1], []),
    rejectFriendRequest: IDL.Func([RejectFriendRequest], [Result], []),
    sendFriendRequest: IDL.Func([SendFriendRequest], [Result], []),
    updateHandicap: IDL.Func([UpdateHandicap], [Result], []),
    updateHomeCourse: IDL.Func([UpdateHomeCourse], [Result], []),
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
