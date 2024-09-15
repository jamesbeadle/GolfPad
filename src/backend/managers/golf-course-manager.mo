import Result "mo:base/Result";
import List "mo:base/List";
import TrieMap "mo:base/TrieMap";
import Option "mo:base/Option";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Buffer "mo:base/Buffer";
import Principal "mo:base/Principal";
import T "../data-types/types";
import DTOs "../dtos/DTOs";
import Utilities "../utilities/Utilities";
import Management "../utilities/Management";
import GolfCoursesCanister "../canister-definitions/golf-courses-canister";
import Environment "../utilities/Environment";
import Cycles "mo:base/ExperimentalCycles";
import Array "mo:base/Array";

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
            getGolfCourse : (dto: DTOs.GetGolfCourseDTO) -> async Result.Result<DTOs.GolfCourseDTO, T.Error>;
          };

          return await golfCourse_canister.getGolfCourse({ courseId = courseId });
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func validateAddGolfCourse(dto : DTOs.CreateGolfCourseDTO) : T.RustResult {
      
      if(Text.size(dto.name) > 100){
        return #Err("Golf Course name too long, max 100 characters.");
      };

      if(Array.size(dto.holes) != 18){
        return #Err("Golf Course must have 18 holes");
      };

      return #Ok("Proposal Valid");
    };

    public func executeAddGolfCourse(dto : DTOs.CreateGolfCourseDTO) : async () {
      var golf_course_canister = actor (activeCanisterId) : actor {
        getLatestId : () -> async T.GolfCourseId;
        createGolfCourse : (dto: DTOs.CreateGolfCourseDTO) -> async Result.Result<(), T.Error>;
        isCanisterFull : () -> async Bool;
      };

      let isCanisterFull = await golf_course_canister.isCanisterFull(); 

      if(isCanisterFull){
        let latestId = await golf_course_canister.getLatestId();
        let nextId: T.GameId = latestId + 1;
        
        await createNewCanister(nextId);

        golf_course_canister := actor (activeCanisterId) : actor {
          getLatestId : () -> async T.GolfCourseId;
          createGolfCourse : (dto: DTOs.CreateGolfCourseDTO) -> async Result.Result<(), T.Error>;
          isCanisterFull : () -> async Bool;
       };

      };

      let _ = await golf_course_canister.createGolfCourse(dto);
    };

    public func validateUpdateGolfCourse(dto : DTOs.UpdateGolfCourseDTO) : T.RustResult {
      
      if(Text.size(dto.name) > 100){
        return #Err("Golf Course name too long, max 100 characters.");
      };
      
      switch(dto.updatedTeeGroup){
        case (?foundTeeGroup){
          if(Array.size(foundTeeGroup.holes) != 18){
            return #Err("Golf Course must have 18 holes");
          };
        };
        case null { }
      };

      return #Ok("Proposal Valid");
    };

    public func executeUpdateGolfCourse(dto : DTOs.UpdateGolfCourseDTO) : async () {

      let golfCourseCanisterId = golfCourseCanisterIndex.get(dto.courseId);
      switch(golfCourseCanisterId){
        case (?foundCanisterId){
          let golf_course_canister = actor (foundCanisterId) : actor {
            updateGolfCourse : (dto: DTOs.UpdateGolfCourseDTO) -> async Result.Result<(), T.Error>;
          };
          let _ = await golf_course_canister.updateGolfCourse(dto);
        };
        case _ { }
      };     
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



  private func createNewCanister(nextId: T.GolfCourseId) : async (){
    Cycles.add<system>(10_000_000_000_000);
    let canister = await GolfCoursesCanister._GolfCoursesCanister();
    let IC : Management.Management = actor (Environment.Default);
    let principal = ?Principal.fromText(Environment.BACKEND_CANISTER_ID);
    let _ = await Utilities.updateCanister_(canister, principal, IC);

    let canister_principal = Principal.fromActor(canister);
    let canisterId = Principal.toText(canister_principal);

    if (canisterId == "") {
      return;
    };

    var new_canister = actor (canisterId) : actor {
      updateNextId : (nextId: T.GameId) -> async ();
    };

    await new_canister.updateNextId(nextId);

    let uniqueCanisterIdBuffer = Buffer.fromArray<T.CanisterId>(List.toArray(uniqueGolfCourseCanisterIds));
    uniqueCanisterIdBuffer.add(canisterId);
    uniqueGolfCourseCanisterIds := List.fromArray(Buffer.toArray(uniqueCanisterIdBuffer));
    activeCanisterId := canisterId;
    return;
  };
  };
};


    