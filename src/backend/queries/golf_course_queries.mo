import Types "../data-types/types";
import Ids "mo:waterway-mops/Ids";
module GolfCourseQueries {
    
    public type GetGolfCourse = {
        id: Types.GolfCourseId;
    };

    public type GolfCourse = {
        id: Types.GolfCourseId;
        name: Text;
        mainImage: ?Blob;
        mainImageExtension: Text;
        totalHoles: Nat8;
        founded: Int;
        countryId: Ids.CountryId;
        manager: Text;
        holes: [GolfHole];
    };

    public type GolfHole = {
        number: Nat8;
        par: Nat8;
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
        
    };
    
}

  