
module MembershipTypes {

  public type MembershipType = {
    #Annual;
    #Lifetime;
    #Founding;
    #Society;
    #Clubhouse;
    #Expired;
    #NotClaimed;
    #NotEligible;
  };
  
  public type MembershipClaim = {
    membershipType : MembershipType;
    claimedOn : Int;
    expiresOn : ?Int;
  };

  public type EligibleMembership = {
    membershipType : MembershipType;
    eligibleNeuronIds : [Blob];
  };

};
