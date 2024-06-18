import Result "mo:base/Result";
import List "mo:base/List";
import T "../data-types/types";
import DTOs "../dtos/DTOs";

module {
  public class CourseManager() {
    
    private var courses: List.List<T.Course> = List.fromArray([]);

    public func getStableCourses() : [T.Course] {
      return List.toArray(courses);
    };

    public func setStableCourses(stable_courses: [T.Course]){
      courses := List.fromArray(stable_courses);
    };
    
    public func getCourse(courseId: T.CourseId) : Result.Result<DTOs.CourseDTO, T.Error> {
      return #err(#NotFound);
    };
      
    public func createCourse(principalId: T.PrincipalId, dto: DTOs.CreateCourseDTO) : Result.Result<(), T.Error> {
      return #err(#NotFound);
    };

    public func updateCourse(principalId: T.PrincipalId, dto: DTOs.UpdateCourseDTO) : Result.Result<(), T.Error> {
      return #err(#NotFound);
    };
  };
};


    