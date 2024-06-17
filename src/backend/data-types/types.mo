import Countries "countries";

module Types {

  public type PrincipalId = Text;
  public type AgencyId = Nat;
  public type CanisterId = Text;
  public type PlayerId = Nat;
  public type ClubId = Nat;
  public type CalendarMonth = Nat8;
  public type InternationalTeamId = Nat16;
  public type ClubLeagueId = Nat;
  public type StadiumId = Nat;

  public type Error = {
    #NotFound;
    #AlreadyExists;
    #NotAuthorized;
    #NotAllowed;
    #DecodeError;
    #InvalidData;
    #NotEnoughFunds;
    #PaymentError;
  };



};
