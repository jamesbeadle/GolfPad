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
  holeNumber: HoleNumber;
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
export type BandsCategory =
  | { NoLostBall: null }
  | { NoDoubleBogeyOrWorse: null }
  | { ParOrBetter: null }
  | { UnderPar: null }
  | { OnePutt2Of3Greens: null }
  | { NoBogeyOrWorse: null }
  | { NoTreeOrBunker: null }
  | { Hit2Of3Fairways: null }
  | { Hit2Of3Greens: null };
export interface BandsCategoryResult {
  completed: boolean;
  bandsCategory: BandsCategory;
}
export interface BandsCategoryResult__1 {
  golferId: PrincipalId;
  completed: boolean;
  category: BandsCategory;
}
export interface BandsPlayerResult {
  categories: Array<BandsCategoryResult>;
  principalId: PrincipalId;
  points: number;
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
export interface BandsScore {
  predictions: Array<BandsCategoryResult__1>;
}
export interface BandsScores {
  players: Array<BandsPlayerResult>;
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
export type CanisterId = string;
export interface ClubShots {
  total: bigint;
  club: GolfClub;
  page: bigint;
  pageSize: bigint;
  entries: Array<GolfShot>;
}
export type CountryId = number;
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
  inviteIds: Array<PrincipalId>;
  createdById: PrincipalId;
  teeOffTime: bigint;
  teeGroupIndex: TeeGroupIndex;
  courseVersion: GolfCourseVersion;
  gameType: GameType;
  courseId: GolfCourseId;
}
export interface CreateGolfCourse {
  holes: Array<Hole>;
  totalHoles: number;
  name: string;
  countryId: CountryId;
  mainImageExtension: string;
  initialTeeGroup: TeeGroup;
  founded: bigint;
  bannerImage: [] | [Uint8Array | number[]];
  mainImage: [] | [Uint8Array | number[]];
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
  | { CanisterFull: null }
  | { InEligible: null };
export interface FavouriteCourse {
  id: GolfCourseId;
  name: string;
  mainImageExtension: string;
  mainImage: [] | [Uint8Array | number[]];
}
export interface Friend {
  username: string;
  profilePicture: [] | [Uint8Array | number[]];
  lastName: string;
  principalId: PrincipalId;
  firstName: string;
}
export interface FriendRequest {
  requestTime: bigint;
  principalId: PrincipalId;
}
export interface FriendRequests {
  friendRequests: Array<FriendRequest>;
}
export interface Friends {
  total: bigint;
  page: bigint;
  pageSize: bigint;
  friends: Array<Friend>;
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
export interface GameGolferSummaries {
  entries: Array<GolferSummary>;
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
export type GameScoreDetail =
  | { BandsScores: BandsScores }
  | { MulligansScores: MulligansScores };
export type GameScoreSubmission =
  | { BandsScores: BandsScore }
  | { MulligansScores: MulligansScore };
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
  status: GameStatus;
  date: bigint;
  players: Array<PrincipalId>;
  gameType: GameType;
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
  page: bigint;
  principalId: PrincipalId;
}
export interface GetGame {
  gameId: GameId;
}
export interface GetGameGolferSummaries {
  gameId: GameId;
}
export interface GetGameInvites {
  principalId: PrincipalId;
}
export interface GetGameSummaries {
  page: bigint;
  principalId: PrincipalId;
}
export interface GetGolfCourse {
  id: GolfCourseId;
}
export interface GetGolfCourseCanisterId {
  id: GolfCourseId;
}
export interface GetGolfCourseSummary {
  id: GolfCourseId;
}
export interface GetGolfCourseTeeGroup {
  id: GolfCourseId;
  index: TeeGroupIndex;
}
export interface GetGolfCourseTees {
  golfCourseId: GolfCourseId;
}
export interface GetGolfCourses {
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
export interface GetPlayerBandsResults {
  id: GameId;
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
export interface GetUserFavouriteCourses {
  searchTerm: string;
  principalId: PrincipalId;
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
  id: GolfCourseId;
  totalHoles: number;
  activeVersion: GolfCourseVersion;
  name: string;
  tees: Array<GolfCourseTeeGroup>;
  countryId: CountryId;
  mainImageExtension: string;
  founded: bigint;
  mainImage: [] | [Uint8Array | number[]];
}
export interface GolfCourseCanisterId {
  canisterId: CanisterId;
}
export type GolfCourseId = bigint;
export interface GolfCourseSnapshot {
  teeGroupIndex: TeeGroupIndex;
  courseVersion: GolfCourseVersion;
  courseId: GolfCourseId;
}
export interface GolfCourseSummary {
  id: GolfCourseId;
  name: string;
  countryId: CountryId;
  version: GolfCourseVersion;
  mainImageExtension: string;
  founded: bigint;
  mainImage: [] | [Uint8Array | number[]];
}
export interface GolfCourseTeeGroup {
  added: bigint;
  holes: Array<HoleSummary>;
  golfCourseId: GolfCourseId;
  name: string;
  index: TeeGroupIndex;
  colour: string;
}
export interface GolfCourseTees {
  id: GolfCourseId;
  tees: Array<TeeGroup>;
}
export type GolfCourseVersion = number;
export interface GolfCourses {
  total: bigint;
  page: bigint;
  pageSize: bigint;
  entries: Array<GolfCourseSummary>;
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
export type GolfTeamId = bigint;
export interface Golfer {
  username: string;
  gameInvites: Array<GameInvite>;
  joinedOn: bigint;
  upcomingGames: Array<GameId>;
  homeCourse: string;
  homeCourseId: [] | [GolfCourseId];
  golferPicture: [] | [Uint8Array | number[]];
  completedGames: Array<GameId>;
  handicap: [] | [Handicap];
  lastName: string;
  golferPictureExtension: string;
  principalId: PrincipalId;
  activeGames: Array<GameId>;
  homeCourseImage: [] | [Uint8Array | number[]];
  firstName: string;
}
export interface GolferEvent {
  golferId: PrincipalId;
  hole: HoleNumber;
  event: GolfEvent;
}
export interface GolferSummary {
  name: string;
  joinedOn: bigint;
  homeCourse: [] | [GolfCourseSummary];
  profilePictureExtension: string;
  profilePicture: [] | [Uint8Array | number[]];
  handicap: [] | [Handicap];
  principalId: PrincipalId;
}
export interface Golfers {
  total: bigint;
  page: bigint;
  pageSize: bigint;
  entries: Array<GolferSummary>;
}
export type Handicap = number;
export interface Hole {
  par: number;
  name: string;
  yardage: bigint;
  number: number;
  colour: string;
  strokeIndex: number;
  images: Array<HoleImage>;
}
export interface HoleImage {
  owner: PrincipalId;
  uploaded: bigint;
  image: Uint8Array | number[];
}
export type HoleNumber = number;
export interface HoleSummary {
  par: number;
  name: string;
  yardage: bigint;
  number: number;
  colour: string;
  strokeIndex: number;
}
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
export interface MembershipClaim {
  expiresOn: [] | [bigint];
  claimedOn: bigint;
  membershipType: MembershipType;
}
export type MembershipType =
  | { NotClaimed: null }
  | { Seasonal: null }
  | { Lifetime: null }
  | { Monthly: null }
  | { Expired: null };
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
}
export interface MulligansScores {
  winner: PrincipalId;
  results: Array<MulligansHoleResult>;
  score: bigint;
  golfer2MulligansUsed: number;
  golfer2HolesWonCount: number;
  golfer1MulligansAvailable: number;
  golfer2MulligansAvailable: number;
  golfer1MulligansUsed: number;
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
export interface PlayerBandsResult {
  completed: boolean;
  category: BandsCategory;
  principalId: PrincipalId;
  points: number;
}
export interface PlayerBandsResults {
  results: Array<PlayerBandsResult>;
}
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
export interface RemoveFriend {
  principalId: PrincipalId;
  requestedBy: PrincipalId;
}
export interface RemoveUserGolfCourse {
  golfCourseId: GolfCourseId;
  principalId: PrincipalId;
}
export type Result = { ok: null } | { err: Error };
export type Result_1 = { ok: UsernameAvailable } | { err: Error };
export type Result_10 = { ok: GolfCourseTees } | { err: Error };
export type Result_11 = { ok: GolfCourseTeeGroup } | { err: Error };
export type Result_12 = { ok: GolfCourseSummary } | { err: Error };
export type Result_13 = { ok: GolfCourseCanisterId } | { err: Error };
export type Result_14 = { ok: GolfCourse } | { err: Error };
export type Result_15 = { ok: GameSummaries } | { err: Error };
export type Result_16 = { ok: GameInvites } | { err: Error };
export type Result_17 = { ok: GameGolferSummaries } | { err: Error };
export type Result_18 = { ok: Game } | { err: Error };
export type Result_19 = { ok: Friends } | { err: Error };
export type Result_2 = { ok: UserFavouriteCourses } | { err: Error };
export type Result_20 = { ok: FriendRequests } | { err: Error };
export type Result_21 = { ok: ClubShots } | { err: Error };
export type Result_22 = { ok: Buzz } | { err: Error };
export type Result_23 = { ok: AppStatusDTO } | { err: Error };
export type Result_24 = { ok: GameId } | { err: Error };
export type Result_25 = { ok: MembershipClaim } | { err: Error };
export type Result_3 = { ok: UpcomingGames } | { err: Error };
export type Result_4 = { ok: ShotAverages } | { err: Error };
export type Result_5 = { ok: Profile } | { err: Error };
export type Result_6 = { ok: PlayerBandsResults } | { err: Error };
export type Result_7 = { ok: Golfers } | { err: Error };
export type Result_8 = { ok: Golfer } | { err: Error };
export type Result_9 = { ok: GolfCourses } | { err: Error };
export type RustResult = { Ok: string } | { Err: string };
export interface SendFriendRequest {
  requestedFriend: PrincipalId;
  principalId: PrincipalId;
}
export interface ShotAverages {
  shots: Array<AverageShot>;
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
  index: TeeGroupIndex;
  colour: string;
}
export type TeeGroupIndex = number;
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
export interface UserFavouriteCourses {
  total: bigint;
  page: bigint;
  pageSize: bigint;
  entries: Array<FavouriteCourse>;
}
export type UsernameAvailable = boolean;
export interface _SERVICE {
  acceptFriendRequest: ActorMethod<[AcceptFriendRequest], Result>;
  acceptGameInvite: ActorMethod<[AcceptGameInvite], Result>;
  addGameScore: ActorMethod<[AddGameScore], Result>;
  addShot: ActorMethod<[AddShot], Result>;
  beginGame: ActorMethod<[BeginGame], Result>;
  claimMembership: ActorMethod<[], Result_25>;
  createGame: ActorMethod<[CreateGame], Result_24>;
  createUser: ActorMethod<[CreateUser], Result>;
  deleteGame: ActorMethod<[DeleteGame], Result>;
  deleteShot: ActorMethod<[DeleteShot], Result>;
  executeAddGolfCourse: ActorMethod<[CreateGolfCourse], undefined>;
  executeUpdateGolfCourse: ActorMethod<[UpdateGolfCourse], undefined>;
  getAppStatus: ActorMethod<[], Result_23>;
  getBuzz: ActorMethod<[GetBuzz], Result_22>;
  getClubShots: ActorMethod<[GetClubShots], Result_21>;
  getFriendRequests: ActorMethod<[GetFriendRequests], Result_20>;
  getFriends: ActorMethod<[GetFriends], Result_19>;
  getGame: ActorMethod<[GetGame], Result_18>;
  getGameGolferSummaries: ActorMethod<[GetGameGolferSummaries], Result_17>;
  getGameInvites: ActorMethod<[GetGameInvites], Result_16>;
  getGameSummaries: ActorMethod<[GetGameSummaries], Result_15>;
  getGolfCourse: ActorMethod<[GetGolfCourse], Result_14>;
  getGolfCourseCanisterId: ActorMethod<[GetGolfCourseCanisterId], Result_13>;
  getGolfCourseSummary: ActorMethod<[GetGolfCourseSummary], Result_12>;
  getGolfCourseTeeGroup: ActorMethod<[GetGolfCourseTeeGroup], Result_11>;
  getGolfCourseTees: ActorMethod<[GetGolfCourseTees], Result_10>;
  getGolfCourses: ActorMethod<[GetGolfCourses], Result_9>;
  getGolfer: ActorMethod<[GetGolfer], Result_8>;
  getGolfers: ActorMethod<[GetGolfers], Result_7>;
  getPlayerBandsResults: ActorMethod<[GetPlayerBandsResults], Result_6>;
  getProfile: ActorMethod<[GetProfile], Result_5>;
  getShotAverages: ActorMethod<[GetShotAverages], Result_4>;
  getUpcomingGames: ActorMethod<[GetUpcomingGames], Result_3>;
  getUserFavouriteCourses: ActorMethod<[GetUserFavouriteCourses], Result_2>;
  inviteGolfers: ActorMethod<[InviteGolfers], Result>;
  isUsernameAvailable: ActorMethod<[IsUsernameAvailable], Result_1>;
  predictGame: ActorMethod<[PredictGame], Result>;
  rejectFriendRequest: ActorMethod<[RejectFriendRequest], Result>;
  rejectGameInvite: ActorMethod<[RejectGameInvite], Result>;
  removeFriend: ActorMethod<[RemoveFriend], Result>;
  removeUserGolfCourse: ActorMethod<[RemoveUserGolfCourse], Result>;
  sendFriendRequest: ActorMethod<[SendFriendRequest], Result>;
  updateFirstName: ActorMethod<[UpdateFirstName], Result>;
  updateHandicap: ActorMethod<[UpdateHandicap], Result>;
  updateHomeCourse: ActorMethod<[UpdateHomeCourse], Result>;
  updateLastName: ActorMethod<[UpdateLastName], Result>;
  updateProfilePicture: ActorMethod<[UpdateProfilePicture], Result>;
  updateShot: ActorMethod<[UpdateShot], Result>;
  updateUsername: ActorMethod<[UpdateUsername], Result>;
  validateAddGolfCourse: ActorMethod<[CreateGolfCourse], RustResult>;
  validateUpdateGolfCourse: ActorMethod<[UpdateGolfCourse], RustResult>;
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
