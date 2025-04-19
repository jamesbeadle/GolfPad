import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface AppStatus { 'version' : string, 'onHold' : boolean }
export interface CalculateLeaderboard {
  'year' : number,
  'tournamentId' : TournamentId,
}
export interface Canister {
  'app' : WaterwayLabsApp,
  'canisterName' : string,
  'canisterType' : CanisterType,
  'canisterId' : CanisterId,
}
export type CanisterId = string;
export type CanisterType = { 'SNS' : null } |
  { 'Dynamic' : null } |
  { 'Static' : null };
export type CountryId = number;
export interface CreateGolfCourse {
  'par' : number,
  'holes' : Array<GolfHole>,
  'name' : string,
  'yardage' : number,
  'coursePar' : number,
  'countryId' : CountryId,
  'founded' : bigint,
  'totalYardage' : number,
}
export interface CreateGolfer {
  'worldRanking' : number,
  'nationality' : CountryId,
  'lastName' : string,
  'firstName' : string,
}
export interface CreateProfile {
  'username' : string,
  'profilePicture' : [] | [Uint8Array | number[]],
}
export interface CreateTournament { 'name' : string }
export type Error = { 'InvalidProfilePicture' : null } |
  { 'DecodeError' : null } |
  { 'TooLong' : null } |
  { 'NotAllowed' : null } |
  { 'DuplicateData' : null } |
  { 'InvalidProperty' : null } |
  { 'NotFound' : null } |
  { 'IncorrectSetup' : null } |
  { 'AlreadyClaimed' : null } |
  { 'NotAuthorized' : null } |
  { 'MaxDataExceeded' : null } |
  { 'InvalidData' : null } |
  { 'SystemOnHold' : null } |
  { 'AlreadyExists' : null } |
  { 'NoPacketsRemaining' : null } |
  { 'UpdateFailed' : null } |
  { 'CanisterCreateError' : null } |
  { 'NeuronAlreadyUsed' : null } |
  { 'FailedInterCanisterCall' : null } |
  { 'InsufficientPacketsRemaining' : null } |
  { 'InsufficientFunds' : null } |
  { 'InEligible' : null };
