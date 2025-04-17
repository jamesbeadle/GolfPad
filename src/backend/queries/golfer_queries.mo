import T "../data-types/app_types";
import Game "../data-types/game_types";
import Membership "../data-types/membership_types";
import Base "mo:waterway-mops/BaseTypes";
import GolfCourseQueries "golf_course_queries";
import SNSGovernance "../sns-wrappers/governance";
import MopsIds "../data-types/mops_ids";

module GolferQueries {
    
    public type GetGolfers = {
        
    };

    public type Golfers = {
        golfers: [Golfer];
    };

    public type Golfer = {
        id: AppIds.GolferId;
        firstName: Text;
        lastName: Text;
    };
    
}

  