
import Enums "mo:waterway-mops/Enums";
import Result "mo:base/Result";
import List "mo:base/List";
import Array "mo:base/Array";
import Order "mo:base/Order";
import Buffer "mo:base/Buffer";
import Nat8 "mo:base/Nat8";
import Iter "mo:base/Iter";
import GolfCourseQueries "../queries/golf_course_queries";
import GolfCourseCommands "../commands/golf_course_commands";
import Types "../data-types/types";
import Environment "../environment";

module {
  public class GolfCourseManager() {

    private var golfCourses: [Types.GolfCourse] = [];
    
    public func getGolfCourse(dto: GolfCourseQueries.GetGolfCourse) : Result.Result<GolfCourseQueries.GolfCourse, Enums.Error> {
      let golfCourse = Array.find(golfCourses, func(entry: Types.GolfCourse) : Bool {
        entry.id == dto.golfCourseId
      });
      switch(golfCourse){
        case (?foundGolfCourse){
          return #ok({
            golfCourseId = foundGolfCourse.id;
            countryId = foundGolfCourse.countryId;
            founded = foundGolfCourse.founded;
            totalHoles = Nat8.fromNat(Array.size(foundGolfCourse.holes));
            name = foundGolfCourse.name;
            holes = foundGolfCourse.holes;
          });
        };
        case (null){
          return #err(#NotFound); 
        }
      }
    };

    public func listGolfCourses(dto: GolfCourseQueries.ListGolfCourses) : Result.Result<GolfCourseQueries.GolfCourses, Enums.Error> {
      let allEntries = List.fromArray(golfCourses);
      let startIndex = dto.page * Environment.PAGINATION_ROW_COUNT;
      let droppedEntries = List.drop<Types.GolfCourse>(allEntries, startIndex);
      let paginatedEntires = List.take<Types.GolfCourse>(droppedEntries, Environment.PAGINATION_ROW_COUNT);
      let mappedEntries = List.map<Types.GolfCourse, GolfCourseQueries.GolfCourseSummary>(paginatedEntires, func(entry: Types.GolfCourse){
        return {
          countryId = entry.countryId;
          founded = entry.founded;
          golfCourseId = entry.id;
          name = entry.name;
          totalHoles = Nat8.fromNat(Array.size(entry.holes));
        };
      });

      return #ok({
        entries = List.toArray<GolfCourseQueries.GolfCourseSummary>(mappedEntries);
        page = dto.page;
        totalEntries = List.size(allEntries);
      });
    };

    public func createGolfCourse(dto: GolfCourseCommands.CreateGolfCourse) : Result.Result<(), Enums.Error> {
      
      let sortedGolfCourses = Array.sort(golfCourses, func(a: Types.GolfCourse, b: Types.GolfCourse) : Order.Order {
        if (a.id > b.id) { #less } 
        else if (a.id < b.id) { #greater }
        else { #equal }
      });

      var nextId: Nat16 = 1;

      if(Array.size(sortedGolfCourses) > 0){
        nextId := sortedGolfCourses[0].id + 1;
      };

      let golfCourseBuffer = Buffer.fromArray<Types.GolfCourse>(golfCourses);
      golfCourseBuffer.add({
        id = nextId;
        bannerImage = null;
        countryId = dto.countryId;
        founded = dto.founded;
        holes = dto.holes;
        mainImage = null;
        name = dto.name;
        par = dto.par;
        totalYardage = dto.totalYardage;
      });

      return #ok();
    };

    public func updateGolfCourse(dto: GolfCourseCommands.UpdateGolfCourse) : Result.Result<(), Enums.Error> {
      let golfCourse = Array.find(golfCourses, func(entry: Types.GolfCourse) : Bool {
        entry.id == dto.golfCourseId
      });
      switch(golfCourse){
        case (?_){

          var totalYardage: Nat16 = 0;
          var par: Nat8 = 0;

          for(hole in Iter.fromArray(dto.holes)){
            totalYardage += hole.yardage;
            par += hole.par;
          };
          
          golfCourses := Array.map<Types.GolfCourse, Types.GolfCourse>(golfCourses, func(entry: Types.GolfCourse){
            if(entry.id == dto.golfCourseId){
              return {
                bannerImage = entry.bannerImage;
                countryId = entry.countryId;
                founded = entry.founded;
                holes = dto.holes;
                id = entry.id;
                mainImage = entry.mainImage;
                name = dto.name;
                par = par;
                totalYardage = totalYardage;
              };
            };
            return entry;
          });
          return #ok();
        };
        case (null){
          return #err(#NotFound);
        }
      };
    };

    public func getStableGolfCourses() : [Types.GolfCourse] {
      return golfCourses;
    };

    public func setStableGolfCourses(stable_golf_courses: [Types.GolfCourse]) {
      golfCourses := stable_golf_courses;
    }


  };
};


    