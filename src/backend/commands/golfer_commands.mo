
import Ids "mo:waterway-mops/Ids";
import MopsGolfIds "../mops_golf_ids";

module GolferCommands {
    public type CreateGolfer = {
        firstName: Text;
        lastName: Text;
        nationality: Ids.CountryId;
        worldRanking: Nat16;
    };

    public type UpdateGolfer = {
        golferId: MopsGolfIds.GolferId;
        firstName: Text;
        lastName: Text;
        nationality: Ids.CountryId;
        worldRanking: Nat16;
    };
}