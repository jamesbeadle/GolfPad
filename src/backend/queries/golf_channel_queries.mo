
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
        golfChannelId: T.GolfChannelId;
    };

    public type GolfChannel = {

    };

    public type GetGolfChannelVideos = {
        page: Nat;
    };

    public type GolfChannelVideos = {};

    public type GetGolfChannelVideo = {

    };

    public type GolfChannelVideo = {};
}

  