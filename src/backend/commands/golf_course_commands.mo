import Ids "mo:waterway-mops/Ids";
import MopsGolfIds "../mops_golf_ids";
module GolfCourseCommands {
    public type CreateGolfCourse = {
        name: Text;
        holes: [GolfHole];
        yardage: Nat16;
        coursePar: Nat8;
        countryId: Ids.CountryId;
        founded: Int;
        par: Nat8;
        totalYardage: Nat16;
    };

    public type GolfHole = {
        holeNumber: Nat8;
        strokeIndex: Nat8;
        yardage: Nat16;
        par: Nat8;
    };

    public type UpdateGolfCourse = {
        golfCourseId: MopsGolfIds.GolfCourseId;
        name: Text;
        holes: [GolfHole];
    };
}