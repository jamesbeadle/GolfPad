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
import Management "../utilities/Management";
import GolferCanister "../canister-definitions/golfer-canister";
import Utilities "../utilities/Utilities";
import Environment "../utilities/Environment";
import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Debug "mo:base/Debug";
import Base "mo:waterway-mops/BaseTypes";
import GolferCommands "../commands/golfer_commands";
import GolferQueries "../queries/golfer_queries";
import GolfCourseCommands "../commands/golf_course_commands";
import GolfCourseQueries "../queries/golf_course_queries";

module {
  public class GolferManager() {

    private var golferCanisterIndex: TrieMap.TrieMap<T.GolferId, Base.CanisterId> = TrieMap.TrieMap<T.GolferId, Base.CanisterId>(Text.equal, Text.hash);
    private var activeCanisterId: Base.CanisterId = "";
    private var usernames : TrieMap.TrieMap<T.GolferId, Text> = TrieMap.TrieMap<T.GolferId, Text>(Text.equal, Text.hash);
    private var uniqueGolferCanisterIds : List.List<Base.CanisterId> = List.nil();
    private var totalGolfers : Nat = 0;

    //Getters

    public func isUsernameAvailable(dto: GolferQueries.IsUsernameAvailable) : GolferQueries.UsernameAvailable{
      return not isUsernameTaken(dto.username, dto.principalId)
    };

    public func getProfile(dto: GolferQueries.GetProfile) : async Result.Result<GolferQueries.Profile, T.Error> {
      
      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            getMyGolfer : (dto: GolferQueries.GetProfile) -> async Result.Result<GolferQueries.Profile, T.Error>;
          };

          let golfer = await golfer_canister.getMyGolfer(dto);
          return golfer;
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func getBuzz(dto: GolferQueries.GetBuzz) : async Result.Result<GolferQueries.Buzz, T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            getBuzz : (dto: GolferQueries.GetBuzz) -> async Result.Result<GolferQueries.Buzz, T.Error>;
          };

          return await golfer_canister.getBuzz(dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func getUpcomingGames(dto: GolferQueries.GetUpcomingGames) : async Result.Result<GolferQueries.UpcomingGames, T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            getUpcomingGames : (dto: GolferQueries.GetUpcomingGames) -> async Result.Result<GolferQueries.UpcomingGames, T.Error>;
          };

          return await golfer_canister.getUpcomingGames(dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func getGolfer(dto: GolferQueries.GetGolfer) : async Result.Result<GolferQueries.Golfer, T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            getGolfer : (dto: GolferQueries.GetGolfer) -> async Result.Result<GolferQueries.Golfer, T.Error>;
          };

          let golfer = await golfer_canister.getGolfer(dto);
          return golfer;
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func listGolfers(dto: GolferQueries.ListGolfers) : async Result.Result<GolferQueries.Golfers, T.Error> {
      if(Text.size(dto.searchTerm) < 3){
        return #err(#TooShort);
      };

      let lowerCaseSearchTerm = Utilities.toLowercase(dto.searchTerm);
      let searchTermLength = Text.size(lowerCaseSearchTerm);
      let leftTrimmedUsernameText = Utilities.trimStartToLength(lowerCaseSearchTerm, searchTermLength);

      let golferBuffer = Buffer.fromArray<GolferQueries.GolferSummary>([]);

      label userNameLoop for (managerUsernameEntry in usernames.entries()) {

        let trimmedLowerUsername = Utilities.toLowercase(Utilities.trimStartToLength(managerUsernameEntry.1, searchTermLength));
        if(trimmedLowerUsername == leftTrimmedUsernameText){
          let existingGolferCanisterId = golferCanisterIndex.get(managerUsernameEntry.0);
          switch(existingGolferCanisterId){
            case (?foundCanisterId){
              let golfer_canister = actor (foundCanisterId) : actor {
                getGolfer : (dto: GolferQueries.GetGolfer) -> async Result.Result<GolferQueries.Golfer, T.Error>;
              };
              let result = await golfer_canister.getGolfer({ principalId = managerUsernameEntry.0 });
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

      let golfersDTO: GolferQueries.Golfers = {
        golfers = Buffer.toArray(golferBuffer);
      };
      
      return #ok(golfersDTO);
    };

    public func listFriends(dto: GolferQueries.ListFriends) : async Result.Result<GolferQueries.Friends, T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            listFriends : (dto: GolferQueries.ListFriends) -> async Result.Result<GolferQueries.Friends, T.Error>;
          };

          return await golfer_canister.listFriends(dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func listFriendRequests(dto: GolferQueries.ListFriendRequests) : async Result.Result<GolferQueries.FriendRequests, T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            listFriendRequests : (dto: GolferQueries.ListFriendRequests) -> async Result.Result<GolferQueries.FriendRequests, T.Error>;
          };

          return await golfer_canister.listFriendRequests(dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func resetActiveManagerCanister() : async(){
      golferCanisterIndex := TrieMap.TrieMap<T.GolferId, Base.CanisterId>(Text.equal, Text.hash);
      activeCanisterId := "";
      usernames := TrieMap.TrieMap<T.GolferId, Text>(Text.equal, Text.hash);
      uniqueGolferCanisterIds := List.nil();
      totalGolfers := 0;
      activeCanisterId := "";
      await createNewCanister();
    };



    //Update functions
    
    public func createUser(principalId: T.GolferId, dto: GolferCommands.CreateUser) : async Result.Result<(), T.Error> {
      
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
        case (?_){
          return #err(#AlreadyExists);
        };
        case (null){
          if(activeCanisterId == ""){
            await createNewCanister();
          };

          var golfer_canister = actor (activeCanisterId) : actor {
            isCanisterFull : () -> async Bool;
            createUser : (principalId: T.GolferId, dto: GolferCommands.CreateUser) -> async Result.Result<(), T.Error>;  
          };

          let isCanisterFull = await golfer_canister.isCanisterFull(); 
        
          if(isCanisterFull){              
            await createNewCanister();
            golfer_canister := actor (activeCanisterId) : actor {
              isCanisterFull : () -> async Bool;
              createUser : (principalId: T.GolferId, dto: GolferCommands.CreateUser) -> async Result.Result<(), T.Error>;  
            };
          };
          return await golfer_canister.createUser(principalId, dto);
        }
      };    
    };
      
    public func updateUsername(dto: GolferCommands.UpdateUsername) : async Result.Result<(), T.Error> {
      
      if(Text.size(dto.username) < 5 or Text.size(dto.username) > 20){
        return #err(#TooLong);
      };

      let invalidUsername = isUsernameTaken(dto.username, dto.principalId);
      if(invalidUsername){
        return #err(#AlreadyExists);
      };

      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (foundCanisterId) : actor {
            updateUsername : (dto: GolferCommands.UpdateUsername) -> async Result.Result<(), T.Error>
          };
          return await golfer_canister.updateUsername(dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };    
    };
      
    public func updateHandicap(dto: GolferCommands.UpdateHandicap) : async Result.Result<(), T.Error> {
      

      switch(dto.handicap){
        case (null){};
        case (?foundHandicap){
          if(foundHandicap < -540 or foundHandicap > 540){
            return #err(#OutOfRange);
          };
        }
      };

      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (foundCanisterId) : actor {
            updateHandicap : (dto: GolferCommands.UpdateHandicap) -> async Result.Result<(), T.Error>
          };
          return await golfer_canister.updateHandicap(dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };    
    };
      
    public func updateFirstName(dto: GolferCommands.UpdateFirstName) : async Result.Result<(), T.Error> {
      
      if(Text.size(dto.firstName) < 1 or Text.size(dto.firstName) > 20){
        return #err(#TooLong);
      };

      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (foundCanisterId) : actor {
            updateFirstName : (dto: GolferCommands.UpdateFirstName) -> async Result.Result<(), T.Error>
          };
          return await golfer_canister.updateFirstName(dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };    
    };
      
    public func updateLastName(dto: GolferCommands.UpdateLastName) : async Result.Result<(), T.Error> {
      
      if(Text.size(dto.lastName) < 1 or Text.size(dto.lastName) > 50){
        return #err(#TooLong);
      };

      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (foundCanisterId) : actor {
            updateFirstName : (dto: GolferCommands.UpdateLastName) -> async Result.Result<(), T.Error>
          };
          return await golfer_canister.updateFirstName(dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };    
    };
      
    public func updateHomeCourse(dto: GolferCommands.UpdateHomeCourse) : async Result.Result<(), T.Error> {
      
      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (foundCanisterId) : actor {
            updateHomeCourse : (dto: GolferCommands.UpdateHomeCourse) -> async Result.Result<(), T.Error>
          };
          return await golfer_canister.updateHomeCourse(dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };    
    };

    public func updateProfilePicture(dto: GolferCommands.UpdateProfilePicture) : async Result.Result<(), T.Error> {
      let validProfilePicture = isProfilePictureValid(dto.profilePicture);
      if(not validProfilePicture){
        return #err(#InvalidProfilePicture);
      };

      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){
          let golfer_canister = actor (foundCanisterId) : actor {
            updateProfilePicture : (dto: GolferCommands.UpdateProfilePicture) -> async Result.Result<(), T.Error>
          };
          return await golfer_canister.updateProfilePicture(dto);
        };
        case (null){
          if(activeCanisterId == ""){
            await createNewCanister();
          };

          var golfer_canister = actor (activeCanisterId) : actor {
            isCanisterFull : () -> async Bool;
            updateProfilePicture : (dto: GolferCommands.UpdateProfilePicture) -> async Result.Result<(), T.Error>;  
          };

          let isCanisterFull = await golfer_canister.isCanisterFull();
          if(isCanisterFull){
            await createNewCanister();
            
            golfer_canister := actor (activeCanisterId) : actor {
              updateProfilePicture : (dto: GolferCommands.UpdateProfilePicture) -> async Result.Result<(), T.Error>;  
              isCanisterFull : () -> async Bool;
            };
          };

          return await golfer_canister.updateProfilePicture(dto);
        }
      };    

      return #err(#NotFound);
    };

    public func acceptFriendRequest(dto: GolferCommands.AcceptFriendRequest) : async Result.Result<(), T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            acceptFriendRequest : (principalId: T.GolferId, dto: GolferCommands.AcceptFriendRequest) -> async Result.Result<(), T.Error>;
          };

          let _  = await golfer_canister.acceptFriendRequest(dto.principalId, dto);
          return await golfer_canister.acceptFriendRequest(dto.requestedBy, dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func rejectFriendRequest(dto: GolferCommands.RejectFriendRequest) : async Result.Result<(), T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            rejectFriendRequest : (dto: GolferCommands.RejectFriendRequest) -> async Result.Result<(), T.Error>;
          };

          return await golfer_canister.rejectFriendRequest(dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func sendFriendRequest(dto: GolferCommands.SendFriendRequest) : async Result.Result<(), T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){

          let golfer_canister = actor (foundCanisterId) : actor {
            sendFriendRequest : (dto: GolferCommands.SendFriendRequest) -> async Result.Result<(), T.Error>;
          };

          return await golfer_canister.sendFriendRequest(dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func addGame(dto: GolferCommands.AddGame) : async Result.Result<(), T.Error>{
      for(principalId in Iter.fromArray(dto.inviteIds)){
        let golferCanisterId = golferCanisterIndex.get(principalId);

        switch(golferCanisterId){
          case (?foundCanisterId){

            let golfer_canister = actor (foundCanisterId) : actor {
              addGameInvite : (dto: GolferCommands.AddGame) -> async Result.Result<(), T.Error>
            };
          
            return await golfer_canister.addGameInvite(dto);
          };
          case _ {
            return #err(#NotFound);
          }
        };
      };
      return #ok();
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

    //private functions

    private func isUsernameTaken(username : Text, principalId : T.GolferId) : Bool {
      for (managerUsername in usernames.entries()) {

        let lowerCaseUsername = Utilities.toLowercase(username);
        let existingUsername = Utilities.toLowercase(managerUsername.1);

        if (lowerCaseUsername == existingUsername and managerUsername.0 != principalId) {
          return true;
        };
      };

      return false;
    };

    private func isProfilePictureValid(profilePicture : ?Blob) : Bool {
      switch(profilePicture){
        case (?foundProfilePicture){
          let sizeInKB = Array.size(Blob.toArray(foundProfilePicture)) / 1024;
          return (sizeInKB > 0 or sizeInKB <= 500);
        };
        case (null) { return true; }
      }
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

    public func getCaller() : async Text{
      let golfer_canister = actor (activeCanisterId) : actor {
        getCaller : () -> async Text
      };
    
      return await golfer_canister.getCaller();
    };

    public func getTotalGolfers() : async Nat{
      let golfer_canister = actor (activeCanisterId) : actor {
        getTotalGolfers : () -> async Nat
      };
    
      return await golfer_canister.getTotalGolfers();
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


    