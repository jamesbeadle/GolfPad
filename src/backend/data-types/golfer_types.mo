import Base "mo:waterway-mops/BaseTypes";
import Blob "mo:base/Blob";
import GolfEnums "golf_enums";
import T "app_types";
import Game "game_types";
import MopsIds "mops_ids";

module GolferTypes {


  //Golfer Types

  public type Golfer = {
    principalId : Base.PrincipalId;
    joinedOn : Int;
    username : Text;
    firstName : Text;
    lastName : Text;
    handicap : ?T.Handicap;
    homeCourseId : ?MopsIds.GolfCourseId;
    termsAgreed : Bool;
    profilePicture : ?Blob;
    profilePictureFileExtension : Text;
    favouriteGolfCourseIds : [MopsIds.GolfCourseId];
    shots : [GolfShot];
    upcomingGames : [MopsIds.GameId];
    activeGames : [MopsIds.GameId];
    completedGames : [MopsIds.GameId];
    gameSummaries : [Game.GameSummary];
    scheduledGames : [Game.GameSummary];
    friendRequests : [FriendRequest];
    friends : [Friend];
    buzzFeed : [BuzzFeedItem];
    gameInvites : [Game.GameInvite];
    membershipType : T.MembershipType;
    membershipClaims : [T.MembershipClaim];
    totalFriends : Nat;
    membershipExpiryTime : Int;
  };

  public type GolfShot = {
    id : MopsIds.GolfShotId;
    golferId : Base.PrincipalId;
    club : GolfEnums.GolfClub;
    yardage : Nat;
    lie : ?GolfEnums.Lie;
    shotIntention : ?GolfEnums.ShotIntention;
    shotResult : ?GolfEnums.ShotResult;
    weatherType : ?GolfEnums.WeatherType;
    shotStartPosition : ?GolfEnums.ShotPosition;
    shotEndPosition : ?GolfEnums.ShotPosition;
    swingLength : ?GolfEnums.SwingLength;
    shotTime : Int;
  };

  //Friend Types

  public type FriendRequest = {
    requestedBy : Base.PrincipalId;
    requestedOn : Int;
  };

  public type Friend = {
    principalId : Base.PrincipalId;
    addedOn : Int;
  };

  public type BuzzFeedItem = {
    gameType : Game.GameType;
    date : Int;
    course : MopsIds.GolfCourseId;
    players : [Golfer];
    feedItemType : BuzzFeedItemType;
    //TOOD: Need a property to show score based on game types
    //mulligans is a score of up to 2 people, 1 up so both players and score like 1 up
    //bands
    //when a certain bands acheivement happens the best one for your round goes on your friends buzz
  };

  public type BuzzFeedItemType = {
    #Game;
    #GameEvent;
  };
};
