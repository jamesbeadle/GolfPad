import Result "mo:base/Result";
import List "mo:base/List";
import T "../data-types/types";
import DTOs "../dtos/DTOs";

module {
  public class UserManager() {

    private var users: List.List<T.User> = List.fromArray([]);

    public func getStableUsers() : [T.User]{
      return List.toArray(users);
    };

    public func setStableUsers(stable_users: [T.User]){
      users := List.fromArray(stable_users);
    };
    
    public func getUser(principalId: T.PrincipalId) : Result.Result<DTOs.UserDTO, T.Error> {
      return #err(#NotFound);
    };
      
    public func createUser(principalId: T.PrincipalId, dto: DTOs.CreateUserDTO) : Result.Result<(), T.Error> {
      return #err(#NotFound);
    };

    public func updateUser(principalId: T.PrincipalId, dto: DTOs.UpdateUserDTO) : Result.Result<(), T.Error> {
      return #err(#NotFound);
    };
    
  };
};


    