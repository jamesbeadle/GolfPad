
import T "../data-types/types";
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
        golfShotId: T.GolfShotId;
        yardage: Nat;
        club: GolfEnums.GolfClub;
    };

    public type DeleteShot = {
        principalId: Base.PrincipalId;
        golfShotId: T.GolfShotId;

    };

}

  