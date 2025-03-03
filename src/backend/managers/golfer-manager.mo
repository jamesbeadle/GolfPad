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
import Debug "mo:base/Debug";
import Base "mo:waterway-mops/BaseTypes";
import GolferCommands "../commands/golfer_commands";

module {
  public class GolferManager() {

    private var golferCanisterIndex: TrieMap.TrieMap<T.GolferId, Base.CanisterId> = TrieMap.TrieMap<T.GolferId, Base.CanisterId>(Text.equal, Text.hash);
    private var activeCanisterId: Base.CanisterId = "";
    private var usernames : TrieMap.TrieMap<T.GolferId, Text> = TrieMap.TrieMap<T.GolferId, Text>(Text.equal, Text.hash);
    private var uniqueGolferCanisterIds : List.List<Base.CanisterId> = List.nil();
    private var totalGolfers : Nat = 0;
    
    public func createGolfer(dto: GolferCommands.CreateGolfer) : async Result.Result<(), T.Error> {
      
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
      Debug.print("Past Checks");
      let existingGolferCanisterId = golferCanisterIndex.get(principalId);
      switch(existingGolferCanisterId){
        case (?_){
          return #err(#AlreadyExists);
        };
        case (null){
          Debug.print("Creating New Canister");
          if(activeCanisterId == ""){
            await createNewCanister();
            Debug.print("Active Canister ID: " # activeCanisterId);
          };

          var golfer_canister = actor (activeCanisterId) : actor {
            isCanisterFull : () -> async Bool;
            createGolfer : (principal: T.GolferId, dto: DTOs.CreateGolferDTO) -> async Result.Result<(), T.Error>;  
          };
          Debug.print("Creating Golfer because canister is not full");

          let isCanisterFull = await golfer_canister.isCanisterFull(); 
        
          if(isCanisterFull){              
            await createNewCanister();
            golfer_canister := actor (activeCanisterId) : actor {
              isCanisterFull : () -> async Bool;
              createGolfer : (principal: T.GolferId, dto: DTOs.CreateGolferDTO) -> async Result.Result<(), T.Error>;  
            };
          };
          Debug.print("Entering golfer canister file");
          return await golfer_canister.createGolfer(principalId, dto);
        }
      };    
    };
      
    public func updateGolfer(principalId: T.GolferId, dto: GolferCommands.UpdateGolfer) : async Result.Result<(), T.Error> {
      
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
            updateGolfer : (principal: T.GolferId, dto: DTOs.UpdateGolferDTO) -> async Result.Result<(), T.Error>
          };
          return await golfer_canister.updateGolfer(principalId, dto);
        };
        case (null){
          return #err(#NotFound);
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

    public func saveGolferPicture(principalId: T.GolferId, dto: DTOs.UpdateGolferPictureDTO) : async Result.Result<(), T.Error> {
      let validProfilePicture = isProfilePictureValid(dto.golferPicture);
      if(not validProfilePicture){
        return #err(#InvalidProfilePicture);
      };

      let existingGolferCanisterId = golferCanisterIndex.get(principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (foundCanisterId) : actor {
            updateGolferPicture : (principal: T.GolferId, dto: DTOs.UpdateGolferPictureDTO) -> async Result.Result<(), T.Error>
          };
          return await golfer_canister.updateGolferPicture(principalId, dto);
        };
        case (null){
          if(activeCanisterId == ""){
            await createNewCanister();
          };

          var golfer_canister = actor (activeCanisterId) : actor {
            isCanisterFull : () -> async Bool;
            updateGolferPicture : (principal: T.GolferId, dto: DTOs.UpdateGolferPictureDTO) -> async Result.Result<(), T.Error>;  
          };

          let isCanisterFull = await golfer_canister.isCanisterFull();
          if(isCanisterFull){
            await createNewCanister();
            
            golfer_canister := actor (activeCanisterId) : actor {
              updateGolferPicture : (principal: T.GolferId, dto: DTOs.UpdateGolferPictureDTO) -> async Result.Result<(), T.Error>;  
              isCanisterFull : () -> async Bool;
            };
          };

          return await golfer_canister.updateGolferPicture(principalId, dto);
        }
      };    

      return #err(#NotFound);
    };

    private func isProfilePictureValid(profilePicture : Blob) : Bool {
      let sizeInKB = Array.size(Blob.toArray(profilePicture)) / 1024;
      return (sizeInKB > 0 or sizeInKB <= 500);
    };

    public func getMyGolfer(principalId: T.GolferId) : async Result.Result<DTOs.MyGolferDTO, T.Error> {
      
      let existingGolferCanisterId = golferCanisterIndex.get(principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            getMyGolfer : (principalId: T.GolferId) -> async Result.Result<DTOs.MyGolferDTO, T.Error>;
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
            getGolfer : (principalId: T.GolferId) -> async Result.Result<DTOs.GolferDTO, T.Error>;
          };

          let golfer = await golfer_canister.getGolfer(dto.golferPrincipalId);
          return golfer;
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
                getGolfer : query (principal: T.GolferId) -> async Result.Result<DTOs.GolferDTO, T.Error>
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

    public func listFriendRequests(principalId: T.GolferId, dto: DTOs.PaginationFilters) : async Result.Result<DTOs.FriendRequestsDTO, T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            listFriendRequests : (principalId: T.GolferId, dto: DTOs.PaginationFilters) -> async Result.Result<DTOs.FriendRequestsDTO, T.Error>;
          };

          return await golfer_canister.listFriendRequests(principalId, dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func acceptFriendRequest(principalId: T.GolferId, dto: DTOs.AcceptFriendRequestDTO) : async Result.Result<(), T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            acceptFriendRequest : (principalId: T.GolferId, dto: DTOs.AcceptFriendRequestDTO) -> async Result.Result<(), T.Error>;
          };

          let _  = await golfer_canister.acceptFriendRequest(principalId, dto);
          return await golfer_canister.acceptFriendRequest(dto.requestedBy, dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func rejectFriendRequest(principalId: T.GolferId, dto: DTOs.RejectFriendRequestDTO) : async Result.Result<(), T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            rejectFriendRequest : (principalId: T.GolferId, dto: DTOs.RejectFriendRequestDTO) -> async Result.Result<(), T.Error>;
          };

          return await golfer_canister.rejectFriendRequest(principalId, dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func sendFriendRequest(principalId: T.GolferId, dto: DTOs.SendFriendRequestDTO) : async Result.Result<(), T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            sendFriendRequest : (principalId: T.GolferId, dto: DTOs.SendFriendRequestDTO) -> async Result.Result<(), T.Error>;
          };

          return await golfer_canister.sendFriendRequest(principalId, dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func getGolferGameSummaries(principalId: T.GolferId, dto: DTOs.PaginationFilters) : async Result.Result<DTOs.GolferGameSummariesDTO, T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            getGolferGameSummaries : (principalId: T.GolferId, dto: DTOs.PaginationFilters) -> async Result.Result<DTOs.GolferGameSummariesDTO, T.Error>;
          };

          return await golfer_canister.getGolferGameSummaries(principalId, dto);
        };   
        case (null){
          return #ok({
            entries = [];
            limit = 0;
            offset = 0;
            totalEntries = 0;
          });
        }
      };
    };

    public func getBuzz(principalId: T.GolferId, dto: DTOs.PaginationFilters) : async Result.Result<DTOs.GolferBuzzDTO, T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            getBuzz : (principalId: T.GolferId, dto: DTOs.PaginationFilters) -> async Result.Result<DTOs.GolferBuzzDTO, T.Error>;
          };

          return await golfer_canister.getBuzz(principalId, dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func getUpcomingGames(principalId: T.GolferId, dto: DTOs.PaginationFilters) : async Result.Result<DTOs.UpcomingGamesDTO, T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            getUpcomingGames : (golferPrincipalId: T.GolferId, dto: DTOs.PaginationFilters) -> async Result.Result<DTOs.UpcomingGamesDTO, T.Error>;
          };

          return await golfer_canister.getUpcomingGames(principalId, dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func hasFriends(golferPrincipalId: T.GolferId, inviteIds: [T.GolferId]) : async Bool {
      
       let golferCanisterId = golferCanisterIndex.get(golferPrincipalId);

       switch(golferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (foundCanisterId) : actor {
            hasFriends : (golferPrincipalId: T.GolferId, inviteIds: [T.GolferId]) -> async Bool;
          };

          return await golfer_canister.hasFriends(golferPrincipalId, inviteIds);
        };
        case (null){
          return false;
        }
       };
    };

    public func friendRequestExists(golferPrincipalId: T.GolferId, requestedById: T.GolferId) : async Bool {
      
       let golferCanisterId = golferCanisterIndex.get(golferPrincipalId);

       switch(golferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (foundCanisterId) : actor {
            friendRequestExists : (golferPrincipalId: T.GolferId, requestedById: T.GolferId) -> async Bool;
          };

          return await golfer_canister.friendRequestExists(golferPrincipalId, requestedById);
        };
        case (null){
          return false;
        }
       };
    };

    public func getGolfCourse(golferPrincipalId: T.GolferId, courseId: T.GolfCourseId) : async Result.Result<DTOs.GolfCourseDTO, T.Error>{
      
      let golferCanisterId = golferCanisterIndex.get(golferPrincipalId);

      switch(golferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (foundCanisterId) : actor {
            getGolfCourse : (golferPrincipalId: T.GolferId, dto: DTOs.GetGolfCourseDTO) -> async Result.Result<DTOs.GolfCourseDTO, T.Error>;
          };
          return await golfer_canister.getGolfCourse(golferPrincipalId, { courseId = courseId  });
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func customCourseExists(golferPrincipalId: T.GolferId, courseId: T.GolfCourseId) : async Bool {
      let golferCanisterId = golferCanisterIndex.get(golferPrincipalId);

       switch(golferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (foundCanisterId) : actor {
            customCourseExists : (golferPrincipalId: T.GolferId, courseId: T.GolfCourseId) -> async Bool;
          };

          return await golfer_canister.customCourseExists(golferPrincipalId, courseId);
        };
        case (null){
          return false;
        }
       };
    };
      
    public func listCourses(golferPrincipalId: T.GolferId, dto: DTOs.PaginationFilters) : async Result.Result<DTOs.CoursesDTO, T.Error> {
      let golferCanisterId = golferCanisterIndex.get(golferPrincipalId);

       switch(golferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (foundCanisterId) : actor {
            listCourses : (golferPrincipalId: T.GolferId, dto: DTOs.PaginationFilters) -> async Result.Result<DTOs.CoursesDTO, T.Error>;
          };

          return await golfer_canister.listCourses(golferPrincipalId, dto);
        };
        case (null){
          return #err(#NotFound);
        }
       };
    };
      
    public func createGolfCourse(golferPrincipalId: T.GolferId, dto: DTOs.CreateGolfCourseDTO) : async Result.Result<(), T.Error> {
      let golferCanisterId = golferCanisterIndex.get(golferPrincipalId);
      Debug.print("Golfer Canister ID: " # debug_show(golferCanisterId));

       switch(golferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (foundCanisterId) : actor {
            createGolfCourse : (golferPrincipalId: T.GolferId, dto: DTOs.CreateGolfCourseDTO) -> async Result.Result<(), T.Error>;
          };
          Debug.print("Combined principal and dto, Entering Canister");

          return await golfer_canister.createGolfCourse(golferPrincipalId, dto);
        };
        case (null){
          return #err(#NotFound);
        }
       };
    };
      
    public func updateGolfCourse(golferPrincipalId: T.GolferId, dto: DTOs.UpdateGolfCourseDTO) : async Result.Result<(), T.Error> {
      let golferCanisterId = golferCanisterIndex.get(golferPrincipalId);

       switch(golferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (foundCanisterId) : actor {
            updateGolfCourse : (golferPrincipalId: T.GolferId, dto: DTOs.UpdateGolfCourseDTO) -> async Result.Result<(), T.Error>;
          };

          return await golfer_canister.updateGolfCourse(golferPrincipalId, dto);
        };
        case (null){
          return #err(#NotFound);
        }
       };
    };
      
    public func deleteGolfCourse(golferPrincipalId: T.GolferId, dto: DTOs.DeleteGolfCourseDTO) : async Result.Result<(), T.Error> {
      let golferCanisterId = golferCanisterIndex.get(golferPrincipalId);

       switch(golferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (foundCanisterId) : actor {
            deleteGolfCourse : (golferPrincipalId: T.GolferId, dto: DTOs.DeleteGolfCourseDTO) -> async Result.Result<(), T.Error>;
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
      Debug.print("Got Cycles");
      let canister = await GolferCanister._GolferCanister();
      Debug.print("Created Canister");
      let IC : Management.Management = actor (Environment.Default);
      Debug.print("Got IC");
      let principal = ?Principal.fromText(Environment.BACKEND_CANISTER_ID);
      Debug.print("Got Principal");
      let _ = await Utilities.updateCanister_(canister, principal, IC);
      Debug.print("Updated Canister");
      let canister_principal = Principal.fromActor(canister);
      Debug.print("Got Canister Principal");
      let canisterId = Principal.toText(canister_principal);
      Debug.print("Got Canister ID");

      if (canisterId == "") {
        return;
      };
      Debug.print("Canister ID is not empty");
      let uniqueCanisterIdBuffer = Buffer.fromArray<Base.CanisterId>(List.toArray(uniqueGolferCanisterIds));
      Debug.print("Created Unique Canister ID Buffer");
      uniqueCanisterIdBuffer.add(canisterId);
      Debug.print("Added Canister ID to Buffer");
      uniqueGolferCanisterIds := List.fromArray(Buffer.toArray(uniqueCanisterIdBuffer));
      Debug.print("Set Unique Canister IDs");
      activeCanisterId := canisterId;
      Debug.print("Set Active Canister ID");
      return;
    };

    public func addGame(invitedByPrincipalId: T.GolferId, gameId: T.GameId, inviteIds: [T.GolferId]) : async Result.Result<(), T.Error>{
      for(principalId in Iter.fromArray(inviteIds)){
        let golferCanisterId = golferCanisterIndex.get(principalId);

        switch(golferCanisterId){
          case (?foundCanisterId){

            let golfer_canister = actor (foundCanisterId) : actor {
              addGameInvite : (invitedByPrincipalId: T.GolferId, invitedPrincipalId: T.GolferId, gameId: T.GameId) -> async Result.Result<(), T.Error>
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

    public func getStableCanisterIndex() : [(T.GolferId, Base.CanisterId)]{
      return Iter.toArray(golferCanisterIndex.entries());
    };

    public func setStableCanisterIndex(stable_golfer_canister_index: [(T.GolferId, Base.CanisterId)]){
      let canisterIds : TrieMap.TrieMap<T.GolferId, Base.CanisterId> = TrieMap.TrieMap<T.GolferId, Base.CanisterId>(Text.equal, Text.hash);

      for (canisterId in Iter.fromArray(stable_golfer_canister_index)) {
        canisterIds.put(canisterId);
      };
      golferCanisterIndex := canisterIds;
    };

    public func getStableActiveCanisterId() : Base.CanisterId {
      return activeCanisterId;
    };

    public func setStableActiveCanisterId(stable_active_canister_id: Base.CanisterId){
      activeCanisterId := stable_active_canister_id;
    };  

    public func getStableUsernames() : [(T.GolferId, Text)] {
      return Iter.toArray(usernames.entries());
    };

    public func setStableUsernames(stable_usernames : [(T.GolferId, Text)]) : () {
      let usernames_map : TrieMap.TrieMap<T.GolferId, Base.CanisterId> = TrieMap.TrieMap<T.GolferId, Base.CanisterId>(Text.equal, Text.hash);

      for (username in Iter.fromArray(stable_usernames)) {
        usernames_map.put(username);
      };
      usernames := usernames_map;
    };

    public func getStableUniqueCanisterIds() : [Base.CanisterId] {
      return List.toArray(uniqueGolferCanisterIds);
    };

    public func setStableUniqueCanisterIds(stable_unique_canister_ids : [Base.CanisterId]) : () {
      let canisterIdBuffer = Buffer.fromArray<Base.CanisterId>([]);

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


    