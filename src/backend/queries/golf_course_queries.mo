import T "../data-types/types";
import Base "mo:waterway-mops/BaseTypes";

module GolfCourseQueries {
    
    public type GetGolfCourse = {
        golfCourseId: T.GolfCourseId;
    };

    public type GolfCourse = {
        courseId: T.GolfCourseId;
        name: Text;
        tees: [T.TeeGroup];
        activeVersion: T.GolfCourseVersion;
        mainImage: Blob;
        totalHoles: Nat8;
    };

    public type GetGolfCourses = {
        principalId: Base.PrincipalId;
        page: Nat;
        searchTerm: Text;
    };

    public type GolfCourses = {
        entries: [GolfCourse];
        page: Nat;
        total: Nat;
        pageSize: Nat;
    };

    public type GolfCourseSnaphot = {
        id: Nat;
    };
    
}

  