import GolfCourse "../data-types/golf_course_types";
import Base "mo:waterway-mops/BaseTypes";
import MopsIds "../data-types/mops_ids";

module GolfCourseQueries {
    
    public type GetGolfCourse = {
        id: MopsIds.GolfCourseId;
    };

    public type GolfCourse = {
        id: MopsIds.GolfCourseId;
        name: Text;
        mainImage: ?Blob;
        mainImageExtension: Text;
        totalHoles: Nat8;
        founded: Int;
        countryId: MopsIds.CountryId;
        manager: Text;
    };
    
}

  