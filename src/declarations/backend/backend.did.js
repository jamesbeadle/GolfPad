export const idlFactory = ({ IDL }) => {
  const GolfHole = IDL.Record({
    yardage: IDL.Nat16,
    strokeIndex: IDL.Nat8,
    holeNumber: IDL.Nat8,
  });
  const CreateGolfCourse = IDL.Record({ holes: IDL.Vec(GolfHole) });
  const Error = IDL.Variant({
    InvalidProfilePicture: IDL.Null,
    DecodeError: IDL.Null,
    TooLong: IDL.Null,
    NotAllowed: IDL.Null,
    DuplicateData: IDL.Null,
    InvalidProperty: IDL.Null,
    NotFound: IDL.Null,
    IncorrectSetup: IDL.Null,
    AlreadyClaimed: IDL.Null,
    NotAuthorized: IDL.Null,
    MaxDataExceeded: IDL.Null,
    InvalidData: IDL.Null,
    SystemOnHold: IDL.Null,
    AlreadyExists: IDL.Null,
    NoPacketsRemaining: IDL.Null,
    UpdateFailed: IDL.Null,
    CanisterCreateError: IDL.Null,
    NeuronAlreadyUsed: IDL.Null,
    FailedInterCanisterCall: IDL.Null,
    InsufficientPacketsRemaining: IDL.Null,
    InsufficientFunds: IDL.Null,
    InEligible: IDL.Null,
  });
  const Result = IDL.Variant({ ok: IDL.Null, err: Error });
  const CreateGolfer = IDL.Record({
    username: IDL.Text,
    lastName: IDL.Text,
  });
  const CreateProfile = IDL.Record({
    username: IDL.Text,
    profilePicture: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const AppStatus = IDL.Record({ version: IDL.Text, onHold: IDL.Bool });
  const Result_6 = IDL.Variant({ ok: AppStatus, err: Error });
  const GolfCourseId = IDL.Nat16;
  const GetGolfCourse = IDL.Record({ id: GolfCourseId });
  const CountryId = IDL.Nat16;
  const GolfCourse = IDL.Record({
    id: GolfCourseId,
    manager: IDL.Text,
    totalHoles: IDL.Nat8,
    name: IDL.Text,
    countryId: CountryId,
    mainImageExtension: IDL.Text,
    founded: IDL.Int,
    mainImage: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const Result_5 = IDL.Variant({ ok: GolfCourse, err: Error });
  const GolferId = IDL.Nat16;
  const GetGolfer = IDL.Record({ golferId: GolferId });
  const Golfer = IDL.Record({
    id: GolferId,
    lastName: IDL.Text,
    firstName: IDL.Text,
  });
  const Result_4 = IDL.Variant({ ok: Golfer, err: Error });
  const GetLeaderboard = IDL.Record({});
  const Leaderboard = IDL.Record({});
  const Result_1 = IDL.Variant({ ok: Leaderboard, err: Error });
  const GetPrediction = IDL.Record({});
  const Prediction = IDL.Record({});
  const Result_3 = IDL.Variant({ ok: Prediction, err: Error });
  const GetProfile = IDL.Record({});
  const PrincipalId = IDL.Text;
  const Profile = IDL.Record({
    username: IDL.Text,
    joinedOn: IDL.Int,
    principalId: PrincipalId,
  });
  const Result_2 = IDL.Variant({ ok: Profile, err: Error });
  const GetScorecard = IDL.Record({ principalId: PrincipalId });
  const TournamentId = IDL.Nat16;
  const SubmitPrediction = IDL.Record({
    hole17GolferId: GolferId,
    hole9GolferId: GolferId,
    hole11GolferId: GolferId,
    hole3GolferId: GolferId,
    hole16GolferId: GolferId,
    hole8GolferId: GolferId,
    hole10GolferId: GolferId,
    hole2GolferId: GolferId,
    hole15GolferId: GolferId,
    hole7GolferId: GolferId,
    hole1GolferId: GolferId,
    hole14GolferId: GolferId,
    hole6GolferId: GolferId,
    hole13GolferId: GolferId,
    hole5GolferId: GolferId,
    tournamentId: TournamentId,
    hole18GolferId: GolferId,
    hole12GolferId: GolferId,
    hole4GolferId: GolferId,
  });
  const SwapGolfer = IDL.Record({
    removedGolferId: GolferId,
    newGolferId: GolferId,
    newGolferHole: IDL.Nat8,
    tournamentId: TournamentId,
    removedGolferHole: IDL.Nat8,
  });
  const UpdateGolfCourse = IDL.Record({});
  const UpdateGolfer = IDL.Record({
    lastName: IDL.Text,
    firstName: IDL.Text,
  });
  const UpdateProfilePicture = IDL.Record({
    profilePicture: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const UpdateTournamentStage = IDL.Record({});
  const UpdateUsername = IDL.Record({ username: IDL.Text });
  return IDL.Service({
    createGolfCourse: IDL.Func([CreateGolfCourse], [Result], []),
    createGolfer: IDL.Func([CreateGolfer], [Result], []),
    createProfile: IDL.Func([CreateProfile], [Result], []),
    getAppStatus: IDL.Func([], [Result_6], ["query"]),
    getGolfCourse: IDL.Func([GetGolfCourse], [Result_5], ["query"]),
    getGolfer: IDL.Func([GetGolfer], [Result_4], ["query"]),
    getLeaderboard: IDL.Func([GetLeaderboard], [Result_1], ["query"]),
    getPrediction: IDL.Func([GetPrediction], [Result_3], ["query"]),
    getProfile: IDL.Func([GetProfile], [Result_2], ["query"]),
    getScorecard: IDL.Func([GetScorecard], [Result_1], ["query"]),
    submitPrediction: IDL.Func([SubmitPrediction], [Result], []),
    swapGolfer: IDL.Func([SwapGolfer], [Result], []),
    updateGolfCourse: IDL.Func([UpdateGolfCourse], [Result], []),
    updateGolfer: IDL.Func([UpdateGolfer], [Result], []),
    updateProfilePicture: IDL.Func([UpdateProfilePicture], [Result], []),
    updateTournamentStage: IDL.Func([UpdateTournamentStage], [Result], []),
    updateUsername: IDL.Func([UpdateUsername], [Result], []),
  });
};
export const init = ({ IDL }) => {
  return [];
};
