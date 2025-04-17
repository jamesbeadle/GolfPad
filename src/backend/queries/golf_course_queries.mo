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
    };
    
}

  