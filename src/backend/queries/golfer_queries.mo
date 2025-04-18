
import Types "../data-types/types";
import Ids "mo:waterway-mops/Ids";

module GolferQueries {
    
    public type GetGolfer = {
        golferId: Types.GolferId;
    };

    public type Golfer = {
        id: Types.GolferId;
        firstName: Text;
        lastName: Text;
        nationality: Ids.CountryId;
        worldRanking: Nat16;
    };

    public type ListGolfers = {
        page: Nat;
    };

    public type Golfers = {
        entries: [GolferSummary];
        totalEntries: Nat;
        page: Nat;
    };

    public type GolferSummary = {
        
    };
    
}

  