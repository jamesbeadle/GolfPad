export const idlFactory = ({ IDL }) => {
  const TournamentId = IDL.Nat16;
  const CalculateLeaderboard = IDL.Record({
    year: IDL.Nat16,
    tournamentId: TournamentId,
  });
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
  const GolfHole = IDL.Record({
    par: IDL.Nat8,
    yardage: IDL.Nat16,
    strokeIndex: IDL.Nat8,
    holeNumber: IDL.Nat8,
  });
  const CountryId = IDL.Nat16;
  const CreateGolfCourse = IDL.Record({
    par: IDL.Nat8,
    holes: IDL.Vec(GolfHole),
    name: IDL.Text,
    yardage: IDL.Nat16,
    coursePar: IDL.Nat8,
    countryId: CountryId,
    founded: IDL.Int,
    totalYardage: IDL.Nat16,
  });
  const CreateGolfer = IDL.Record({
    worldRanking: IDL.Nat16,
    nationality: CountryId,
    lastName: IDL.Text,
    firstName: IDL.Text,
  });
  const CreateProfile = IDL.Record({
    username: IDL.Text,
    profilePicture: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const CreateTournament = IDL.Record({ name: IDL.Text });
  const AppStatus = IDL.Record({ version: IDL.Text, onHold: IDL.Bool });
  const Result_11 = IDL.Variant({ ok: AppStatus, err: Error });
  const GolfCourseId = IDL.Nat16;
  const GetGolfCourse = IDL.Record({ golfCourseId: GolfCourseId });
  const GolfHole__1 = IDL.Record({
    par: IDL.Nat8,
    yardage: IDL.Nat16,
    strokeIndex: IDL.Nat8,
    holeNumber: IDL.Nat8,
  });
  const GolfCourse = IDL.Record({
    par: IDL.Nat8,
    holes: IDL.Vec(GolfHole__1),
    totalHoles: IDL.Nat8,
    golfCourseId: GolfCourseId,
    name: IDL.Text,
    countryId: CountryId,
    founded: IDL.Int,
  });
  const Result_10 = IDL.Variant({ ok: GolfCourse, err: Error });
  const GolferId = IDL.Nat16;
  const GetGolfer = IDL.Record({ golferId: GolferId });
  const Golfer = IDL.Record({
    worldRanking: IDL.Nat16,
    golferId: GolferId,
    nationality: CountryId,
    lastName: IDL.Text,
    firstName: IDL.Text,
  });
  const Result_9 = IDL.Variant({ ok: Golfer, err: Error });
  const GetFantasyLeaderboard = IDL.Record({
    page: IDL.Nat,
    tournamentId: TournamentId,
  });
  const FantasyPredictionHole = IDL.Record({
    par: IDL.Nat8,
    golferId: GolferId,
    shotCount: IDL.Nat8,
    score: IDL.Int8,
  });
  const PrincipalId = IDL.Text;
  const FantasyLeaderboardEntry = IDL.Record({
    username: IDL.Text,
    holes: IDL.Vec(FantasyPredictionHole),
    score: IDL.Int8,
    shots: IDL.Nat8,
    principalId: PrincipalId,
  });
  const FantasyLeaderboard = IDL.Record({
    totalEntries: IDL.Nat,
    page: IDL.Nat,
    entries: IDL.Vec(FantasyLeaderboardEntry),
    tournamentId: TournamentId,
  });
  const Result_8 = IDL.Variant({ ok: FantasyLeaderboard, err: Error });
  const GetPrediction = IDL.Record({
    year: IDL.Nat16,
    tournamentId: TournamentId,
  });
  const Prediction = IDL.Record({
    hole14Score: IDL.Nat8,
    hole17GolferId: GolferId,
    hole9GolferId: GolferId,
    username: IDL.Text,
    hole7Score: IDL.Nat8,
    hole2Score: IDL.Nat8,
    hole11GolferId: GolferId,
    hole3GolferId: GolferId,
    hole16GolferId: GolferId,
    hole17Score: IDL.Nat8,
    hole12Score: IDL.Nat8,
    hole8GolferId: GolferId,
    year: IDL.Nat16,
    swap1Used: IDL.Bool,
    hole10GolferId: GolferId,
    hole2GolferId: GolferId,
    hole5Score: IDL.Nat8,
    hole15GolferId: GolferId,
    hole7GolferId: GolferId,
    swap3Used: IDL.Bool,
    hole15Score: IDL.Nat8,
    hole10Score: IDL.Nat8,
    hole1GolferId: GolferId,
    hole8Score: IDL.Nat8,
    hole3Score: IDL.Nat8,
    hole14GolferId: GolferId,
    hole6GolferId: GolferId,
    hole18Score: IDL.Nat8,
    hole13Score: IDL.Nat8,
    hole6Score: IDL.Nat8,
    hole1Score: IDL.Nat8,
    hole13GolferId: GolferId,
    hole5GolferId: GolferId,
    tournamentId: TournamentId,
    hole16Score: IDL.Nat8,
    hole11Score: IDL.Nat8,
    swap2Used: IDL.Bool,
    principalId: PrincipalId,
    hole18GolferId: GolferId,
    hole9Score: IDL.Nat8,
    hole4Score: IDL.Nat8,
    hole12GolferId: GolferId,
    hole4GolferId: GolferId,
  });
  const Result_6 = IDL.Variant({ ok: Prediction, err: Error });
  const GetProfile = IDL.Record({});
  const Profile = IDL.Record({
    username: IDL.Text,
    joinedOn: IDL.Int,
    principalId: PrincipalId,
  });
  const Result_7 = IDL.Variant({ ok: Profile, err: Error });
  const GetScorecard = IDL.Record({
    year: IDL.Nat16,
    tournamentId: TournamentId,
    principalId: PrincipalId,
  });
  const GetTournament = IDL.Record({ tournamentId: TournamentId });
  const Tournament = IDL.Record({ tournamentId: TournamentId });
  const Result_5 = IDL.Variant({ ok: Tournament, err: Error });
  const ListGolfCourses = IDL.Record({ page: IDL.Nat });
  const GolfCourseSummary = IDL.Record({
    par: IDL.Nat8,
    totalHoles: IDL.Nat8,
    golfCourseId: GolfCourseId,
    name: IDL.Text,
    countryId: CountryId,
    founded: IDL.Int,
  });
  const GolfCourses = IDL.Record({
    totalEntries: IDL.Nat,
    page: IDL.Nat,
    entries: IDL.Vec(GolfCourseSummary),
  });
  const Result_4 = IDL.Variant({ ok: GolfCourses, err: Error });
  const ListGolfers = IDL.Record({ page: IDL.Nat });
  const GolferSummary = IDL.Record({
    id: GolferId,
    worldRanking: IDL.Nat16,
    nationality: CountryId,
    lastName: IDL.Text,
    firstName: IDL.Text,
  });
  const Golfers = IDL.Record({
    totalEntries: IDL.Nat,
    page: IDL.Nat,
    entries: IDL.Vec(GolferSummary),
  });
  const Result_3 = IDL.Variant({ ok: Golfers, err: Error });
  const ListPredictions = IDL.Record({ page: IDL.Nat });
  const PredictionSummary = IDL.Record({
    createdOn: IDL.Int,
    year: IDL.Nat16,
    totalScore: IDL.Int8,
    totalShots: IDL.Nat8,
    tournamentId: TournamentId,
    principalId: PrincipalId,
  });
  const Predictions = IDL.Record({
    totalEntries: IDL.Nat,
    page: IDL.Nat,
    entries: IDL.Vec(PredictionSummary),
  });
  const Result_2 = IDL.Variant({ ok: Predictions, err: Error });
  const ListTournaments = IDL.Record({ page: IDL.Nat });
  const TournamentSummary = IDL.Record({
    name: IDL.Text,
    tournamentId: TournamentId,
  });
  const Tournaments = IDL.Record({
    totalEntries: IDL.Nat,
    page: IDL.Nat,
    entries: IDL.Vec(TournamentSummary),
  });
  const Result_1 = IDL.Variant({ ok: Tournaments, err: Error });
  const SubmitPrediction = IDL.Record({
    hole17GolferId: GolferId,
    hole9GolferId: GolferId,
    hole11GolferId: GolferId,
    hole3GolferId: GolferId,
    hole16GolferId: GolferId,
    hole8GolferId: GolferId,
    year: IDL.Nat16,
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
  const UpdateAppStatus = IDL.Record({
    version: IDL.Text,
    onHold: IDL.Bool,
  });
  const UpdateGolfCourse = IDL.Record({
    holes: IDL.Vec(GolfHole),
    golfCourseId: GolfCourseId,
    name: IDL.Text,
  });
  const UpdateGolfer = IDL.Record({
    worldRanking: IDL.Nat16,
    golferId: GolferId,
    nationality: CountryId,
    lastName: IDL.Text,
    firstName: IDL.Text,
  });
  const UpdateProfilePicture = IDL.Record({
    profilePicture: IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const TournamentStage = IDL.Variant({
    Round1Active: IDL.Null,
    Round2Active: IDL.Null,
    Round3Active: IDL.Null,
    Round3Complete: IDL.Null,
    Round4Active: IDL.Null,
    Round2Complete: IDL.Null,
    Round1Complete: IDL.Null,
    Completed: IDL.Null,
    NotStarted: IDL.Null,
  });
  const UpdateTournamentStage = IDL.Record({
    year: IDL.Nat16,
    stage: TournamentStage,
    tournamentId: TournamentId,
  });
  const UpdateUsername = IDL.Record({ username: IDL.Text });
  return IDL.Service({
    calculateLeaderboard: IDL.Func([CalculateLeaderboard], [Result], []),
    createGolfCourse: IDL.Func([CreateGolfCourse], [Result], []),
    createGolfer: IDL.Func([CreateGolfer], [Result], []),
    createProfile: IDL.Func([CreateProfile], [Result], []),
    createTournament: IDL.Func([CreateTournament], [Result], []),
    getAppStatus: IDL.Func([], [Result_11], ["query"]),
    getGolfCourse: IDL.Func([GetGolfCourse], [Result_10], ["query"]),
    getGolfer: IDL.Func([GetGolfer], [Result_9], ["query"]),
    getLeaderboard: IDL.Func([GetFantasyLeaderboard], [Result_8], ["query"]),
    getPrediction: IDL.Func([GetPrediction], [Result_6], ["query"]),
    getProfile: IDL.Func([GetProfile], [Result_7], ["query"]),
    getScorecard: IDL.Func([GetScorecard], [Result_6], ["query"]),
    getTournament: IDL.Func([GetTournament], [Result_5], ["query"]),
    isAdmin: IDL.Func([IDL.Text], [IDL.Bool], []),
    listGolfCourses: IDL.Func([ListGolfCourses], [Result_4], ["query"]),
    listGolfers: IDL.Func([ListGolfers], [Result_3], ["query"]),
    listPredictions: IDL.Func([ListPredictions], [Result_2], ["query"]),
    listTournaments: IDL.Func([ListTournaments], [Result_1], ["query"]),
    submitPrediction: IDL.Func([SubmitPrediction], [Result], []),
    swapGolfer: IDL.Func([SwapGolfer], [Result], []),
    updateAppStatus: IDL.Func([UpdateAppStatus], [Result], []),
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
