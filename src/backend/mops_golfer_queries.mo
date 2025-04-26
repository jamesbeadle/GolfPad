import Ids "mo:waterway-mops/Ids";
import MopsGolfIds "mops_golf_ids";

module GolferQueries {
    
    public type GetGolfer = {
        golferId: MopsGolfIds.GolferId;
    };

    public type Golfer = {
        golferId: MopsGolfIds.GolferId;
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
        id: MopsGolfIds.GolferId;
        firstName: Text;
        lastName: Text;
        nationality: Ids.CountryId;
        worldRanking: Nat16;
    };
    
}

  