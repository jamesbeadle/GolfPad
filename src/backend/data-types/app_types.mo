import Base "mo:waterway-mops/BaseTypes";
import ID "id_types";

module AppTypes {


  public type DateTime = Int; //TODO: MOVE TO BASE LIBRARY
  //Return types - //TODO Move to base
  public type RustResult = { #Ok : Text; #Err : Text };
  public type Error = {
    #NotFound;
    #AlreadyExists;
    #NotAuthorized;
    #NotAllowed;
    #DecodeError;
    #OutOfRange;
    #TooLong;
    #TooShort;
    #NotEnoughFunds;
    #PaymentError;
    #InvalidPicture;
    #CanisterFull;
    #CreateGameError;
    #InEligible;
  };

  //Numerical Application Types
  public type Handicap = Int16;
  public type HoleNumber = Nat8;
  public type ClubIndex = Nat16;

  //Application Membership Types

  public type MembershipType = {
    #Monthly;
    #Seasonal;
    #Lifetime;
    #Expired;
    #NotClaimed;
  };

  public type MembershipClaim = {
    membershipType : MembershipType;
    claimedOn : Int;
    expiresOn : ?Int;
  };

  public type Round = {
    playerId : Base.PrincipalId;
    courseId : ID.GolfCourseId;
    holeScores : [HoleScore];
  };

  public type HoleScore = {
    hole : HoleNumber;
    shots : Nat;
    recorded : Nat;
    recordedBy : Base.PrincipalId;
  };

  public type GolfEvent = {
    #LongestDrive;
    #HitFairway;
    #BallNotLost;
    #HitGreen;
    #HitBunker;
    #HitTree;
    #HitWater;
    #OnePuttGreen;
    #Scrub;
    #DoubleBogey;
    #Bogey;
    #Par;
    #Birdie;
    #Eagle;
    #Albatross;
    #TakeMulligan;
  };
};
