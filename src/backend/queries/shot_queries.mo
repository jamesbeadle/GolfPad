
import ID "../data-types/id_types";
import Base "mo:waterway-mops/BaseTypes";
import GolfEnums "../data-types/golf_enums";

module ShotQueries {

    public type GetShotAverages = {
        principalId: Base.PrincipalId;
    };

    public type ShotAverages = {
        shots: [AverageShot];
    };

    public type AverageShot = {
        index: Nat8;
        club: GolfEnums.GolfClub;
        yardage: Nat;
    };

    public type GetClubShots = {
        principalId: Base.PrincipalId;
        page: Nat;
        club: GolfEnums.GolfClub;
    };

    public type ClubShots = {
        club: GolfEnums.GolfClub;
        page: Nat;
        total: Nat;
        pageSize: Nat;
        entries: [GolfShot];
    };

    public type GolfShot = {
        id: ID.GolfShotId;
        club: GolfEnums.GolfClub;
        yardage: Nat;
        hitOn: Int;
    };

}

  