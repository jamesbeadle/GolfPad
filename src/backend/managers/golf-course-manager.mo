import Result "mo:base/Result";
import List "mo:base/List";
import T "../data-types/types";
import DTOs "../dtos/DTOs";

module {
  public class GolfCourseManager() {
    
    private var courses: List.List<T.GolfCourse> = List.fromArray([]);

    public func officialCourseExists(courseId: T.GolfCourseId) : Bool {
      return false; //TODO
    };

    public func listOfficialCourses(dto: DTOs.ListCoursesDTO) : Result.Result<DTOs.CoursesDTO, T.Error> {
      //TODO: Checks
      return #err(#NotFound);
    };

    public func updateOfficialCourse(principalId: T.PrincipalId, dto: DTOs.UpdateGolfCourseDTO) : Result.Result<(), T.Error> {
      
      //TODO: Checks

      //TODO: make sure you store changes in a history of course and getting a course needs a reference to the version in which the card relates to
      return #err(#NotFound); 
    };

    public func getStableCourses() : [T.GolfCourse] {
      return List.toArray(courses);
    };

    public func setStableCourses(stable_courses: [T.GolfCourse]){
      courses := List.fromArray(stable_courses);
    };



    public func validateAddGolfCourse(dto : DTOs.AddGolfCourseDTO) : T.RustResult {
      return #Err("Invalid: Cannot find golf course.");  
      //return #Ok("Proposal Valid");
    };

    public func executeAddGolfCourse(dto : DTOs.AddGolfCourseDTO) : async () {
      //TODO: implement
    };

    public func validateUpdateGolfCourse(dto : DTOs.UpdateGolfCourseDTO) : T.RustResult {
      return #Err("Invalid: Cannot find golf course.");  
      //return #Ok("Proposal Valid");
    };

    public func executeUpdateGolfCourse(dto : DTOs.UpdateGolfCourseDTO) : async () {
      //TODO: implement
    };
  };
};


    