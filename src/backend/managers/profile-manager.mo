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
      
    public func createProfile(principalId: T.PrincipalId, dto: DTOs.CreateProfileDTO) : Result.Result<(), T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func updateProfile(principalId: T.PrincipalId, dto: DTOs.UpdateProfileDTO) : Result.Result<(), T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func updateProfilePicture(principalId: T.PrincipalId, dto: DTOs.UpdateProfilePictureDTO) : Result.Result<(), T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func getProfile(principalId: T.PrincipalId) : Result.Result<DTOs.ProfileDTO, T.Error> {
      return #err(#NotFound);
    };

    public func getBuzz(principalId: T.PrincipalId, dto: DTOs.GetGolferBuzzDTO) : Result.Result<DTOs.GolferBuzzDTO, T.Error> {
      return #err(#NotFound);
    };

    public func createYardageSet(principalId: T.PrincipalId, dto: DTOs.CreateYardageSetDTO) : Result.Result<(), T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func updateYardageSet(principalId: T.PrincipalId, dto: DTOs.UpdateYardageSetDTO) : Result.Result<(), T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func deleteYardageSet(principalId: T.PrincipalId, dto: DTOs.DeleteYardageSetDTO) : Result.Result<(), T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func getYardageSet(principalId: T.PrincipalId, dto: DTOs.GetYardageSetDTO) : Result.Result<DTOs.YardageSetDTO, T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func addYardageSetClub(principalId: T.PrincipalId, dto: DTOs.AddYardageSetClubDTO) : Result.Result<(), T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func deleteYardageSetClub(principalId: T.PrincipalId, dto: DTOs.DeleteYardageSetClubDTO) : Result.Result<(), T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func updateYardage(principalId: T.PrincipalId, dto: DTOs.AddYardageDTO) : Result.Result<(), T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func listGolfers(dto: DTOs.ListGolfersDTO) : Result.Result<DTOs.GolfersDTO, T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func listFriendRequests(principalId: T.PrincipalId, dto: DTOs.ListFriendRequestsDTO) : Result.Result<DTOs.FriendRequestsDTO, T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func acceptFriendRequest(principalId: T.PrincipalId, dto: DTOs.AcceptFriendRequestDTO) : Result.Result<(), T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func rejectFriendRequest(principalId: T.PrincipalId, dto: DTOs.RejectFriendRequestDTO) : Result.Result<(), T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func sendFriendRequest(principalId: T.PrincipalId, dto: DTOs.SendFriendRequestDTO) : Result.Result<(), T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func getGolfer(principalId: T.PrincipalId, dto: DTOs.GetGolferDTO) : Result.Result<DTOs.GolferDTO, T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func getGolferGameHistory(principalId: T.PrincipalId, dto: DTOs.GetGolferGameHistoryDTO) : Result.Result<DTOs.GolferGameHistoryDTO, T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func getMyGames(principalId: T.PrincipalId, dto: DTOs.GetMyGamesDTO) : Result.Result<DTOs.MyGamesDTO, T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func checkUsersExist(userIds: [T.PrincipalId]) : Bool{
      //TODO: Checks
      
    //TODO: Check all users exist
      //todo user array function to check cross of both arrays equals starting value


      return true;
    };


    
  };
};


    