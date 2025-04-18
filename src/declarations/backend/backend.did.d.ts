import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";
import type { IDL } from "@dfinity/candid";

export interface AppStatus {
  version: string;
  onHold: boolean;
}
export interface CalculateLeaderboard {
  tournamentId: TournamentId;
}
export type CountryId = number;
export interface CreateGolfCourse {
  holes: Array<GolfHole>;
  name: string;
  yardage: number;
  coursePar: number;
}
export interface CreateGolfer {
  worldRanking: number;
  nationality: CountryId;
  lastName: string;
  firstName: string;
}
export interface CreateProfile {
  username: string;
  profilePicture: [] | [Uint8Array | number[]];
}
export interface CreateTournament {
  endDate: bigint;
  golfCourseId: bigint;
  name: string;
  startDate: bigint;
}
export type Error =
  | { InvalidProfilePicture: null }
  | { DecodeError: null }
  | { TooLong: null }
  | { NotAllowed: null }
  | { DuplicateData: null }
  | { InvalidProperty: null }
  | { NotFound: null }
  | { IncorrectSetup: null }
  | { AlreadyClaimed: null }
  | { NotAuthorized: null }
  | { MaxDataExceeded: null }
  | { InvalidData: null }
  | { SystemOnHold: null }
  | { AlreadyExists: null }
  | { NoPacketsRemaining: null }
  | { UpdateFailed: null }
  | { CanisterCreateError: null }
  | { NeuronAlreadyUsed: null }
  | { FailedInterCanisterCall: null }
  | { InsufficientPacketsRemaining: null }
  | { InsufficientFunds: null }
  | { InEligible: null };
export interface FantasyLeaderboard {
  totalEntries: bigint;
  page: bigint;
  entries: Array<FantasyLeaderboardEntry>;
  tournamentId: TournamentId;
}
export interface FantasyLeaderboardEntry {
  holes: Array<FantasyPredictionHole>;
  score: number;
  shots: number;
  nationalityId: CountryId;
  principalId: PrincipalId;
}
export interface FantasyPredictionHole {
  par: number;
  golferId: GolferId;
  shotCount: number;
  score: number;
}
export interface GetFantasyLeaderboard {
  page: bigint;
  tournamentId: TournamentId;
}
export interface GetGolfCourse {
  id: GolfCourseId;
}
export interface GetGolfer {
  golferId: GolferId;
}
export type GetPrediction = {};
export type GetProfile = {};
export interface GetScorecard {
  principalId: PrincipalId;
}
export interface GetTournament {
  id: TournamentId;
}
export interface GolfCourse {
  id: GolfCourseId;
  manager: string;
  totalHoles: number;
  name: string;
  countryId: CountryId;
  mainImageExtension: string;
  founded: bigint;
  mainImage: [] | [Uint8Array | number[]];
}
export type GolfCourseId = number;
export type GolfCourseSummary = {};
export interface GolfCourses {
  totalEntries: bigint;
  page: bigint;
  entries: Array<GolfCourseSummary>;
}
export interface GolfHole {
  par: number;
  yardage: number;
  strokeIndex: number;
  holeNumber: number;
}
export interface Golfer {
  id: GolferId;
  worldRanking: number;
  nationality: CountryId;
  lastName: string;
  firstName: string;
}
export type GolferId = number;
export type GolferSummary = {};
export interface Golfers {
  totalEntries: bigint;
  page: bigint;
  entries: Array<GolferSummary>;
}
export interface ListGolfCourses {
  page: bigint;
}
export interface ListGolfers {
  page: bigint;
}
export interface ListPredictions {
  page: bigint;
}
export interface ListTournaments {
  page: bigint;
}
export type Prediction = {};
export type PredictionSummary = {};
export interface Predictions {
  totalEntries: bigint;
  page: bigint;
  entries: Array<PredictionSummary>;
}
export type PrincipalId = string;
export interface Profile {
  username: string;
  joinedOn: bigint;
  principalId: PrincipalId;
}
export type Result = { ok: null } | { err: Error };
export type Result_1 = { ok: Tournaments } | { err: Error };
export type Result_10 = { ok: Golfer } | { err: Error };
export type Result_11 = { ok: GolfCourse } | { err: Error };
export type Result_12 = { ok: AppStatus } | { err: Error };
export type Result_2 = { ok: Predictions } | { err: Error };
export type Result_3 = { ok: Golfers } | { err: Error };
export type Result_4 = { ok: GolfCourses } | { err: Error };
export type Result_5 = { ok: Tournament } | { err: Error };
export type Result_6 = { ok: Scorecard } | { err: Error };
export type Result_7 = { ok: Profile } | { err: Error };
export type Result_8 = { ok: Prediction } | { err: Error };
export type Result_9 = { ok: FantasyLeaderboard } | { err: Error };
export type Scorecard = {};
export interface SubmitPrediction {
  hole17GolferId: GolferId;
  hole9GolferId: GolferId;
  hole11GolferId: GolferId;
  hole3GolferId: GolferId;
  hole16GolferId: GolferId;
  hole8GolferId: GolferId;
  hole10GolferId: GolferId;
  hole2GolferId: GolferId;
  hole15GolferId: GolferId;
  hole7GolferId: GolferId;
  hole1GolferId: GolferId;
  hole14GolferId: GolferId;
  hole6GolferId: GolferId;
  hole13GolferId: GolferId;
  hole5GolferId: GolferId;
  tournamentId: TournamentId;
  hole18GolferId: GolferId;
  hole12GolferId: GolferId;
  hole4GolferId: GolferId;
}
export interface SwapGolfer {
  removedGolferId: GolferId;
  newGolferId: GolferId;
  newGolferHole: number;
  tournamentId: TournamentId;
  removedGolferHole: number;
}
export interface Tournament {
  id: TournamentId;
}
export type TournamentId = number;
export type TournamentStage =
  | { Round1Active: null }
  | { Round2Active: null }
  | { Round3Active: null }
  | { Round3Complete: null }
  | { Round4Active: null }
  | { Round2Complete: null }
  | { Round1Complete: null }
  | { Completed: null }
  | { NotStarted: null };
