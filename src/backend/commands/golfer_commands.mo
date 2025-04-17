
import Ids "mo:waterway-mops/Ids";
import Types "../data-types/types";

module GolferCommands {
    public type CreateGolfer = {
        firstName: Text;
        lastName: Text;
        nationality: Ids.CountryId;
        worldRanking: Nat16;
    };

    public type UpdateGolfer = {
        id: Types.GolferId;
        firstName: Text;
        lastName: Text;
        nationality: Ids.CountryId;
        worldRanking: Nat16;
    };
}