
import T "../data-types/types";

module GolfChannelCommands {

    public type CreateGolfChannel = {
        createdById: T.GolferId;
        name: Text;
    };

    public type UpdateGolfChannel = {
        channelId: T.GolfChannelId;
        name: Text;
        channelImage: ?Blob;
        channelImageExtension: Text;
        channelBanner: ?Blob;
        channelBannerExtension: Text;
    };

    public type DeleteGolfChannel = {
        channelId: T.GolfChannelId;

    };

    public type SubscribeToGolfChannel = {
        channelId: T.GolfChannelId;

    };

    public type UnsubscribeFromGolfChannel = {
        channelId: T.GolfChannelId;

    };

    public type UploadGolfChannelVideo = {
        channelId: T.GolfChannelId;

    };

    public type UpdateGolfChannelVideo = {
        channelId: T.GolfChannelId;

    };

    public type RemoveGolfChannelVideo = {
        channelId: T.GolfChannelId;

    };

}

  