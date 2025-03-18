import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Nat8 "mo:base/Nat8";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Time "mo:base/Time";

import Environment "../utilities/Environment";
import T "../data-types/app_types";
import ID "../data-types/id_types";
import GolfCourse "../data-types/golf_course_types";
import GolfCourseQueries "../queries/golf_course_queries";
import GolfCourseCommands "../commands/golf_course_commands";

actor class _GolfCoursesCanister() {

  private stable var MAX_GOLF_COURSES_PER_GROUP: Nat = 50;
  private stable var MAX_GOLF_COURSES_PER_CANISTER: Nat = 5000;

  private stable var stable_golf_course_group_indexes: [(ID.GolfCourseId, Nat8)] = [];
  
  private stable var activeGroupIndex: Nat8 = 0;
  private stable var nextCourseId: ID.GolfCourseId = 1;
  private stable var totalGolfCourses = 0;

  private stable var golfCourseGroup1: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup2: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup3: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup4: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup5: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup6: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup7: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup8: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup9: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup10: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup11: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup12: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup13: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup14: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup15: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup16: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup17: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup18: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup19: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup20: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup21: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup22: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup23: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup24: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup25: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup26: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup27: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup28: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup29: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup30: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup31: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup32: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup33: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup34: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup35: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup36: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup37: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup38: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup39: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup40: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup41: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup42: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup43: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup44: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup45: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup46: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup47: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup48: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup49: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup50: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup51: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup52: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup53: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup54: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup55: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup56: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup57: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup58: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup59: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup60: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup61: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup62: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup63: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup64: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup65: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup66: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup67: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup68: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup69: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup70: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup71: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup72: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup73: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup74: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup75: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup76: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup77: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup78: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup79: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup80: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup81: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup82: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup83: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup84: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup85: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup86: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup87: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup88: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup89: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup90: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup91: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup92: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup93: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup94: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup95: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup96: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup97: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup98: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup99: [GolfCourse.GolfCourse] = [];
  private stable var golfCourseGroup100: [GolfCourse.GolfCourse] = [];

  //Public endpoints:

  public shared ({caller}) func getGolfCourse(dto: GolfCourseQueries.GetGolfCourse) : async Result.Result<GolfCourseQueries.GolfCourse, T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golfCourseGroupIndex in Iter.fromArray(stable_golf_course_group_indexes)) {
      if(golfCourseGroupIndex.0 == dto.id){
        groupIndex := ?golfCourseGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfCourse = findGolfCourse(foundGroupIndex, dto.id);
        switch(golfCourse){
          case (?foundGolfCourse){
            return #ok({
              id = foundGolfCourse.id;
              name = foundGolfCourse.name;
              tees = Array.map<GolfCourse.TeeGroup, GolfCourseQueries.GolfCourseTeeGroup>(
                foundGolfCourse.teeGroups, func(entry: GolfCourse.TeeGroup){
                  return {
                    added = entry.added;
                    colour = entry.colour;
                    holes = Array.map<GolfCourse.Hole, GolfCourseQueries.HoleSummary>(entry.holes, func(holeEntry: GolfCourse.Hole){

                      return {
                        name = holeEntry.name; 
                        number = holeEntry.number; 
                        colour = entry.colour;
                        yardage = holeEntry.yardage;
                        par = holeEntry.par;
                        strokeIndex = holeEntry.strokeIndex;
                      }
                    });
                    golfCourseId = foundGolfCourse.id;
                    index = entry.index;
                    name = entry.name;
                    strokeIndex = entry.index;
                    mainImage = foundGolfCourse.mainImage;
                    totalHoles = foundGolfCourse.totalHoles;
                  }
                });
              activeVersion = foundGolfCourse.activeVersion;
              mainImage = foundGolfCourse.mainImage;
              mainImageExtension = foundGolfCourse.mainImageExtension;
              totalHoles = foundGolfCourse.totalHoles;
              founded = foundGolfCourse.founded;
              countryId = foundGolfCourse.countryId;
            });
          };
          case (null){
            return #err(#NotFound);
          }
        }
      };
    };
  };

  public shared ({caller}) func getGolfCourseTees(dto: GolfCourseQueries.GetGolfCourseTees) : async Result.Result<GolfCourseQueries.GolfCourseTees, T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golfCourseGroupIndex in Iter.fromArray(stable_golf_course_group_indexes)) {
      if(golfCourseGroupIndex.0 == dto.golfCourseId){
        groupIndex := ?golfCourseGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfCourse = findGolfCourse(foundGroupIndex, dto.golfCourseId);
        switch(golfCourse){
          case (?foundGolfCourse){
            return #ok({
              id = foundGolfCourse.id;
              tees = foundGolfCourse.teeGroups;
            });
          };
          case (null){
            return #err(#NotFound);
          }
        }
      };
    };
  };

  public shared ({caller}) func getGolfCourseTeeGroup(dto: GolfCourseQueries.GetGolfCourseTeeGroup) : async Result.Result<GolfCourseQueries.GolfCourseTeeGroup, T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;
    return #err(#NotFound); //TODO;
  };

  public shared ({ caller }) func getLatestId() : async ID.GolfCourseId{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;
    return nextCourseId - 1;
  };

  public shared ({ caller }) func updateNextId(nextId: ID.GolfCourseId) : async (){
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    nextCourseId := nextId;
  };

  public shared ({caller}) func createGolfCourse(dto: GolfCourseCommands.CreateGolfCourse) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    if(totalGolfCourses >= MAX_GOLF_COURSES_PER_CANISTER){
      return #err(#CanisterFull);
    };

    if(getGolfCourseCountInGroup(activeGroupIndex) >= MAX_GOLF_COURSES_PER_GROUP){
      activeGroupIndex += 1;
    };

    if(activeGroupIndex > 99){
      return #err(#CanisterFull);
    };

    let newCourse: GolfCourse.GolfCourse = {
      dateAdded = Time.now();
      id = nextCourseId; 
      name = dto.name;
      status = #Active;
      teeGroups = dto.teeGroups;
      history = [];
      activeVersion = 1;
      mainImage = dto.mainImage;
      mainImageExtension = dto.mainImageExtension;
      bannerImage = dto.bannerImage;
      courseAlbums = [];
      courseImages =[];
      totalHoles = dto.totalHoles;
      founded = dto.founded;
      countryId = dto.countryId;
      manager = dto.manager;
    };
    
    return addGolfCourse(activeGroupIndex, newCourse);
  };

  public shared ({caller}) func updateGolfCourse(dto: GolfCourseCommands.UpdateGolfCourse) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;
 
    var groupIndex: ?Nat8 = null;
    for (golfCourseGroupIndex in Iter.fromArray(stable_golf_course_group_indexes)) {
      if(golfCourseGroupIndex.0 == dto.courseId){
        groupIndex := ?golfCourseGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfCourse = findGolfCourse(foundGroupIndex, dto.courseId);
        switch(golfCourse){
          case (?foundGolfCourse){    
            let golfCourseHistoryBuffer = Buffer.fromArray<GolfCourse.HistoricalGolfCourse>(foundGolfCourse.history);
            golfCourseHistoryBuffer.add({
              dateAdded = foundGolfCourse.dateAdded;
              id = foundGolfCourse.id;
              version = foundGolfCourse.activeVersion;
              name = foundGolfCourse.name;
              status = foundGolfCourse.status;
              teeGroups = foundGolfCourse.teeGroups;
            });

            let newVersion = foundGolfCourse.activeVersion + 1;
            var updatedTeeGroups: [GolfCourse.TeeGroup] = foundGolfCourse.teeGroups;
            switch(dto.updatedTeeGroup){
              case (?foundUpdatedTeeGroup){
                updatedTeeGroups := Array.map<GolfCourse.TeeGroup, GolfCourse.TeeGroup>(foundGolfCourse.teeGroups, 
                  func(teeGroup: GolfCourse.TeeGroup){
                    if(teeGroup.name == foundUpdatedTeeGroup.name){
                      return foundUpdatedTeeGroup;
                    } else {
                      return teeGroup;
                    }
                  });
              };
              case (null) {};
            };

            let updatedGolfCourse: GolfCourse.GolfCourse = {
              activeVersion = newVersion;
              dateAdded = foundGolfCourse.dateAdded;
              history = Buffer.toArray(golfCourseHistoryBuffer);
              id = foundGolfCourse.id;
              name = dto.name;
              status = foundGolfCourse.status;
              teeGroups = updatedTeeGroups;
              mainImage = foundGolfCourse.mainImage;
              mainImageExtension = foundGolfCourse.mainImageExtension;
              bannerImage = foundGolfCourse.bannerImage;
              courseAlbums = foundGolfCourse.courseAlbums;
              courseImages = foundGolfCourse.courseImages;
              totalHoles = foundGolfCourse.totalHoles;
              founded = foundGolfCourse.founded;
              countryId = foundGolfCourse.countryId;
              manager = foundGolfCourse.manager;
            };

            return saveGolfCourse(foundGroupIndex, updatedGolfCourse);
          };
          case (null){
            return #err(#NotFound);
          }
        }
      };
    };
  };

  public shared ({caller}) func deleteGolfCourse(dto: GolfCourseCommands.DeleteGolfCourse) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golfCourseGroupIndex in Iter.fromArray(stable_golf_course_group_indexes)) {
      if(golfCourseGroupIndex.0 == dto.courseId){
        groupIndex := ?golfCourseGroupIndex.1;
      }
    };
    
    switch(groupIndex){
      case (?foundGroupIndex){ 
        return removeGolfCourse(foundGroupIndex, dto.courseId);
      };
      case (null){
        return #err(#NotFound);
      }
    };
    
  };
  
  public shared ({caller}) func isCanisterFull() : async Bool{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;
    return (totalGolfCourses >= MAX_GOLF_COURSES_PER_CANISTER);
  };

  //Private functions:

  private func findGolfCourse(golfCourseGroupIndex: Nat8, courseId: ID.GolfCourseId) : ?GolfCourse.GolfCourse {
    switch(golfCourseGroupIndex){
      case 0{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup1, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 1{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup2, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 2{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup3, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 3{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup4, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 4{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup5, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 5{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup6, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 6{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup7, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 7{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup8, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 8{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup9, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 9{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup10, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 10{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup11, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 11{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup12, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 12{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup13, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 13{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup14, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 14{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup15, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 15{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup16, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 16{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup17, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 17{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup18, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 18{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup19, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 19{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup20, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 20{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup21, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 21{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup22, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 22{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup23, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 23{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup24, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 24{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup25, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 25{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup26, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 26{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup27, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 27{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup28, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 28{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup29, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 29{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup30, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 30{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup31, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 31{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup32, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 32{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup33, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 33{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup34, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 34{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup35, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 35{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup36, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 36{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup37, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 37{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup38, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 38{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup39, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 39{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup40, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 40{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup41, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 41{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup42, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 42{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup43, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 43{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup44, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 44{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup45, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 45{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup46, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 46{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup47, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 47{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup48, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 48{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup49, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 49{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup50, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 50{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup51, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 51{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup52, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 52{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup53, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 53{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup54, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 54{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup55, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 55{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup56, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 56{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup57, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 57{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup58, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 58{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup59, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 59{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup60, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 60{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup61, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 61{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup62, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 62{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup63, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 63{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup64, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 64{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup65, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 65{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup66, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 66{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup67, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 67{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup68, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 68{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup69, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 69{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup70, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 70{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup71, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 71{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup72, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 72{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup73, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 73{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup74, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 74{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup75, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 75{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup76, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 76{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup77, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 77{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup78, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 78{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup79, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 79{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup80, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 80{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup81, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 81{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup82, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 82{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup83, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 83{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup84, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 84{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup85, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 85{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup86, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 86{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup87, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 87{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup88, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 88{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup89, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 89{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup90, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 90{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup91, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 91{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup92, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 92{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup93, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 93{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup94, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 94{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup95, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 95{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup96, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 96{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup97, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 97{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup98, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 98{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup99, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 99{
        let foundGolfer = Array.find<GolfCourse.GolfCourse>(golfCourseGroup100, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case _ {
        return null;
      }
    }
  };

  private func addGolfCourse(golfCourseGroupIndex: Nat8, newCourse: GolfCourse.GolfCourse) : Result.Result<(), T.Error> {

    var golfCourseBuffer = Buffer.fromArray<GolfCourse.GolfCourse>([]);
    switch(activeGroupIndex){
      case(0){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup1);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup1 := Buffer.toArray(golfCourseBuffer);
      };
      case (1){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup2);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup2 := Buffer.toArray(golfCourseBuffer);
      };
      case (2){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup3);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup3 := Buffer.toArray(golfCourseBuffer);
      };
      case (3){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup4);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup4 := Buffer.toArray(golfCourseBuffer);
      };
      case (4){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup5);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup5 := Buffer.toArray(golfCourseBuffer);
      };
      case (5){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup6);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup6 := Buffer.toArray(golfCourseBuffer);
      };
      case (6){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup7);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup7 := Buffer.toArray(golfCourseBuffer);
      };
      case (7){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup8);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup8 := Buffer.toArray(golfCourseBuffer);
      };
      case (8){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup9);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup9 := Buffer.toArray(golfCourseBuffer);
      };
      case (9){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup10);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup10 := Buffer.toArray(golfCourseBuffer);
      };
      case(10){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup11);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup11 := Buffer.toArray(golfCourseBuffer);
      };
      case (11){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup12);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup12 := Buffer.toArray(golfCourseBuffer);
      };
      case (12){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup13);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup13 := Buffer.toArray(golfCourseBuffer);
      };
      case (13){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup14);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup14 := Buffer.toArray(golfCourseBuffer);
      };
      case (14){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup15);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup15 := Buffer.toArray(golfCourseBuffer);
      };
      case (15){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup16);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup16 := Buffer.toArray(golfCourseBuffer);
      };
      case (16){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup17);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup17 := Buffer.toArray(golfCourseBuffer);
      };
      case (17){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup18);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup18 := Buffer.toArray(golfCourseBuffer);
      };
      case (18){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup19);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup19 := Buffer.toArray(golfCourseBuffer);
      };
      case (19){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup20);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup20 := Buffer.toArray(golfCourseBuffer);
      };
      case(20){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup21);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup21 := Buffer.toArray(golfCourseBuffer);
      };
      case (21){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup22);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup22 := Buffer.toArray(golfCourseBuffer);
      };
      case (22){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup23);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup23 := Buffer.toArray(golfCourseBuffer);
      };
      case (23){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup24);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup24 := Buffer.toArray(golfCourseBuffer);
      };
      case (24){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup25);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup25 := Buffer.toArray(golfCourseBuffer);
      };
      case (25){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup26);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup26 := Buffer.toArray(golfCourseBuffer);
      };
      case (26){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup27);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup27 := Buffer.toArray(golfCourseBuffer);
      };
      case (27){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup28);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup28 := Buffer.toArray(golfCourseBuffer);
      };
      case (28){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup29);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup29 := Buffer.toArray(golfCourseBuffer);
      };
      case (29){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup30);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup30 := Buffer.toArray(golfCourseBuffer);
      };
      case(30){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup31);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup31 := Buffer.toArray(golfCourseBuffer);
      };
      case (31){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup32);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup32 := Buffer.toArray(golfCourseBuffer);
      };
      case (32){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup33);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup33 := Buffer.toArray(golfCourseBuffer);
      };
      case (33){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup34);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup34 := Buffer.toArray(golfCourseBuffer);
      };
      case (34){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup35);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup35 := Buffer.toArray(golfCourseBuffer);
      };
      case (35){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup36);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup36 := Buffer.toArray(golfCourseBuffer);
      };
      case (36){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup37);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup37 := Buffer.toArray(golfCourseBuffer);
      };
      case (37){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup38);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup38 := Buffer.toArray(golfCourseBuffer);
      };
      case (38){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup39);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup39 := Buffer.toArray(golfCourseBuffer);
      };
      case (39){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup40);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup40 := Buffer.toArray(golfCourseBuffer);
      };
      case(40){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup41);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup41 := Buffer.toArray(golfCourseBuffer);
      };
      case (41){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup42);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup42 := Buffer.toArray(golfCourseBuffer);
      };
      case (42){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup43);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup43 := Buffer.toArray(golfCourseBuffer);
      };
      case (43){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup44);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup44 := Buffer.toArray(golfCourseBuffer);
      };
      case (44){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup45);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup45 := Buffer.toArray(golfCourseBuffer);
      };
      case (45){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup46);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup46 := Buffer.toArray(golfCourseBuffer);
      };
      case (46){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup47);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup47 := Buffer.toArray(golfCourseBuffer);
      };
      case (47){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup48);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup48 := Buffer.toArray(golfCourseBuffer);
      };
      case (48){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup49);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup49 := Buffer.toArray(golfCourseBuffer);
      };
      case (49){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup50);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup50 := Buffer.toArray(golfCourseBuffer);
      };
      case(50){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup51);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup51 := Buffer.toArray(golfCourseBuffer);
      };
      case (51){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup52);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup52 := Buffer.toArray(golfCourseBuffer);
      };
      case (52){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup53);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup53 := Buffer.toArray(golfCourseBuffer);
      };
      case (53){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup54);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup54 := Buffer.toArray(golfCourseBuffer);
      };
      case (54){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup55);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup55 := Buffer.toArray(golfCourseBuffer);
      };
      case (55){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup56);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup56 := Buffer.toArray(golfCourseBuffer);
      };
      case (56){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup57);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup57 := Buffer.toArray(golfCourseBuffer);
      };
      case (57){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup58);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup58 := Buffer.toArray(golfCourseBuffer);
      };
      case (58){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup59);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup59 := Buffer.toArray(golfCourseBuffer);
      };
      case (59){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup60);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup60 := Buffer.toArray(golfCourseBuffer);
      };
      case(60){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup61);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup61 := Buffer.toArray(golfCourseBuffer);
      };
      case (61){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup62);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup62 := Buffer.toArray(golfCourseBuffer);
      };
      case (62){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup63);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup63 := Buffer.toArray(golfCourseBuffer);
      };
      case (63){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup64);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup64 := Buffer.toArray(golfCourseBuffer);
      };
      case (64){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup65);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup65 := Buffer.toArray(golfCourseBuffer);
      };
      case (65){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup66);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup66 := Buffer.toArray(golfCourseBuffer);
      };
      case (66){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup67);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup67 := Buffer.toArray(golfCourseBuffer);
      };
      case (67){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup68);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup68 := Buffer.toArray(golfCourseBuffer);
      };
      case (68){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup69);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup69 := Buffer.toArray(golfCourseBuffer);
      };
      case (69){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup70);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup70 := Buffer.toArray(golfCourseBuffer);
      };
      case(70){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup71);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup71 := Buffer.toArray(golfCourseBuffer);
      };
      case (71){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup72);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup72 := Buffer.toArray(golfCourseBuffer);
      };
      case (72){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup73);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup73 := Buffer.toArray(golfCourseBuffer);
      };
      case (73){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup74);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup74 := Buffer.toArray(golfCourseBuffer);
      };
      case (74){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup75);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup75 := Buffer.toArray(golfCourseBuffer);
      };
      case (75){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup76);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup76 := Buffer.toArray(golfCourseBuffer);
      };
      case (76){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup77);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup77 := Buffer.toArray(golfCourseBuffer);
      };
      case (77){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup78);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup78 := Buffer.toArray(golfCourseBuffer);
      };
      case (78){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup79);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup79 := Buffer.toArray(golfCourseBuffer);
      };
      case (79){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup80);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup80 := Buffer.toArray(golfCourseBuffer);
      };
      case(80){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup81);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup81 := Buffer.toArray(golfCourseBuffer);
      };
      case (81){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup82);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup82 := Buffer.toArray(golfCourseBuffer);
      };
      case (82){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup83);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup83 := Buffer.toArray(golfCourseBuffer);
      };
      case (83){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup84);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup84 := Buffer.toArray(golfCourseBuffer);
      };
      case (84){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup85);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup85 := Buffer.toArray(golfCourseBuffer);
      };
      case (85){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup86);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup86 := Buffer.toArray(golfCourseBuffer);
      };
      case (86){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup87);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup87 := Buffer.toArray(golfCourseBuffer);
      };
      case (87){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup88);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup88 := Buffer.toArray(golfCourseBuffer);
      };
      case (88){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup89);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup89 := Buffer.toArray(golfCourseBuffer);
      };
      case (89){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup90);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup90 := Buffer.toArray(golfCourseBuffer);
      };
      case(90){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup91);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup91 := Buffer.toArray(golfCourseBuffer);
      };
      case (91){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup92);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup92 := Buffer.toArray(golfCourseBuffer);
      };
      case (92){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup93);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup93 := Buffer.toArray(golfCourseBuffer);
      };
      case (93){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup94);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup94 := Buffer.toArray(golfCourseBuffer);
      };
      case (94){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup95);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup95 := Buffer.toArray(golfCourseBuffer);
      };
      case (95){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup96);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup96 := Buffer.toArray(golfCourseBuffer);
      };
      case (96){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup97);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup97 := Buffer.toArray(golfCourseBuffer);
      };
      case (97){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup98);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup98 := Buffer.toArray(golfCourseBuffer);
      };
      case (98){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup99);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup99 := Buffer.toArray(golfCourseBuffer);
      };
      case (99){
        golfCourseBuffer := Buffer.fromArray(golfCourseGroup100);
        golfCourseBuffer.add(newCourse);
        golfCourseGroup100 := Buffer.toArray(golfCourseBuffer);
      };
      case _ { 
        return #err(#CanisterFull);
      };
    };

    totalGolfCourses += 1;
    nextCourseId += 1;
    return #ok();
  };

  private func saveGolfCourse(groupIndex: Nat8, updatedGolfCourse: GolfCourse.GolfCourse) : Result.Result<(), T.Error>{
    switch(groupIndex){
      case 0{
        golfCourseGroup1 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup1, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 1{
        golfCourseGroup2 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup2, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 2{
        golfCourseGroup3 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup3, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 3{
        golfCourseGroup4 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup4, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 4{
        golfCourseGroup5 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup5, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 5{
        golfCourseGroup6 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup6, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 6{
        golfCourseGroup7 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup7, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 7{
        golfCourseGroup8 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup8, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 8{
        golfCourseGroup9 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup9, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 9{
        golfCourseGroup10 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup10, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };


      case 10{
        golfCourseGroup10 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup10, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 11{
        golfCourseGroup12 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup12, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 12{
        golfCourseGroup13 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup13, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 13{
        golfCourseGroup14 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup14, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 14{
        golfCourseGroup15 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup15, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 15{
        golfCourseGroup16 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup16, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 16{
        golfCourseGroup17 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup17, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 17{
        golfCourseGroup18 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup18, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 18{
        golfCourseGroup19 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup19, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 19{
        golfCourseGroup20 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup20, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 20{
        golfCourseGroup21 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup21, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 21{
        golfCourseGroup22 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup22, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 22{
        golfCourseGroup23 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup23, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 23{
        golfCourseGroup24 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup24, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 24{
        golfCourseGroup25 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup25, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 25{
        golfCourseGroup26 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup26, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 26{
        golfCourseGroup27 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup27, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 27{
        golfCourseGroup28 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup28, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 28{
        golfCourseGroup29 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup29, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 29{
        golfCourseGroup30 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup30, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 30{
        golfCourseGroup31 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup31, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 31{
        golfCourseGroup32 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup32, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 32{
        golfCourseGroup33 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup33, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 33{
        golfCourseGroup34 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup34, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 34{
        golfCourseGroup35 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup35, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 35{
        golfCourseGroup36 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup36, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 36{
        golfCourseGroup37 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup37, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 37{
        golfCourseGroup38 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup38, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 38{
        golfCourseGroup39 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup39, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 39{
        golfCourseGroup40 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup40, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 40{
        golfCourseGroup41 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup41, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 41{
        golfCourseGroup42 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup42, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 42{
        golfCourseGroup43 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup43, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 43{
        golfCourseGroup44 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup44, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 44{
        golfCourseGroup45 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup45, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 45{
        golfCourseGroup46 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup46, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 46{
        golfCourseGroup47 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup47, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 47{
        golfCourseGroup48 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup48, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 48{
        golfCourseGroup49 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup49, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 49{
        golfCourseGroup50 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup50, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 50{
        golfCourseGroup51 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup51, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 51{
        golfCourseGroup52 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup52, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 52{
        golfCourseGroup53 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup53, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 53{
        golfCourseGroup54 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup54, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 54{
        golfCourseGroup55 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup55, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 55{
        golfCourseGroup56 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup56, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 56{
        golfCourseGroup57 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup57, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 57{
        golfCourseGroup58 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup58, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 58{
        golfCourseGroup59 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup59, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 59{
        golfCourseGroup60 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup60, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 60{
        golfCourseGroup61 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup61, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 61{
        golfCourseGroup62 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup62, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 62{
        golfCourseGroup63 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup63, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 63{
        golfCourseGroup64 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup64, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 64{
        golfCourseGroup65 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup65, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 65{
        golfCourseGroup66 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup66, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 66{
        golfCourseGroup67 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup67, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 67{
        golfCourseGroup68 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup68, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 68{
        golfCourseGroup69 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup69, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 69{
        golfCourseGroup70 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup70, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 70{
        golfCourseGroup71 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup71, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 71{
        golfCourseGroup72 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup72, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 72{
        golfCourseGroup73 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup73, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 73{
        golfCourseGroup74 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup74, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 74{
        golfCourseGroup75 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup75, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 75{
        golfCourseGroup76 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup76, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 76{
        golfCourseGroup77 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup77, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 77{
        golfCourseGroup78 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup78, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 78{
        golfCourseGroup79 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup79, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 79{
        golfCourseGroup80 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup80, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 80{
        golfCourseGroup81 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup81, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 81{
        golfCourseGroup82 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup82, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 82{
        golfCourseGroup83 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup83, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 83{
        golfCourseGroup84 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup84, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 84{
        golfCourseGroup85 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup85, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 85{
        golfCourseGroup86 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup86, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 86{
        golfCourseGroup87 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup87, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 87{
        golfCourseGroup88 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup88, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 88{
        golfCourseGroup89 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup89, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 89{
        golfCourseGroup90 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup90, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 90{
        golfCourseGroup91 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup91, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 91{
        golfCourseGroup92 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup92, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 92{
        golfCourseGroup93 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup93, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 93{
        golfCourseGroup94 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup94, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 94{
        golfCourseGroup95 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup95, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 95{
        golfCourseGroup96 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup96, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 96{
        golfCourseGroup97 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup97, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 97{
        golfCourseGroup98 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup98, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 98{
        golfCourseGroup99 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup99, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 99{
        golfCourseGroup100 := Array.map<GolfCourse.GolfCourse, GolfCourse.GolfCourse>(golfCourseGroup100, func(golfCourse: GolfCourse.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case _ {
        return #err(#NotFound);
      }
    };
    return #ok();
  };

  private func removeGolfCourse(groupIndex: Nat8, removeCourseId: ID.GolfCourseId) : Result.Result<(), T.Error>{
    switch(groupIndex){
      case 0{
        golfCourseGroup1 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup1, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 1{
        golfCourseGroup2 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup2, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 2{
        golfCourseGroup3 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup3, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 3{
        golfCourseGroup4 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup4, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 4{
        golfCourseGroup5 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup5, func(golfCourse: GolfCourse.GolfCourse){
         golfCourse.id != removeCourseId
        });
      };
      case 5{
        golfCourseGroup6 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup6, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 6{
        golfCourseGroup7 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup7, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 7{
        golfCourseGroup8 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup8, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 8{
        golfCourseGroup9 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup9, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 9{
        golfCourseGroup10 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup10, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };

      case 10{
        golfCourseGroup10 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup10, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 11{
        golfCourseGroup12 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup12, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 12{
        golfCourseGroup13 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup13, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 13{
        golfCourseGroup14 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup14, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 14{
        golfCourseGroup15 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup15, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 15{
        golfCourseGroup16 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup16, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 16{
        golfCourseGroup17 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup17, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 17{
        golfCourseGroup18 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup18, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 18{
        golfCourseGroup19 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup19, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 19{
        golfCourseGroup20 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup20, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 20{
        golfCourseGroup21 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup21, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 21{
        golfCourseGroup22 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup22, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 22{
        golfCourseGroup23 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup23, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 23{
        golfCourseGroup24 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup24, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 24{
        golfCourseGroup25 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup25, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 25{
        golfCourseGroup26 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup26, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 26{
        golfCourseGroup27 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup27, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 27{
        golfCourseGroup28 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup28, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 28{
        golfCourseGroup29 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup29, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 29{
        golfCourseGroup30 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup30, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 30{
        golfCourseGroup31 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup31, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 31{
        golfCourseGroup32 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup32, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 32{
        golfCourseGroup33 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup33, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 33{
        golfCourseGroup34 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup34, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 34{
        golfCourseGroup35 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup35, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 35{
        golfCourseGroup36 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup36, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 36{
        golfCourseGroup37 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup37, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 37{
        golfCourseGroup38 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup38, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 38{
        golfCourseGroup39 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup39, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 39{
        golfCourseGroup40 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup40, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 40{
        golfCourseGroup41 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup41, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 41{
        golfCourseGroup42 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup42, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 42{
        golfCourseGroup43 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup43, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 43{
        golfCourseGroup44 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup44, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 44{
        golfCourseGroup45 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup45, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 45{
        golfCourseGroup46 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup46, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 46{
        golfCourseGroup47 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup47, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 47{
        golfCourseGroup48 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup48, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 48{
        golfCourseGroup49 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup49, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 49{
        golfCourseGroup50 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup50, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 50{
        golfCourseGroup51 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup51, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 51{
        golfCourseGroup52 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup52, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 52{
        golfCourseGroup53 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup53, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 53{
        golfCourseGroup54 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup54, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 54{
        golfCourseGroup55 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup55, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 55{
        golfCourseGroup56 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup56, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 56{
        golfCourseGroup57 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup57, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 57{
        golfCourseGroup58 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup58, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 58{
        golfCourseGroup59 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup59, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 59{
        golfCourseGroup60 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup60, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 60{
        golfCourseGroup61 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup61, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 61{
        golfCourseGroup62 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup62, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 62{
        golfCourseGroup63 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup63, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 63{
        golfCourseGroup64 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup64, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 64{
        golfCourseGroup65 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup65, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 65{
        golfCourseGroup66 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup66, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 66{
        golfCourseGroup67 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup67, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 67{
        golfCourseGroup68 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup68, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 68{
        golfCourseGroup69 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup69, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 69{
        golfCourseGroup70 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup70, func(golfCourse: GolfCourse.GolfCourse){
         golfCourse.id != removeCourseId
        });
      };
      case 70{
        golfCourseGroup71 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup71, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 71{
        golfCourseGroup72 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup72, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 72{
        golfCourseGroup73 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup73, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 73{
        golfCourseGroup74 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup74, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 74{
        golfCourseGroup75 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup75, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 75{
        golfCourseGroup76 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup76, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 76{
        golfCourseGroup77 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup77, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 77{
        golfCourseGroup78 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup78, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 78{
        golfCourseGroup79 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup79, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 79{
        golfCourseGroup80 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup80, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 80{
        golfCourseGroup81 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup81, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 81{
        golfCourseGroup82 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup82, func(golfCourse: GolfCourse.GolfCourse){
         golfCourse.id != removeCourseId
        });
      };
      case 82{
        golfCourseGroup83 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup83, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 83{
        golfCourseGroup84 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup84, func(golfCourse: GolfCourse.GolfCourse){
         golfCourse.id != removeCourseId
        });
      };
      case 84{
        golfCourseGroup85 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup85, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 85{
        golfCourseGroup86 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup86, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 86{
        golfCourseGroup87 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup87, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 87{
        golfCourseGroup88 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup88, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 88{
        golfCourseGroup89 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup89, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 89{
        golfCourseGroup90 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup90, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 90{
        golfCourseGroup91 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup91, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 91{
        golfCourseGroup92 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup92, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 92{
        golfCourseGroup93 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup93, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 93{
        golfCourseGroup94 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup94, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 94{
        golfCourseGroup95 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup95, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 95{
        golfCourseGroup96 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup96, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 96{
        golfCourseGroup97 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup97, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 97{
        golfCourseGroup98 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup98, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 98{
        golfCourseGroup99 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup99, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 99{
        golfCourseGroup100 := Array.filter<GolfCourse.GolfCourse>(golfCourseGroup100, func(golfCourse: GolfCourse.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case _ {
        return #err(#NotFound);
      }
    };
    return #ok();
  };

  private func getGolfCourseCountInGroup(groupIndex: Nat8) : Nat {
    switch(groupIndex){
      case 0{
        return golfCourseGroup1.size();
      };
      case 1{
        return golfCourseGroup2.size();
      };
      case 2{
        return golfCourseGroup3.size();
      };
      case 3{
        return golfCourseGroup4.size();
      };
      case 4{
        return golfCourseGroup5.size();
      };
      case 5{
        return golfCourseGroup6.size();
      };
      case 6{
        return golfCourseGroup7.size();
      };
      case 7{
        return golfCourseGroup8.size();
      };
      case 8{
        return golfCourseGroup9.size();
      };
      case 9{
        return golfCourseGroup10.size();
      };
      case 10{
        return golfCourseGroup11.size();
      };
      case 11{
        return golfCourseGroup12.size();
      };
      case _{
        return 0;
      }
    }
  };

};
