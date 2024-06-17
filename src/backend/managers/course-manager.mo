import Result "mo:base/Result";
import T "../data-types/types";
import DTOs "../dtos/DTOs";

module {
  public class CourseManager() {
    
    
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


    