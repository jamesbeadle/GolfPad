import Result "mo:base/Result";
import List "mo:base/List";
import Iter "mo:base/Iter";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Bool "mo:base/Bool";
import Principal "mo:base/Principal";
import Buffer "mo:base/Buffer";
import T "../data-types/types";
import DTOs "../dtos/DTOs";
import Management "../utilities/Management";
import GolferCanister "../canister-definitions/golfer-canister";
import Utilities "../utilities/Utilities";
import Environment "../utilities/Environment";
import Cycles "mo:base/ExperimentalCycles";

module {
  public class GolferManager() {

    private var golferCanisterIndex: TrieMap.TrieMap<T.PrincipalId, T.CanisterId> = TrieMap.TrieMap<T.PrincipalId, T.CanisterId>(Text.equal, Text.hash);
    private var activeCanisterId: T.CanisterId = "";
    private var usernames : TrieMap.TrieMap<T.PrincipalId, Text> = TrieMap.TrieMap<T.PrincipalId, Text>(Text.equal, Text.hash);
    private var uniqueGolferCanisterIds : List.List<T.CanisterId> = List.nil();
    private var totalGolfers : Nat = 0;
      
    public func saveGolfer(principalId: T.PrincipalId, dto: DTOs.SaveGolferDTO) : async Result.Result<(), T.Error> {
      
      if(Text.size(dto.username) < 5 or Text.size(dto.username) > 20){
        return #err(#TooLong);
      };

      if(dto.handicap < -54 or dto.handicap > 54){
        return #err(#OutOfRange);
      };

      //check username not already taken



      let existingGolferCanisterId = golferCanisterIndex.get(principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (Environment.BACKEND_CANISTER_ID) : actor {
            saveGolfer : (principal: T.PrincipalId, dto: DTOs.SaveGolferDTO) -> async ()
          };
          await golfer_canister.saveGolfer(principalId, dto);
          return #ok();
        };
        case (null){
            if(activeCanisterId == ""){
              activeCanisterId := await createGolfersCanister();
            };

            var golfer_canister = actor (activeCanisterId) : actor {
              isCanisterFull : () -> async Bool;
              saveGolfer : (principal: T.PrincipalId, dto: DTOs.SaveGolferDTO) -> async ();  
            };

            let isCanisterFull = await golfer_canister.isCanisterFull();
            if(isCanisterFull){
              activeCanisterId := await createGolfersCanister();
              golfer_canister := actor (activeCanisterId) : actor {
                isCanisterFull : () -> async Bool;
                saveGolfer : (principal: T.PrincipalId, dto: DTOs.SaveGolferDTO) -> async ();  
              };
            };

            await golfer_canister.saveGolfer(principalId, dto);
            return #ok();
        }
      };    
    };

    private func createGolfersCanister() : async Text {
      Cycles.add<system>(10_000_000_000_000);
      let canister = await GolferCanister._GolferCanister();
      let IC : Management.Management = actor (Environment.Default);
      let principal = ?Principal.fromText(Environment.BACKEND_CANISTER_ID);
      let _ = await Utilities.updateCanister_(canister, principal, IC);

      let canister_principal = Principal.fromActor(canister);
      let canisterId = Principal.toText(canister_principal);

      if (canisterId == "") {
        return canisterId;
      };

      let uniqueCanisterIdBuffer = Buffer.fromArray<T.CanisterId>(List.toArray(uniqueGolferCanisterIds));
      uniqueCanisterIdBuffer.add(canisterId);
      uniqueGolferCanisterIds := List.fromArray(Buffer.toArray(uniqueCanisterIdBuffer));
      activeCanisterId := canisterId;
      return canisterId;
    };



    

    public func saveGolferPicture(principalId: T.PrincipalId, dto: DTOs.SaveGolferPictureDTO) : async Result.Result<(), T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func getMyGolfer(principalId: T.PrincipalId) : Result.Result<DTOs.MyGolferDTO, T.Error> {
      return #err(#NotFound);
    };

    public func getGolfer(principalId: T.PrincipalId, dto: DTOs.GetGolferDTO) : Result.Result<DTOs.GolferDTO, T.Error> {
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

    public func hasFriends(golferPrincipalId: T.PrincipalId, inviteIds: [T.PrincipalId]) : async Bool {
      
       let golferCanisterId = golferCanisterIndex.get(golferPrincipalId);

       switch(golferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (foundCanisterId) : actor {
            hasFriends : (golferPrincipalId: T.PrincipalId, inviteIds: [T.PrincipalId]) -> async Bool;
          };

          return await golfer_canister.hasFriends(golferPrincipalId, inviteIds);
        };
        case (null){
          return false;
        }
       };
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

    //stable storage getters and setters

    public func getStableGolferCanisterIndex() : [(T.PrincipalId, T.CanisterId)]{
      return Iter.toArray(golferCanisterIndex.entries());
    };

    public func setStableGolferCanisterIndex(stable_golfer_canister_index: [(T.PrincipalId, T.CanisterId)]){
      let canisterIds : TrieMap.TrieMap<T.PrincipalId, T.CanisterId> = TrieMap.TrieMap<T.PrincipalId, T.CanisterId>(Text.equal, Text.hash);

      for (canisterId in Iter.fromArray(stable_golfer_canister_index)) {
        canisterIds.put(canisterId);
      };
      golferCanisterIndex := canisterIds;
    };

    public func getStableActiveCanisterId() : T.CanisterId {
      return activeCanisterId;
    };

    public func setStableActiveCanisterId(stable_active_canister_id: T.CanisterId){
      activeCanisterId := stable_active_canister_id;
    };  

    public func getStableUsernames() : [(T.PrincipalId, Text)] {
      return Iter.toArray(usernames.entries());
    };

    public func setStableUsernames(stable_usernames : [(T.PrincipalId, Text)]) : () {
      let usernames_map : TrieMap.TrieMap<T.PrincipalId, T.CanisterId> = TrieMap.TrieMap<T.PrincipalId, T.CanisterId>(Text.equal, Text.hash);

      for (username in Iter.fromArray(stable_usernames)) {
        usernames_map.put(username);
      };
      usernames := usernames_map;
    };

    public func getStableUniqueGolferCanisterIds() : [T.CanisterId] {
      return List.toArray(uniqueGolferCanisterIds);
    };

    public func setStableUniqueGolferCanisterIds(stable_unique_golfer_canister_ids : [T.CanisterId]) : () {
      let canisterIdBuffer = Buffer.fromArray<T.CanisterId>([]);

      for (canisterId in Iter.fromArray(stable_unique_golfer_canister_ids)) {
        canisterIdBuffer.add(canisterId);
      };
      uniqueGolferCanisterIds := List.fromArray(Buffer.toArray(canisterIdBuffer));
    };

    public func getStableTotalGolfers() : Nat {
      return totalGolfers;
    };

    public func setStableTotalGolfers(stable_total_golfers : Nat) : () {
      totalGolfers := stable_total_golfers;
    };

    
  };
};


    