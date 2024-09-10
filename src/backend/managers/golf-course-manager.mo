import Result "mo:base/Result";
import List "mo:base/List";
import TrieMap "mo:base/TrieMap";
import Option "mo:base/Option";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Buffer "mo:base/Buffer";
import T "../data-types/types";
import DTOs "../dtos/DTOs";
import Utilities "../utilities/Utilities";

module {
  public class GolfCourseManager() {

    private var golfCourseCanisterIndex: TrieMap.TrieMap<T.GolfCourseId, T.CanisterId> = TrieMap.TrieMap<T.GolfCourseId, T.CanisterId>(Utilities.eqNat, Utilities.hashNat);
    private var activeCanisterId: T.CanisterId = "";
    private var golfCourseNames : TrieMap.TrieMap<T.GolfCourseId, Text> = TrieMap.TrieMap<T.GolfCourseId, Text>(Utilities.eqNat, Utilities.hashNat);
    private var uniqueGolfCourseCanisterIds : List.List<T.CanisterId> = List.nil();
    private var totalGolfCourses : Nat = 0;
    
    public func courseExists(courseId: T.GolfCourseId) : Bool {
      let course = golfCourseCanisterIndex.get(courseId);
      return Option.isSome(course);
    };

    public func listCourses(dto: DTOs.PaginationFilters, searchTerm: Text) : async Result.Result<DTOs.CoursesDTO, T.Error> {
      let filteredEntries = List.filter<(T.GolfCourseId, Text)>(
        Iter.toList<(T.GolfCourseId, Text)>(golfCourseNames.entries()),
        func(entry : (T.GolfCourseId, Text)) : Bool {
          Text.startsWith(entry.1, #text searchTerm);
        },
      );
      
      let droppedEntries = List.drop<(T.GolfCourseId, Text)>(filteredEntries, dto.offset); 
      let paginatedEntries = List.take<(T.GolfCourseId, Text)>(droppedEntries, dto.limit);

      let coursesBuffer = Buffer.fromArray<DTOs.GolfCourseDTO>([]);

      for (entry in Iter.fromList(paginatedEntries)){
        let course = await getGolfCourse(entry.0);
        switch(course){
          case (#ok foundCourse){
            coursesBuffer.add(foundCourse);
          };
          case _{}
        }
      };
      
      return #ok({
        courses = Buffer.toArray(coursesBuffer);
      });
    };

    public func getCourse(dto: DTOs.GetGolfCourseDTO) : async Result.Result<DTOs.GolfCourseDTO, T.Error> {
      return await getGolfCourse(dto.courseId);
    };

    private func getGolfCourse(courseId: T.GolfCourseId) : async Result.Result<DTOs.GolfCourseDTO, T.Error> {
      let existingGolfCourseCanisterId = golfCourseCanisterIndex.get(courseId);
      switch(existingGolfCourseCanisterId){
        case (?foundCanisterId){

          let golfCourse_canister = actor (foundCanisterId) : actor {
            getGolfCourse : (courseId: T.GolfCourseId) -> async Result.Result<DTOs.GolfCourseDTO, T.Error>;
          };

          return await golfCourse_canister.getGolfCourse(courseId);
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };





    public func validateAddGolfCourse(dto : DTOs.AddGolfCourseDTO) : T.RustResult {
      
      //check course name
      //check course hole count == 18

      
      
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



    //stable storage getters and setters

    public func getStableCanisterIndex() : [(T.GolfCourseId, T.CanisterId)]{
      return Iter.toArray(golfCourseCanisterIndex.entries());
    };

    public func setStableCanisterIndex(stable_golf_course_canister_index: [(T.GolfCourseId, T.CanisterId)]){
      let canisterIds : TrieMap.TrieMap<T.GolfCourseId, T.CanisterId> = TrieMap.TrieMap<T.GolfCourseId, T.CanisterId>(Utilities.eqNat, Utilities.hashNat);

      for (canisterId in Iter.fromArray(stable_golf_course_canister_index)) {
        canisterIds.put(canisterId);
      };
      golfCourseCanisterIndex := canisterIds;
    };

    public func getStableActiveCanisterId() : T.CanisterId {
      return activeCanisterId;
    };

    public func setStableActiveCanisterId(stable_active_canister_id: T.CanisterId){
      activeCanisterId := stable_active_canister_id;
    };  

    public func getStableGolfCourseNames() : [(T.GolfCourseId, Text)] {
      return Iter.toArray(golfCourseNames.entries());
    };

    public func setStableGolfCourseNames(stable_course_names : [(T.GolfCourseId, Text)]) : () {
      let golf_course_map : TrieMap.TrieMap<T.GolfCourseId, T.CanisterId> = TrieMap.TrieMap<T.GolfCourseId, T.CanisterId>(Utilities.eqNat, Utilities.hashNat);

      for (courseName in Iter.fromArray(stable_course_names)) {
        golf_course_map.put(courseName);
      };
      golfCourseNames := golf_course_map;
    };

    public func getStableUniqueCanisterIds() : [T.CanisterId] {
      return List.toArray(uniqueGolfCourseCanisterIds);
    };

    public func setStableUniqueCanisterIds(stable_unique_canister_ids : [T.CanisterId]) : () {
      let canisterIdBuffer = Buffer.fromArray<T.CanisterId>([]);

      for (canisterId in Iter.fromArray(stable_unique_canister_ids)) {
        canisterIdBuffer.add(canisterId);
      };
      uniqueGolfCourseCanisterIds := List.fromArray(Buffer.toArray(canisterIdBuffer));
    };

    public func getStableTotalGolfCourses() : Nat {
      return totalGolfCourses;
    };

    public func setStableTotalGolfCourses(stable_total_golf_courses : Nat) : () {
      totalGolfCourses := stable_total_golf_courses;
    };
  };
};


    