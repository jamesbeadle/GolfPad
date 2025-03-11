import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Bool "mo:base/Bool";
import Buffer "mo:base/Buffer";
import Cycles "mo:base/ExperimentalCycles";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Result "mo:base/Result";
import Text "mo:base/Text";
import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Base "mo:waterway-mops/BaseTypes";

import T "../data-types/types";
import Management "../utilities/Management";
import Utilities "../utilities/Utilities";
import Environment "../utilities/Environment";

import GolfTeamCanister "../canister-definitions/golf-team-canister";
import GolfTeamCommands "../commands/golf_team_commands";
import GolfTeamQueries "../queries/golf_team_queries";

module {
  public class GolfTeamManager() {

    private var golfTeamCanisterIndex: TrieMap.TrieMap<T.GolfTeamId, Base.CanisterId> = TrieMap.TrieMap<T.GolfTeamId, Base.CanisterId>(Utilities.eqNat, Utilities.hashNat);
    private var golfTeamNames : TrieMap.TrieMap<T.GolfTeamId, Text> = TrieMap.TrieMap<T.GolfTeamId, Text>(Utilities.eqNat, Utilities.hashNat);
    private var uniqueGolfTeamCanisterIds : List.List<Base.CanisterId> = List.nil();
    private var activeCanisterId: Base.CanisterId = "";
    private var totalGolfTeams : Nat = 0;
    private var nextGolfTeamId: Nat = 1;

    //Getters

    public func getTeamImage(teamId: T.GolfTeamId) : async ?Blob {
      let existingGolfTeamCanisterId = golfTeamCanisterIndex.get(teamId);
      switch(existingGolfTeamCanisterId){
        case (?foundCanisterId){

          let golf_team_canister = actor (foundCanisterId) : actor {
            getTeamImage : (teamId: T.GolfTeamId) -> async ?Blob;
          };

          let golfTeam = await golf_team_canister.getTeamImage(teamId);
          return golfTeam;
        };
        case (null){
          return null;
        }
      };
    };

    public func isTeamNameAvailable(dto: GolfTeamQueries.IsTeamNameAvailable) : GolfTeamQueries.TeamNameAvailable{
      return not isGolfTeamNameTaken(dto.golfTeamName, dto.golfTeamId)
    };

    public func getGolfTeam(dto: GolfTeamQueries.GetGolfTeam) : async Result.Result<GolfTeamQueries.GolfTeam, T.Error> {
      let existingGolfTeamCanisterId = golfTeamCanisterIndex.get(dto.golfTeamId);
      switch(existingGolfTeamCanisterId){
        case (?foundCanisterId){

          let golf_team_canister = actor (foundCanisterId) : actor {
            getGolfTeam : (dto: GolfTeamQueries.GetGolfTeam) -> async Result.Result<GolfTeamQueries.GolfTeam, T.Error>;
          };

          let golf_team = await golf_team_canister.getGolfTeam(dto);
          return golf_team;
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    //Update functions
    
    public func createGolfTeam(owner: Base.PrincipalId, dto: GolfTeamCommands.CreateGolfTeam) : async Result.Result<(), T.Error> {
      
      if(Text.size(dto.golfTeamName) < 5 or Text.size(dto.golfTeamName) > 20){
        return #err(#TooLong);
      };

      let invalidTeamName = isGolfTeamNameTaken(dto.golfTeamName, 0);
      if(invalidTeamName){
        return #err(#AlreadyExists);
      };

      if(activeCanisterId == ""){
        await createNewCanister();
      };

      var golf_team_canister = actor (activeCanisterId) : actor {
        isCanisterFull : () -> async Bool;
        createGolfTeam : (owner: Base.PrincipalId, dto: GolfTeamCommands.CreateGolfTeam, nextId: T.GolfTeamId) -> async Result.Result<(), T.Error>;  
      };

      let isCanisterFull = await golf_team_canister.isCanisterFull(); 
    
      if(isCanisterFull){              
        await createNewCanister();
        golf_team_canister := actor (activeCanisterId) : actor {
          isCanisterFull : () -> async Bool;
          createGolfTeam : (owner: Base.PrincipalId, dto: GolfTeamCommands.CreateGolfTeam, nextId: T.GolfTeamId) -> async Result.Result<(), T.Error>;  
        };
      };

      let createResult = await golf_team_canister.createGolfTeam(owner, dto, nextGolfTeamId);

      switch(createResult){
        case (#ok _){
          golfTeamCanisterIndex.put((nextGolfTeamId, activeCanisterId));
          golfTeamNames.put(nextGolfTeamId, dto.golfTeamName);
          nextGolfTeamId += 1;
          return #ok();
        };
        case (#err error){
          return #err(error)
        }
      };
    };
      
    public func updateGolfTeamName(dto: GolfTeamCommands.UpdateGolfTeamName) : async Result.Result<(), T.Error> {
      
      if(Text.size(dto.golfTeamName) < 5 or Text.size(dto.golfTeamName) > 20){
        return #err(#TooLong);
      };

      let invalidTeamName = isGolfTeamNameTaken(dto.golfTeamName, dto.golfTeamId);
      if(invalidTeamName){
        return #err(#AlreadyExists);
      };

      let existingGolfTeamCanisterId = golfTeamCanisterIndex.get(dto.golfTeamId);
      switch(existingGolfTeamCanisterId){
        case (?foundCanisterId){
          let golf_team_canister = actor (foundCanisterId) : actor {
            updateGolfTeamName : (dto: GolfTeamCommands.UpdateGolfTeamName) -> async Result.Result<(), T.Error>
          };
          golfTeamNames.put(dto.golfTeamId, activeCanisterId);
          return await golf_team_canister.updateGolfTeamName(dto);
        };
        case (null){
          return #err(#NotFound);
        }
      };    
    };
      
    public func updateGolfTeamPicture(dto: GolfTeamCommands.UpdateGolfTeamPicture) : async Result.Result<(), T.Error> {
      let validTeamPicture = isGolfTeamPictureValid(dto.golfTeamPicture);
      if(not validTeamPicture){
        return #err(#InvalidGolfTeamPicture);
      };

      let existingGolferCanisterId = golfTeamCanisterIndex.get(dto.golfTeamId);
      switch(existingGolferCanisterId){
        case (?foundCanisterId){
          let golf_team_canister = actor (foundCanisterId) : actor {
            updateProfilePicture : (dto: GolfTeamCommands.UpdateGolfTeamPicture) -> async Result.Result<(), T.Error>
          };
          return await golf_team_canister.updateProfilePicture(dto);
        };
        case (null){
          if(activeCanisterId == ""){
            await createNewCanister();
          };

          var golf_team_canister = actor (activeCanisterId) : actor {
            isCanisterFull : () -> async Bool;
            updateProfilePicture : (dto: GolfTeamCommands.UpdateGolfTeamPicture) -> async Result.Result<(), T.Error>;  
          };

          let isCanisterFull = await golf_team_canister.isCanisterFull();
          if(isCanisterFull){
            await createNewCanister();
            
            golf_team_canister := actor (activeCanisterId) : actor {
              updateProfilePicture : (dto: GolfTeamCommands.UpdateGolfTeamPicture) -> async Result.Result<(), T.Error>;  
              isCanisterFull : () -> async Bool;
            };
          };

          return await golf_team_canister.updateProfilePicture(dto);
        }
      };    

      return #err(#NotFound);
    };

    //private functions

    private func isGolfTeamNameTaken(teamName : Text, teamId : T.GolfTeamId) : Bool {
      for (golfTeamName in golfTeamNames.entries()) {

        let lowerCaseTeamName = Utilities.toLowercase(teamName);
        let existingTeamName = Utilities.toLowercase(golfTeamName.1);

        if (lowerCaseTeamName == existingTeamName and golfTeamName.0 != teamId) {
          return true;
        };
      };

      return false;
    };

    private func isGolfTeamPictureValid(teamPicture : ?Blob) : Bool {
      switch(teamPicture){
        case (?foundTeamPicture){
          let sizeInKB = Array.size(Blob.toArray(foundTeamPicture)) / 1024;
          return (sizeInKB > 0 or sizeInKB <= 500);
        };
        case (null) { return true; }
      }
    };
    
    private func createNewCanister() : async (){
      Cycles.add<system>(10_000_000_000_000);
      let canister = await GolfTeamCanister._GolfTeamCanister();
      let IC : Management.Management = actor (Environment.Default);
      let principal = ?Principal.fromText(Environment.BACKEND_CANISTER_ID);
      let _ = await Utilities.updateCanister_(canister, principal, IC);
      let canister_principal = Principal.fromActor(canister);
      let canisterId = Principal.toText(canister_principal);

      if (canisterId == "") {
        return;
      };
      let uniqueCanisterIdBuffer = Buffer.fromArray<Base.CanisterId>(List.toArray(uniqueGolfTeamCanisterIds));
      uniqueCanisterIdBuffer.add(canisterId);
      uniqueGolfTeamCanisterIds := List.fromArray(Buffer.toArray(uniqueCanisterIdBuffer));
      activeCanisterId := canisterId;
      return;
    };

    //stable storage getters and setters

    public func getStableCanisterIndex() : [(T.GolfTeamId, Base.CanisterId)]{
      return Iter.toArray(golfTeamCanisterIndex.entries());
    };

    public func setStableCanisterIndex(stable_golf_team_canister_index: [(T.GolfTeamId, Base.CanisterId)]){
      let canisterIds : TrieMap.TrieMap<T.GolfTeamId, Base.CanisterId> = TrieMap.TrieMap<T.GolfTeamId, Base.CanisterId>(Utilities.eqNat, Utilities.hashNat);

      for (canisterId in Iter.fromArray(stable_golf_team_canister_index)) {
        canisterIds.put(canisterId);
      };
      golfTeamCanisterIndex := canisterIds;
    };

    public func getStableActiveCanisterId() : Base.CanisterId {
      return activeCanisterId;
    };

    public func setStableActiveCanisterId(stable_active_canister_id: Base.CanisterId){
      activeCanisterId := stable_active_canister_id;
    };  

    public func getStableGolfTeamNames() : [(T.GolfTeamId, Text)] {
      return Iter.toArray(golfTeamNames.entries());
    };

    public func setStableGolfTeamNames(stable_team_names : [(T.GolfTeamId, Text)]) : () {
      let team_names_map : TrieMap.TrieMap<T.GolfTeamId, Base.CanisterId> = TrieMap.TrieMap<T.GolfTeamId, Base.CanisterId>(Utilities.eqNat, Utilities.hashNat);

      for (teamName in Iter.fromArray(stable_team_names)) {
        team_names_map.put(teamName);
      };
      golfTeamNames := team_names_map;
    };

    public func getStableUniqueCanisterIds() : [Base.CanisterId] {
      return List.toArray(uniqueGolfTeamCanisterIds);
    };

    public func setStableUniqueCanisterIds(stable_unique_canister_ids : [Base.CanisterId]) : () {
      let canisterIdBuffer = Buffer.fromArray<Base.CanisterId>([]);

      for (canisterId in Iter.fromArray(stable_unique_canister_ids)) {
        canisterIdBuffer.add(canisterId);
      };
      uniqueGolfTeamCanisterIds := List.fromArray(Buffer.toArray(canisterIdBuffer));
    };

    public func getStableTotalGolfTeams() : Nat {
      return totalGolfTeams;
    };

    public func setStableTotalGolfTeams(stable_total_golf_teams : Nat) : () {
      totalGolfTeams := stable_total_golf_teams;
    };

    public func getStableNextGolfTeamId() : T.GolfTeamId {
      return nextGolfTeamId;
    };

    public func setStableNextGolfTeamId(stable_next_golf_team_id : T.GolfTeamId) : () {
      nextGolfTeamId := stable_next_golf_team_id;
    };

  };
};


    