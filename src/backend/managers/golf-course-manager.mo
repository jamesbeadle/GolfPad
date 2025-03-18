import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Cycles "mo:base/ExperimentalCycles";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";

import Base "mo:waterway-mops/BaseTypes";
import GolfCoursesCanister "../canister-definitions/golf-courses-canister";
import Environment "../utilities/Environment";
import Management "../utilities/Management";
import T "../data-types/app_types";
import ID "../data-types/id_types";
import Utilities "../utilities/Utilities";

import GolfCourseQueries "../queries/golf_course_queries";
import GolfCourseCommands "../commands/golf_course_commands";

module {
  public class GolfCourseManager() {

    private var golfCourseCanisterIndex: TrieMap.TrieMap<ID.GolfCourseId, Base.CanisterId> = TrieMap.TrieMap<ID.GolfCourseId, Base.CanisterId>(Utilities.eqNat, Utilities.hashNat);
    private var activeCanisterId: Base.CanisterId = "";
    private var golfCourseNames : TrieMap.TrieMap<ID.GolfCourseId, Text> = TrieMap.TrieMap<ID.GolfCourseId, Text>(Utilities.eqNat, Utilities.hashNat);
    private var uniqueGolfCourseCanisterIds : List.List<Base.CanisterId> = List.nil();
    private var totalGolfCourses : Nat = 0;
    private var nextGolfCourseId : ID.GolfCourseId = 1;
    
    public func courseExists(courseId: ID.GolfCourseId) : Bool {
      let course = golfCourseCanisterIndex.get(courseId);
      return Option.isSome(course);
    };

    public func getGolfCourses(dto: GolfCourseQueries.GetGolfCourses) : async Result.Result<GolfCourseQueries.GolfCourses, T.Error> {
      let searchTerm = dto.searchTerm;
      let filteredEntries = List.filter<(ID.GolfCourseId, Text)>(
        Iter.toList<(ID.GolfCourseId, Text)>(golfCourseNames.entries()),
        func(entry : (ID.GolfCourseId, Text)) : Bool {
          Text.startsWith(entry.1, #text searchTerm);
        },
      );
      
      let droppedEntries = List.drop<(ID.GolfCourseId, Text)>(filteredEntries, 0); //TODO 
      let paginatedEntries = List.take<(ID.GolfCourseId, Text)>(droppedEntries, 10);

      let coursesBuffer = Buffer.fromArray<GolfCourseQueries.GolfCourseSummary>([]);

      for (entry in Iter.fromList(paginatedEntries)){
        let course = await getGolfCourse({ id = entry.0 });
        switch(course){
          case (#ok foundCourse){
            coursesBuffer.add({
              founded = foundCourse.founded;
              id = foundCourse.id;
              name = foundCourse.name;
              mainImage = foundCourse.mainImage;
              mainImageExtension = foundCourse.mainImageExtension;
              countryId = foundCourse.countryId;
              version = foundCourse.activeVersion;
            });
          };
          case _{}
        }
      };
      
      return #ok({
        entries = Buffer.toArray(coursesBuffer);
        page = dto.page;
        total = 0; //TODO
        pageSize = Environment.DEFAULT_PAGE_SIZE;
      });
    };

    public func getGolfCourse(dto: GolfCourseQueries.GetGolfCourse) : async Result.Result<GolfCourseQueries.GolfCourse, T.Error> {
      return await getCourse(dto);
    };

    public func getGolfCourseTeeGroup(dto: GolfCourseQueries.GetGolfCourseTeeGroup) : async Result.Result<GolfCourseQueries.GolfCourseTeeGroup, T.Error> {
      return #err(#NotFound); //TODO
    };

    public func getGolfCourseSummary(dto: GolfCourseQueries.GetGolfCourseSummary) : async Result.Result<GolfCourseQueries.GolfCourseSummary, T.Error> {
      return #err(#NotFound); //TODO
    };

    public func  getGolfCourseCanisterId(dto: GolfCourseQueries.GetGolfCourseCanisterId) : async Result.Result<GolfCourseQueries.GolfCourseCanisterId, T.Error>{
     return #err(#NotFound); //TODO
    };

    public func getGolfCourseTees(dto: GolfCourseQueries.GetGolfCourseTees) : async Result.Result<GolfCourseQueries.GolfCourseTees, T.Error> {
     return #err(#NotFound); //TODO
    };

    private func getCourse(dto: GolfCourseQueries.GetGolfCourse) : async Result.Result<GolfCourseQueries.GolfCourse, T.Error> {
      let existingGolfCourseCanisterId = golfCourseCanisterIndex.get(dto.id);
      switch(existingGolfCourseCanisterId){
        case (?foundCanisterId){

          let golfCourse_canister = actor (foundCanisterId) : actor {
            getGolfCourse : (dto: GolfCourseQueries.GetGolfCourse) -> async Result.Result<GolfCourseQueries.GolfCourse, T.Error>;
          };

          return await golfCourse_canister.getGolfCourse({ id = dto.id });
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func validateAddGolfCourse(dto : GolfCourseCommands.CreateGolfCourse) : T.RustResult {
      
      if(Text.size(dto.name) > 100){
        return #Err("Golf Course name too long, max 100 characters.");
      };

      if(dto.totalHoles != 18){
        return #Err("Golf Course must have 18 holes");
      };

      for(teegroup in Iter.fromArray(dto.teeGroups)){
        if(Array.size(teegroup.holes) != 18){
          return #Err("Tee group " # teegroup.name # " must have 18 holes.");
        }
      };

      return #Ok("Proposal Valid");
    };

    public func executeAddGolfCourse(dto : GolfCourseCommands.CreateGolfCourse) : async () {
      var golf_course_canister = actor (activeCanisterId) : actor {
        getLatestId : () -> async ID.GolfCourseId;
        createGolfCourse : (dto: GolfCourseCommands.CreateGolfCourse) -> async Result.Result<(), T.Error>;
        isCanisterFull : () -> async Bool;
      };

      let isCanisterFull = await golf_course_canister.isCanisterFull(); 

      if(isCanisterFull){
        let latestId = await golf_course_canister.getLatestId();
        let nextId: ID.GameId = latestId + 1;
        
        await createNewCanister(nextId);

        golf_course_canister := actor (activeCanisterId) : actor {
          getLatestId : () -> async ID.GolfCourseId;
          createGolfCourse : (dto: GolfCourseCommands.CreateGolfCourse) -> async Result.Result<(), T.Error>;
          isCanisterFull : () -> async Bool;
       };

      };

      let _ = await golf_course_canister.createGolfCourse(dto);
    };

    public func validateUpdateGolfCourse(dto : GolfCourseCommands.UpdateGolfCourse) : T.RustResult {
      
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

    public func executeUpdateGolfCourse(dto : GolfCourseCommands.UpdateGolfCourse) : async () {

      let golfCourseCanisterId = golfCourseCanisterIndex.get(dto.courseId);
      switch(golfCourseCanisterId){
        case (?foundCanisterId){
          let golf_course_canister = actor (foundCanisterId) : actor {
            updateGolfCourse : (dto:  GolfCourseCommands.UpdateGolfCourse) -> async Result.Result<(), T.Error>;
          };
          let _ = await golf_course_canister.updateGolfCourse(dto);
        };
        case _ { }
      };     
    };

    //stable storage getters and setters

    public func getStableCanisterIndex() : [(ID.GolfCourseId, Base.CanisterId)]{
      return Iter.toArray(golfCourseCanisterIndex.entries());
    };

    public func setStableCanisterIndex(stable_golf_course_canister_index: [(ID.GolfCourseId, Base.CanisterId)]){
      let canisterIds : TrieMap.TrieMap<ID.GolfCourseId, Base.CanisterId> = TrieMap.TrieMap<ID.GolfCourseId, Base.CanisterId>(Utilities.eqNat, Utilities.hashNat);

      for (canisterId in Iter.fromArray(stable_golf_course_canister_index)) {
        canisterIds.put(canisterId);
      };
      golfCourseCanisterIndex := canisterIds;
    };

    public func getStableActiveCanisterId() : Base.CanisterId {
      return activeCanisterId;
    };

    public func setStableActiveCanisterId(stable_active_canister_id: Base.CanisterId){
      activeCanisterId := stable_active_canister_id;
    };  

    public func getStableGolfCourseNames() : [(ID.GolfCourseId, Text)] {
      return Iter.toArray(golfCourseNames.entries());
    };

    public func setStableGolfCourseNames(stable_course_names : [(ID.GolfCourseId, Text)]) : () {
      let golf_course_map : TrieMap.TrieMap<ID.GolfCourseId, Base.CanisterId> = TrieMap.TrieMap<ID.GolfCourseId, Base.CanisterId>(Utilities.eqNat, Utilities.hashNat);

      for (courseName in Iter.fromArray(stable_course_names)) {
        golf_course_map.put(courseName);
      };
      golfCourseNames := golf_course_map;
    };

    public func getStableUniqueCanisterIds() : [Base.CanisterId] {
      return List.toArray(uniqueGolfCourseCanisterIds);
    };

    public func setStableUniqueCanisterIds(stable_unique_canister_ids : [Base.CanisterId]) : () {
      let canisterIdBuffer = Buffer.fromArray<Base.CanisterId>([]);

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

    public func getStableNextGolfCourseId() : ID.GolfCourseId {
      return nextGolfCourseId;
    };

    public func setStableNextGolfCourseId(stable_next_golf_course_id : ID.GolfCourseId) : () {
      nextGolfCourseId := stable_next_golf_course_id;
    };

    private func createNewCanister(nextId: ID.GolfCourseId) : async (){
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
        updateNextId : (nextId: ID.GameId) -> async ();
      };

      await new_canister.updateNextId(nextId);

      let uniqueCanisterIdBuffer = Buffer.fromArray<Base.CanisterId>(List.toArray(uniqueGolfCourseCanisterIds));
      uniqueCanisterIdBuffer.add(canisterId);
      uniqueGolfCourseCanisterIds := List.fromArray(Buffer.toArray(uniqueCanisterIdBuffer));
      activeCanisterId := canisterId;
      return;
    };
  };
};


    