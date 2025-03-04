import T "../data-types/types";

module GolfCourseQueries {
    
    public type GetGolfCourse = {
        golfCourseId: T.GolfCourseId;
    };

    public type GolfCourse = {
        courseId: T.GolfCourseId;
        name: Text;
        tees: [T.TeeGroup];
        activeVersion: T.GolfCourseVersion;
    };

    public type GetGolfCourses = {
        limit : Nat;
        offset : Nat;
        searchTerm: Text;
    };

    public type GolfCourses = {
        entries: [GolfCourse];
    };

    public type GolfCourseSnaphot = {
        id: Nat;
    };
    
}

  