export interface FantasyLeaderboard {
  'totalEntries' : bigint,
  'page' : bigint,
  'entries' : Array<FantasyLeaderboardEntry>,
  'tournamentId' : TournamentId,
}
export interface FantasyLeaderboardEntry {
  'username' : string,
  'holes' : Array<FantasyPredictionHole>,
  'score' : number,
  'shots' : number,
  'principalId' : PrincipalId,
}
export interface FantasyPredictionHole {
  'par' : number,
  'golferId' : GolferId,
  'shotCount' : number,
  'score' : number,
}
export interface GetFantasyLeaderboard {
  'page' : bigint,
  'tournamentId' : TournamentId,
}
export interface GetGolfCourse { 'golfCourseId' : GolfCourseId }
export interface GetGolfer { 'golferId' : GolferId }
export interface GetPrediction {
  'year' : number,
  'tournamentId' : TournamentId,
}
export type GetProfile = {};
export interface GetScorecard {
  'year' : number,
  'tournamentId' : TournamentId,
  'principalId' : PrincipalId,
}
export interface GetTournament { 'tournamentId' : TournamentId }
export interface GolfCourse {
  'par' : number,
  'holes' : Array<GolfHole__1>,
  'totalHoles' : number,
  'golfCourseId' : GolfCourseId,
  'name' : string,
  'countryId' : CountryId,
  'founded' : bigint,
}
export type GolfCourseId = number;
export interface GolfCourseSummary {
  'par' : number,
  'totalHoles' : number,
  'golfCourseId' : GolfCourseId,
  'name' : string,
  'countryId' : CountryId,
  'founded' : bigint,
}
export interface GolfCourses {
  'totalEntries' : bigint,
  'page' : bigint,
  'entries' : Array<GolfCourseSummary>,
}
export interface GolfHole {
  'par' : number,
  'yardage' : number,
  'strokeIndex' : number,
  'holeNumber' : number,
}
export interface GolfHole__1 {
  'par' : number,
  'yardage' : number,
  'strokeIndex' : number,
  'holeNumber' : number,
}
export interface Golfer {
  'worldRanking' : number,
  'golferId' : GolferId,
  'nationality' : CountryId,
  'lastName' : string,
  'firstName' : string,
}
export type GolferId = number;
export interface GolferSummary {
  'id' : GolferId,
  'worldRanking' : number,
  'nationality' : CountryId,
  'lastName' : string,
  'firstName' : string,
}
export interface Golfers {
  'totalEntries' : bigint,
  'page' : bigint,
  'entries' : Array<GolferSummary>,
}
export interface IsUsernameValid { 'username' : string }
export interface ListGolfCourses { 'page' : bigint }
export interface ListGolfers { 'page' : bigint }
export interface ListPredictions { 'page' : bigint }
export interface ListTournaments { 'page' : bigint }
export interface Prediction {
  'hole14Score' : number,
  'hole17GolferId' : GolferId,
  'hole9GolferId' : GolferId,
  'username' : string,
  'hole7Score' : number,
  'hole2Score' : number,
  'hole11GolferId' : GolferId,
  'hole3GolferId' : GolferId,
  'hole16GolferId' : GolferId,
  'hole17Score' : number,
  'hole12Score' : number,
  'hole8GolferId' : GolferId,
  'year' : number,
  'swap1Used' : boolean,
  'hole10GolferId' : GolferId,
  'hole2GolferId' : GolferId,
  'hole5Score' : number,
  'hole15GolferId' : GolferId,
  'hole7GolferId' : GolferId,
  'swap3Used' : boolean,
  'hole15Score' : number,
  'hole10Score' : number,
  'hole1GolferId' : GolferId,
  'hole8Score' : number,
  'hole3Score' : number,
  'hole14GolferId' : GolferId,
  'hole6GolferId' : GolferId,
  'hole18Score' : number,
  'hole13Score' : number,
  'hole6Score' : number,
  'hole1Score' : number,
  'hole13GolferId' : GolferId,
  'hole5GolferId' : GolferId,
  'tournamentId' : TournamentId,
  'hole16Score' : number,
  'hole11Score' : number,
  'swap2Used' : boolean,
  'principalId' : PrincipalId,
  'hole18GolferId' : GolferId,
  'hole9Score' : number,
  'hole4Score' : number,
  'hole12GolferId' : GolferId,
  'hole4GolferId' : GolferId,
}
export interface PredictionSummary {
  'createdOn' : bigint,
  'year' : number,
  'totalScore' : number,
  'totalShots' : number,
  'tournamentId' : TournamentId,
  'principalId' : PrincipalId,
}
export interface Predictions {
  'totalEntries' : bigint,
  'page' : bigint,
  'entries' : Array<PredictionSummary>,
}
export type PrincipalId = string;
export interface Profile {
  'username' : string,
  'joinedOn' : bigint,
  'principalId' : PrincipalId,
}
export interface ProjectCanisters { 'entries' : Array<Canister> }
export type Result = { 'ok' : null } |
  { 'err' : Error };
export type Result_1 = { 'ok' : Tournaments } |
  { 'err' : Error };
export type Result_10 = { 'ok' : Golfer } |
  { 'err' : Error };
export type Result_11 = { 'ok' : GolfCourse } |
  { 'err' : Error };
export type Result_12 = { 'ok' : AppStatus } |
  { 'err' : Error };
export type Result_2 = { 'ok' : Predictions } |
  { 'err' : Error };
export type Result_3 = { 'ok' : Golfers } |
  { 'err' : Error };
export type Result_4 = { 'ok' : GolfCourses } |
  { 'err' : Error };
export type Result_5 = { 'ok' : Tournament } |
  { 'err' : Error };
export type Result_6 = { 'ok' : Prediction } |
  { 'err' : Error };
export type Result_7 = { 'ok' : ProjectCanisters } |
  { 'err' : Error };
export type Result_8 = { 'ok' : Profile } |
  { 'err' : Error };
export type Result_9 = { 'ok' : FantasyLeaderboard } |
  { 'err' : Error };
export interface SubmitPrediction {
  'hole17GolferId' : GolferId,
  'hole9GolferId' : GolferId,
  'hole11GolferId' : GolferId,
  'hole3GolferId' : GolferId,
  'hole16GolferId' : GolferId,
  'hole8GolferId' : GolferId,
  'year' : number,
  'hole10GolferId' : GolferId,
  'hole2GolferId' : GolferId,
  'hole15GolferId' : GolferId,
  'hole7GolferId' : GolferId,
  'hole1GolferId' : GolferId,
  'hole14GolferId' : GolferId,
  'hole6GolferId' : GolferId,
  'hole13GolferId' : GolferId,
  'hole5GolferId' : GolferId,
  'tournamentId' : TournamentId,
  'hole18GolferId' : GolferId,
  'hole12GolferId' : GolferId,
  'hole4GolferId' : GolferId,
}
export interface SwapGolfer {
  'removedGolferId' : GolferId,
  'year' : number,
  'newGolferId' : GolferId,
  'newGolferHole' : number,
  'tournamentId' : TournamentId,
  'removedGolferHole' : number,
}
export interface Tournament { 'tournamentId' : TournamentId }
export type TournamentId = number;
export type TournamentStage = { 'Round1Active' : null } |
  { 'Round2Active' : null } |
  { 'Round3Active' : null } |
  { 'Round3Complete' : null } |
  { 'Round4Active' : null } |
  { 'Round2Complete' : null } |
  { 'Round1Complete' : null } |
  { 'Completed' : null } |
  { 'NotStarted' : null };
