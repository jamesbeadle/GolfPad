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
export interface AcceptTeamRequest {
  acceptingPrincipalId: PrincipalId;
  golfTeamId: GolfTeamId;
}
export interface AddGameScore {
  submittedById: PrincipalId;
  gameId: GameId;
  detail: GameScoreSubmission;
}
export interface AddGolfTeamMember {
  addTeamMember: PrincipalId;
  golfTeamId: GolfTeamId;
}
export interface AddShot {
  club: GolfClub;
  yardage: bigint;
  principalId: PrincipalId;
}
export interface AppStatusDTO {
  version: string;
  onHold: boolean;
}
export interface AverageShot {
  club: GolfClub;
  yardage: bigint;
  index: number;
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
  players: Array<PlayerFeedSummary__1>;
  points: [PrincipalId, bigint];
}
export interface BeginGame {
  gameId: GameId;
}
export interface BuildItResultInfo {
  teams: Array<TeamFeedSummary__1>;
  scores: [GolfTeamId, bigint];
}
export interface Buzz {
  total: bigint;
  page: bigint;
  pageSize: bigint;
  entries: Array<BuzzEntry>;
}
export interface BuzzEntry {
  course_info: CourseInfo__1;
  match_result: MatchResultInfo;
  game_info: GameInfo__1;
}
export interface ClubShots {
  total: bigint;
  club: GolfClub;
  page: bigint;
  pageSize: bigint;
  entries: Array<GolfShot>;
}
export interface CourseInfo {
  course_name: string;
  course_id: GolfCourseId;
  course_image: Uint8Array | number[];
}
export interface CourseInfo__1 {
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
  totalHoles: number;
  name: string;
  initialTeeGroup: TeeGroup;
  bannerImage: Uint8Array | number[];
  mainImage: Uint8Array | number[];
}
export interface CreateGolfTeam {
  createdById: PrincipalId;
  golfTeamName: string;
  golfTeamPicture: [] | [Uint8Array | number[]];
  golfTeamPictureExtension: string;
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
export interface DeleteGolfTeam {
  confirm: boolean;
  golfTeamId: GolfTeamId;
}
export interface DeleteShot {
  golfShotId: GolfShotId;
  principalId: PrincipalId;
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
export interface GameInfo__1 {
  game_id: GameId;
  game_date: bigint;
  game_type: GameType;
}
export interface GameInvite {
  gameId: GameId;
  inviteFrom: PrincipalId;
}
export interface GameInvite__1 {
  invited: PrincipalId;
  gameId: GameId;
  sentBy: PrincipalId;
  sentOn: bigint;
}
export interface GameInvites {
  total: bigint;
  page: bigint;
  pageSize: bigint;
  entries: Array<GameInvite__1>;
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
export interface GameSummaries {
  total: bigint;
  page: bigint;
  pageSize: bigint;
  entries: Array<GameSummary>;
}
export interface GameSummary {
  id: GameId;
}
export type GameType =
  | { Mulligans: null }
  | { BuildIt: null }
  | { Bands: null }
  | { NextUp: null };
export interface GetBuzz {
  page: bigint;
  principalId: PrincipalId;
}
export interface GetClubShots {
  club: GolfClub;
  page: bigint;
  principalId: PrincipalId;
}
export interface GetFriendRequests {
  totalEntries: bigint;
  offset: bigint;
  limit: bigint;
  principalId: PrincipalId;
}
export interface GetFriends {
  totalEntries: bigint;
  offset: bigint;
  limit: bigint;
  principalId: PrincipalId;
}
export interface GetGame {
  gameId: GameId;
}
export interface GetGameInvites {
  principalId: PrincipalId;
}
export interface GetGameSummaries {
  page: bigint;
  principalId: PrincipalId;
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
export interface GetGolfChannels {
  page: bigint;
  searchTerm: string;
  principalId: PrincipalId;
}
export interface GetGolfCourse {
  golfCourseId: GolfCourseId;
}
export interface GetGolfCourses {
  page: bigint;
  searchTerm: string;
  principalId: PrincipalId;
}
export interface GetGolfTeamRequests {
  principalId: PrincipalId;
}
export interface GetGolfTeams {
  page: bigint;
  searchTerm: string;
  principalId: PrincipalId;
}
export interface GetGolfer {
  principalId: PrincipalId;
}
export interface GetGolfers {
  page: bigint;
  searchTerm: string;
  principalId: PrincipalId;
}
export interface GetProfile {
  principalId: PrincipalId;
}
export interface GetShotAverages {
  principalId: PrincipalId;
}
export interface GetUpcomingGames {
  page: bigint;
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
export interface GolfChannels {
  total: bigint;
  page: bigint;
  pageSize: bigint;
  entries: Array<GolfChannel>;
}
export type GolfClub =
  | { AW: null }
  | { GW: null }
  | { LW: null }
  | { PW: null }
  | { SW: null }
  | { EIGHT_IRON: null }
  | { TWO_HYBRID: null }
  | { THREE_HYBRID: null }
  | { TWO_IRON: null }
  | { THREE_IRON: null }
  | { FIVE_IRON: null }
  | { THREE_WOOD: null }
  | { FIVE_WOOD: null }
  | { SIX_IRON: null }
  | { FOUR_HYBRID: null }
  | { DRIVER: null }
  | { SEVEN_IRON: null }
  | { NINE_IRON: null }
  | { SEVEN_WOOD: null }
  | { NINE_WOOD: null }
  | { FOUR_IRON: null }
  | { FIVE_HYBRID: null };
export interface GolfCourse {
  totalHoles: number;
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
  total: bigint;
  page: bigint;
  pageSize: bigint;
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
export interface GolfShot {
  id: GolfShotId;
  hitOn: bigint;
  club: GolfClub;
  yardage: bigint;
}
export type GolfShotId = bigint;
export interface GolfTeam {
  golfTeamName: string;
  golfTeamId: GolfTeamId;
  golfTeamPicture: [] | [Uint8Array | number[]];
  golfTeamPictureExtension: string;
}
export type GolfTeamId = bigint;
export interface GolfTeamRequests {
  principalId: PrincipalId;
}
export interface GolfTeams {
  total: bigint;
  page: bigint;
  pageSize: bigint;
  entries: Array<GolfTeam>;
}
export interface Golfer {
  username: string;
  gameInvites: Array<GameInvite>;
  upcomingGames: Array<GameId>;
  golferPicture: [] | [Uint8Array | number[]];
  completedGames: Array<GameId>;
  handicap: [] | [Handicap];
  golferPictureExtension: string;
  principalId: PrincipalId;
  activeGames: Array<GameId>;
}
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
  total: bigint;
  page: bigint;
  pageSize: bigint;
  entries: Array<GolferSummary>;
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
  player2Wins: boolean;
  score: number;
  players: Array<PlayerFeedSummary__1>;
  gameOver: boolean;
  player1Wins: boolean;
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
  players: Array<PlayerFeedSummary__1>;
  points: [PrincipalId, bigint];
}
export type OpponentInfo =
  | { Mulligans: PlayerOpponentInfo }
  | { BuildIt: TeamOpponentInfo }
  | { Bands: PlayerOpponentInfo }
  | { NextUp: PlayerOpponentInfo };
export interface PlayerFeedSummary {
  username: string;
  profile_picture: [] | [Uint8Array | number[]];
  principal_id: PrincipalId;
}
export interface PlayerFeedSummary__1 {
  username: string;
  profile_picture: [] | [Uint8Array | number[]];
  principal_id: PrincipalId;
}
export interface PlayerOpponentInfo {
  players: Array<PlayerFeedSummary>;
}
export interface PredictGame {
  gameId: GameId;
}
export type PrincipalId = string;
export interface Profile {
  username: string;
  homeCourseId: [] | [GolfCourseId];
  golferPicture: [] | [Uint8Array | number[]];
  handicap: [] | [Handicap];
  lastName: string;
  golferPictureExtension: string;
  principalId: PrincipalId;
  firstName: string;
}
export interface RejectFriendRequest {
  principalId: PrincipalId;
  requestedBy: PrincipalId;
}
export interface RejectGameInvite {
  rejectedById: PrincipalId;
  gameId: GameId;
}
export interface RejectTeamRequest {
  rejectingPrincipalId: PrincipalId;
  golfTeamId: GolfTeamId;
}
export interface RemoveFriend {
  principalId: PrincipalId;
  requestedBy: PrincipalId;
}
export interface RemoveGolfChannelVideo {
  channelId: GolfChannelId;
}
export interface RemoveGolfTeamMember {
  addTeamMember: PrincipalId;
  golfTeamId: GolfTeamId;
}
export type Result = { ok: null } | { err: Error };
export type Result_1 = { ok: UsernameAvailable } | { err: Error };
export type Result_10 = { ok: GolfCourse } | { err: Error };
export type Result_11 = { ok: GolfChannels } | { err: Error };
export type Result_12 = { ok: GolfChannelVideos } | { err: Error };
export type Result_13 = { ok: GolfChannelVideo } | { err: Error };
export type Result_14 = { ok: GolfChannel } | { err: Error };
export type Result_15 = { ok: GameSummaries } | { err: Error };
export type Result_16 = { ok: GameInvites } | { err: Error };
export type Result_17 = { ok: Game } | { err: Error };
export type Result_18 = { ok: Friends } | { err: Error };
export type Result_19 = { ok: FriendRequests } | { err: Error };
export type Result_2 = { ok: UpcomingGames } | { err: Error };
export type Result_20 = { ok: ClubShots } | { err: Error };
export type Result_21 = { ok: Buzz } | { err: Error };
export type Result_22 = { ok: AppStatusDTO } | { err: Error };
export type Result_23 = { ok: GolfChannelId } | { err: Error };
export type Result_24 = { ok: GameId } | { err: Error };
export type Result_3 = { ok: ShotAverages } | { err: Error };
export type Result_4 = { ok: Profile } | { err: Error };
export type Result_5 = { ok: Golfers } | { err: Error };
export type Result_6 = { ok: Golfer } | { err: Error };
export type Result_7 = { ok: GolfTeams } | { err: Error };
export type Result_8 = { ok: GolfTeamRequests } | { err: Error };
export type Result_9 = { ok: GolfCourses } | { err: Error };
export type RustResult = { Ok: string } | { Err: string };
export interface SendFriendRequest {
  requestedFriend: PrincipalId;
  principalId: PrincipalId;
}
export interface ShotAverages {
  shots: Array<AverageShot>;
}
export interface SubscribeToGolfChannel {
  channelId: GolfChannelId;
  principalId: PrincipalId;
}
export interface TeamFeedSummary {
  team_image_extension: string;
  team_id: GolfTeamId;
  team_image: [] | [Uint8Array | number[]];
  team_name: string;
  team_members: Array<PrincipalId>;
  captain_id: PrincipalId;
}
export interface TeamFeedSummary__1 {
  team_image_extension: string;
  team_id: GolfTeamId;
  team_image: [] | [Uint8Array | number[]];
  team_name: string;
  team_members: Array<PrincipalId>;
  captain_id: PrincipalId;
}
export interface TeamOpponentInfo {
  teams: Array<TeamFeedSummary>;
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
export interface UpcomingGame {
  course_info: CourseInfo;
  opponent_info: OpponentInfo;
  game_info: GameInfo;
}
export interface UpcomingGames {
  page: bigint;
  entries: Array<UpcomingGame>;
}
export interface UpdateFirstName {
  principalId: PrincipalId;
  firstName: string;
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
export interface UpdateGolfTeamName {
  golfTeamName: string;
  golfTeamId: GolfTeamId;
}
export interface UpdateGolfTeamPicture {
  golfTeamId: GolfTeamId;
  golfTeamPicture: [] | [Uint8Array | number[]];
  golfTeamPictureExtension: string;
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
export interface UpdateShot {
  club: GolfClub;
  yardage: bigint;
  golfShotId: GolfShotId;
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
  acceptTeamRequest: ActorMethod<[AcceptTeamRequest], Result>;
  addGameScore: ActorMethod<[AddGameScore], Result>;
  addGolfTeamMember: ActorMethod<[AddGolfTeamMember], Result>;
  addShot: ActorMethod<[AddShot], Result>;
  beginGame: ActorMethod<[BeginGame], Result>;
  createGame: ActorMethod<[CreateGame], Result_24>;
  createGolfChannel: ActorMethod<[CreateGolfChannel], Result_23>;
  createGolfTeam: ActorMethod<[CreateGolfTeam], Result>;
  createUser: ActorMethod<[CreateUser], Result>;
  deleteGame: ActorMethod<[DeleteGame], Result>;
  deleteGolfChannel: ActorMethod<[DeleteGolfChannel], Result>;
  deleteGolfTeam: ActorMethod<[DeleteGolfTeam], Result>;
  deleteShot: ActorMethod<[DeleteShot], Result>;
  executeAddGolfCourse: ActorMethod<[CreateGolfCourse], undefined>;
  executeUpdateGolfCourse: ActorMethod<[UpdateGolfCourse], undefined>;
  getAppStatus: ActorMethod<[], Result_22>;
  getBuzz: ActorMethod<[GetBuzz], Result_21>;
  getClubShots: ActorMethod<[GetClubShots], Result_20>;
  getFriendRequests: ActorMethod<[GetFriendRequests], Result_19>;
  getFriends: ActorMethod<[GetFriends], Result_18>;
  getGame: ActorMethod<[GetGame], Result_17>;
  getGameInvites: ActorMethod<[GetGameInvites], Result_16>;
  getGameSummaries: ActorMethod<[GetGameSummaries], Result_15>;
  getGolfChannel: ActorMethod<[GetGolfChannel], Result_14>;
  getGolfChannelVideo: ActorMethod<[GetGolfChannelVideo], Result_13>;
  getGolfChannelVideos: ActorMethod<[GetGolfChannelVideos], Result_12>;
  getGolfChannels: ActorMethod<[GetGolfChannels], Result_11>;
  getGolfCourse: ActorMethod<[GetGolfCourse], Result_10>;
  getGolfCourses: ActorMethod<[GetGolfCourses], Result_9>;
  getGolfTeamRequests: ActorMethod<[GetGolfTeamRequests], Result_8>;
  getGolfTeams: ActorMethod<[GetGolfTeams], Result_7>;
  getGolfer: ActorMethod<[GetGolfer], Result_6>;
  getGolfers: ActorMethod<[GetGolfers], Result_5>;
  getProfile: ActorMethod<[GetProfile], Result_4>;
  getShotAverages: ActorMethod<[GetShotAverages], Result_3>;
  getUpcomingGames: ActorMethod<[GetUpcomingGames], Result_2>;
  inviteGolfers: ActorMethod<[InviteGolfers], Result>;
  isUsernameAvailable: ActorMethod<[IsUsernameAvailable], Result_1>;
  predictGame: ActorMethod<[PredictGame], Result>;
  rejectFriendRequest: ActorMethod<[RejectFriendRequest], Result>;
  rejectGameInvite: ActorMethod<[RejectGameInvite], Result>;
  rejectTeamRequest: ActorMethod<[RejectTeamRequest], Result>;
  removeFriend: ActorMethod<[RemoveFriend], Result>;
  removeGolfChannelVideo: ActorMethod<[RemoveGolfChannelVideo], Result>;
  removeGolfTeamMember: ActorMethod<[RemoveGolfTeamMember], Result>;
  sendFriendRequest: ActorMethod<[SendFriendRequest], Result>;
  subscribeToGolfChannel: ActorMethod<[SubscribeToGolfChannel], Result>;
  unsubscribeFromGolfChannel: ActorMethod<[UnsubscribeFromGolfChannel], Result>;
  updateFirstName: ActorMethod<[UpdateFirstName], Result>;
  updateGolfChannel: ActorMethod<[UpdateGolfChannel], Result>;
  updateGolfChannelVideo: ActorMethod<[UpdateGolfChannelVideo], Result>;
  updateGolfTeamName: ActorMethod<[UpdateGolfTeamName], Result>;
  updateGolfTeamPicture: ActorMethod<[UpdateGolfTeamPicture], Result>;
  updateHandicap: ActorMethod<[UpdateHandicap], Result>;
  updateHomeCourse: ActorMethod<[UpdateHomeCourse], Result>;
  updateLastName: ActorMethod<[UpdateLastName], Result>;
  updateProfilePicture: ActorMethod<[UpdateProfilePicture], Result>;
  updateShot: ActorMethod<[UpdateShot], Result>;
  updateUsername: ActorMethod<[UpdateUsername], Result>;
  uploadGolfChannelVideo: ActorMethod<[UploadGolfChannelVideo], Result>;
  validateAddGolfCourse: ActorMethod<[CreateGolfCourse], RustResult>;
  validateUpdateGolfCourse: ActorMethod<[UpdateGolfCourse], RustResult>;
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
