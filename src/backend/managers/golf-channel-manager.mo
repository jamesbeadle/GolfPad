import Result "mo:base/Result";
import List "mo:base/List";
import TrieMap "mo:base/TrieMap";
import Option "mo:base/Option";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Buffer "mo:base/Buffer";
import Principal "mo:base/Principal";
import T "../data-types/types";
import Utilities "../utilities/Utilities";
import Management "../utilities/Management";
import Environment "../utilities/Environment";
import Cycles "mo:base/ExperimentalCycles";
import Base "mo:waterway-mops/BaseTypes";
import GolfChannelQueries "../queries/golf_channel_queries";
import GolfChannelCommands "../commands/golf_channel_commands";
import GolfChannelsCanister "../canister-definitions/golf-channels-canister";

module {
  public class GolfChannelManager() {

    private var golfChannelCanisterIndex: TrieMap.TrieMap<T.GolfChannelId, Base.CanisterId> = TrieMap.TrieMap<T.GolfChannelId, Base.CanisterId>(Utilities.eqNat, Utilities.hashNat);
    private var activeCanisterId: Base.CanisterId = "";
    private var golfChannelNames : TrieMap.TrieMap<T.GolfChannelId, Text> = TrieMap.TrieMap<T.GolfChannelId, Text>(Utilities.eqNat, Utilities.hashNat);
    private var uniqueGolfChannelCanisterIds : List.List<Base.CanisterId> = List.nil();
    private var totalGolfChannels : Nat = 0;
    private var nextGolfChannelId : T.GolfChannelId = 1;
    
    public func channelExists(channelId: T.GolfChannelId) : Bool {
      let channel = golfChannelCanisterIndex.get(channelId);
      return Option.isSome(channel);
    };

    public func getGolfChannels(dto: GolfChannelQueries.GetGolfChannels) : async Result.Result<GolfChannelQueries.GolfChannels, T.Error> {
      let searchTerm = dto.searchTerm;
      let filteredEntries = List.filter<(T.GolfChannelId, Text)>(
        Iter.toList<(T.GolfChannelId, Text)>(golfChannelNames.entries()),
        func(entry : (T.GolfChannelId, Text)) : Bool {
          Text.startsWith(entry.1, #text searchTerm);
        },
      );
      
      let droppedEntries = List.drop<(T.GolfChannelId, Text)>(filteredEntries, 0); //TODO USE PAGE 
      let paginatedEntries = List.take<(T.GolfChannelId, Text)>(droppedEntries, 10);

      let channelsBuffer = Buffer.fromArray<GolfChannelQueries.GolfChannel>([]);

      for (entry in Iter.fromList(paginatedEntries)){
        let channel = await getGolfChannel({ channelId = entry.0 });
        switch(channel){
          case (#ok foundChannel){
            channelsBuffer.add(foundChannel);
          };
          case _{}
        }
      };
      
      return #ok({
        entries = Buffer.toArray(channelsBuffer);
        total = 0; //TODO
        pageSize = 10;
        page = dto.page;
      });
    };

    public func getGolfChannel(dto: GolfChannelQueries.GetGolfChannel) : async Result.Result<GolfChannelQueries.GolfChannel, T.Error> {
      return await getChannel(dto);
    };

    public func getGolfChannelVideos(dto : GolfChannelQueries.GetGolfChannelVideos) : async Result.Result<GolfChannelQueries.GolfChannelVideos, T.Error> {
      let existingChannel = await getChannel({ channelId = dto.channelId });

      switch(existingChannel){
        case (#ok foundChannel){

          let golfChannelCanisterId = golfChannelCanisterIndex.get(foundChannel.channelId);
          switch(golfChannelCanisterId){
            case (?foundCanisterId){
              let golf_channel_canister = actor (foundCanisterId) : actor {
                updateGolfChannel : (dto: GolfChannelQueries.GetGolfChannelVideos) -> async Result.Result<GolfChannelQueries.GolfChannelVideos, T.Error>;
              };
              return await golf_channel_canister.updateGolfChannel(dto);
            };
            case _ { }
          };  
          return #err(#NotFound);
        };
        case (#err _) { return #err(#NotFound) };
      };
    };

    private func getChannel(dto: GolfChannelQueries.GetGolfChannel) : async Result.Result<GolfChannelQueries.GolfChannel, T.Error> {
      let existingGolfChannelCanisterId = golfChannelCanisterIndex.get(dto.channelId);
      switch(existingGolfChannelCanisterId){
        case (?foundCanisterId){

          let golfChannel_canister = actor (foundCanisterId) : actor {
            getGolfChannel : (dto: GolfChannelQueries.GetGolfChannel) -> async Result.Result<GolfChannelQueries.GolfChannel, T.Error>;
          };

          return await golfChannel_canister.getGolfChannel({ channelId = dto.channelId });
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func getGolfChannelVideo(dto : GolfChannelQueries.GetGolfChannelVideo) : async Result.Result<GolfChannelQueries.GolfChannelVideo, T.Error> {
      let existingGolfChannelCanisterId = golfChannelCanisterIndex.get(dto.channelId);
      switch(existingGolfChannelCanisterId){
        case (?foundCanisterId){

          let golfChannel_canister = actor (foundCanisterId) : actor {
            getGolfChannelVideo : (dto: GolfChannelQueries.GetGolfChannelVideo) -> async Result.Result<GolfChannelQueries.GolfChannelVideo, T.Error>;
          };

          return await golfChannel_canister.getGolfChannelVideo({ channelId = dto.channelId });
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func isSubscribed(dto: GolfChannelQueries.IsSubscribed) : async Bool {
      let existingGolfChannelCanisterId = golfChannelCanisterIndex.get(dto.channelId);
      switch(existingGolfChannelCanisterId){
        case (?foundCanisterId){

          let golfChannel_canister = actor (foundCanisterId) : actor {
            isSubscribed : (dto: GolfChannelQueries.IsSubscribed) -> async Bool;
          };

          return await golfChannel_canister.isSubscribed({ channelId = dto.channelId; principalId = dto.principalId });
        };
        case (null){
        }
      };
      return false;
    };

    public func createGolfChannel(dto : GolfChannelCommands.CreateGolfChannel) : async Result.Result<T.GolfChannelId, T.Error> {
      
      if(Text.size(dto.name) > 100){
        return #err(#TooLong);
      };

       
      var golf_channel_canister = actor (activeCanisterId) : actor {
        createGolfChannel : (dto: GolfChannelCommands.CreateGolfChannel) -> async Result.Result<T.GolfChannelId, T.Error>;
        getLatestId : () -> async T.GolfChannelId;
        isCanisterFull : () -> async Bool;
      };

      switch(activeCanisterId){
        case "" {
          await createNewCanister(totalGolfChannels + 1);
          golf_channel_canister := actor (activeCanisterId) : actor {
            createGolfChannel : (dto: GolfChannelCommands.CreateGolfChannel) -> async Result.Result<T.GolfChannelId, T.Error>;
            getLatestId : () -> async T.GolfChannelId;
            isCanisterFull : () -> async Bool;
          };
        };
        case _ {
          let isCanisterFull = await golf_channel_canister.isCanisterFull(); 
          if(isCanisterFull){
            let latestId = await golf_channel_canister.getLatestId();
            let nextId: T.GolfChannelId = latestId + 1;
            await createNewCanister(nextId);
            golf_channel_canister := actor (activeCanisterId) : actor {
              createGolfChannel : (dto: GolfChannelCommands.CreateGolfChannel) -> async Result.Result<T.GolfChannelId, T.Error>;
              getLatestId : () -> async T.GolfChannelId;
              isCanisterFull : () -> async Bool;
            };
          };
        }
      };
      return await golf_channel_canister.createGolfChannel(dto);
    };

    public func updateGolfChannel(dto : GolfChannelCommands.UpdateGolfChannel) : async Result.Result<(), T.Error> {
      let existingChannel = await getChannel({ channelId = dto.channelId });

      switch(existingChannel){
        case (#ok foundChannel){

          let golfChannelCanisterId = golfChannelCanisterIndex.get(foundChannel.channelId);
          switch(golfChannelCanisterId){
            case (?foundCanisterId){
              let golf_channel_canister = actor (foundCanisterId) : actor {
                updateGolfChannel : (dto: GolfChannelCommands.UpdateGolfChannel) -> async Result.Result<(), T.Error>;
              };
              return await golf_channel_canister.updateGolfChannel(dto);
            };
            case _ { }
          };  
          return #err(#NotFound);
        };
        case (#err _) { return #err(#NotFound) };
      };
    };

    public func deleteGolfChannel(dto : GolfChannelCommands.DeleteGolfChannel) : async Result.Result<(), T.Error> {
      let existingChannel = await getChannel({ channelId = dto.channelId });

      switch(existingChannel){
        case (#ok foundChannel){

          let golfChannelCanisterId = golfChannelCanisterIndex.get(foundChannel.channelId);
          switch(golfChannelCanisterId){
            case (?foundCanisterId){
              let golf_channel_canister = actor (foundCanisterId) : actor {
                deleteGolfChannel : (dto: GolfChannelCommands.DeleteGolfChannel) -> async Result.Result<(), T.Error>;
              };
              return await golf_channel_canister.deleteGolfChannel(dto);
            };
            case _ { }
          };  
          return #err(#NotFound);
        };
        case (#err _) { return #err(#NotFound) };
      };
    };

    public func subscribeToGolfChannel(dto : GolfChannelCommands.SubscribeToGolfChannel) : async Result.Result<(), T.Error> {
      let existingChannel = await getChannel({ channelId = dto.channelId });

      switch(existingChannel){
        case (#ok foundChannel){

          let golfChannelCanisterId = golfChannelCanisterIndex.get(foundChannel.channelId);
          switch(golfChannelCanisterId){
            case (?foundCanisterId){
              let golf_channel_canister = actor (foundCanisterId) : actor {
                subscribeToGolfChannel : (dto: GolfChannelCommands.SubscribeToGolfChannel) -> async Result.Result<(), T.Error>;
              };
              return await golf_channel_canister.subscribeToGolfChannel(dto);
            };
            case _ { }
          };  
          return #err(#NotFound);
        };
        case (#err _) { return #err(#NotFound) };
      };
    };

    public func unsubscribeFromGolfChannel(dto : GolfChannelCommands.UnsubscribeFromGolfChannel) : async Result.Result<(), T.Error> {
      let existingChannel = await getChannel({ channelId = dto.channelId });

      switch(existingChannel){
        case (#ok foundChannel){

          let golfChannelCanisterId = golfChannelCanisterIndex.get(foundChannel.channelId);
          switch(golfChannelCanisterId){
            case (?foundCanisterId){
              let golf_channel_canister = actor (foundCanisterId) : actor {
                unsubscribeFromGolfChannel : (dto: GolfChannelCommands.UnsubscribeFromGolfChannel) -> async Result.Result<(), T.Error>;
              };
              return await golf_channel_canister.unsubscribeFromGolfChannel(dto);
            };
            case _ { }
          };  
          return #err(#NotFound);
        };
        case (#err _) { return #err(#NotFound) };
      };
    };

    public func uploadGolfChannelVideo(dto : GolfChannelCommands.UploadGolfChannelVideo) : async Result.Result<(), T.Error> {
      let existingChannel = await getChannel({ channelId = dto.channelId });

      switch(existingChannel){
        case (#ok foundChannel){

          let golfChannelCanisterId = golfChannelCanisterIndex.get(foundChannel.channelId);
          switch(golfChannelCanisterId){
            case (?foundCanisterId){
              let golf_channel_canister = actor (foundCanisterId) : actor {
                uploadGolfChannelVideo : (dto: GolfChannelCommands.UploadGolfChannelVideo) -> async Result.Result<(), T.Error>;
              };
              return await golf_channel_canister.uploadGolfChannelVideo(dto);
            };
            case _ { }
          };  
          return #err(#NotFound);
        };
        case (#err _) { return #err(#NotFound) };
      };
    };

    public func updateGolfChannelVideo(dto : GolfChannelCommands.UpdateGolfChannelVideo) : async Result.Result<(), T.Error> {
      let existingChannel = await getChannel({ channelId = dto.channelId });

      switch(existingChannel){
        case (#ok foundChannel){

          let golfChannelCanisterId = golfChannelCanisterIndex.get(foundChannel.channelId);
          switch(golfChannelCanisterId){
            case (?foundCanisterId){
              let golf_channel_canister = actor (foundCanisterId) : actor {
                updateGolfChannelVideo : (dto: GolfChannelCommands.UpdateGolfChannelVideo) -> async Result.Result<(), T.Error>;
              };
              return await golf_channel_canister.updateGolfChannelVideo(dto);
            };
            case _ { }
          };  
          return #err(#NotFound);
        };
        case (#err _) { return #err(#NotFound) };
      };
    };

    public func removeGolfChannelVideo(dto : GolfChannelCommands.RemoveGolfChannelVideo) : async Result.Result<(), T.Error> {
      let existingChannel = await getChannel({ channelId = dto.channelId });

      switch(existingChannel){
        case (#ok foundChannel){

          let golfChannelCanisterId = golfChannelCanisterIndex.get(foundChannel.channelId);
          switch(golfChannelCanisterId){
            case (?foundCanisterId){
              let golf_channel_canister = actor (foundCanisterId) : actor {
                removeGolfChannelVideo : (dto: GolfChannelCommands.RemoveGolfChannelVideo) -> async Result.Result<(), T.Error>;
              };
              return await golf_channel_canister.removeGolfChannelVideo(dto);
            };
            case _ { }
          };  
          return #err(#NotFound);
        };
        case (#err _) { return #err(#NotFound) };
      };
    };

    public func isChannelOwner(dto: GolfChannelQueries.IsChannelOwner) : async Bool{
      let existingChannel = await getChannel({ channelId = dto.channelId });

      switch(existingChannel){
        case (#ok foundChannel){

          let golfChannelCanisterId = golfChannelCanisterIndex.get(foundChannel.channelId);
          switch(golfChannelCanisterId){
            case (?foundCanisterId){
              let golf_channel_canister = actor (foundCanisterId) : actor {
                isChannelOwner : (dto: GolfChannelQueries.IsChannelOwner) -> async Bool;
              };
              return await golf_channel_canister.isChannelOwner(dto);
            };
            case _ { }
          };  
        };
        case (#err _) { };
      };
      return false;
    };

    //stable storage getters and setters

    public func getStableCanisterIndex() : [(T.GolfChannelId, Base.CanisterId)]{
      return Iter.toArray(golfChannelCanisterIndex.entries());
    };

    public func setStableCanisterIndex(stable_golf_channel_canister_index: [(T.GolfChannelId, Base.CanisterId)]){
      let canisterIds : TrieMap.TrieMap<T.GolfChannelId, Base.CanisterId> = TrieMap.TrieMap<T.GolfChannelId, Base.CanisterId>(Utilities.eqNat, Utilities.hashNat);

      for (canisterId in Iter.fromArray(stable_golf_channel_canister_index)) {
        canisterIds.put(canisterId);
      };
      golfChannelCanisterIndex := canisterIds;
    };

    public func getStableActiveCanisterId() : Base.CanisterId {
      return activeCanisterId;
    };

    public func setStableActiveCanisterId(stable_active_canister_id: Base.CanisterId){
      activeCanisterId := stable_active_canister_id;
    };  

    public func getStableGolfChannelNames() : [(T.GolfChannelId, Text)] {
      return Iter.toArray(golfChannelNames.entries());
    };

    public func setStableGolfChannelNames(stable_channel_names : [(T.GolfChannelId, Text)]) : () {
      let golf_channel_map : TrieMap.TrieMap<T.GolfChannelId, Base.CanisterId> = TrieMap.TrieMap<T.GolfChannelId, Base.CanisterId>(Utilities.eqNat, Utilities.hashNat);

      for (channelName in Iter.fromArray(stable_channel_names)) {
        golf_channel_map.put(channelName);
      };
      golfChannelNames := golf_channel_map;
    };

    public func getStableUniqueCanisterIds() : [Base.CanisterId] {
      return List.toArray(uniqueGolfChannelCanisterIds);
    };

    public func setStableUniqueCanisterIds(stable_unique_canister_ids : [Base.CanisterId]) : () {
      let canisterIdBuffer = Buffer.fromArray<Base.CanisterId>([]);

      for (canisterId in Iter.fromArray(stable_unique_canister_ids)) {
        canisterIdBuffer.add(canisterId);
      };
      uniqueGolfChannelCanisterIds := List.fromArray(Buffer.toArray(canisterIdBuffer));
    };

    public func getStableTotalGolfChannels() : Nat {
      return totalGolfChannels;
    };

    public func setStableTotalGolfChannels(stable_total_golf_channels : Nat) : () {
      totalGolfChannels := stable_total_golf_channels;
    };

    public func getStableNextGolfChannelId() : T.GolfChannelId {
      return nextGolfChannelId;
    };

    public func setStableNextGolfChannelId(stable_next_golf_channel_id : T.GolfChannelId) : () {
      nextGolfChannelId := stable_next_golf_channel_id;
    };


  //TODO WHEN?!

  private func createNewCanister(nextId: T.GolfChannelId) : async (){
    Cycles.add<system>(10_000_000_000_000);
    let canister = await GolfChannelsCanister._GolfChannelsCanister();
    let IC : Management.Management = actor (Environment.Default);
    let principal = ?Principal.fromText(Environment.BACKEND_CANISTER_ID);
    let _ = await Utilities.updateCanister_(canister, principal, IC);

    let canister_principal = Principal.fromActor(canister);
    let canisterId = Principal.toText(canister_principal);

    if (canisterId == "") {
      return;
    };

    var new_canister = actor (canisterId) : actor {
      updateNextId : (nextId: T.GolfChannelId) -> async ();
    };

    await new_canister.updateNextId(nextId);

    let uniqueCanisterIdBuffer = Buffer.fromArray<Base.CanisterId>(List.toArray(uniqueGolfChannelCanisterIds));
    uniqueCanisterIdBuffer.add(canisterId);
    uniqueGolfChannelCanisterIds := List.fromArray(Buffer.toArray(uniqueCanisterIdBuffer));
    activeCanisterId := canisterId;
    return;
  };
  };
};


    