import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Nat8 "mo:base/Nat8";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Time "mo:base/Time";
import List "mo:base/List";

import Environment "../utilities/Environment";
import T "../data-types/types";
import Debug "mo:base/Debug";
import GolfTeamCommands "../commands/golf_team_commands";
import GolfTeamQueries "../queries/golf_team_queries";
import FriendRequestCommands "../commands/friend_request_commands";
import FriendRequestQueries "../queries/friend_request_queries";
import Base "mo:waterway-mops/BaseTypes";

actor class _GolfTeamCanister() {

  private stable var stable_golf_team_group_indexes: [(T.GolfTeamId, Nat8)] = [];
  private stable var golfTeamGroup1: [T.GolfTeam] = [];
  private stable var golfTeamGroup2: [T.GolfTeam] = [];
  private stable var golfTeamGroup3: [T.GolfTeam] = [];
  private stable var golfTeamGroup4: [T.GolfTeam] = [];
  private stable var golfTeamGroup5: [T.GolfTeam] = [];
  private stable var golfTeamGroup6: [T.GolfTeam] = [];
  private stable var golfTeamGroup7: [T.GolfTeam] = [];
  private stable var golfTeamGroup8: [T.GolfTeam] = [];
  private stable var golfTeamGroup9: [T.GolfTeam] = [];
  private stable var golfTeamGroup10: [T.GolfTeam] = [];
  private stable var golfTeamGroup11: [T.GolfTeam] = [];
  private stable var golfTeamGroup12: [T.GolfTeam] = [];
  
  private stable var activeGroupIndex: Nat8 = 0;
  private stable var totalGolfTeams = 0;
  private stable var nextGolfTeamId: T.GameId = 1;
  private stable var MAX_GOLF_TEAMS_PER_GROUP: Nat = 1000;
  private stable var MAX_GOLF_TEAMS_PER_CANISTER: Nat = 12000;
  private stable var canisterFull = false;
 
  //Public endpoints

  public shared ({caller}) func getGolfTeam(dto: GolfTeamQueries.GetGolfTeam) : async Result.Result<GolfTeamQueries.GolfTeam, T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golfTeamGroupIndex in Iter.fromArray(stable_golf_team_group_indexes)) {
      if(golfTeamGroupIndex.0 == dto.golfTeamId){
        groupIndex := ?golfTeamGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfTeam = findGolfTeam(foundGroupIndex, dto.golfTeamId);
        switch(golfTeam){
          case (?foundGolfTeam){
            let return_dto: GolfTeamQueries.GolfTeam = {
              golfTeamId = foundGolfTeam.id;
              golfTeamName = foundGolfTeam.name;
              golfTeamPicture = foundGolfTeam.teamPicture;
              golfTeamPictureExtension = foundGolfTeam.teamPictureExtension;
            };
            return #ok(return_dto);
          };
          case (null){
            return #err(#NotFound);
          }
        }
      };
    };
  };

  public shared ({caller}) func createGolfTeam(owner: Base.PrincipalId, dto: GolfTeamCommands.CreateGolfTeam) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;
    
    if(totalGolfTeams >= MAX_GOLF_TEAMS_PER_CANISTER){
      return #err(#CanisterFull);
    };
    
    if(getGolfTeamCountInGroup(activeGroupIndex) >= MAX_GOLF_TEAMS_PER_GROUP){
      activeGroupIndex += 1;
    };
    Debug.print("Active group index incremented");
    if(activeGroupIndex > 11){
      canisterFull := true;
      return #err(#CanisterFull);
    };
    Debug.print("Canister is not full");

    let newGolfTeam: T.GolfTeam = {
      id = nextGolfTeamId;
      teamPicture = dto.golfTeamPicture;
      teamPictureExtension = dto.golfTeamPictureExtension;
      name = dto.golfTeamName;
      members = [owner];
      owner = owner;
    };
    Debug.print("Adding golf team to group");
    addGolfTeam(newGolfTeam);

  };  

  public shared ({caller}) func updateTeamName(dto: GolfTeamCommands.UpdateGolfTeamName) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golfTeamGroupIndex in Iter.fromArray(stable_golf_team_group_indexes)) {
      if(golfTeamGroupIndex.0 == dto.golfTeamId){
        groupIndex := ?golfTeamGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound) };
      case (?foundGroupIndex){
        let golfTeam = findGolfTeam(foundGroupIndex, dto.golfTeamId);
        switch(golfTeam){
          case (?foundGolfTeam){
            let updatedGolfTeam: T.GolfTeam = {
              
              id = foundGolfTeam.id;
              teamPicture = foundGolfTeam.teamPicture;
              teamPictureExtension = foundGolfTeam.teamPictureExtension;
              name = dto.golfTeamName;
              members = foundGolfTeam.members;
              owner = foundGolfTeam.owner;
            };
            saveGolfTeam(foundGroupIndex, updatedGolfTeam);
          };
          case (null){
            return #err(#NotFound);
          }
        }
      };
    };
  };

  public shared ({caller}) func updateGolfTeamPicture(dto: GolfTeamCommands.UpdateGolfTeamPicture) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golfTeamGroupIndex in Iter.fromArray(stable_golf_team_group_indexes)) {
      if(golfTeamGroupIndex.0 == dto.golfTeamId){
        groupIndex := ?golfTeamGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound) };
      case (?foundGroupIndex){
        let golfTeam = findGolfTeam(foundGroupIndex, dto.golfTeamId);
        switch(golfTeam){
          case (?foundGolfTeam){
            let updatedGolfTeam: T.GolfTeam = {
              id = foundGolfTeam.id;
              teamPicture = dto.golfTeamPicture;
              teamPictureExtension = dto.golfTeamPictureExtension;
              name = foundGolfTeam.name;
              members = foundGolfTeam.members;
              owner = foundGolfTeam.owner;
            };
            saveGolfTeam(foundGroupIndex, updatedGolfTeam);
          };
          case (null){
            return #err(#NotFound);
          }
        }
      };
    };
  };
  
  public shared ({caller}) func isCanisterFull() : async Bool{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;
    return (totalGolfTeams >= MAX_GOLF_TEAMS_PER_CANISTER);
  };

  public shared ({caller}) func getProfile(dto: GolfTeamQueries.GetGolfTeam) : async Result.Result<GolfTeamQueries.GolfTeam, T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golfTeamGroupIndex in Iter.fromArray(stable_golf_team_group_indexes)) {
      if(golfTeamGroupIndex.0 == dto.golfTeamId){
        groupIndex := ?golfTeamGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfTeam = findGolfTeam(foundGroupIndex, dto.golfTeamId);
        switch(golfTeam){
          case (?foundGolfTeam){
            let dto: GolfTeamQueries.GolfTeam = {
              golfTeamId = foundGolfTeam.id;
              golfTeamName = foundGolfTeam.name;
              golfTeamPicture = foundGolfTeam.teamPicture;
              golfTeamPictureExtension = foundGolfTeam.teamPictureExtension;
            };
            return #ok(dto);
          };
          case (null){
            return #err(#NotFound);
          }
        }
      };
    };
  };
  
  //Private functions:

  private func findGolfTeam(golfTeamGroupIndex: Nat8, golfTeamId: T.GolfTeamId) : ?T.GolfTeam {
    switch(golfTeamGroupIndex){
      case 0{
        let foundGolfer = Array.find<T.GolfTeam>(golfTeamGroup1, func(golfTeam: T.GolfTeam){
          golfTeam.id == golfTeamId
        });
        return foundGolfer;
      };
      case 1{
        let foundGolfer = Array.find<T.GolfTeam>(golfTeamGroup2, func(golfTeam: T.GolfTeam){
          golfTeam.id == golfTeamId
        });
        return foundGolfer;
      };
      case 2{
        let foundGolfer = Array.find<T.GolfTeam>(golfTeamGroup3, func(golfTeam: T.GolfTeam){
          golfTeam.id == golfTeamId
        });
        return foundGolfer;
      };
      case 3{
        let foundGolfer = Array.find<T.GolfTeam>(golfTeamGroup4, func(golfTeam: T.GolfTeam){
          golfTeam.id == golfTeamId
        });
        return foundGolfer;
      };
      case 4{
        let foundGolfer = Array.find<T.GolfTeam>(golfTeamGroup5, func(golfTeam: T.GolfTeam){
          golfTeam.id == golfTeamId
        });
        return foundGolfer;
      };
      case 5{
        let foundGolfer = Array.find<T.GolfTeam>(golfTeamGroup6, func(golfTeam: T.GolfTeam){
          golfTeam.id == golfTeamId
        });
        return foundGolfer;
      };
      case 6{
        let foundGolfer = Array.find<T.GolfTeam>(golfTeamGroup7, func(golfTeam: T.GolfTeam){
          golfTeam.id == golfTeamId
        });
        return foundGolfer;
      };
      case 7{
        let foundGolfer = Array.find<T.GolfTeam>(golfTeamGroup8, func(golfTeam: T.GolfTeam){
          golfTeam.id == golfTeamId
        });
        return foundGolfer;
      };
      case 8{
        let foundGolfer = Array.find<T.GolfTeam>(golfTeamGroup9, func(golfTeam: T.GolfTeam){
          golfTeam.id == golfTeamId
        });
        return foundGolfer;
      };
      case 9{
        let foundGolfer = Array.find<T.GolfTeam>(golfTeamGroup10, func(golfTeam: T.GolfTeam){
          golfTeam.id == golfTeamId
        });
        return foundGolfer;
      };
      case 10{
        let foundGolfer = Array.find<T.GolfTeam>(golfTeamGroup11, func(golfTeam: T.GolfTeam){
          golfTeam.id == golfTeamId
        });
        return foundGolfer;
      };
      case 11{
        let foundGolfer = Array.find<T.GolfTeam>(golfTeamGroup12, func(golfTeam: T.GolfTeam){
          golfTeam.id == golfTeamId
        });
        return foundGolfer;
      };
      case _ {
        return null;
      }
    }
  };

  private func addGolfTeam(newGolfTeam: T.GolfTeam) : Result.Result<(), T.Error> {
    switch(activeGroupIndex){
      case 0{
        let group1Buffer = Buffer.fromArray<T.GolfTeam>(golfTeamGroup1);
        group1Buffer.add(newGolfTeam);
        golfTeamGroup1 := Buffer.toArray(group1Buffer);
        Debug.print("Golfer added to group 1");
      };
      case 1{
        let group2Buffer = Buffer.fromArray<T.GolfTeam>(golfTeamGroup2);
        group2Buffer.add(newGolfTeam);
        golfTeamGroup2 := Buffer.toArray(group2Buffer);
      };
      case 2{
        let group3Buffer = Buffer.fromArray<T.GolfTeam>(golfTeamGroup3);
        group3Buffer.add(newGolfTeam);
        golfTeamGroup3 := Buffer.toArray(group3Buffer);
      };
      case 3{
        let group4Buffer = Buffer.fromArray<T.GolfTeam>(golfTeamGroup4);
        group4Buffer.add(newGolfTeam);
        golfTeamGroup4 := Buffer.toArray(group4Buffer);
      };
      case 4{
        let group5Buffer = Buffer.fromArray<T.GolfTeam>(golfTeamGroup5);
        group5Buffer.add(newGolfTeam);
        golfTeamGroup5 := Buffer.toArray(group5Buffer);
      };
      case 5{
        let group6Buffer = Buffer.fromArray<T.GolfTeam>(golfTeamGroup6);
        group6Buffer.add(newGolfTeam);
        golfTeamGroup6 := Buffer.toArray(group6Buffer);
      };
      case 6{
        let group7Buffer = Buffer.fromArray<T.GolfTeam>(golfTeamGroup7);
        group7Buffer.add(newGolfTeam);
        golfTeamGroup7 := Buffer.toArray(group7Buffer);
      };
      case 7{
        let group8Buffer = Buffer.fromArray<T.GolfTeam>(golfTeamGroup8);
        group8Buffer.add(newGolfTeam);
        golfTeamGroup8 := Buffer.toArray(group8Buffer);
      };
      case 8{
        let group9Buffer = Buffer.fromArray<T.GolfTeam>(golfTeamGroup9);
        group9Buffer.add(newGolfTeam);
        golfTeamGroup9 := Buffer.toArray(group9Buffer);
      };
      case 9{
        let group10Buffer = Buffer.fromArray<T.GolfTeam>(golfTeamGroup10);
        group10Buffer.add(newGolfTeam);
        golfTeamGroup10 := Buffer.toArray(group10Buffer);
      };
      case 10{
        let group11Buffer = Buffer.fromArray<T.GolfTeam>(golfTeamGroup11);
        group11Buffer.add(newGolfTeam);
        golfTeamGroup11 := Buffer.toArray(group11Buffer);
      };
      case 11{
        let group12Buffer = Buffer.fromArray<T.GolfTeam>(golfTeamGroup12);
        group12Buffer.add(newGolfTeam);
        golfTeamGroup12 := Buffer.toArray(group12Buffer);
      };
      case _ {
        return #err(#NotFound);
      }
    };
    totalGolfTeams += 1;

    let groupIndexBuffer = Buffer.fromArray<(T.GolfTeamId, Nat8)>(stable_golf_team_group_indexes);
    groupIndexBuffer.add((newGolfTeam.id, activeGroupIndex));
    stable_golf_team_group_indexes := Buffer.toArray(groupIndexBuffer);
    return #ok();
  };

  private func saveGolfTeam(golfTeamGroupIndex: Nat8, updatedGolfTeam: T.GolfTeam) : Result.Result<(), T.Error> {
    switch(golfTeamGroupIndex){
      case 0{
        golfTeamGroup1 := Array.map<T.GolfTeam, T.GolfTeam>(golfTeamGroup1, func(golfTeam: T.GolfTeam){
          if(golfTeam.id == updatedGolfTeam.id){
            return updatedGolfTeam;
          } else {
            return golfTeam;
          };
        });
      };
      case 1{
        golfTeamGroup2 := Array.map<T.GolfTeam, T.GolfTeam>(golfTeamGroup2, func(golfTeam: T.GolfTeam){
          if(golfTeam.id == updatedGolfTeam.id){
            return updatedGolfTeam;
          } else {
            return golfTeam;
          };
        });
      };
      case 2{
        golfTeamGroup3 := Array.map<T.GolfTeam, T.GolfTeam>(golfTeamGroup3, func(golfTeam: T.GolfTeam){
          if(golfTeam.id == updatedGolfTeam.id){
            return updatedGolfTeam;
          } else {
            return golfTeam;
          };
        });
      };
      case 3{
        golfTeamGroup4 := Array.map<T.GolfTeam, T.GolfTeam>(golfTeamGroup4, func(golfTeam: T.GolfTeam){
          if(golfTeam.id == updatedGolfTeam.id){
            return updatedGolfTeam;
          } else {
            return golfTeam;
          };
        });
      };
      case 4{
        golfTeamGroup5 := Array.map<T.GolfTeam, T.GolfTeam>(golfTeamGroup5, func(golfTeam: T.GolfTeam){
          if(golfTeam.id == updatedGolfTeam.id){
            return updatedGolfTeam;
          } else {
            return golfTeam;
          };
        });
      };
      case 5{
        golfTeamGroup6 := Array.map<T.GolfTeam, T.GolfTeam>(golfTeamGroup6, func(golfTeam: T.GolfTeam){
          if(golfTeam.id == updatedGolfTeam.id){
            return updatedGolfTeam;
          } else {
            return golfTeam;
          };
        });
      };
      case 6{
        golfTeamGroup7 := Array.map<T.GolfTeam, T.GolfTeam>(golfTeamGroup7, func(golfTeam: T.GolfTeam){
          if(golfTeam.id == updatedGolfTeam.id){
            return updatedGolfTeam;
          } else {
            return golfTeam;
          };
        });
      };
      case 7{
        golfTeamGroup8 := Array.map<T.GolfTeam, T.GolfTeam>(golfTeamGroup8, func(golfTeam: T.GolfTeam){
          if(golfTeam.id == updatedGolfTeam.id){
            return updatedGolfTeam;
          } else {
            return golfTeam;
          };
        });
      };
      case 8{
        golfTeamGroup9 := Array.map<T.GolfTeam, T.GolfTeam>(golfTeamGroup9, func(golfTeam: T.GolfTeam){
          if(golfTeam.id == updatedGolfTeam.id){
            return updatedGolfTeam;
          } else {
            return golfTeam;
          };
        });
      };
      case 9{
        golfTeamGroup10 := Array.map<T.GolfTeam, T.GolfTeam>(golfTeamGroup10, func(golfTeam: T.GolfTeam){
          if(golfTeam.id == updatedGolfTeam.id){
            return updatedGolfTeam;
          } else {
            return golfTeam;
          };
        });
      };
      case 10{
        golfTeamGroup11 := Array.map<T.GolfTeam, T.GolfTeam>(golfTeamGroup11, func(golfTeam: T.GolfTeam){
          if(golfTeam.id == updatedGolfTeam.id){
            return updatedGolfTeam;
          } else {
            return golfTeam;
          };
        });
      };
      case 11{
        golfTeamGroup12 := Array.map<T.GolfTeam, T.GolfTeam>(golfTeamGroup12, func(golfTeam: T.GolfTeam){
          if(golfTeam.id == updatedGolfTeam.id){
            return updatedGolfTeam;
          } else {
            return golfTeam;
          };
        });
      };
      case _ {
        return #err(#NotFound);
      }
    };
    return #ok();
  };

  private func getGolfTeamCountInGroup(groupIndex: Nat8) : Nat {
    switch(groupIndex){
      case 0{
        return golfTeamGroup1.size();
      };
      case 1{
        return golfTeamGroup2.size();
      };
      case 2{
        return golfTeamGroup3.size();
      };
      case 3{
        return golfTeamGroup4.size();
      };
      case 4{
        return golfTeamGroup5.size();
      };
      case 5{
        return golfTeamGroup6.size();
      };
      case 6{
        return golfTeamGroup7.size();
      };
      case 7{
        return golfTeamGroup8.size();
      };
      case 8{
        return golfTeamGroup9.size();
      };
      case 9{
        return golfTeamGroup10.size();
      };
      case 10{
        return golfTeamGroup11.size();
      };
      case 11{
        return golfTeamGroup12.size();
      };
      case _{
        return 0;
      }
    }
  };

  system func postupgrade() {
  };

};
