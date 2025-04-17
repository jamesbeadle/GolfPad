
import GolfCourseQueries "golf_course_queries";
import Types "../data-types/types";

module GolferQueries {
    
    public type GetGolfer = {
        golferId: Types.GolferId;
    };

    public type Golfers = {
        golfers: [Golfer];
    };

    public type Golfer = {
        id: Types.GolferId;
        firstName: Text;
        lastName: Text;
    };
    
}

  