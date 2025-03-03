import T "../data-types/types";

module GolfCourseQueries {
    
    public type ListCourses = {        
        limit : Nat;
        offset : Nat;
        searchTerm: Text;
    };

    public type GetGolfCourse = {
        golfCourseId: T.GolfCourseId;
    };
    
}

  