import Result "mo:base/Result";
import Cycles "mo:base/ExperimentalCycles";
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
import Array "mo:base/Array";
import Blob "mo:base/Blob";

module {
  public class GolferManager() {

    private var golferCanisterIndex: TrieMap.TrieMap<T.PrincipalId, T.CanisterId> = TrieMap.TrieMap<T.PrincipalId, T.CanisterId>(Text.equal, Text.hash);
    private var activeCanisterId: T.CanisterId = "";
    private var usernames : TrieMap.TrieMap<T.PrincipalId, Text> = TrieMap.TrieMap<T.PrincipalId, Text>(Text.equal, Text.hash);
    private var uniqueGolferCanisterIds : List.List<T.CanisterId> = List.nil();
    private var totalGolfers : Nat = 0;
    
      
    public func saveGolfer(principalId: T.PrincipalId, dto: DTOs.UpdateGolferDTO) : async Result.Result<(), T.Error> {
      
      if(Text.size(dto.username) < 5 or Text.size(dto.username) > 20){
        return #err(#TooLong);
      };

      switch(dto.handicap){
        case (null){};
        case (?foundHandicap){
          if(foundHandicap < -540 or foundHandicap > 540){
            return #err(#OutOfRange);
          };
        }
      };

      let invalidUsername = isUsernameTaken(dto.username, principalId);
      if(invalidUsername){
        return #err(#AlreadyExists);
      };

      let existingGolferCanisterId = golferCanisterIndex.get(principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (foundCanisterId) : actor {
            saveGolfer : (principal: T.PrincipalId, dto: DTOs.UpdateGolferDTO) -> async Result.Result<(), T.Error>
          };
          return await golfer_canister.saveGolfer(principalId, dto);
        };
        case (null){
            if(activeCanisterId == ""){
              await createNewCanister();
            };

            var golfer_canister = actor (activeCanisterId) : actor {
              getLatestId : () -> async T.GameId;
              isCanisterFull : () -> async Bool;
              saveGolfer : (principal: T.PrincipalId, dto: DTOs.UpdateGolferDTO) -> async Result.Result<(), T.Error>;  
            };

            let isCanisterFull = await golfer_canister.isCanisterFull(); 
        
            if(isCanisterFull){
              let latestId = await golfer_canister.getLatestId();
              let nextId: T.GameId = latestId + 1;
              
              await createNewCanister();
              golfer_canister := actor (activeCanisterId) : actor {
                getLatestId : () -> async T.GameId;
                isCanisterFull : () -> async Bool;
                saveGolfer : (principal: T.PrincipalId, dto: DTOs.UpdateGolferDTO) -> async Result.Result<(), T.Error>;  
              };
            };

            return await golfer_canister.saveGolfer(principalId, dto);
        }
      };    
    };

    public func isUsernameTaken(username : Text, principalId : Text) : Bool {
      for (managerUsername in usernames.entries()) {

        let lowerCaseUsername = Utilities.toLowercase(username);
        let existingUsername = Utilities.toLowercase(managerUsername.1);

        if (lowerCaseUsername == existingUsername and managerUsername.0 != principalId) {
          return true;
        };
      };

      return false;
    };

    public func saveGolferPicture(principalId: T.PrincipalId, dto: DTOs.UpdateGolferPictureDTO) : async Result.Result<(), T.Error> {
      let validProfilePicture = isProfilePictureValid(dto.golferPicture);
      if(not validProfilePicture){
        return #err(#InvalidProfilePicture);
      };

      let existingGolferCanisterId = golferCanisterIndex.get(principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (foundCanisterId) : actor {
            saveGolferPicture : (principal: T.PrincipalId, dto: DTOs.UpdateGolferPictureDTO) -> async Result.Result<(), T.Error>
          };
          return await golfer_canister.saveGolferPicture(principalId, dto);
        };
        case (null){
            if(activeCanisterId == ""){
              await createNewCanister();
            };

            var golfer_canister = actor (activeCanisterId) : actor {
              isCanisterFull : () -> async Bool;
              saveGolferPicture : (principal: T.PrincipalId, dto: DTOs.UpdateGolferPictureDTO) -> async Result.Result<(), T.Error>;  
            };

            let isCanisterFull = await golfer_canister.isCanisterFull();
            if(isCanisterFull){
              await createNewCanister();
             
              golfer_canister := actor (activeCanisterId) : actor {
                saveGolferPicture : (principal: T.PrincipalId, dto: DTOs.UpdateGolferPictureDTO) -> async Result.Result<(), T.Error>;  
                getLatestId : () -> async T.GameId;
                isCanisterFull : () -> async Bool;
              };
            };

            return await golfer_canister.saveGolferPicture(principalId, dto);
        }
      };    

      return #err(#NotFound);
    };

    private func isProfilePictureValid(profilePicture : Blob) : Bool {
      let sizeInKB = Array.size(Blob.toArray(profilePicture)) / 1024;
      return (sizeInKB > 0 or sizeInKB <= 500);
    };

    public func getMyGolfer(principalId: T.PrincipalId) : async Result.Result<DTOs.MyGolferDTO, T.Error> {
      
      let existingGolferCanisterId = golferCanisterIndex.get(principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            getMyGolfer : (principalId: T.PrincipalId) -> async Result.Result<DTOs.MyGolferDTO, T.Error>;
          };

          let golfer = await golfer_canister.getMyGolfer(principalId);
          return golfer;
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func getGolfer(dto: DTOs.GetGolferDTO) : async Result.Result<DTOs.GolferDTO, T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(dto.golferPrincipalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            getGolfer : (principalId: T.PrincipalId) -> async Result.Result<DTOs.GolferDTO, T.Error>;
          };

          let golfer = await golfer_canister.getGolfer(dto.golferPrincipalId);
          return golfer;
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func saveYardageSet(principalId: T.PrincipalId, dto: DTOs.UpdateYardageSetDTO) : async Result.Result<(), T.Error> {
      
      let nameLength = Text.size(dto.name);
      if(nameLength < 3 or nameLength > 20){
        return #err(#TooLong);
      };

      let existingGolferCanisterId = golferCanisterIndex.get(principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (foundCanisterId) : actor {
            saveYardageSet : (principal: T.PrincipalId, dto: DTOs.UpdateYardageSetDTO) -> async Result.Result<(), T.Error>
          };
          return await golfer_canister.saveYardageSet(principalId, dto);
        };
        case (null){
          return #err(#NotFound);        
        }
      }; 
    };

    public func deleteYardageSet(principalId: T.PrincipalId, dto: DTOs.DeleteYardageSetDTO) : async Result.Result<(), T.Error> {
     
      let existingGolferCanisterId = golferCanisterIndex.get(principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (foundCanisterId) : actor {
            deleteYardageSet : (principal: T.PrincipalId, dto: DTOs.DeleteYardageSetDTO) -> async Result.Result<(), T.Error>
          };
          return await golfer_canister.deleteYardageSet(principalId, dto);
        };
        case (null){
          return #err(#NotFound);
        }
      }; 
    };

    public func getYardageSet(principalId: T.PrincipalId, dto: DTOs.GetYardageSetDTO) : async Result.Result<DTOs.YardageSetDTO, T.Error> {
       
      let existingGolferCanisterId = golferCanisterIndex.get(principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            getYardageSet : (principalId: T.PrincipalId, dto: DTOs.GetYardageSetDTO) -> async Result.Result<DTOs.YardageSetDTO, T.Error>;
          };

          return await golfer_canister.getYardageSet(principalId, dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func listGolfers(dto: DTOs.ListGolfersDTO) : async Result.Result<DTOs.GolfersDTO, T.Error> {
      if(Text.size(dto.searchTerm) < 3){
        return #err(#TooShort);
      };

      let lowerCaseSearchTerm = Utilities.toLowercase(dto.searchTerm);
      let searchTermLength = Text.size(lowerCaseSearchTerm);
      let leftTrimmedUsernameText = Utilities.trimStartToLength(lowerCaseSearchTerm, searchTermLength);

      let golferBuffer = Buffer.fromArray<DTOs.GolferSummaryDTO>([]);

      label userNameLoop for (managerUsernameEntry in usernames.entries()) {

        let trimmedLowerUsername = Utilities.toLowercase(Utilities.trimStartToLength(managerUsernameEntry.1, searchTermLength));
        if(trimmedLowerUsername == leftTrimmedUsernameText){
          let existingGolferCanisterId = golferCanisterIndex.get(managerUsernameEntry.0);
          switch(existingGolferCanisterId){
            case (?foundCanisterId){
              let golfer_canister = actor (foundCanisterId) : actor {
                getGolfer : query (principal: T.PrincipalId) -> async Result.Result<DTOs.GolferDTO, T.Error>
              };
              let result = await golfer_canister.getGolfer(managerUsernameEntry.0);
              switch(result){
                case (#ok foundGolfer){

                  golferBuffer.add({
                    golferName = foundGolfer.username;
                    golferPicture = foundGolfer.golferPicture;
                    golferPictureExtension = foundGolfer.golferPictureExtension;
                    golferPrincipalId = foundGolfer.principalId;
                    handicap = foundGolfer.handicap;
                  });

                };
                case _ {
                  return #err(#NotFound);
                }
              }
            };
            case (null){}
          };
        };
        
        if(golferBuffer.size() > 3){
          break userNameLoop;
        }

      };

      let golfersDTO: DTOs.GolfersDTO = {
        golfers = Buffer.toArray(golferBuffer);
      };
      
      return #ok(golfersDTO);
    };

    public func listFriendRequests(principalId: T.PrincipalId, dto: DTOs.PaginationFilters) : async Result.Result<DTOs.FriendRequestsDTO, T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            listFriendRequests : (principalId: T.PrincipalId, dto: DTOs.PaginationFilters) -> async Result.Result<DTOs.FriendRequestsDTO, T.Error>;
          };

          return await golfer_canister.listFriendRequests(principalId, dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func acceptFriendRequest(principalId: T.PrincipalId, dto: DTOs.AcceptFriendRequestDTO) : async Result.Result<(), T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            acceptFriendRequest : (principalId: T.PrincipalId, dto: DTOs.AcceptFriendRequestDTO) -> async Result.Result<(), T.Error>;
          };

          let _  = await golfer_canister.acceptFriendRequest(principalId, dto);
          return await golfer_canister.acceptFriendRequest(dto.requestedBy, dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func rejectFriendRequest(principalId: T.PrincipalId, dto: DTOs.RejectFriendRequestDTO) : async Result.Result<(), T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            rejectFriendRequest : (principalId: T.PrincipalId, dto: DTOs.RejectFriendRequestDTO) -> async Result.Result<(), T.Error>;
          };

          return await golfer_canister.rejectFriendRequest(principalId, dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func sendFriendRequest(principalId: T.PrincipalId, dto: DTOs.SendFriendRequestDTO) : async Result.Result<(), T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            sendFriendRequest : (principalId: T.PrincipalId, dto: DTOs.SendFriendRequestDTO) -> async Result.Result<(), T.Error>;
          };

          return await golfer_canister.sendFriendRequest(principalId, dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func getGolferGameSummaries(principalId: T.PrincipalId, dto: DTOs.PaginationFilters) : async Result.Result<DTOs.GolferGameSummariesDTO, T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            getGolferGameSummaries : (principalId: T.PrincipalId, dto: DTOs.PaginationFilters) -> async Result.Result<DTOs.GolferGameSummariesDTO, T.Error>;
          };

          return await golfer_canister.getGolferGameSummaries(principalId, dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func getBuzz(principalId: T.PrincipalId, dto: DTOs.PaginationFilters) : async Result.Result<DTOs.GolferBuzzDTO, T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            getBuzz : (principalId: T.PrincipalId, dto: DTOs.PaginationFilters) -> async Result.Result<DTOs.GolferBuzzDTO, T.Error>;
          };

          return await golfer_canister.getBuzz(principalId, dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func getUpcomingGames(principalId: T.PrincipalId, dto: DTOs.UpcomingGamesDTO) : async Result.Result<DTOs.UpcomingGamesDTO, T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            getUpcomingGames : (principalId: T.PrincipalId, dto: DTOs.UpcomingGamesDTO) -> async Result.Result<DTOs.UpcomingGamesDTO, T.Error>;
          };

          return await golfer_canister.getUpcomingGames(principalId, dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };
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

    public func friendRequestExists(golferPrincipalId: T.PrincipalId, requestedById: T.PrincipalId) : async Bool {
      
       let golferCanisterId = golferCanisterIndex.get(golferPrincipalId);

       switch(golferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (foundCanisterId) : actor {
            friendRequestExists : (golferPrincipalId: T.PrincipalId, requestedById: T.PrincipalId) -> async Bool;
          };

          return await golfer_canister.friendRequestExists(golferPrincipalId, requestedById);
        };
        case (null){
          return false;
        }
       };
    };

    public func getGolfCourse(golferPrincipalId: T.PrincipalId, courseId: T.GolfCourseId) : async Result.Result<DTOs.GolfCourseDTO, T.Error>{
      
      let golferCanisterId = golferCanisterIndex.get(golferPrincipalId);

      switch(golferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (foundCanisterId) : actor {
            getGolfCourse : (golferPrincipalId: T.PrincipalId, dto: DTOs.GetGolfCourseDTO) -> async Result.Result<DTOs.GolfCourseDTO, T.Error>;
          };
          return await golfer_canister.getGolfCourse(golferPrincipalId, { courseId = courseId  });
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func customCourseExists(golferPrincipalId: T.PrincipalId, courseId: T.GolfCourseId) : async Bool {
      let golferCanisterId = golferCanisterIndex.get(golferPrincipalId);

       switch(golferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (foundCanisterId) : actor {
            customCourseExists : (golferPrincipalId: T.PrincipalId, courseId: T.GolfCourseId) -> async Bool;
          };

          return await golfer_canister.customCourseExists(golferPrincipalId, courseId);
        };
        case (null){
          return false;
        }
       };
    };

      
    public func listCourses(golferPrincipalId: T.PrincipalId, dto: DTOs.PaginationFilters) : async Result.Result<DTOs.CoursesDTO, T.Error> {
      let golferCanisterId = golferCanisterIndex.get(golferPrincipalId);

       switch(golferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (foundCanisterId) : actor {
            listCourses : (golferPrincipalId: T.PrincipalId, dto: DTOs.PaginationFilters) -> async Result.Result<DTOs.CoursesDTO, T.Error>;
          };

          return await golfer_canister.listCourses(golferPrincipalId, dto);
        };
        case (null){
          return #err(#NotFound);
        }
       };
    };
      
    public func saveGolfCourse(golferPrincipalId: T.PrincipalId, dto: DTOs.UpdateGolfCourseDTO) : async Result.Result<(), T.Error> {
      let golferCanisterId = golferCanisterIndex.get(golferPrincipalId);

       switch(golferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (foundCanisterId) : actor {
            saveGolfCourse : (golferPrincipalId: T.PrincipalId, dto: DTOs.UpdateGolfCourseDTO) -> async Result.Result<(), T.Error>;
          };

          return await golfer_canister.saveGolfCourse(golferPrincipalId, dto);
        };
        case (null){
          return #err(#NotFound);
        }
       };
    };
      
    public func deleteGolfCourse(golferPrincipalId: T.PrincipalId, dto: DTOs.DeleteGolfCourseDTO) : async Result.Result<(), T.Error> {
      let golferCanisterId = golferCanisterIndex.get(golferPrincipalId);

       switch(golferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (foundCanisterId) : actor {
            deleteGolfCourse : (golferPrincipalId: T.PrincipalId, dto: DTOs.DeleteGolfCourseDTO) -> async Result.Result<(), T.Error>;
          };

          return await golfer_canister.deleteGolfCourse(golferPrincipalId, dto);
        };
        case (null){
          return #err(#NotFound);
        }
       };
    };

    private func createNewCanister() : async (){
      Cycles.add<system>(10_000_000_000_000);
      let canister = await GolferCanister._GolferCanister();
      let IC : Management.Management = actor (Environment.Default);
      let principal = ?Principal.fromText(Environment.BACKEND_CANISTER_ID);
      let _ = await Utilities.updateCanister_(canister, principal, IC);

      let canister_principal = Principal.fromActor(canister);
      let canisterId = Principal.toText(canister_principal);

      if (canisterId == "") {
        return;
      };

      let uniqueCanisterIdBuffer = Buffer.fromArray<T.CanisterId>(List.toArray(uniqueGolferCanisterIds));
      uniqueCanisterIdBuffer.add(canisterId);
      uniqueGolferCanisterIds := List.fromArray(Buffer.toArray(uniqueCanisterIdBuffer));
      activeCanisterId := canisterId;
      return;
    };

    public func addGame(invitedByPrincipalId: T.PrincipalId, gameId: T.GameId, inviteIds: [T.PrincipalId]) : async Result.Result<(), T.Error>{
      for(principalId in Iter.fromArray(inviteIds)){
        let golferCanisterId = golferCanisterIndex.get(principalId);

        switch(golferCanisterId){
          case (?foundCanisterId){

            let golfer_canister = actor (foundCanisterId) : actor {
              addGameInvite : (invitedByPrincipalId: T.PrincipalId, invitedPrincipalId: T.PrincipalId, gameId: T.GameId) -> async Result.Result<(), T.Error>
            };
          
            return await golfer_canister.addGameInvite(invitedByPrincipalId, principalId, gameId);
          };
          case _ {
            return #err(#NotFound);
          }
        };
      };
      return #ok();
    };

    //stable storage getters and setters

    public func getStableCanisterIndex() : [(T.PrincipalId, T.CanisterId)]{
      return Iter.toArray(golferCanisterIndex.entries());
    };

    public func setStableCanisterIndex(stable_golfer_canister_index: [(T.PrincipalId, T.CanisterId)]){
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

    public func getStableUniqueCanisterIds() : [T.CanisterId] {
      return List.toArray(uniqueGolferCanisterIds);
    };

    public func setStableUniqueCanisterIds(stable_unique_canister_ids : [T.CanisterId]) : () {
      let canisterIdBuffer = Buffer.fromArray<T.CanisterId>([]);

      for (canisterId in Iter.fromArray(stable_unique_canister_ids)) {
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


    