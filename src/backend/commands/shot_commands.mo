import T "../data-types/app_types";
import ID "../data-types/id_types";
import Base "mo:waterway-mops/BaseTypes";
import GolfEnums "../data-types/golf_enums";

module ShotCommands {

    public type AddShot = {
        principalId: Base.PrincipalId;
        yardage: Nat;
        club: GolfEnums.GolfClub;
    };

    public type UpdateShot = {
        principalId: Base.PrincipalId;
        golfShotId: ID.GolfShotId;
        yardage: Nat;
        club: GolfEnums.GolfClub;
    };

    public type DeleteShot = {
        principalId: Base.PrincipalId;
        golfShotId: ID.GolfShotId;
    };

}

  