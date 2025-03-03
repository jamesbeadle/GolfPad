import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";
import type { IDL } from "@dfinity/candid";

export interface AcceptFriendRequestDTO {
  requestedBy: GolferId;
}
export interface AcceptGameInviteDTO {
  gameId: GameId;
  acceptedById: GolferId;
}
export interface AddGameScoreDTO {
  gameId: GameId;
  detail: GameScoreSubmissionDTO;
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
export interface BeginGameDTO {
  gameId: GameId;
}
export type CanisterId = string;
export type CourseType = { Custom: null } | { Official: null };
export interface CoursesDTO {
  courses: Array<GolfCourseDTO>;
}
export interface CreateGameDTO {
  inviteIds: Array<GolferId>;
  createdById: GolferId;
  teeOffTime: bigint;
  gameType: GameType;
  courseType: CourseType;
  courseId: GolfCourseId;
  teeGroup: string;
}
export interface CreateGolfCourseDTO {
  holes: Array<Hole>;
  name: string;
  initialTeeGroup: TeeGroup;
}
export interface CreateGolferDTO {
  username: string;
  handicap: [] | [Handicap];
}
export interface DeleteGolfCourseDTO {
  courseId: GolfCourseId;
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
export interface GameDTO {
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
export interface GameInvite {
  gameId: GameId;
  inviteFrom: GolferId;
}
export type GamePrediction =
  | { Mulligans: MulligansPrediction }
  | { BuildIt: {} }
  | { Bands: BandsPrediction }
  | { NextUp: {} };
export type GameScoreDetail = { MulligansScores: MulligansScores };
export type GameScoreSubmissionDTO = { MulligansScores: MulligansScoreDTO };
export type GameStatus =
  | { Unplayed: null }
  | { Active: null }
  | { Complete: null };
export interface GameSummary {
  status: GameStatus;
  date: bigint;
  players: Array<GolferId>;
  gameType: GameType;
}
export type GameType =
  | { Mulligans: null }
  | { BuildIt: null }
  | { Bands: null }
  | { NextUp: null }
  | { Prophet: null };
export interface GetGameDTO {
  gameId: GameId;
}
export interface GetGolferDTO {
  golferPrincipalId: GolferId;
}
export interface GolfCourseDTO {
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
export type GolferBuzzDTO = {};
export interface GolferDTO {
  username: string;
  gameInvites: Array<GameInvite>;
  upcomingGames: Array<GameId>;
  golferPicture: [] | [Uint8Array | number[]];
  completedGames: Array<GameId>;
  handicap: [] | [Handicap];
  golferPictureExtension: string;
  principalId: GolferId;
  activeGames: Array<GameId>;
}
export interface GolferEvent {
  golferId: GolferId;
  hole: HoleNumber;
  event: GolfEvent;
}
export interface GolferGameSummariesDTO {
  totalEntries: bigint;
  offset: bigint;
  limit: bigint;
  entries: Array<GameSummary>;
}
export type GolferId = string;
export interface GolferSummaryDTO {
  golferPrincipalId: GolferId;
  golferPicture: [] | [Uint8Array | number[]];
  golferName: string;
  handicap: [] | [Handicap];
  golferPictureExtension: string;
}
export interface GolfersDTO {
  golfers: Array<GolferSummaryDTO>;
}
export type Handicap = number;
export interface Hole {
  name: string;
  tees: Array<TeeInfo>;
  number: number;
  images: Array<[CanisterId, ImageId]>;
}
export type HoleNumber = number;
export type ImageId = bigint;
export interface InviteGolfersDTO {
  gameId: GameId;
  invitedGolferIds: Array<GolferId>;
}
export interface ListGolfersDTO {
  searchTerm: string;
}
export interface MulligansHoleResult {
  golfer2MulliganUsed: boolean;
  winner: GolferId;
  golfer1MulliganUsed: boolean;
  holeNumber: HoleNumber;
}
export type MulligansPrediction = {};
export interface MulligansScoreDTO {
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
export interface MyGolferDTO {
  username: string;
  golferPicture: [] | [Uint8Array | number[]];
  handicap: [] | [Handicap];
  golferPictureExtension: string;
  principalId: GolferId;
}
export interface PaginationFilters {
  offset: bigint;
  limit: bigint;
}
export interface RejectFriendRequestDTO {
  requestedBy: GolferId;
}
export type Result = { ok: null } | { err: Error };
export type Result_1 = { ok: GolfersDTO } | { err: Error };
export type Result_10 = { ok: AppStatusDTO } | { err: Error };
export type Result_2 = { ok: FriendRequestsDTO } | { err: Error };
export type Result_3 = { ok: CoursesDTO } | { err: Error };
export type Result_4 = { ok: UpcomingGamesDTO } | { err: Error };
export type Result_5 = { ok: MyGolferDTO } | { err: Error };
export type Result_6 = { ok: GolferGameSummariesDTO } | { err: Error };
export type Result_7 = { ok: GolferBuzzDTO } | { err: Error };
export type Result_8 = { ok: GolferDTO } | { err: Error };
export type Result_9 = { ok: GameDTO } | { err: Error };
export type RustResult = { Ok: string } | { Err: string };
export interface SendFriendRequestDTO {
  requestedFriend: GolferId;
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
export type UpcomingGamesDTO = {};
export interface UpdateGolfCourseDTO {
  name: string;
  updatedTeeGroup: [] | [TeeGroup];
  courseId: GolfCourseId;
}
export interface UpdateGolferDTO {
  username: string;
  handicap: [] | [Handicap];
}
export interface UpdateGolferPictureDTO {
  golferPicture: Uint8Array | number[];
  golferPictureExtension: string;
}
export interface _SERVICE {
  acceptFriendRequest: ActorMethod<[AcceptFriendRequestDTO], Result>;
  acceptGameInvite: ActorMethod<[AcceptGameInviteDTO], Result>;
  addGameScore: ActorMethod<[AddGameScoreDTO], Result>;
  beginGame: ActorMethod<[BeginGameDTO], Result>;
  createGame: ActorMethod<[CreateGameDTO], Result>;
  createGolfCourse: ActorMethod<[CreateGolfCourseDTO], Result>;
  createGolfer: ActorMethod<[CreateGolferDTO], Result>;
  deleteGolfCourse: ActorMethod<[DeleteGolfCourseDTO], Result>;
  executeAddGolfCourse: ActorMethod<[CreateGolfCourseDTO], undefined>;
  executeUpdateGolfCourse: ActorMethod<[UpdateGolfCourseDTO], undefined>;
  getAppStatus: ActorMethod<[], Result_10>;
  getGame: ActorMethod<[GetGameDTO], Result_9>;
  getGolfer: ActorMethod<[GetGolferDTO], Result_8>;
  getGolferBuzz: ActorMethod<[PaginationFilters], Result_7>;
  getGolferGameHistory: ActorMethod<[PaginationFilters], Result_6>;
  getMyGolfer: ActorMethod<[], Result_5>;
  getUpcomingGames: ActorMethod<[PaginationFilters], Result_4>;
  listCourses: ActorMethod<[PaginationFilters], Result_3>;
  listFriendRequests: ActorMethod<[PaginationFilters], Result_2>;
  listGolfers: ActorMethod<[ListGolfersDTO], Result_1>;
  rejectFriendRequest: ActorMethod<[RejectFriendRequestDTO], Result>;
  saveGolferPicture: ActorMethod<[UpdateGolferPictureDTO], Result>;
  sendFriendRequest: ActorMethod<[SendFriendRequestDTO], Result>;
  sendGameInvites: ActorMethod<[InviteGolfersDTO], Result>;
  updateGolfCourse: ActorMethod<[UpdateGolfCourseDTO], Result>;
  updateGolfer: ActorMethod<[UpdateGolferDTO], Result>;
  validateAddGolfCourse: ActorMethod<[CreateGolfCourseDTO], RustResult>;
  validateUpdateGolfCourse: ActorMethod<[UpdateGolfCourseDTO], RustResult>;
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
