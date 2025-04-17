import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";
import type { IDL } from "@dfinity/candid";

export interface AppStatus {
  version: string;
  onHold: boolean;
}
export type CountryId = number;
export interface CreateGolfCourse {
  holes: Array<GolfHole>;
}
export interface CreateGolfer {
  username: string;
  lastName: string;
}
export interface CreateProfile {
  username: string;
  profilePicture: [] | [Uint8Array | number[]];
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
export interface GetGolfCourse {
  id: GolfCourseId;
}
export interface GetGolfer {
  golferId: GolferId;
}
export type GetLeaderboard = {};
export type GetPrediction = {};
export type GetProfile = {};
export interface GetScorecard {
  principalId: PrincipalId;
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
export interface GolfHole {
  yardage: number;
  strokeIndex: number;
  holeNumber: number;
}
export interface Golfer {
  id: GolferId;
  lastName: string;
  firstName: string;
}
export type GolferId = number;
export type Leaderboard = {};
export type Prediction = {};
export type PrincipalId = string;
export interface Profile {
  username: string;
  joinedOn: bigint;
  principalId: PrincipalId;
}
export type Result = { ok: null } | { err: Error };
export type Result_1 = { ok: Leaderboard } | { err: Error };
export type Result_2 = { ok: Profile } | { err: Error };
export type Result_3 = { ok: Prediction } | { err: Error };
export type Result_4 = { ok: Golfer } | { err: Error };
export type Result_5 = { ok: GolfCourse } | { err: Error };
export type Result_6 = { ok: AppStatus } | { err: Error };
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
export type TournamentId = number;
export type UpdateGolfCourse = {};
export interface UpdateGolfer {
  lastName: string;
  firstName: string;
}
export interface UpdateProfilePicture {
  profilePicture: [] | [Uint8Array | number[]];
}
export type UpdateTournamentStage = {};
export interface UpdateUsername {
  username: string;
}
export interface _SERVICE {
  createGolfCourse: ActorMethod<[CreateGolfCourse], Result>;
  createGolfer: ActorMethod<[CreateGolfer], Result>;
  createProfile: ActorMethod<[CreateProfile], Result>;
  getAppStatus: ActorMethod<[], Result_6>;
  getGolfCourse: ActorMethod<[GetGolfCourse], Result_5>;
  getGolfer: ActorMethod<[GetGolfer], Result_4>;
  getLeaderboard: ActorMethod<[GetLeaderboard], Result_1>;
  getPrediction: ActorMethod<[GetPrediction], Result_3>;
  getProfile: ActorMethod<[GetProfile], Result_2>;
  getScorecard: ActorMethod<[GetScorecard], Result_1>;
  submitPrediction: ActorMethod<[SubmitPrediction], Result>;
  swapGolfer: ActorMethod<[SwapGolfer], Result>;
  updateGolfCourse: ActorMethod<[UpdateGolfCourse], Result>;
  updateGolfer: ActorMethod<[UpdateGolfer], Result>;
  updateProfilePicture: ActorMethod<[UpdateProfilePicture], Result>;
  updateTournamentStage: ActorMethod<[UpdateTournamentStage], Result>;
  updateUsername: ActorMethod<[UpdateUsername], Result>;
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