export interface TournamentSummary {
  'name' : string,
  'tournamentId' : TournamentId,
}
export interface Tournaments {
  'totalEntries' : bigint,
  'page' : bigint,
  'entries' : Array<TournamentSummary>,
}
export interface UpdateAppStatus { 'version' : string, 'onHold' : boolean }
export interface UpdateGolfCourse {
  'holes' : Array<GolfHole>,
  'golfCourseId' : GolfCourseId,
  'name' : string,
}
export interface UpdateGolfer {
  'worldRanking' : number,
  'golferId' : GolferId,
  'nationality' : CountryId,
  'lastName' : string,
  'firstName' : string,
}
export interface UpdateProfilePicture {
  'profilePicture' : [] | [Uint8Array | number[]],
}
export interface UpdateTournamentStage {
  'year' : number,
  'stage' : TournamentStage,
  'tournamentId' : TournamentId,
}
export interface UpdateUsername { 'username' : string }
export type WaterwayLabsApp = { 'OpenFPL' : null } |
  { 'OpenWSL' : null } |
  { 'ICPCasino' : null } |
  { 'FootballGod' : null } |
  { 'ICF1' : null } |
  { 'ICFC' : null } |
  { 'ICGC' : null } |
  { 'ICPFA' : null } |
  { 'TransferKings' : null } |
  { 'JeffBets' : null } |
  { 'OpenBook' : null } |
  { 'OpenCare' : null } |
  { 'OpenChef' : null } |
  { 'OpenBeats' : null } |
  { 'WaterwayLabs' : null };
export interface _SERVICE {
  'calculateLeaderboard' : ActorMethod<[CalculateLeaderboard], Result>,
  'createGolfCourse' : ActorMethod<[CreateGolfCourse], Result>,
  'createGolfer' : ActorMethod<[CreateGolfer], Result>,
  'createProfile' : ActorMethod<[CreateProfile], Result>,
  'createTournament' : ActorMethod<[CreateTournament], Result>,
  'getAppStatus' : ActorMethod<[], Result_12>,
  'getGolfCourse' : ActorMethod<[GetGolfCourse], Result_11>,
  'getGolfer' : ActorMethod<[GetGolfer], Result_10>,
  'getLeaderboard' : ActorMethod<[GetFantasyLeaderboard], Result_9>,
  'getPrediction' : ActorMethod<[GetPrediction], Result_6>,
  'getProfile' : ActorMethod<[GetProfile], Result_8>,
  'getProjectCanisters' : ActorMethod<[], Result_7>,
  'getScorecard' : ActorMethod<[GetScorecard], Result_6>,
  'getTournament' : ActorMethod<[GetTournament], Result_5>,
  'isAdmin' : ActorMethod<[string], boolean>,
  'isUsernameValid' : ActorMethod<[IsUsernameValid], boolean>,
  'listGolfCourses' : ActorMethod<[ListGolfCourses], Result_4>,
  'listGolfers' : ActorMethod<[ListGolfers], Result_3>,
  'listPredictions' : ActorMethod<[ListPredictions], Result_2>,
  'listTournaments' : ActorMethod<[ListTournaments], Result_1>,
  'submitPrediction' : ActorMethod<[SubmitPrediction], Result>,
  'swapGolfer' : ActorMethod<[SwapGolfer], Result>,
  'updateAppStatus' : ActorMethod<[UpdateAppStatus], Result>,
  'updateGolfCourse' : ActorMethod<[UpdateGolfCourse], Result>,
  'updateGolfer' : ActorMethod<[UpdateGolfer], Result>,
  'updateProfilePicture' : ActorMethod<[UpdateProfilePicture], Result>,
  'updateTournamentStage' : ActorMethod<[UpdateTournamentStage], Result>,
  'updateUsername' : ActorMethod<[UpdateUsername], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
