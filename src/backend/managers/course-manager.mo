import Result "mo:base/Result";
import List "mo:base/List";
import T "../data-types/types";
import DTOs "../dtos/DTOs";

module {
  public class CourseManager() {
    
    private var courses: List.List<T.Course> = List.fromArray([]);

    public func customCourseExists(courseId: T.CourseId) : Bool {
      return false; //TODO
    };

    public func officialCourseExists(courseId: T.CourseId) : Bool {
      return false; //TODO
    };

    public func listCourses(dto: DTOs.ListCoursesDTO) : Result.Result<DTOs.CoursesDTO, T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func listGolferCourses(principalId: T.PrincipalId, dto: DTOs.ListGolferCoursesDTO) : Result.Result<DTOs.GolferCoursesDTO, T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func addGolferCourse(principalId: T.PrincipalId, dto: DTOs.AddGolferCourseDTO) : Result.Result<(), T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func deleteGolferCourse(principalId: T.PrincipalId, dto: DTOs.DeleteGolferCourseDTO) : Result.Result<(), T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func addCustomCourse(principalId: T.PrincipalId, dto: DTOs.AddCustomCourseDTO) : Result.Result<(), T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func updateCustomCourse(principalId: T.PrincipalId, dto: DTOs.UpdateCustomCourseDTO) : Result.Result<(), T.Error> {
      //TODO: Checks

      //TODO: make sure you store changes in a history of course and getting a course needs a reference to the version in which the card relates to
      return #err(#NotFound); 
    };

    public func deleteCustomCourse(principalId: T.PrincipalId, dto: DTOs.DeleteCustomCourseDTO) : Result.Result<(), T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func getStableCourses() : [T.Course] {
      return List.toArray(courses);
    };

    public func setStableCourses(stable_courses: [T.Course]){
      courses := List.fromArray(stable_courses);
    };



    public func validateAddOfficialGolfCourse(dto : DTOs.AddOfficialGolfCourseDTO) : T.RustResult {
      return #Err("Invalid: Cannot find relegated club.");  
      //return #Ok("Proposal Valid");
    };

    public func executeAddOfficialGolfCourse(dto : DTOs.AddOfficialGolfCourseDTO) : async () {
      //todo implement
    };
  };
};


    