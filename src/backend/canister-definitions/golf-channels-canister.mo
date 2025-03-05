import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Nat8 "mo:base/Nat8";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Time "mo:base/Time";

import Environment "../utilities/Environment";
import T "../data-types/types";
import GolfChannelQueries "../queries/golf_channel_queries";
import GolfChannelCommands "../commands/golf_channel_commands";

actor class _GolfChannelsCanister() {

  private stable var MAX_GOLF_CHANNELS_PER_GROUP: Nat = 10;
  private stable var MAX_GOLF_CHANNELS_PER_CANISTER: Nat = 250;

  private stable var stable_golf_channel_group_indexes: [(T.GolfChannelId, Nat8)] = [];
  
  private stable var activeGroupIndex: Nat8 = 0;
  private stable var nextChannelId: T.GolfChannelId = 1;
  private stable var totalGolfChannels = 0;

  private stable var golfChannelGroup1: [T.GolfChannel] = [];
  private stable var golfChannelGroup2: [T.GolfChannel] = [];
  private stable var golfChannelGroup3: [T.GolfChannel] = [];
  private stable var golfChannelGroup4: [T.GolfChannel] = [];
  private stable var golfChannelGroup5: [T.GolfChannel] = [];
  private stable var golfChannelGroup6: [T.GolfChannel] = [];
  private stable var golfChannelGroup7: [T.GolfChannel] = [];
  private stable var golfChannelGroup8: [T.GolfChannel] = [];
  private stable var golfChannelGroup9: [T.GolfChannel] = [];
  private stable var golfChannelGroup10: [T.GolfChannel] = [];
  private stable var golfChannelGroup11: [T.GolfChannel] = [];
  private stable var golfChannelGroup12: [T.GolfChannel] = [];
  private stable var golfChannelGroup13: [T.GolfChannel] = [];
  private stable var golfChannelGroup14: [T.GolfChannel] = [];
  private stable var golfChannelGroup15: [T.GolfChannel] = [];
  private stable var golfChannelGroup16: [T.GolfChannel] = [];
  private stable var golfChannelGroup17: [T.GolfChannel] = [];
  private stable var golfChannelGroup18: [T.GolfChannel] = [];
  private stable var golfChannelGroup19: [T.GolfChannel] = [];
  private stable var golfChannelGroup20: [T.GolfChannel] = [];
  private stable var golfChannelGroup21: [T.GolfChannel] = [];
  private stable var golfChannelGroup22: [T.GolfChannel] = [];
  private stable var golfChannelGroup23: [T.GolfChannel] = [];
  private stable var golfChannelGroup24: [T.GolfChannel] = [];
  private stable var golfChannelGroup25: [T.GolfChannel] = [];

  //Public endpoints:

  public shared ({caller}) func getGolfChannel(dto: GolfChannelQueries.GetGolfChannel) : async Result.Result<GolfChannelQueries.GolfChannel, T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golfChannelGroupIndex in Iter.fromArray(stable_golf_channel_group_indexes)) {
      if(golfChannelGroupIndex.0 == dto.channelId){
        groupIndex := ?golfChannelGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfChannel = findGolfChannel(foundGroupIndex, dto.channelId);
        switch(golfChannel){
          case (?foundGolfChannel){
            return #ok({
              channelId = foundGolfChannel.id;
              name = foundGolfChannel.name;
            });
          };
          case (null){
            return #err(#NotFound);
          }
        }
      };
    };
  };

  public shared ({ caller }) func getLatestId() : async T.GolfChannelId{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;
    return nextChannelId - 1;
  };

  public shared ({ caller }) func updateNextId(nextId: T.GolfChannelId) : async (){
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    nextChannelId := nextId;
  };

  public shared ({caller}) func createGolfChannel(dto: GolfChannelCommands.CreateGolfChannel) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    if(totalGolfChannels >= MAX_GOLF_CHANNELS_PER_CANISTER){
      return #err(#CanisterFull);
    };

    if(getGolfChannelCountInGroup(activeGroupIndex) >= MAX_GOLF_CHANNELS_PER_GROUP){
      activeGroupIndex += 1;
    };

    if(activeGroupIndex > 99){
      return #err(#CanisterFull);
    };

    let newChannel: T.GolfChannel = {
      id = nextChannelId;
      name = dto.name;
      createdBy = dto.createdById;
      createdOn = Time.now();
      channelImage = null;
      channelImageExtension = "";
      channelBanner = null;
      channelBannerExtension = "";
    };
    
    return addGolfChannel(activeGroupIndex, newChannel);
  };

  public shared ({caller}) func updateGolfChannel(dto: GolfChannelCommands.UpdateGolfChannel) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;
 
    var groupIndex: ?Nat8 = null;
    for (golfChannelGroupIndex in Iter.fromArray(stable_golf_channel_group_indexes)) {
      if(golfChannelGroupIndex.0 == dto.channelId){
        groupIndex := ?golfChannelGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfChannel = findGolfChannel(foundGroupIndex, dto.channelId);
        switch(golfChannel){
          case (?foundGolfChannel){    
            
            let updatedGolfChannel: T.GolfChannel = {
              id = foundGolfChannel.id;
              name = dto.name;
              createdBy = foundGolfChannel.createdBy;
              createdOn = foundGolfChannel.createdOn;
              channelImage = dto.channelImage;
              channelImageExtension = dto.channelImageExtension;
              channelBanner = dto.channelBanner;
              channelBannerExtension = dto.channelBannerExtension;
            };

            return saveGolfChannel(foundGroupIndex, updatedGolfChannel);
          };
          case (null){
            return #err(#NotFound);
          }
        }
      };
    };
  };

  public shared ({caller}) func deleteGolfChannel(dto: GolfChannelCommands.DeleteGolfChannel) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golfChannelGroupIndex in Iter.fromArray(stable_golf_channel_group_indexes)) {
      if(golfChannelGroupIndex.0 == dto.channelId){
        groupIndex := ?golfChannelGroupIndex.1;
      }
    };
    
    switch(groupIndex){
      case (?foundGroupIndex){ 
        return removeGolfChannel(foundGroupIndex, dto.channelId);
      };
      case (null){
        return #err(#NotFound);
      }
    };
    
  };
  
  public shared ({caller}) func isCanisterFull() : async Bool{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;
    return (totalGolfChannels >= MAX_GOLF_CHANNELS_PER_CANISTER);
  };

  //Private functions:

  private func findGolfChannel(golfChannelGroupIndex: Nat8, channelId: T.GolfChannelId) : ?T.GolfChannel {
    switch(golfChannelGroupIndex){
      case 0{
        let foundGolfer = Array.find<T.GolfChannel>(golfChannelGroup1, func(golfChannel: T.GolfChannel){
          golfChannel.id == channelId
        });
        return foundGolfer;
      };
      case 1{
        let foundGolfer = Array.find<T.GolfChannel>(golfChannelGroup2, func(golfChannel: T.GolfChannel){
          golfChannel.id == channelId
        });
        return foundGolfer;
      };
      case 2{
        let foundGolfer = Array.find<T.GolfChannel>(golfChannelGroup3, func(golfChannel: T.GolfChannel){
          golfChannel.id == channelId
        });
        return foundGolfer;
      };
      case 3{
        let foundGolfer = Array.find<T.GolfChannel>(golfChannelGroup4, func(golfChannel: T.GolfChannel){
          golfChannel.id == channelId
        });
        return foundGolfer;
      };
      case 4{
        let foundGolfer = Array.find<T.GolfChannel>(golfChannelGroup5, func(golfChannel: T.GolfChannel){
          golfChannel.id == channelId
        });
        return foundGolfer;
      };
      case 5{
        let foundGolfer = Array.find<T.GolfChannel>(golfChannelGroup6, func(golfChannel: T.GolfChannel){
          golfChannel.id == channelId
        });
        return foundGolfer;
      };
      case 6{
        let foundGolfer = Array.find<T.GolfChannel>(golfChannelGroup7, func(golfChannel: T.GolfChannel){
          golfChannel.id == channelId
        });
        return foundGolfer;
      };
      case 7{
        let foundGolfer = Array.find<T.GolfChannel>(golfChannelGroup8, func(golfChannel: T.GolfChannel){
          golfChannel.id == channelId
        });
        return foundGolfer;
      };
      case 8{
        let foundGolfer = Array.find<T.GolfChannel>(golfChannelGroup9, func(golfChannel: T.GolfChannel){
          golfChannel.id == channelId
        });
        return foundGolfer;
      };
      case 9{
        let foundGolfer = Array.find<T.GolfChannel>(golfChannelGroup10, func(golfChannel: T.GolfChannel){
          golfChannel.id == channelId
        });
        return foundGolfer;
      };
      case 10{
        let foundGolfer = Array.find<T.GolfChannel>(golfChannelGroup11, func(golfChannel: T.GolfChannel){
          golfChannel.id == channelId
        });
        return foundGolfer;
      };
      case 11{
        let foundGolfer = Array.find<T.GolfChannel>(golfChannelGroup12, func(golfChannel: T.GolfChannel){
          golfChannel.id == channelId
        });
        return foundGolfer;
      };
      case 12{
        let foundGolfer = Array.find<T.GolfChannel>(golfChannelGroup13, func(golfChannel: T.GolfChannel){
          golfChannel.id == channelId
        });
        return foundGolfer;
      };
      case 13{
        let foundGolfer = Array.find<T.GolfChannel>(golfChannelGroup14, func(golfChannel: T.GolfChannel){
          golfChannel.id == channelId
        });
        return foundGolfer;
      };
      case 14{
        let foundGolfer = Array.find<T.GolfChannel>(golfChannelGroup15, func(golfChannel: T.GolfChannel){
          golfChannel.id == channelId
        });
        return foundGolfer;
      };
      case 15{
        let foundGolfer = Array.find<T.GolfChannel>(golfChannelGroup16, func(golfChannel: T.GolfChannel){
          golfChannel.id == channelId
        });
        return foundGolfer;
      };
      case 16{
        let foundGolfer = Array.find<T.GolfChannel>(golfChannelGroup17, func(golfChannel: T.GolfChannel){
          golfChannel.id == channelId
        });
        return foundGolfer;
      };
      case 17{
        let foundGolfer = Array.find<T.GolfChannel>(golfChannelGroup18, func(golfChannel: T.GolfChannel){
          golfChannel.id == channelId
        });
        return foundGolfer;
      };
      case 18{
        let foundGolfer = Array.find<T.GolfChannel>(golfChannelGroup19, func(golfChannel: T.GolfChannel){
          golfChannel.id == channelId
        });
        return foundGolfer;
      };
      case 19{
        let foundGolfer = Array.find<T.GolfChannel>(golfChannelGroup20, func(golfChannel: T.GolfChannel){
          golfChannel.id == channelId
        });
        return foundGolfer;
      };
      case 20{
        let foundGolfer = Array.find<T.GolfChannel>(golfChannelGroup21, func(golfChannel: T.GolfChannel){
          golfChannel.id == channelId
        });
        return foundGolfer;
      };
      case 21{
        let foundGolfer = Array.find<T.GolfChannel>(golfChannelGroup22, func(golfChannel: T.GolfChannel){
          golfChannel.id == channelId
        });
        return foundGolfer;
      };
      case 22{
        let foundGolfer = Array.find<T.GolfChannel>(golfChannelGroup23, func(golfChannel: T.GolfChannel){
          golfChannel.id == channelId
        });
        return foundGolfer;
      };
      case 23{
        let foundGolfer = Array.find<T.GolfChannel>(golfChannelGroup24, func(golfChannel: T.GolfChannel){
          golfChannel.id == channelId
        });
        return foundGolfer;
      };
      case 24{
        let foundGolfer = Array.find<T.GolfChannel>(golfChannelGroup25, func(golfChannel: T.GolfChannel){
          golfChannel.id == channelId
        });
        return foundGolfer;
      };
      case _ {
        return null;
      }
    }
  };

  private func addGolfChannel(golfChannelGroupIndex: Nat8, newChannel: T.GolfChannel) : Result.Result<(), T.Error> {

    var golfChannelBuffer = Buffer.fromArray<T.GolfChannel>([]);
    switch(activeGroupIndex){
      case(0){
        golfChannelBuffer := Buffer.fromArray(golfChannelGroup1);
        golfChannelBuffer.add(newChannel);
        golfChannelGroup1 := Buffer.toArray(golfChannelBuffer);
      };
      case (1){
        golfChannelBuffer := Buffer.fromArray(golfChannelGroup2);
        golfChannelBuffer.add(newChannel);
        golfChannelGroup2 := Buffer.toArray(golfChannelBuffer);
      };
      case (2){
        golfChannelBuffer := Buffer.fromArray(golfChannelGroup3);
        golfChannelBuffer.add(newChannel);
        golfChannelGroup3 := Buffer.toArray(golfChannelBuffer);
      };
      case (3){
        golfChannelBuffer := Buffer.fromArray(golfChannelGroup4);
        golfChannelBuffer.add(newChannel);
        golfChannelGroup4 := Buffer.toArray(golfChannelBuffer);
      };
      case (4){
        golfChannelBuffer := Buffer.fromArray(golfChannelGroup5);
        golfChannelBuffer.add(newChannel);
        golfChannelGroup5 := Buffer.toArray(golfChannelBuffer);
      };
      case (5){
        golfChannelBuffer := Buffer.fromArray(golfChannelGroup6);
        golfChannelBuffer.add(newChannel);
        golfChannelGroup6 := Buffer.toArray(golfChannelBuffer);
      };
      case (6){
        golfChannelBuffer := Buffer.fromArray(golfChannelGroup7);
        golfChannelBuffer.add(newChannel);
        golfChannelGroup7 := Buffer.toArray(golfChannelBuffer);
      };
      case (7){
        golfChannelBuffer := Buffer.fromArray(golfChannelGroup8);
        golfChannelBuffer.add(newChannel);
        golfChannelGroup8 := Buffer.toArray(golfChannelBuffer);
      };
      case (8){
        golfChannelBuffer := Buffer.fromArray(golfChannelGroup9);
        golfChannelBuffer.add(newChannel);
        golfChannelGroup9 := Buffer.toArray(golfChannelBuffer);
      };
      case (9){
        golfChannelBuffer := Buffer.fromArray(golfChannelGroup10);
        golfChannelBuffer.add(newChannel);
        golfChannelGroup10 := Buffer.toArray(golfChannelBuffer);
      };
      case(10){
        golfChannelBuffer := Buffer.fromArray(golfChannelGroup11);
        golfChannelBuffer.add(newChannel);
        golfChannelGroup11 := Buffer.toArray(golfChannelBuffer);
      };
      case (11){
        golfChannelBuffer := Buffer.fromArray(golfChannelGroup12);
        golfChannelBuffer.add(newChannel);
        golfChannelGroup12 := Buffer.toArray(golfChannelBuffer);
      };
      case (12){
        golfChannelBuffer := Buffer.fromArray(golfChannelGroup13);
        golfChannelBuffer.add(newChannel);
        golfChannelGroup13 := Buffer.toArray(golfChannelBuffer);
      };
      case (13){
        golfChannelBuffer := Buffer.fromArray(golfChannelGroup14);
        golfChannelBuffer.add(newChannel);
        golfChannelGroup14 := Buffer.toArray(golfChannelBuffer);
      };
      case (14){
        golfChannelBuffer := Buffer.fromArray(golfChannelGroup15);
        golfChannelBuffer.add(newChannel);
        golfChannelGroup15 := Buffer.toArray(golfChannelBuffer);
      };
      case (15){
        golfChannelBuffer := Buffer.fromArray(golfChannelGroup16);
        golfChannelBuffer.add(newChannel);
        golfChannelGroup16 := Buffer.toArray(golfChannelBuffer);
      };
      case (16){
        golfChannelBuffer := Buffer.fromArray(golfChannelGroup17);
        golfChannelBuffer.add(newChannel);
        golfChannelGroup17 := Buffer.toArray(golfChannelBuffer);
      };
      case (17){
        golfChannelBuffer := Buffer.fromArray(golfChannelGroup18);
        golfChannelBuffer.add(newChannel);
        golfChannelGroup18 := Buffer.toArray(golfChannelBuffer);
      };
      case (18){
        golfChannelBuffer := Buffer.fromArray(golfChannelGroup19);
        golfChannelBuffer.add(newChannel);
        golfChannelGroup19 := Buffer.toArray(golfChannelBuffer);
      };
      case (19){
        golfChannelBuffer := Buffer.fromArray(golfChannelGroup20);
        golfChannelBuffer.add(newChannel);
        golfChannelGroup20 := Buffer.toArray(golfChannelBuffer);
      };
      case(20){
        golfChannelBuffer := Buffer.fromArray(golfChannelGroup21);
        golfChannelBuffer.add(newChannel);
        golfChannelGroup21 := Buffer.toArray(golfChannelBuffer);
      };
      case (21){
        golfChannelBuffer := Buffer.fromArray(golfChannelGroup22);
        golfChannelBuffer.add(newChannel);
        golfChannelGroup22 := Buffer.toArray(golfChannelBuffer);
      };
      case (22){
        golfChannelBuffer := Buffer.fromArray(golfChannelGroup23);
        golfChannelBuffer.add(newChannel);
        golfChannelGroup23 := Buffer.toArray(golfChannelBuffer);
      };
      case (23){
        golfChannelBuffer := Buffer.fromArray(golfChannelGroup24);
        golfChannelBuffer.add(newChannel);
        golfChannelGroup24 := Buffer.toArray(golfChannelBuffer);
      };
      case (24){
        golfChannelBuffer := Buffer.fromArray(golfChannelGroup25);
        golfChannelBuffer.add(newChannel);
        golfChannelGroup25 := Buffer.toArray(golfChannelBuffer);
      };
      case _ { 
        return #err(#CanisterFull);
      };
    };

    totalGolfChannels += 1;
    nextChannelId += 1;
    return #ok();
  };

  private func saveGolfChannel(groupIndex: Nat8, updatedGolfChannel: T.GolfChannel) : Result.Result<(), T.Error>{
    switch(groupIndex){
      case 0{
        golfChannelGroup1 := Array.map<T.GolfChannel, T.GolfChannel>(golfChannelGroup1, func(golfChannel: T.GolfChannel){
          if(golfChannel.id == updatedGolfChannel.id){
            return updatedGolfChannel;
          } else {
            return golfChannel;
          };
        });
      };
      case 1{
        golfChannelGroup2 := Array.map<T.GolfChannel, T.GolfChannel>(golfChannelGroup2, func(golfChannel: T.GolfChannel){
          if(golfChannel.id == updatedGolfChannel.id){
            return updatedGolfChannel;
          } else {
            return golfChannel;
          };
        });
      };
      case 2{
        golfChannelGroup3 := Array.map<T.GolfChannel, T.GolfChannel>(golfChannelGroup3, func(golfChannel: T.GolfChannel){
          if(golfChannel.id == updatedGolfChannel.id){
            return updatedGolfChannel;
          } else {
            return golfChannel;
          };
        });
      };
      case 3{
        golfChannelGroup4 := Array.map<T.GolfChannel, T.GolfChannel>(golfChannelGroup4, func(golfChannel: T.GolfChannel){
          if(golfChannel.id == updatedGolfChannel.id){
            return updatedGolfChannel;
          } else {
            return golfChannel;
          };
        });
      };
      case 4{
        golfChannelGroup5 := Array.map<T.GolfChannel, T.GolfChannel>(golfChannelGroup5, func(golfChannel: T.GolfChannel){
          if(golfChannel.id == updatedGolfChannel.id){
            return updatedGolfChannel;
          } else {
            return golfChannel;
          };
        });
      };
      case 5{
        golfChannelGroup6 := Array.map<T.GolfChannel, T.GolfChannel>(golfChannelGroup6, func(golfChannel: T.GolfChannel){
          if(golfChannel.id == updatedGolfChannel.id){
            return updatedGolfChannel;
          } else {
            return golfChannel;
          };
        });
      };
      case 6{
        golfChannelGroup7 := Array.map<T.GolfChannel, T.GolfChannel>(golfChannelGroup7, func(golfChannel: T.GolfChannel){
          if(golfChannel.id == updatedGolfChannel.id){
            return updatedGolfChannel;
          } else {
            return golfChannel;
          };
        });
      };
      case 7{
        golfChannelGroup8 := Array.map<T.GolfChannel, T.GolfChannel>(golfChannelGroup8, func(golfChannel: T.GolfChannel){
          if(golfChannel.id == updatedGolfChannel.id){
            return updatedGolfChannel;
          } else {
            return golfChannel;
          };
        });
      };
      case 8{
        golfChannelGroup9 := Array.map<T.GolfChannel, T.GolfChannel>(golfChannelGroup9, func(golfChannel: T.GolfChannel){
          if(golfChannel.id == updatedGolfChannel.id){
            return updatedGolfChannel;
          } else {
            return golfChannel;
          };
        });
      };
      case 9{
        golfChannelGroup10 := Array.map<T.GolfChannel, T.GolfChannel>(golfChannelGroup10, func(golfChannel: T.GolfChannel){
          if(golfChannel.id == updatedGolfChannel.id){
            return updatedGolfChannel;
          } else {
            return golfChannel;
          };
        });
      };


      case 10{
        golfChannelGroup10 := Array.map<T.GolfChannel, T.GolfChannel>(golfChannelGroup10, func(golfChannel: T.GolfChannel){
          if(golfChannel.id == updatedGolfChannel.id){
            return updatedGolfChannel;
          } else {
            return golfChannel;
          };
        });
      };
      case 11{
        golfChannelGroup12 := Array.map<T.GolfChannel, T.GolfChannel>(golfChannelGroup12, func(golfChannel: T.GolfChannel){
          if(golfChannel.id == updatedGolfChannel.id){
            return updatedGolfChannel;
          } else {
            return golfChannel;
          };
        });
      };
      case 12{
        golfChannelGroup13 := Array.map<T.GolfChannel, T.GolfChannel>(golfChannelGroup13, func(golfChannel: T.GolfChannel){
          if(golfChannel.id == updatedGolfChannel.id){
            return updatedGolfChannel;
          } else {
            return golfChannel;
          };
        });
      };
      case 13{
        golfChannelGroup14 := Array.map<T.GolfChannel, T.GolfChannel>(golfChannelGroup14, func(golfChannel: T.GolfChannel){
          if(golfChannel.id == updatedGolfChannel.id){
            return updatedGolfChannel;
          } else {
            return golfChannel;
          };
        });
      };
      case 14{
        golfChannelGroup15 := Array.map<T.GolfChannel, T.GolfChannel>(golfChannelGroup15, func(golfChannel: T.GolfChannel){
          if(golfChannel.id == updatedGolfChannel.id){
            return updatedGolfChannel;
          } else {
            return golfChannel;
          };
        });
      };
      case 15{
        golfChannelGroup16 := Array.map<T.GolfChannel, T.GolfChannel>(golfChannelGroup16, func(golfChannel: T.GolfChannel){
          if(golfChannel.id == updatedGolfChannel.id){
            return updatedGolfChannel;
          } else {
            return golfChannel;
          };
        });
      };
      case 16{
        golfChannelGroup17 := Array.map<T.GolfChannel, T.GolfChannel>(golfChannelGroup17, func(golfChannel: T.GolfChannel){
          if(golfChannel.id == updatedGolfChannel.id){
            return updatedGolfChannel;
          } else {
            return golfChannel;
          };
        });
      };
      case 17{
        golfChannelGroup18 := Array.map<T.GolfChannel, T.GolfChannel>(golfChannelGroup18, func(golfChannel: T.GolfChannel){
          if(golfChannel.id == updatedGolfChannel.id){
            return updatedGolfChannel;
          } else {
            return golfChannel;
          };
        });
      };
      case 18{
        golfChannelGroup19 := Array.map<T.GolfChannel, T.GolfChannel>(golfChannelGroup19, func(golfChannel: T.GolfChannel){
          if(golfChannel.id == updatedGolfChannel.id){
            return updatedGolfChannel;
          } else {
            return golfChannel;
          };
        });
      };
      case 19{
        golfChannelGroup20 := Array.map<T.GolfChannel, T.GolfChannel>(golfChannelGroup20, func(golfChannel: T.GolfChannel){
          if(golfChannel.id == updatedGolfChannel.id){
            return updatedGolfChannel;
          } else {
            return golfChannel;
          };
        });
      };
      case 20{
        golfChannelGroup21 := Array.map<T.GolfChannel, T.GolfChannel>(golfChannelGroup21, func(golfChannel: T.GolfChannel){
          if(golfChannel.id == updatedGolfChannel.id){
            return updatedGolfChannel;
          } else {
            return golfChannel;
          };
        });
      };
      case 21{
        golfChannelGroup22 := Array.map<T.GolfChannel, T.GolfChannel>(golfChannelGroup22, func(golfChannel: T.GolfChannel){
          if(golfChannel.id == updatedGolfChannel.id){
            return updatedGolfChannel;
          } else {
            return golfChannel;
          };
        });
      };
      case 22{
        golfChannelGroup23 := Array.map<T.GolfChannel, T.GolfChannel>(golfChannelGroup23, func(golfChannel: T.GolfChannel){
          if(golfChannel.id == updatedGolfChannel.id){
            return updatedGolfChannel;
          } else {
            return golfChannel;
          };
        });
      };
      case 23{
        golfChannelGroup24 := Array.map<T.GolfChannel, T.GolfChannel>(golfChannelGroup24, func(golfChannel: T.GolfChannel){
          if(golfChannel.id == updatedGolfChannel.id){
            return updatedGolfChannel;
          } else {
            return golfChannel;
          };
        });
      };
      case 24{
        golfChannelGroup25 := Array.map<T.GolfChannel, T.GolfChannel>(golfChannelGroup25, func(golfChannel: T.GolfChannel){
          if(golfChannel.id == updatedGolfChannel.id){
            return updatedGolfChannel;
          } else {
            return golfChannel;
          };
        });
      };
      case _ {
        return #err(#NotFound);
      }
    };
    return #ok();
  };

  private func removeGolfChannel(groupIndex: Nat8, removeChannelId: T.GolfChannelId) : Result.Result<(), T.Error>{
    switch(groupIndex){
      case 0{
        golfChannelGroup1 := Array.filter<T.GolfChannel>(golfChannelGroup1, func(golfChannel: T.GolfChannel){
          golfChannel.id != removeChannelId
        });
      };
      case 1{
        golfChannelGroup2 := Array.filter<T.GolfChannel>(golfChannelGroup2, func(golfChannel: T.GolfChannel){
          golfChannel.id != removeChannelId
        });
      };
      case 2{
        golfChannelGroup3 := Array.filter<T.GolfChannel>(golfChannelGroup3, func(golfChannel: T.GolfChannel){
          golfChannel.id != removeChannelId
        });
      };
      case 3{
        golfChannelGroup4 := Array.filter<T.GolfChannel>(golfChannelGroup4, func(golfChannel: T.GolfChannel){
          golfChannel.id != removeChannelId
        });
      };
      case 4{
        golfChannelGroup5 := Array.filter<T.GolfChannel>(golfChannelGroup5, func(golfChannel: T.GolfChannel){
         golfChannel.id != removeChannelId
        });
      };
      case 5{
        golfChannelGroup6 := Array.filter<T.GolfChannel>(golfChannelGroup6, func(golfChannel: T.GolfChannel){
          golfChannel.id != removeChannelId
        });
      };
      case 6{
        golfChannelGroup7 := Array.filter<T.GolfChannel>(golfChannelGroup7, func(golfChannel: T.GolfChannel){
          golfChannel.id != removeChannelId
        });
      };
      case 7{
        golfChannelGroup8 := Array.filter<T.GolfChannel>(golfChannelGroup8, func(golfChannel: T.GolfChannel){
          golfChannel.id != removeChannelId
        });
      };
      case 8{
        golfChannelGroup9 := Array.filter<T.GolfChannel>(golfChannelGroup9, func(golfChannel: T.GolfChannel){
          golfChannel.id != removeChannelId
        });
      };
      case 9{
        golfChannelGroup10 := Array.filter<T.GolfChannel>(golfChannelGroup10, func(golfChannel: T.GolfChannel){
          golfChannel.id != removeChannelId
        });
      };

      case 10{
        golfChannelGroup10 := Array.filter<T.GolfChannel>(golfChannelGroup10, func(golfChannel: T.GolfChannel){
          golfChannel.id != removeChannelId
        });
      };
      case 11{
        golfChannelGroup12 := Array.filter<T.GolfChannel>(golfChannelGroup12, func(golfChannel: T.GolfChannel){
          golfChannel.id != removeChannelId
        });
      };
      case 12{
        golfChannelGroup13 := Array.filter<T.GolfChannel>(golfChannelGroup13, func(golfChannel: T.GolfChannel){
          golfChannel.id != removeChannelId
        });
      };
      case 13{
        golfChannelGroup14 := Array.filter<T.GolfChannel>(golfChannelGroup14, func(golfChannel: T.GolfChannel){
          golfChannel.id != removeChannelId
        });
      };
      case 14{
        golfChannelGroup15 := Array.filter<T.GolfChannel>(golfChannelGroup15, func(golfChannel: T.GolfChannel){
          golfChannel.id != removeChannelId
        });
      };
      case 15{
        golfChannelGroup16 := Array.filter<T.GolfChannel>(golfChannelGroup16, func(golfChannel: T.GolfChannel){
          golfChannel.id != removeChannelId
        });
      };
      case 16{
        golfChannelGroup17 := Array.filter<T.GolfChannel>(golfChannelGroup17, func(golfChannel: T.GolfChannel){
          golfChannel.id != removeChannelId
        });
      };
      case 17{
        golfChannelGroup18 := Array.filter<T.GolfChannel>(golfChannelGroup18, func(golfChannel: T.GolfChannel){
          golfChannel.id != removeChannelId
        });
      };
      case 18{
        golfChannelGroup19 := Array.filter<T.GolfChannel>(golfChannelGroup19, func(golfChannel: T.GolfChannel){
          golfChannel.id != removeChannelId
        });
      };
      case 19{
        golfChannelGroup20 := Array.filter<T.GolfChannel>(golfChannelGroup20, func(golfChannel: T.GolfChannel){
          golfChannel.id != removeChannelId
        });
      };
      case 20{
        golfChannelGroup21 := Array.filter<T.GolfChannel>(golfChannelGroup21, func(golfChannel: T.GolfChannel){
          golfChannel.id != removeChannelId
        });
      };
      case 21{
        golfChannelGroup22 := Array.filter<T.GolfChannel>(golfChannelGroup22, func(golfChannel: T.GolfChannel){
          golfChannel.id != removeChannelId
        });
      };
      case 22{
        golfChannelGroup23 := Array.filter<T.GolfChannel>(golfChannelGroup23, func(golfChannel: T.GolfChannel){
          golfChannel.id != removeChannelId
        });
      };
      case 23{
        golfChannelGroup24 := Array.filter<T.GolfChannel>(golfChannelGroup24, func(golfChannel: T.GolfChannel){
          golfChannel.id != removeChannelId
        });
      };
      case 24{
        golfChannelGroup25 := Array.filter<T.GolfChannel>(golfChannelGroup25, func(golfChannel: T.GolfChannel){
          golfChannel.id != removeChannelId
        });
      };
      case _ {
        return #err(#NotFound);
      }
    };
    return #ok();
  };

  private func getGolfChannelCountInGroup(groupIndex: Nat8) : Nat {
    switch(groupIndex){
      case 0{
        return golfChannelGroup1.size();
      };
      case 1{
        return golfChannelGroup2.size();
      };
      case 2{
        return golfChannelGroup3.size();
      };
      case 3{
        return golfChannelGroup4.size();
      };
      case 4{
        return golfChannelGroup5.size();
      };
      case 5{
        return golfChannelGroup6.size();
      };
      case 6{
        return golfChannelGroup7.size();
      };
      case 7{
        return golfChannelGroup8.size();
      };
      case 8{
        return golfChannelGroup9.size();
      };
      case 9{
        return golfChannelGroup10.size();
      };
      case 10{
        return golfChannelGroup11.size();
      };
      case 11{
        return golfChannelGroup12.size();
      };
      case 12{
        return golfChannelGroup13.size();
      };
      case 13{
        return golfChannelGroup14.size();
      };
      case 14{
        return golfChannelGroup15.size();
      };
      case 15{
        return golfChannelGroup16.size();
      };
      case 16{
        return golfChannelGroup17.size();
      };
      case 17{
        return golfChannelGroup18.size();
      };
      case 18{
        return golfChannelGroup19.size();
      };
      case 19{
        return golfChannelGroup20.size();
      };
      case 20{
        return golfChannelGroup21.size();
      };
      case 21{
        return golfChannelGroup22.size();
      };
      case 22{
        return golfChannelGroup23.size();
      };
      case 23{
        return golfChannelGroup24.size();
      };
      case 24{
        return golfChannelGroup25.size();
      };
      case _{
        return 0;
      }
    }
  };

};
