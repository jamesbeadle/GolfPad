import Types "../data-types/types";
import Ids "mo:waterway-mops/Ids";
module GolfCourseQueries {
    
    public type GetGolfCourse = {
        golfCourseId: Types.GolfCourseId;
    };

    public type GolfCourse = {
        golfCourseId: Types.GolfCourseId;
        name: Text;
        totalHoles: Nat8;
        founded: Int;
        countryId: Ids.CountryId;
        holes: [GolfHole];
    };

    public type GolfHole = {
        holeNumber: Nat8;
        par: Nat8;
        strokeIndex: Nat8;
        yardage: Nat16;
    };

    public type ListGolfCourses = {
        page: Nat;
    };

    public type GolfCourses = {
        entries: [GolfCourseSummary];
        totalEntries: Nat;
        page: Nat;
    };

    public type GolfCourseSummary = {
        golfCourseId: Types.GolfCourseId;
        name: Text;
        totalHoles: Nat8;
        founded: Int;
        countryId: Ids.CountryId;
    };
    
}

  