export type TournamentSummary = {};
export interface Tournaments {
  totalEntries: bigint;
  page: bigint;
  entries: Array<TournamentSummary>;
}
export interface UpdateAppStatus {
  version: string;
  onHold: boolean;
}
export interface UpdateGolfCourse {
  id: GolfCourseId;
  holes: Array<GolfHole>;
  name: string;
  yardage: number;
  coursePar: number;
}
export interface UpdateGolfer {
  id: GolferId;
  worldRanking: number;
  nationality: CountryId;
  lastName: string;
  firstName: string;
}
export interface UpdateProfilePicture {
  profilePicture: [] | [Uint8Array | number[]];
}
export interface UpdateTournamentStage {
  stage: TournamentStage;
  tournamentId: TournamentId;
}
export interface UpdateUsername {
  username: string;
}
export interface _SERVICE {
  calculateLeaderboard: ActorMethod<[CalculateLeaderboard], Result>;
  createGolfCourse: ActorMethod<[CreateGolfCourse], Result>;
  createGolfer: ActorMethod<[CreateGolfer], Result>;
  createProfile: ActorMethod<[CreateProfile], Result>;
  createTournament: ActorMethod<[CreateTournament], Result>;
  getAppStatus: ActorMethod<[], Result_12>;
  getGolfCourse: ActorMethod<[GetGolfCourse], Result_11>;
  getGolfer: ActorMethod<[GetGolfer], Result_10>;
  getLeaderboard: ActorMethod<[GetFantasyLeaderboard], Result_9>;
  getPrediction: ActorMethod<[GetPrediction], Result_8>;
  getProfile: ActorMethod<[GetProfile], Result_7>;
  getScorecard: ActorMethod<[GetScorecard], Result_6>;
  getTournament: ActorMethod<[GetTournament], Result_5>;
  listGolfCourses: ActorMethod<[ListGolfCourses], Result_4>;
  listGolfers: ActorMethod<[ListGolfers], Result_3>;
  listPredictions: ActorMethod<[ListPredictions], Result_2>;
  listTournaments: ActorMethod<[ListTournaments], Result_1>;
  submitPrediction: ActorMethod<[SubmitPrediction], Result>;
  swapGolfer: ActorMethod<[SwapGolfer], Result>;
  updateAppStatus: ActorMethod<[UpdateAppStatus], Result>;
  updateGolfCourse: ActorMethod<[UpdateGolfCourse], Result>;
  updateGolfer: ActorMethod<[UpdateGolfer], Result>;
  updateProfilePicture: ActorMethod<[UpdateProfilePicture], Result>;
  updateTournamentStage: ActorMethod<[UpdateTournamentStage], Result>;
  updateUsername: ActorMethod<[UpdateUsername], Result>;
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
