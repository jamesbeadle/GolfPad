import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";
import type { IDL } from "@dfinity/candid";

export interface AcceptFriendRequest {
  principalId: GolferId;
  requestedBy: GolferId;
}
export interface AcceptGameInvite {
  gameId: GameId;
  acceptedById: GolferId;
}
export interface AddGameScore {
  submittedById: GolferId;
  gameId: GameId;
  detail: GameScoreSubmission;
}
export interface AddShot {
  principalId: PrincipalId;
}
export interface AppStatusDTO {
  version: string;
  onHold: boolean;
}
export interface BandsPrediction {
  wontHitTreeOrBunkerStartHole: HoleNumber;
  underParStartHole: HoleNumber;
  golferId: GolferId;
  wontDoubleBogeyStartHole: HoleNumber;
  singlePutt2Of3GreensStartHole: HoleNumber;
  wontBogeyStartHole: HoleNumber;
  parOrUnderStartHole: HoleNumber;
  hit2Of3FairwaysStartHole: HoleNumber;
  hit2Of3GreensStartHole: HoleNumber;
  wontLoseBallStartHole: HoleNumber;
}
export interface BeginGame {
  gameId: GameId;
}
export interface CreateGame {
  name: string;
  inviteIds: Array<GolferId>;
  createdById: GolferId;
  teeOffTime: bigint;
  courseVersion: GolfCourseVersion;
  gameType: GameType;
  courseId: GolfCourseId;
  teeGroup: TeeGroup;
}
export interface CreateGolfChannel {
  name: string;
  createdById: GolferId;
}
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
export interface DeleteGame {
  gameId: GameId;
}
export interface DeleteGolfChannel {
  channelId: GolfChannelId;
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
export interface Game {
  id: GameId;
  playerIds: Array<GolferId>;
  status: GameStatus;
  scoreDetail: [] | [GameScoreDetail];
  invites: Array<GolferId>;
  predictions: Array<GamePrediction>;
  winner: GolferId;
  teeOffTime: bigint;
  courseSnapshot: GolfCourseSnapshot;
  events: Array<GolferEvent>;
  gameType: GameType;
  courseId: GolfCourseId;
}
export type GameId = bigint;
export type GamePrediction =
  | { Mulligans: MulligansPrediction }
  | { BuildIt: {} }
  | { Bands: BandsPrediction }
  | { NextUp: {} };
export type GameScoreDetail = { MulligansScores: MulligansScores };
export type GameScoreSubmission = { MulligansScores: MulligansScore };
export type GameStatus =
  | { Unplayed: null }
  | { Active: null }
  | { Complete: null };
export type GameType =
  | { Mulligans: null }
  | { BuildIt: null }
  | { Bands: null }
  | { NextUp: null }
  | { Prophet: null };
export interface GetGame {
  gameId: GameId;
}
export interface GetGolfChannel {
  channelId: GolfChannelId;
}
export interface GetGolfChannelVideo {
  channelId: GolfChannelId;
}
export interface GetGolfChannelVideos {
  channelId: GolfChannelId;
  page: bigint;
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
export interface GetShot {
  principalId: PrincipalId;
}
export interface GolfChannel {
  channelId: GolfChannelId;
  name: string;
}
export type GolfChannelId = bigint;
export interface GolfChannelVideo {
  channelId: GolfChannelId;
}
export interface GolfChannelVideos {
  channelId: GolfChannelId;
}
export interface GolfCourse {
  activeVersion: GolfCourseVersion;
  name: string;
  tees: Array<TeeGroup>;
  courseId: GolfCourseId;
}
export type GolfCourseId = bigint;
export interface GolfCourseSnapshot {
  courseVersion: GolfCourseVersion;
  courseId: GolfCourseId;
  teeGroup: TeeGroup;
}
export type GolfCourseVersion = number;
export interface GolfCourses {
  entries: Array<GolfCourse>;
}
export type GolfEvent =
  | { Par: null }
  | { Scrub: null }
  | { DoubleBogey: null }
  | { Birdie: null }
  | { BallNotLost: null }
  | { Bogey: null }
  | { HitFairway: null }
  | { Albatross: null }
  | { HitBunker: null }
  | { HitTree: null }
  | { HitGreen: null }
  | { TakeMulligan: null }
  | { HitWater: null }
  | { LongestDrive: null }
  | { Eagle: null }
  | { OnePuttGreen: null };
export interface GolferEvent {
  golferId: GolferId;
  hole: HoleNumber;
  event: GolfEvent;
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
  images: Array<HoleImage>;
}
export interface HoleImage {
  owner: GolferId;
  uploaded: bigint;
  image: Uint8Array | number[];
}
export type HoleNumber = number;
export interface InviteGolfers {
  gameId: GameId;
  invitedGolferIds: Array<GolferId>;
}
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
export interface MulligansHoleResult {
  golfer2MulliganUsed: boolean;
  winner: GolferId;
  golfer1MulliganUsed: boolean;
  holeNumber: HoleNumber;
}
export type MulligansPrediction = {};
export interface MulligansScore {
  golfer2MulliganUsed: boolean;
  winner: GolferId;
  golfer1MulliganUsed: boolean;
  holeNumber: HoleNumber;
}
export interface MulligansScores {
  winner: GolferId;
  results: Array<MulligansHoleResult>;
  golfer2HolesWonCount: number;
  golfer1HolesWonCount: number;
}
export interface PredictShot {
  principalId: PrincipalId;
}
export type PredictedShot = {};
export type PrincipalId = string;
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
export interface RejectGameInvite {
  rejectedById: GolferId;
  gameId: GameId;
}
export interface RemoveGolfChannelVideo {
  channelId: GolfChannelId;
}
export type Result = { ok: null } | { err: Error };
export type Result_1 = { ok: PredictedShot } | { err: Error };
export type Result_10 = { ok: GolfChannelVideos } | { err: Error };
export type Result_11 = { ok: GolfChannelVideo } | { err: Error };
export type Result_12 = { ok: GolfChannel } | { err: Error };
export type Result_13 = { ok: Game } | { err: Error };
export type Result_14 = { ok: AppStatusDTO } | { err: Error };
export type Result_15 = { ok: GolfChannelId } | { err: Error };
export type Result_16 = { ok: GameId } | { err: Error };
export type Result_2 = { ok: Golfers } | { err: Error };
export type Result_3 = { ok: Friends } | { err: Error };
export type Result_4 = { ok: FriendRequests } | { err: Error };
export type Result_5 = { ok: UsernameAvailable } | { err: Error };
export type Result_6 = { ok: Shot } | { err: Error };
export type Result_7 = { ok: Profile } | { err: Error };
export type Result_8 = { ok: GolfCourses } | { err: Error };
export type Result_9 = { ok: GolfCourse } | { err: Error };
export type RustResult = { Ok: string } | { Err: string };
export interface SendFriendRequest {
  requestedFriend: GolferId;
  principalId: GolferId;
}
export type Shot = {};
export interface SubscribeToGolfChannel {
  channelId: GolfChannelId;
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
export interface UnsubscribeFromGolfChannel {
  channelId: GolfChannelId;
  principalId: GolferId;
}
export interface UpdateFirstName {
  principalId: GolferId;
  firstName: string;
}
export interface UpdateGame {
  gameId: GameId;
}
export interface UpdateGolfChannel {
  channelId: GolfChannelId;
  name: string;
  channelBanner: [] | [Uint8Array | number[]];
  channelBannerExtension: string;
  channelImageExtension: string;
  channelImage: [] | [Uint8Array | number[]];
}
export interface UpdateGolfChannelVideo {
  channelId: GolfChannelId;
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
export interface UploadGolfChannelVideo {
  channelId: GolfChannelId;
}
export type UsernameAvailable = boolean;
export interface _SERVICE {
  acceptFriendRequest: ActorMethod<[AcceptFriendRequest], Result>;
  acceptGameInvite: ActorMethod<[AcceptGameInvite], Result>;
  addGameScore: ActorMethod<[AddGameScore], Result>;
  addShot: ActorMethod<[AddShot], Result>;
  beginGame: ActorMethod<[BeginGame], Result>;
  createGame: ActorMethod<[CreateGame], Result_16>;
  createGolfChannel: ActorMethod<[CreateGolfChannel], Result_15>;
  createUser: ActorMethod<[CreateUser], Result>;
  deleteGame: ActorMethod<[DeleteGame], Result>;
  deleteGolfChannel: ActorMethod<[DeleteGolfChannel], Result>;
  executeAddGolfCourse: ActorMethod<[CreateGolfCourse], undefined>;
  executeUpdateGolfCourse: ActorMethod<[UpdateGolfCourse], undefined>;
  getAppStatus: ActorMethod<[], Result_14>;
  getGame: ActorMethod<[GetGame], Result_13>;
  getGolfChannel: ActorMethod<[GetGolfChannel], Result_12>;
  getGolfChannelVideo: ActorMethod<[GetGolfChannelVideo], Result_11>;
  getGolfChannelVideos: ActorMethod<[GetGolfChannelVideos], Result_10>;
  getGolfCourse: ActorMethod<[GetGolfCourse], Result_9>;
  getGolfCourses: ActorMethod<[GetGolfCourses], Result_8>;
  getProfile: ActorMethod<[GetProfile], Result_7>;
  getShot: ActorMethod<[GetShot], Result_6>;
  inviteGolfers: ActorMethod<[InviteGolfers], Result>;
  isUsernameAvailable: ActorMethod<[IsUsernameAvailable], Result_5>;
  listFriendRequests: ActorMethod<[ListFriendRequests], Result_4>;
  listFriends: ActorMethod<[ListFriends], Result_3>;
  listGolfers: ActorMethod<[ListGolfers], Result_2>;
  predictShot: ActorMethod<[PredictShot], Result_1>;
  rejectFriendRequest: ActorMethod<[RejectFriendRequest], Result>;
  rejectGameInvite: ActorMethod<[RejectGameInvite], Result>;
  removeGolfChannelVideo: ActorMethod<[RemoveGolfChannelVideo], Result>;
  sendFriendRequest: ActorMethod<[SendFriendRequest], Result>;
  subscribeToGolfChannel: ActorMethod<[SubscribeToGolfChannel], Result>;
  unsubscribeFromGolfChannel: ActorMethod<[UnsubscribeFromGolfChannel], Result>;
  updateFirstName: ActorMethod<[UpdateFirstName], Result>;
  updateGame: ActorMethod<[UpdateGame], Result>;
  updateGolfChannel: ActorMethod<[UpdateGolfChannel], Result>;
  updateGolfChannelVideo: ActorMethod<[UpdateGolfChannelVideo], Result>;
  updateHandicap: ActorMethod<[UpdateHandicap], Result>;
  updateHomeCourse: ActorMethod<[UpdateHomeCourse], Result>;
  updateLastName: ActorMethod<[UpdateLastName], Result>;
  updateProfilePicture: ActorMethod<[UpdateProfilePicture], Result>;
  updateUsername: ActorMethod<[UpdateUsername], Result>;
  uploadGolfChannelVideo: ActorMethod<[UploadGolfChannelVideo], Result>;
  validateAddGolfCourse: ActorMethod<[CreateGolfCourse], RustResult>;
  validateUpdateGolfCourse: ActorMethod<[UpdateGolfCourse], RustResult>;
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
