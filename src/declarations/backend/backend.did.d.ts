import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";
import type { IDL } from "@dfinity/candid";

export interface AcceptFriendRequest {
  principalId: GolferId;
  requestedBy: GolferId;
}
export interface AppStatusDTO {
  version: string;
  onHold: boolean;
}
export type CanisterId = string;
export interface CreateGolfCourse {
  holes: Array<Hole>;
  name: string;
  initialTeeGroup: TeeGroup;
}
export interface CreateGolfer {
  username: string;
  profilePictureExtension: [] | [string];
  profilePicture: [] | [Uint8Array | number[]];
  handicap: [] | [Handicap];
  principalId: GolferId;
}
export type Error =
  | { InvalidProfilePicture: null }
  | { DecodeError: null }
  | { TooLong: null }
  | { NotAllowed: null }
  | { NotEnoughFunds: null }
  | { TooShort: null }
  | { NotFound: null }
  | { NotAuthorized: null }
  | { AlreadyExists: null }
  | { CreateGameError: null }
  | { OutOfRange: null }
  | { PaymentError: null }
  | { CanisterFull: null };
export interface FriendRequestDTO {
  requestTime: bigint;
  principalId: GolferId;
}
export interface FriendRequestsDTO {
  friendRequests: Array<FriendRequestDTO>;
}
export interface GetGolfCourses {
  offset: bigint;
  limit: bigint;
  searchTerm: string;
}
export type GolfCourseId = bigint;
export type GolfCourses = {};
export type GolferId = string;
export type Handicap = number;
export interface Hole {
  name: string;
  tees: Array<TeeInfo>;
  number: number;
  images: Array<[CanisterId, ImageId]>;
}
export type ImageId = bigint;
export interface ListFriendRequests {
  totalEntries: bigint;
  offset: bigint;
  limit: bigint;
  principalId: GolferId;
}
export interface RejectFriendRequest {
  principalId: GolferId;
  requestedBy: GolferId;
}
export type Result = { ok: null } | { err: Error };
export type Result_1 = { ok: FriendRequestsDTO } | { err: Error };
export type Result_2 = { ok: GolfCourses } | { err: Error };
export type Result_3 = { ok: AppStatusDTO } | { err: Error };
export type RustResult = { Ok: string } | { Err: string };
export interface SendFriendRequest {
  requestedFriend: GolferId;
  principalId: GolferId;
}
export interface TeeGroup {
  added: bigint;
  holes: Array<Hole>;
  name: string;
  colour: string;
  strokeIndex: number;
}
export interface TeeInfo {
  par: number;
  name: string;
  yardage: bigint;
  colour: string;
  strokeIndex: number;
}
export interface UpdateGolfCourse {
  name: string;
  updatedTeeGroup: [] | [TeeGroup];
  courseId: GolfCourseId;
}
export interface UpdateHandicap {
  handicap: [] | [Handicap];
  principalId: GolferId;
}
export interface UpdateHomeCourse {
  homeCourseId: [] | [GolfCourseId];
  principalId: GolferId;
}
export interface UpdateProfilePicture {
  profilePictureExtension: string;
  profilePicture: [] | [Uint8Array | number[]];
  principalId: GolferId;
}
export interface UpdateUsername {
  username: string;
  principalId: GolferId;
}
export interface _SERVICE {
  acceptFriendRequest: ActorMethod<[AcceptFriendRequest], Result>;
  createGolfer: ActorMethod<[CreateGolfer], Result>;
  executeAddGolfCourse: ActorMethod<[CreateGolfCourse], undefined>;
  executeUpdateGolfCourse: ActorMethod<[UpdateGolfCourse], undefined>;
  getAppStatus: ActorMethod<[], Result_3>;
  getGolfCourses: ActorMethod<[GetGolfCourses], Result_2>;
  listFriendRequests: ActorMethod<[ListFriendRequests], Result_1>;
  rejectFriendRequest: ActorMethod<[RejectFriendRequest], Result>;
  sendFriendRequest: ActorMethod<[SendFriendRequest], Result>;
  updateHandicap: ActorMethod<[UpdateHandicap], Result>;
  updateHomeCourse: ActorMethod<[UpdateHomeCourse], Result>;
  updateProfilePicture: ActorMethod<[UpdateProfilePicture], Result>;
  updateUsername: ActorMethod<[UpdateUsername], Result>;
  validateAddGolfCourse: ActorMethod<[CreateGolfCourse], RustResult>;
  validateUpdateGolfCourse: ActorMethod<[UpdateGolfCourse], RustResult>;
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
