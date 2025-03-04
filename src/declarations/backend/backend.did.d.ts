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
export interface CreateUser {
  username: string;
  profilePictureExtension: [] | [string];
  profilePicture: [] | [Uint8Array | number[]];
  handicap: [] | [Handicap];
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
export interface Friend {
  principalId: GolferId;
}
export interface FriendRequest {
  requestTime: bigint;
  principalId: GolferId;
}
export interface FriendRequests {
  friendRequests: Array<FriendRequest>;
}
export interface Friends {
  friendRequests: Array<Friend>;
}
export interface GetGolfCourse {
  golfCourseId: GolfCourseId;
}
export interface GetGolfCourses {
  offset: bigint;
  limit: bigint;
  searchTerm: string;
}
export interface GetProfile {
  principalId: GolferId;
}
export interface GolfCourse {
  activeVersion: GolfCourseVersion;
  name: string;
  tees: Array<TeeGroup>;
  courseId: GolfCourseId;
}
export type GolfCourseId = bigint;
export type GolfCourseVersion = number;
export interface GolfCourses {
  entries: Array<GolfCourse>;
}
export type GolferId = string;
export interface GolferSummary {
  golferPrincipalId: GolferId;
  golferPicture: [] | [Uint8Array | number[]];
  golferName: string;
  handicap: [] | [Handicap];
  golferPictureExtension: string;
}
export interface Golfers {
  golfers: Array<GolferSummary>;
}
export type Handicap = number;
export interface Hole {
  name: string;
  tees: Array<TeeInfo>;
  number: number;
  images: Array<[CanisterId, ImageId]>;
}
export type ImageId = bigint;
export interface IsUsernameAvailable {
  username: string;
  principalId: GolferId;
}
export interface ListFriendRequests {
  totalEntries: bigint;
  offset: bigint;
  limit: bigint;
  principalId: GolferId;
}
export interface ListFriends {
  totalEntries: bigint;
  offset: bigint;
  limit: bigint;
  principalId: GolferId;
}
export interface ListGolfers {
  totalEntries: bigint;
  offset: bigint;
  limit: bigint;
  searchTerm: string;
}
export interface Profile {
  username: string;
  golferPicture: [] | [Uint8Array | number[]];
  handicap: [] | [Handicap];
  golferPictureExtension: string;
  principalId: GolferId;
}
export interface RejectFriendRequest {
  principalId: GolferId;
  requestedBy: GolferId;
}
export type Result = { ok: null } | { err: Error };
export type Result_1 = { ok: Golfers } | { err: Error };
export type Result_2 = { ok: Friends } | { err: Error };
export type Result_3 = { ok: FriendRequests } | { err: Error };
export type Result_4 = { ok: UsernameAvailable } | { err: Error };
export type Result_5 = { ok: Profile } | { err: Error };
export type Result_6 = { ok: GolfCourses } | { err: Error };
export type Result_7 = { ok: GolfCourse } | { err: Error };
export type Result_8 = { ok: AppStatusDTO } | { err: Error };
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
export interface UpdateFirstName {
  principalId: GolferId;
  firstName: string;
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
export interface UpdateLastName {
  lastName: string;
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
export type UsernameAvailable = boolean;
export interface _SERVICE {
  acceptFriendRequest: ActorMethod<[AcceptFriendRequest], Result>;
  createUser: ActorMethod<[CreateUser], Result>;
  executeAddGolfCourse: ActorMethod<[CreateGolfCourse], undefined>;
  executeUpdateGolfCourse: ActorMethod<[UpdateGolfCourse], undefined>;
  getAppStatus: ActorMethod<[], Result_8>;
  getGolfCourse: ActorMethod<[GetGolfCourse], Result_7>;
  getGolfCourses: ActorMethod<[GetGolfCourses], Result_6>;
  getProfile: ActorMethod<[GetProfile], Result_5>;
  isUsernameAvailable: ActorMethod<[IsUsernameAvailable], Result_4>;
  listFriendRequests: ActorMethod<[ListFriendRequests], Result_3>;
  listFriends: ActorMethod<[ListFriends], Result_2>;
  listGolfers: ActorMethod<[ListGolfers], Result_1>;
  rejectFriendRequest: ActorMethod<[RejectFriendRequest], Result>;
  sendFriendRequest: ActorMethod<[SendFriendRequest], Result>;
  updateFirstName: ActorMethod<[UpdateFirstName], Result>;
  updateHandicap: ActorMethod<[UpdateHandicap], Result>;
  updateHomeCourse: ActorMethod<[UpdateHomeCourse], Result>;
  updateLastName: ActorMethod<[UpdateLastName], Result>;
  updateProfilePicture: ActorMethod<[UpdateProfilePicture], Result>;
  updateUsername: ActorMethod<[UpdateUsername], Result>;
  validateAddGolfCourse: ActorMethod<[CreateGolfCourse], RustResult>;
  validateUpdateGolfCourse: ActorMethod<[UpdateGolfCourse], RustResult>;
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
