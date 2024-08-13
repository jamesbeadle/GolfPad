import Result "mo:base/Result";
import List "mo:base/List";
import Iter "mo:base/Iter";
import T "../data-types/types";
import DTOs "../dtos/DTOs";

module {
  public class ProfileManager() {

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
      //TODO: Checks
      return #err(#NotFound);
    };

    public func updateUser(principalId: T.PrincipalId, dto: DTOs.UpdateUserDTO) : Result.Result<(), T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func addFriend(principalId: T.PrincipalId, dto: DTOs.AddFriendDTO) : Result.Result<(), T.Error>{
      //TODO: Checks
      return #err(#NotFound);
    };

    public func checkUsersExist(userIds: [T.PrincipalId]) : Bool{
      //TODO: Checks
      
    //TODO: Check all users exist
      //todo user array function to check cross of both arrays equals starting value

      for(id in Iter.fromArray(userIds)){
        
      };

      return true;
    };

    public func addGameReferences(gameId: T.GameId, dto: DTOs.CreateGameDTO){
//TODO: Checks
      
     //add game reference to each user
    };
    
  };
};


    