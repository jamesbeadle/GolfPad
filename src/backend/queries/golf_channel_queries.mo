
import T "../data-types/types";

module GolfChannelQueries {

    public type GetGolfChannels = {
        limit : Nat;
        offset : Nat;
        searchTerm: Text;
    };

    public type GolfChannels = {

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
        principalId: T.GolferId;
        channelId: T.GolfChannelId;
    };

    public type IsSubscribed = {
        principalId: T.GolferId;
        channelId: T.GolfChannelId;
    };
}

  