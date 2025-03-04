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
import Array "mo:base/Array";
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
      
      let droppedEntries = List.drop<(T.GolfChannelId, Text)>(filteredEntries, dto.offset); 
      let paginatedEntries = List.take<(T.GolfChannelId, Text)>(droppedEntries, dto.limit);

      let channelsBuffer = Buffer.fromArray<GolfChannelQueries.GolfChannel>([]);

      for (entry in Iter.fromList(paginatedEntries)){
        let channel = await getGolfChannel({ golfChannelId = entry.0 });
        switch(channel){
          case (#ok foundChannel){
            channelsBuffer.add(foundChannel);
          };
          case _{}
        }
      };
      
      return #ok({
        entries = Buffer.toArray(channelsBuffer);
      });
    };

    public func getGolfChannel(dto: GolfChannelQueries.GetGolfChannel) : async Result.Result<GolfChannelQueries.GolfChannel, T.Error> {
      return await getChannel(dto);
    };

    private func getChannel(dto: GolfChannelQueries.GetGolfChannel) : async Result.Result<GolfChannelQueries.GolfChannel, T.Error> {
      let existingGolfChannelCanisterId = golfChannelCanisterIndex.get(dto.golfChannelId);
      switch(existingGolfChannelCanisterId){
        case (?foundCanisterId){

          let golfChannel_canister = actor (foundCanisterId) : actor {
            getGolfChannel : (dto: GolfChannelQueries.GetGolfChannel) -> async Result.Result<GolfChannelQueries.GolfChannel, T.Error>;
          };

          return await golfChannel_canister.getGolfChannel({ golfChannelId = dto.golfChannelId });
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func addGolfChannel(dto : GolfChannelCommands.CreateGolfChannel) : async () {
      
      if(Text.size(dto.name) > 100){
        return;
      };

      return;
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
      updateNextId : (nextId: T.GameId) -> async ();
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


    