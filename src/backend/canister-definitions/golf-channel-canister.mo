import Principal "mo:base/Principal";
import Result "mo:base/Result";

import Environment "../utilities/Environment";
import T "../data-types/types";
import GolfChannelQueries "../queries/golf_channel_queries";
import GolfChannelCommands "../commands/golf_channel_commands";

actor class _GolfChannelCanister() {

  private stable var golfChannel: ?T.GolfChannel = null;

  //Public endpoints:

  public shared ({caller}) func getGolfChannel(dto: GolfChannelQueries.GetGolfChannel) : async Result.Result<GolfChannelQueries.GolfChannel, T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

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

  public shared ({caller}) func updateGolfChannel(dto: GolfChannelCommands.UpdateGolfChannel) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;
    switch(golfChannel){
      case (?foundGolfChannel){    
        
        golfChannel := ?{
          id = foundGolfChannel.id;
          name = dto.name;
          createdBy = foundGolfChannel.createdBy;
          createdOn = foundGolfChannel.createdOn;
          channelImage = dto.channelImage;
          channelImageExtension = dto.channelImageExtension;
          channelBanner = dto.channelBanner;
          channelBannerExtension = dto.channelBannerExtension;
          golfTeamId = foundGolfChannel.golfTeamId;
        };
        return #ok();
      };
      case (null){
        return #err(#NotFound);
      }
    }
  };

  public shared ({caller}) func deleteGolfChannel(dto: GolfChannelCommands.DeleteGolfChannel) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;
    
    return #err(#NotFound);
  };
  
  public shared ({caller}) func isCanisterFull() : async Bool{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;
    return true; //todo, should check the size of all the videos in the canister or put a limit
  };

};
