import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";
import type { IDL } from "@dfinity/candid";

export interface AcceptFriendRequest {
  principalId: PrincipalId;
  requestedBy: PrincipalId;
}
export interface AcceptGameInvite {
  gameId: GameId;
  acceptedById: PrincipalId;
}
export interface AddGameScore {
  submittedById: PrincipalId;
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
  golferId: PrincipalId;
  wontDoubleBogeyStartHole: HoleNumber;
  singlePutt2Of3GreensStartHole: HoleNumber;
  wontBogeyStartHole: HoleNumber;
  parOrUnderStartHole: HoleNumber;
  hit2Of3FairwaysStartHole: HoleNumber;
  hit2Of3GreensStartHole: HoleNumber;
  wontLoseBallStartHole: HoleNumber;
}
export interface BandsResultInfo {
  holesPlayed: number;
  players: Array<PlayerFeedSummary>;
  points: [PrincipalId, bigint];
}
export interface BeginGame {
  gameId: GameId;
}
export interface BuildItResultInfo {
  teams: Array<TeamFeedSummary>;
  scores: [GolfTeamId, bigint];
}
export interface BuzzEntries {
  page: bigint;
  entries: Array<BuzzEntry>;
}
export interface BuzzEntry {
  course_info: CourseInfo;
  match_result: MatchResultInfo;
  game_info: GameInfo;
}
export interface CourseInfo {
  course_name: string;
  course_id: GolfCourseId;
  course_image: Uint8Array | number[];
}
export interface CreateGame {
  name: string;
  inviteIds: Array<PrincipalId>;
  createdById: PrincipalId;
  teeOffTime: bigint;
  courseVersion: GolfCourseVersion;
  gameType: GameType;
  courseId: GolfCourseId;
  teeGroup: TeeGroup;
}
export interface CreateGolfChannel {
  name: string;
  createdById: PrincipalId;
}
export interface CreateGolfCourse {
  holes: Array<Hole>;
  name: string;
  initialTeeGroup: TeeGroup;
  bannerImage: Uint8Array | number[];
  mainImage: Uint8Array | number[];
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
  | { InvalidGolfTeamPicture: null }
  | { NotFound: null }
  | { NotAuthorized: null }
  | { AlreadyExists: null }
  | { CreateGameError: null }
  | { OutOfRange: null }
  | { PaymentError: null }
  | { CanisterFull: null };
export interface Friend {
  principalId: PrincipalId;
}
export interface FriendRequest {
  requestTime: bigint;
  principalId: PrincipalId;
}
export interface FriendRequests {
  friendRequests: Array<FriendRequest>;
}
export interface Friends {
  friendRequests: Array<Friend>;
}
export interface Game {
  id: GameId;
  playerIds: Array<PrincipalId>;
  status: GameStatus;
  scoreDetail: [] | [GameScoreDetail];
  invites: Array<PrincipalId>;
  predictions: Array<GamePrediction>;
  winner: PrincipalId;
  teeOffTime: bigint;
  courseSnapshot: GolfCourseSnapshot;
  events: Array<GolferEvent>;
  gameType: GameType;
  courseId: GolfCourseId;
}
export type GameId = bigint;
export interface GameInfo {
  game_id: GameId;
  game_date: bigint;
  game_type: GameType;
}
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
  | { NextUp: null };
export interface GetBuzzEntries {
  page: bigint;
  user_id: PrincipalId;
}
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
  principalId: PrincipalId;
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
  mainImage: Uint8Array | number[];
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
export type GolfTeamId = bigint;
export interface GolferEvent {
  golferId: PrincipalId;
  hole: HoleNumber;
  event: GolfEvent;
}
export interface GolferSummary {
  golferPrincipalId: PrincipalId;
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
  owner: PrincipalId;
  uploaded: bigint;
  image: Uint8Array | number[];
}
export type HoleNumber = number;
export interface InviteGolfers {
  gameId: GameId;
  invitedGolferIds: Array<PrincipalId>;
}
export interface IsUsernameAvailable {
  username: string;
  principalId: PrincipalId;
}
export interface ListFriendRequests {
  totalEntries: bigint;
  offset: bigint;
  limit: bigint;
  principalId: PrincipalId;
}
export interface ListFriends {
  totalEntries: bigint;
  offset: bigint;
  limit: bigint;
  principalId: PrincipalId;
}
export interface ListGolfers {
  totalEntries: bigint;
  offset: bigint;
  limit: bigint;
  searchTerm: string;
}
export type MatchResultInfo =
  | { Mulligans: MulligansResultInfo }
  | { BuildIt: BuildItResultInfo }
  | { Bands: BandsResultInfo }
  | { NextUp: NextUpResultInfo };
export interface MulligansHoleResult {
  golfer2MulliganUsed: boolean;
  winner: PrincipalId;
  golfer1MulliganUsed: boolean;
  holeNumber: HoleNumber;
}
export type MulligansPrediction = {};
export interface MulligansResultInfo {
  holesPlayed: number;
  score: number;
  players: Array<PlayerFeedSummary>;
}
export interface MulligansScore {
  golfer2MulliganUsed: boolean;
  winner: PrincipalId;
  golfer1MulliganUsed: boolean;
  holeNumber: HoleNumber;
}
export interface MulligansScores {
  winner: PrincipalId;
  results: Array<MulligansHoleResult>;
  golfer2HolesWonCount: number;
  golfer1HolesWonCount: number;
}
export interface NextUpResultInfo {
  holesPlayed: number;
  players: Array<PlayerFeedSummary>;
  points: [PrincipalId, bigint];
}
export interface PlayerFeedSummary {
  username: string;
  profile_picture: [] | [Uint8Array | number[]];
  principal_id: PrincipalId;
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
  principalId: PrincipalId;
}
export interface RejectFriendRequest {
  principalId: PrincipalId;
  requestedBy: PrincipalId;
}
export interface RejectGameInvite {
  rejectedById: PrincipalId;
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
export type Result_14 = { ok: BuzzEntries } | { err: Error };
export type Result_15 = { ok: AppStatusDTO } | { err: Error };
export type Result_16 = { ok: GolfChannelId } | { err: Error };
export type Result_17 = { ok: GameId } | { err: Error };
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
  requestedFriend: PrincipalId;
  principalId: PrincipalId;
}
export type Shot = {};
export interface SubscribeToGolfChannel {
  channelId: GolfChannelId;
  principalId: PrincipalId;
}
export interface TeamFeedSummary {
  team_image: [] | [Uint8Array | number[]];
  team_name: string;
  team_members: Array<PrincipalId>;
  captain_id: PrincipalId;
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
  principalId: PrincipalId;
}
export interface UpdateFirstName {
  principalId: PrincipalId;
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
  principalId: PrincipalId;
}
export interface UpdateHomeCourse {
  homeCourseId: [] | [GolfCourseId];
  principalId: PrincipalId;
}
export interface UpdateLastName {
  lastName: string;
  principalId: PrincipalId;
}
export interface UpdateProfilePicture {
  profilePictureExtension: string;
  profilePicture: [] | [Uint8Array | number[]];
  principalId: PrincipalId;
}
export interface UpdateUsername {
  username: string;
  principalId: PrincipalId;
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
  createGame: ActorMethod<[CreateGame], Result_17>;
  createGolfChannel: ActorMethod<[CreateGolfChannel], Result_16>;
  createUser: ActorMethod<[CreateUser], Result>;
  deleteGame: ActorMethod<[DeleteGame], Result>;
  deleteGolfChannel: ActorMethod<[DeleteGolfChannel], Result>;
  executeAddGolfCourse: ActorMethod<[CreateGolfCourse], undefined>;
  executeUpdateGolfCourse: ActorMethod<[UpdateGolfCourse], undefined>;
  getAppStatus: ActorMethod<[], Result_15>;
  getBuzzEntries: ActorMethod<[GetBuzzEntries], Result_14>;
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
