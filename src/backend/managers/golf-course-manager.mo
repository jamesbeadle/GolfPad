
import Enums "mo:waterway-mops/Enums";
import Result "mo:base/Result";
import GolfCourseQueries "../queries/golf_course_queries";
import GolfCourseCommands "../commands/golf_course_commands";
import Types "../data-types/types";

module {
  public class GolfCourseManager() {

    private var golfCourses: [Types.GolfCourse] = [];
    
    public func getGolfCourse(dto: GolfCourseQueries.GetGolfCourse) : Result.Result<GolfCourseQueries.GolfCourse, Enums.Error> {
      return #err(#NotFound);
    };

    public func createGolfCourse(dto: GolfCourseCommands.CreateGolfCourse) : Result.Result<(), Enums.Error> {
      return #err(#NotFound);
    };

    public func updateGolfCourse(dto: GolfCourseCommands.UpdateGolfCourse) : Result.Result<(), Enums.Error> {
      return #err(#NotFound);
    };

    public func getStableGolfCourses() : [Types.GolfCourse] {
      return golfCourses;
    };

    public func setStableGolfCourses(stable_golf_courses: [Types.GolfCourse]) {
      golfCourses := stable_golf_courses;
    }


  };
};


    