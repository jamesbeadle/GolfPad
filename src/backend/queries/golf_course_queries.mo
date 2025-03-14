import T "../data-types/types";
import Base "mo:waterway-mops/BaseTypes";

module GolfCourseQueries {
    
    public type GetGolfCourse = {
        id: T.GolfCourseId;
    };

    public type GolfCourse = {
        id: T.GolfCourseId;
        name: Text;
        tees: [T.TeeGroup];
        activeVersion: T.GolfCourseVersion;
        mainImage: ?Blob;
        mainImageExtension: Text;
        totalHoles: Nat8;
        founded: Int;
    };

    public type GetGolfCourses = {
        principalId: Base.PrincipalId;
        page: Nat;
        searchTerm: Text;
    };

    public type GolfCourses = {
        entries: [GolfCourseSummary];
        page: Nat;
        total: Nat;
        pageSize: Nat;
    };

    public type GolfCourseSummary = {
        id: Nat;
        name: Text;
        mainImage: ?Blob;
        mainImageExtension: Text;
        founded: Int;
    };
    
}

  