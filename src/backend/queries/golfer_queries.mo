
import Types "../data-types/types";
import Ids "mo:waterway-mops/Ids";

module GolferQueries {
    
    public type GetGolfer = {
        golferId: Types.GolferId;
    };

    public type Golfers = {
        golfers: [Golfer];
    };

    public type Golfer = {
        id: Types.GolferId;
        firstName: Text;
        lastName: Text;
        nationality: Ids.CountryId;
        worldRanking: Nat16;
    };
    
}

  