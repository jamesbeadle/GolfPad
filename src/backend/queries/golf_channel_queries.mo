
import T "../data-types/types";
import Base "mo:waterway-mops/BaseTypes";

module GolfChannelQueries {

    public type GetGolfChannels = {
        user_id: Base.PrincipalId;
        page: Nat;
        searchTerm: Text;
    };

    public type GolfChannels = {
        entries: [GolfChannel];
        page: Nat;
        total: Nat;
        pageSize: Nat;
    };

    public type GetGolfChannel = {
        channelId: T.GolfChannelId;
    };

    public type GolfChannel = {
        name: Text;
        channelId: T.GolfChannelId;
    };

    public type GetGolfChannelVideos = {
        channelId: T.GolfChannelId;
        page: Nat;
    };

    public type GolfChannelVideos = {
        channelId: T.GolfChannelId;
    };

    public type GetGolfChannelVideo = {
        channelId: T.GolfChannelId;
    };

    public type GolfChannelVideo = {
        channelId: T.GolfChannelId;
    };

    public type IsChannelOwner = {
        principalId: Base.PrincipalId;
        channelId: T.GolfChannelId;
    };

    public type IsSubscribed = {
        principalId: Base.PrincipalId;
        channelId: T.GolfChannelId;
    };
}

  