
import T "../data-types/types";
import Base "mo:waterway-mops/BaseTypes";

module GolfChannelCommands {

    public type CreateGolfChannel = {
        createdById: Base.PrincipalId;
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
        principalId: Base.PrincipalId;
        channelId: T.GolfChannelId;

    };

    public type UnsubscribeFromGolfChannel = {
        principalId: Base.PrincipalId;
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

    public type GraduateGolfChannel = {
        channelId: T.GolfChannelId;
    };

}

  