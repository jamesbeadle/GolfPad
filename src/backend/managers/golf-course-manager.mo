
import Enums "mo:waterway-mops/Enums";
import Result "mo:base/Result";
import GolfCourseQueries "../queries/golf_course_queries";
import GolfCourseCommands "../commands/golf_course_commands";
import Types "../data-types/types";

module {
  public class GolfCourseManager() {

    private var golfCourses: [Types.GolfCourse] = [];
    
    public func getGolfCourse(dto: GolfCourseQueries.GetGolfCourse) : async Result.Result<GolfCourseQueries.GolfCourse, Enums.Error> {
      return #err(#NotFound);
    };

    public func createGolfCourse(dto: GolfCourseCommands.CreateGolfCourse) : async Result.Result<(), Enums.Error> {
      return #err(#NotFound);
    };

    public func updateGolfCourse(dto: GolfCourseCommands.CreateGolfCourse) : async Result.Result<(), Enums.Error> {
      return #err(#NotFound);
    };

    //stable storage getters and setters



  };
};


    