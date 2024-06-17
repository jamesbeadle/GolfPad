import Result "mo:base/Result";
import Principal "mo:base/Principal";
import DTOs "dtos/DTOs";
import T "data-types/types";

actor Self {


  
  public shared query ({ caller }) func getAgent() : async Result.Result<DTOs.UserDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return #err(#NotFound);
  };
    
  public shared ({ caller }) func createAgent(dto: DTOs.CreateUserDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return #err(#NotFound);
  };

  public shared ({ caller }) func updateAgent(dto: DTOs.UpdateUserDTO) : async Result.Result<DTOs.UpdateUserDTO, T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    return #err(#NotFound);
  };
  
  //stable storage
  system func preupgrade() {
  };

  system func postupgrade() {
  };

};
