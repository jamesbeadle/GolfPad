import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Nat8 "mo:base/Nat8";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Time "mo:base/Time";

import DTOs "../dtos/DTOs";
import Environment "../utilities/Environment";
import T "../data-types/types";

actor class _GolfCoursesCanister() {

  private stable var stable_golf_course_group_indexes: [(T.GolfCourseId, Nat8)] = [];
  
  private stable var golfCourseGroup1: [T.GolfCourse] = [];
  private stable var golfCourseGroup2: [T.GolfCourse] = [];
  private stable var golfCourseGroup3: [T.GolfCourse] = [];
  private stable var golfCourseGroup4: [T.GolfCourse] = [];
  private stable var golfCourseGroup5: [T.GolfCourse] = [];
  private stable var golfCourseGroup6: [T.GolfCourse] = [];
  private stable var golfCourseGroup7: [T.GolfCourse] = [];
  private stable var golfCourseGroup8: [T.GolfCourse] = [];
  private stable var golfCourseGroup9: [T.GolfCourse] = [];
  private stable var golfCourseGroup10: [T.GolfCourse] = [];
  private stable var golfCourseGroup11: [T.GolfCourse] = [];
  private stable var golfCourseGroup12: [T.GolfCourse] = [];
  private stable var golfCourseGroup13: [T.GolfCourse] = [];
  private stable var golfCourseGroup14: [T.GolfCourse] = [];
  private stable var golfCourseGroup15: [T.GolfCourse] = [];
  private stable var golfCourseGroup16: [T.GolfCourse] = [];
  private stable var golfCourseGroup17: [T.GolfCourse] = [];
  private stable var golfCourseGroup18: [T.GolfCourse] = [];
  private stable var golfCourseGroup19: [T.GolfCourse] = [];
  private stable var golfCourseGroup20: [T.GolfCourse] = [];
  private stable var golfCourseGroup21: [T.GolfCourse] = [];
  private stable var golfCourseGroup22: [T.GolfCourse] = [];
  private stable var golfCourseGroup23: [T.GolfCourse] = [];
  private stable var golfCourseGroup24: [T.GolfCourse] = [];
  private stable var golfCourseGroup25: [T.GolfCourse] = [];
  private stable var golfCourseGroup26: [T.GolfCourse] = [];
  private stable var golfCourseGroup27: [T.GolfCourse] = [];
  private stable var golfCourseGroup28: [T.GolfCourse] = [];
  private stable var golfCourseGroup29: [T.GolfCourse] = [];
  private stable var golfCourseGroup30: [T.GolfCourse] = [];
  private stable var golfCourseGroup31: [T.GolfCourse] = [];
  private stable var golfCourseGroup32: [T.GolfCourse] = [];
  private stable var golfCourseGroup33: [T.GolfCourse] = [];
  private stable var golfCourseGroup34: [T.GolfCourse] = [];
  private stable var golfCourseGroup35: [T.GolfCourse] = [];
  private stable var golfCourseGroup36: [T.GolfCourse] = [];
  private stable var golfCourseGroup37: [T.GolfCourse] = [];
  private stable var golfCourseGroup38: [T.GolfCourse] = [];
  private stable var golfCourseGroup39: [T.GolfCourse] = [];
  private stable var golfCourseGroup40: [T.GolfCourse] = [];
  private stable var golfCourseGroup41: [T.GolfCourse] = [];
  private stable var golfCourseGroup42: [T.GolfCourse] = [];
  private stable var golfCourseGroup43: [T.GolfCourse] = [];
  private stable var golfCourseGroup44: [T.GolfCourse] = [];
  private stable var golfCourseGroup45: [T.GolfCourse] = [];
  private stable var golfCourseGroup46: [T.GolfCourse] = [];
  private stable var golfCourseGroup47: [T.GolfCourse] = [];
  private stable var golfCourseGroup48: [T.GolfCourse] = [];
  private stable var golfCourseGroup49: [T.GolfCourse] = [];
  private stable var golfCourseGroup50: [T.GolfCourse] = [];
  private stable var golfCourseGroup51: [T.GolfCourse] = [];
  private stable var golfCourseGroup52: [T.GolfCourse] = [];
  private stable var golfCourseGroup53: [T.GolfCourse] = [];
  private stable var golfCourseGroup54: [T.GolfCourse] = [];
  private stable var golfCourseGroup55: [T.GolfCourse] = [];
  private stable var golfCourseGroup56: [T.GolfCourse] = [];
  private stable var golfCourseGroup57: [T.GolfCourse] = [];
  private stable var golfCourseGroup58: [T.GolfCourse] = [];
  private stable var golfCourseGroup59: [T.GolfCourse] = [];
  private stable var golfCourseGroup60: [T.GolfCourse] = [];
  private stable var golfCourseGroup61: [T.GolfCourse] = [];
  private stable var golfCourseGroup62: [T.GolfCourse] = [];
  private stable var golfCourseGroup63: [T.GolfCourse] = [];
  private stable var golfCourseGroup64: [T.GolfCourse] = [];
  private stable var golfCourseGroup65: [T.GolfCourse] = [];
  private stable var golfCourseGroup66: [T.GolfCourse] = [];
  private stable var golfCourseGroup67: [T.GolfCourse] = [];
  private stable var golfCourseGroup68: [T.GolfCourse] = [];
  private stable var golfCourseGroup69: [T.GolfCourse] = [];
  private stable var golfCourseGroup70: [T.GolfCourse] = [];
  private stable var golfCourseGroup71: [T.GolfCourse] = [];
  private stable var golfCourseGroup72: [T.GolfCourse] = [];
  private stable var golfCourseGroup73: [T.GolfCourse] = [];
  private stable var golfCourseGroup74: [T.GolfCourse] = [];
  private stable var golfCourseGroup75: [T.GolfCourse] = [];
  private stable var golfCourseGroup76: [T.GolfCourse] = [];
  private stable var golfCourseGroup77: [T.GolfCourse] = [];
  private stable var golfCourseGroup78: [T.GolfCourse] = [];
  private stable var golfCourseGroup79: [T.GolfCourse] = [];
  private stable var golfCourseGroup80: [T.GolfCourse] = [];
  private stable var golfCourseGroup81: [T.GolfCourse] = [];
  private stable var golfCourseGroup82: [T.GolfCourse] = [];
  private stable var golfCourseGroup83: [T.GolfCourse] = [];
  private stable var golfCourseGroup84: [T.GolfCourse] = [];
  private stable var golfCourseGroup85: [T.GolfCourse] = [];
  private stable var golfCourseGroup86: [T.GolfCourse] = [];
  private stable var golfCourseGroup87: [T.GolfCourse] = [];
  private stable var golfCourseGroup88: [T.GolfCourse] = [];
  private stable var golfCourseGroup89: [T.GolfCourse] = [];
  private stable var golfCourseGroup90: [T.GolfCourse] = [];
  private stable var golfCourseGroup91: [T.GolfCourse] = [];
  private stable var golfCourseGroup92: [T.GolfCourse] = [];
  private stable var golfCourseGroup93: [T.GolfCourse] = [];
  private stable var golfCourseGroup94: [T.GolfCourse] = [];
  private stable var golfCourseGroup95: [T.GolfCourse] = [];
  private stable var golfCourseGroup96: [T.GolfCourse] = [];
  private stable var golfCourseGroup97: [T.GolfCourse] = [];
  private stable var golfCourseGroup98: [T.GolfCourse] = [];
  private stable var golfCourseGroup99: [T.GolfCourse] = [];
  private stable var golfCourseGroup100: [T.GolfCourse] = [];

  private stable var activeGroupIndex: Nat8 = 0;
  private stable var totalGolfCourses = 0;
  private stable var MAX_GOLF_COURSES_PER_GROUP: Nat = 50;
  private stable var MAX_GOLF_COURSES_PER_CANISTER: Nat = 5000;
  private stable var canisterFull = false;

  private stable var nextCourseId: T.GolfCourseId = 1;

  //Public endpoints:

  public shared ({caller}) func getGolfCourse(dto: DTOs.GetGolfCourseDTO) : async Result.Result<DTOs.GolfCourseDTO, T.Error>{
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
            return #ok({
              courseId = foundGolfCourse.id;
              name = foundGolfCourse.name;
              tees = foundGolfCourse.teeGroups;
              activeVersion = foundGolfCourse.activeVersion;
            });
          };
          case (null){
            return #err(#NotFound);
          }
        }
      };
    };
  };

  public shared ({caller}) func createGolfCourse(dto: DTOs.CreateGolfCourseDTO) : async Result.Result<(), T.Error>{
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
      canisterFull := true;
      return #err(#CanisterFull);
    };

    let newCourse: T.GolfCourse = {
      dateAdded = Time.now();
      id = nextCourseId;
      name = dto.name;
      status = #Active;
      teeGroups = [dto.initialTeeGroup];
      history = [];
      activeVersion = 1;
    };
    
    return addGolfCourse(activeGroupIndex, newCourse);
  };

  public shared ({caller}) func updateGolfCourse(dto: DTOs.UpdateGolfCourseDTO) : async Result.Result<(), T.Error>{
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
    
            let golfCourseHistoryBuffer = Buffer.fromArray<T.HistoricalGolfCourse>(foundGolfCourse.history);
            golfCourseHistoryBuffer.add({
              dateAdded = foundGolfCourse.dateAdded;
              id = foundGolfCourse.id;
              version = foundGolfCourse.activeVersion;
              name = foundGolfCourse.name;
              status = foundGolfCourse.status;
              teeGroups = foundGolfCourse.teeGroups;
            });

            let newVersion = foundGolfCourse.activeVersion + 1;
            var updatedTeeGroups: [T.TeeGroup] = foundGolfCourse.teeGroups;
            switch(dto.updatedTeeGroup){
              case (?foundUpdatedTeeGroup){
                updatedTeeGroups := Array.map<T.TeeGroup, T.TeeGroup>(foundGolfCourse.teeGroups, 
                  func(teeGroup: T.TeeGroup){
                    if(teeGroup.name == foundUpdatedTeeGroup.name){
                      return foundUpdatedTeeGroup;
                    } else {
                      return teeGroup;
                    }
                  });
              };
              case (null) {};
            };

            let updatedGolfCourse: T.GolfCourse = {
              activeVersion = newVersion;
              dateAdded = foundGolfCourse.dateAdded;
              history = Buffer.toArray(golfCourseHistoryBuffer);
              id = foundGolfCourse.id;
              name = dto.name;
              status = foundGolfCourse.status;
              teeGroups = updatedTeeGroups;
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

  public shared ({caller}) func deleteGolfCourse(dto: DTOs.DeleteGolfCourseDTO) : async Result.Result<(), T.Error>{
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

  private func findGolfCourse(golfCourseGroupIndex: Nat8, courseId: T.GolfCourseId) : ?T.GolfCourse {
    switch(golfCourseGroupIndex){
      case 0{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup1, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 1{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup2, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 2{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup3, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 3{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup4, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 4{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup5, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 5{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup6, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 6{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup7, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 7{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup8, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 8{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup9, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 9{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup10, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 10{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup11, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 11{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup12, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 12{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup13, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 13{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup14, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 14{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup15, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 15{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup16, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 16{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup17, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 17{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup18, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 18{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup19, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 19{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup20, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 20{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup21, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 21{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup22, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 22{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup23, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 23{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup24, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 24{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup25, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 25{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup26, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 26{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup27, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 27{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup28, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 28{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup29, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 29{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup30, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 30{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup31, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 31{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup32, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 32{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup33, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 33{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup34, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 34{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup35, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 35{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup36, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 36{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup37, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 37{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup38, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 38{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup39, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 39{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup40, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 40{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup41, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 41{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup42, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 42{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup43, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 43{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup44, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 44{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup45, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 45{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup46, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 46{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup47, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 47{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup48, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 48{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup49, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 49{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup50, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 50{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup51, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 51{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup52, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 52{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup53, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 53{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup54, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 54{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup55, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 55{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup56, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 56{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup57, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 57{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup58, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 58{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup59, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 59{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup60, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 60{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup61, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 61{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup62, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 62{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup63, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 63{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup64, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 64{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup65, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 65{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup66, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 66{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup67, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 67{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup68, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 68{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup69, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 69{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup70, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 70{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup71, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 71{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup72, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 72{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup73, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 73{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup74, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 74{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup75, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 75{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup76, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 76{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup77, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 77{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup78, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 78{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup79, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 79{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup80, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 80{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup81, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 81{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup82, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 82{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup83, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 83{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup84, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 84{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup85, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 85{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup86, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 86{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup87, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 87{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup88, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 88{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup89, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 89{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup90, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 90{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup91, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 91{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup92, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 92{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup93, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 93{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup94, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 94{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup95, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 95{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup96, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 96{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup97, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 97{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup98, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 98{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup99, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case 99{
        let foundGolfer = Array.find<T.GolfCourse>(golfCourseGroup100, func(golfCourse: T.GolfCourse){
          golfCourse.id == courseId
        });
        return foundGolfer;
      };
      case _ {
        return null;
      }
    }
  };

  private func addGolfCourse(golfCourseGroupIndex: Nat8, newCourse: T.GolfCourse) : Result.Result<(), T.Error> {

    var golfCourseBuffer = Buffer.fromArray<T.GolfCourse>([]);
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

  private func saveGolfCourse(groupIndex: Nat8, updatedGolfCourse: T.GolfCourse) : Result.Result<(), T.Error>{
    switch(groupIndex){
      case 0{
        golfCourseGroup1 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup1, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 1{
        golfCourseGroup2 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup2, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 2{
        golfCourseGroup3 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup3, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 3{
        golfCourseGroup4 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup4, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 4{
        golfCourseGroup5 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup5, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 5{
        golfCourseGroup6 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup6, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 6{
        golfCourseGroup7 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup7, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 7{
        golfCourseGroup8 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup8, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 8{
        golfCourseGroup9 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup9, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 9{
        golfCourseGroup10 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup10, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };


      case 10{
        golfCourseGroup10 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup10, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 11{
        golfCourseGroup12 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup12, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 12{
        golfCourseGroup13 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup13, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 13{
        golfCourseGroup14 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup14, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 14{
        golfCourseGroup15 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup15, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 15{
        golfCourseGroup16 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup16, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 16{
        golfCourseGroup17 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup17, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 17{
        golfCourseGroup18 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup18, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 18{
        golfCourseGroup19 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup19, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 19{
        golfCourseGroup20 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup20, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 20{
        golfCourseGroup21 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup21, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 21{
        golfCourseGroup22 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup22, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 22{
        golfCourseGroup23 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup23, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 23{
        golfCourseGroup24 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup24, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 24{
        golfCourseGroup25 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup25, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 25{
        golfCourseGroup26 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup26, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 26{
        golfCourseGroup27 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup27, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 27{
        golfCourseGroup28 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup28, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 28{
        golfCourseGroup29 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup29, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 29{
        golfCourseGroup30 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup30, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 30{
        golfCourseGroup31 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup31, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 31{
        golfCourseGroup32 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup32, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 32{
        golfCourseGroup33 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup33, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 33{
        golfCourseGroup34 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup34, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 34{
        golfCourseGroup35 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup35, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 35{
        golfCourseGroup36 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup36, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 36{
        golfCourseGroup37 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup37, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 37{
        golfCourseGroup38 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup38, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 38{
        golfCourseGroup39 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup39, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 39{
        golfCourseGroup40 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup40, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 40{
        golfCourseGroup41 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup41, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 41{
        golfCourseGroup42 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup42, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 42{
        golfCourseGroup43 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup43, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 43{
        golfCourseGroup44 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup44, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 44{
        golfCourseGroup45 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup45, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 45{
        golfCourseGroup46 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup46, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 46{
        golfCourseGroup47 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup47, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 47{
        golfCourseGroup48 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup48, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 48{
        golfCourseGroup49 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup49, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 49{
        golfCourseGroup50 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup50, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 50{
        golfCourseGroup51 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup51, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 51{
        golfCourseGroup52 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup52, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 52{
        golfCourseGroup53 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup53, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 53{
        golfCourseGroup54 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup54, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 54{
        golfCourseGroup55 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup55, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 55{
        golfCourseGroup56 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup56, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 56{
        golfCourseGroup57 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup57, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 57{
        golfCourseGroup58 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup58, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 58{
        golfCourseGroup59 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup59, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 59{
        golfCourseGroup60 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup60, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 60{
        golfCourseGroup61 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup61, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 61{
        golfCourseGroup62 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup62, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 62{
        golfCourseGroup63 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup63, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 63{
        golfCourseGroup64 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup64, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 64{
        golfCourseGroup65 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup65, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 65{
        golfCourseGroup66 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup66, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 66{
        golfCourseGroup67 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup67, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 67{
        golfCourseGroup68 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup68, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 68{
        golfCourseGroup69 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup69, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 69{
        golfCourseGroup70 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup70, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 70{
        golfCourseGroup71 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup71, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 71{
        golfCourseGroup72 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup72, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 72{
        golfCourseGroup73 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup73, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 73{
        golfCourseGroup74 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup74, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 74{
        golfCourseGroup75 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup75, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 75{
        golfCourseGroup76 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup76, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 76{
        golfCourseGroup77 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup77, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 77{
        golfCourseGroup78 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup78, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 78{
        golfCourseGroup79 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup79, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 79{
        golfCourseGroup80 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup80, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 80{
        golfCourseGroup81 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup81, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 81{
        golfCourseGroup82 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup82, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 82{
        golfCourseGroup83 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup83, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 83{
        golfCourseGroup84 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup84, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 84{
        golfCourseGroup85 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup85, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 85{
        golfCourseGroup86 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup86, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 86{
        golfCourseGroup87 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup87, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 87{
        golfCourseGroup88 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup88, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 88{
        golfCourseGroup89 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup89, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 89{
        golfCourseGroup90 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup90, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 90{
        golfCourseGroup91 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup91, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 91{
        golfCourseGroup92 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup92, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 92{
        golfCourseGroup93 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup93, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 93{
        golfCourseGroup94 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup94, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 94{
        golfCourseGroup95 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup95, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 95{
        golfCourseGroup96 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup96, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 96{
        golfCourseGroup97 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup97, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 97{
        golfCourseGroup98 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup98, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 98{
        golfCourseGroup99 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup99, func(golfCourse: T.GolfCourse){
          if(golfCourse.id == updatedGolfCourse.id){
            return updatedGolfCourse;
          } else {
            return golfCourse;
          };
        });
      };
      case 99{
        golfCourseGroup100 := Array.map<T.GolfCourse, T.GolfCourse>(golfCourseGroup100, func(golfCourse: T.GolfCourse){
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

  private func removeGolfCourse(groupIndex: Nat8, removeCourseId: T.GolfCourseId) : Result.Result<(), T.Error>{
    switch(groupIndex){
      case 0{
        golfCourseGroup1 := Array.filter<T.GolfCourse>(golfCourseGroup1, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 1{
        golfCourseGroup2 := Array.filter<T.GolfCourse>(golfCourseGroup2, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 2{
        golfCourseGroup3 := Array.filter<T.GolfCourse>(golfCourseGroup3, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 3{
        golfCourseGroup4 := Array.filter<T.GolfCourse>(golfCourseGroup4, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 4{
        golfCourseGroup5 := Array.filter<T.GolfCourse>(golfCourseGroup5, func(golfCourse: T.GolfCourse){
         golfCourse.id != removeCourseId
        });
      };
      case 5{
        golfCourseGroup6 := Array.filter<T.GolfCourse>(golfCourseGroup6, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 6{
        golfCourseGroup7 := Array.filter<T.GolfCourse>(golfCourseGroup7, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 7{
        golfCourseGroup8 := Array.filter<T.GolfCourse>(golfCourseGroup8, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 8{
        golfCourseGroup9 := Array.filter<T.GolfCourse>(golfCourseGroup9, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 9{
        golfCourseGroup10 := Array.filter<T.GolfCourse>(golfCourseGroup10, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };

      case 10{
        golfCourseGroup10 := Array.filter<T.GolfCourse>(golfCourseGroup10, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 11{
        golfCourseGroup12 := Array.filter<T.GolfCourse>(golfCourseGroup12, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 12{
        golfCourseGroup13 := Array.filter<T.GolfCourse>(golfCourseGroup13, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 13{
        golfCourseGroup14 := Array.filter<T.GolfCourse>(golfCourseGroup14, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 14{
        golfCourseGroup15 := Array.filter<T.GolfCourse>(golfCourseGroup15, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 15{
        golfCourseGroup16 := Array.filter<T.GolfCourse>(golfCourseGroup16, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 16{
        golfCourseGroup17 := Array.filter<T.GolfCourse>(golfCourseGroup17, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 17{
        golfCourseGroup18 := Array.filter<T.GolfCourse>(golfCourseGroup18, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 18{
        golfCourseGroup19 := Array.filter<T.GolfCourse>(golfCourseGroup19, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 19{
        golfCourseGroup20 := Array.filter<T.GolfCourse>(golfCourseGroup20, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 20{
        golfCourseGroup21 := Array.filter<T.GolfCourse>(golfCourseGroup21, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 21{
        golfCourseGroup22 := Array.filter<T.GolfCourse>(golfCourseGroup22, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 22{
        golfCourseGroup23 := Array.filter<T.GolfCourse>(golfCourseGroup23, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 23{
        golfCourseGroup24 := Array.filter<T.GolfCourse>(golfCourseGroup24, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 24{
        golfCourseGroup25 := Array.filter<T.GolfCourse>(golfCourseGroup25, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 25{
        golfCourseGroup26 := Array.filter<T.GolfCourse>(golfCourseGroup26, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 26{
        golfCourseGroup27 := Array.filter<T.GolfCourse>(golfCourseGroup27, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 27{
        golfCourseGroup28 := Array.filter<T.GolfCourse>(golfCourseGroup28, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 28{
        golfCourseGroup29 := Array.filter<T.GolfCourse>(golfCourseGroup29, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 29{
        golfCourseGroup30 := Array.filter<T.GolfCourse>(golfCourseGroup30, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 30{
        golfCourseGroup31 := Array.filter<T.GolfCourse>(golfCourseGroup31, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 31{
        golfCourseGroup32 := Array.filter<T.GolfCourse>(golfCourseGroup32, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 32{
        golfCourseGroup33 := Array.filter<T.GolfCourse>(golfCourseGroup33, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 33{
        golfCourseGroup34 := Array.filter<T.GolfCourse>(golfCourseGroup34, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 34{
        golfCourseGroup35 := Array.filter<T.GolfCourse>(golfCourseGroup35, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 35{
        golfCourseGroup36 := Array.filter<T.GolfCourse>(golfCourseGroup36, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 36{
        golfCourseGroup37 := Array.filter<T.GolfCourse>(golfCourseGroup37, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 37{
        golfCourseGroup38 := Array.filter<T.GolfCourse>(golfCourseGroup38, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 38{
        golfCourseGroup39 := Array.filter<T.GolfCourse>(golfCourseGroup39, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 39{
        golfCourseGroup40 := Array.filter<T.GolfCourse>(golfCourseGroup40, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 40{
        golfCourseGroup41 := Array.filter<T.GolfCourse>(golfCourseGroup41, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 41{
        golfCourseGroup42 := Array.filter<T.GolfCourse>(golfCourseGroup42, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 42{
        golfCourseGroup43 := Array.filter<T.GolfCourse>(golfCourseGroup43, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 43{
        golfCourseGroup44 := Array.filter<T.GolfCourse>(golfCourseGroup44, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 44{
        golfCourseGroup45 := Array.filter<T.GolfCourse>(golfCourseGroup45, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 45{
        golfCourseGroup46 := Array.filter<T.GolfCourse>(golfCourseGroup46, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 46{
        golfCourseGroup47 := Array.filter<T.GolfCourse>(golfCourseGroup47, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 47{
        golfCourseGroup48 := Array.filter<T.GolfCourse>(golfCourseGroup48, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 48{
        golfCourseGroup49 := Array.filter<T.GolfCourse>(golfCourseGroup49, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 49{
        golfCourseGroup50 := Array.filter<T.GolfCourse>(golfCourseGroup50, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 50{
        golfCourseGroup51 := Array.filter<T.GolfCourse>(golfCourseGroup51, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 51{
        golfCourseGroup52 := Array.filter<T.GolfCourse>(golfCourseGroup52, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 52{
        golfCourseGroup53 := Array.filter<T.GolfCourse>(golfCourseGroup53, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 53{
        golfCourseGroup54 := Array.filter<T.GolfCourse>(golfCourseGroup54, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 54{
        golfCourseGroup55 := Array.filter<T.GolfCourse>(golfCourseGroup55, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 55{
        golfCourseGroup56 := Array.filter<T.GolfCourse>(golfCourseGroup56, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 56{
        golfCourseGroup57 := Array.filter<T.GolfCourse>(golfCourseGroup57, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 57{
        golfCourseGroup58 := Array.filter<T.GolfCourse>(golfCourseGroup58, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 58{
        golfCourseGroup59 := Array.filter<T.GolfCourse>(golfCourseGroup59, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 59{
        golfCourseGroup60 := Array.filter<T.GolfCourse>(golfCourseGroup60, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 60{
        golfCourseGroup61 := Array.filter<T.GolfCourse>(golfCourseGroup61, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 61{
        golfCourseGroup62 := Array.filter<T.GolfCourse>(golfCourseGroup62, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 62{
        golfCourseGroup63 := Array.filter<T.GolfCourse>(golfCourseGroup63, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 63{
        golfCourseGroup64 := Array.filter<T.GolfCourse>(golfCourseGroup64, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 64{
        golfCourseGroup65 := Array.filter<T.GolfCourse>(golfCourseGroup65, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 65{
        golfCourseGroup66 := Array.filter<T.GolfCourse>(golfCourseGroup66, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 66{
        golfCourseGroup67 := Array.filter<T.GolfCourse>(golfCourseGroup67, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 67{
        golfCourseGroup68 := Array.filter<T.GolfCourse>(golfCourseGroup68, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 68{
        golfCourseGroup69 := Array.filter<T.GolfCourse>(golfCourseGroup69, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 69{
        golfCourseGroup70 := Array.filter<T.GolfCourse>(golfCourseGroup70, func(golfCourse: T.GolfCourse){
         golfCourse.id != removeCourseId
        });
      };
      case 70{
        golfCourseGroup71 := Array.filter<T.GolfCourse>(golfCourseGroup71, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 71{
        golfCourseGroup72 := Array.filter<T.GolfCourse>(golfCourseGroup72, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 72{
        golfCourseGroup73 := Array.filter<T.GolfCourse>(golfCourseGroup73, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 73{
        golfCourseGroup74 := Array.filter<T.GolfCourse>(golfCourseGroup74, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 74{
        golfCourseGroup75 := Array.filter<T.GolfCourse>(golfCourseGroup75, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 75{
        golfCourseGroup76 := Array.filter<T.GolfCourse>(golfCourseGroup76, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 76{
        golfCourseGroup77 := Array.filter<T.GolfCourse>(golfCourseGroup77, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 77{
        golfCourseGroup78 := Array.filter<T.GolfCourse>(golfCourseGroup78, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 78{
        golfCourseGroup79 := Array.filter<T.GolfCourse>(golfCourseGroup79, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 79{
        golfCourseGroup80 := Array.filter<T.GolfCourse>(golfCourseGroup80, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 80{
        golfCourseGroup81 := Array.filter<T.GolfCourse>(golfCourseGroup81, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 81{
        golfCourseGroup82 := Array.filter<T.GolfCourse>(golfCourseGroup82, func(golfCourse: T.GolfCourse){
         golfCourse.id != removeCourseId
        });
      };
      case 82{
        golfCourseGroup83 := Array.filter<T.GolfCourse>(golfCourseGroup83, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 83{
        golfCourseGroup84 := Array.filter<T.GolfCourse>(golfCourseGroup84, func(golfCourse: T.GolfCourse){
         golfCourse.id != removeCourseId
        });
      };
      case 84{
        golfCourseGroup85 := Array.filter<T.GolfCourse>(golfCourseGroup85, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 85{
        golfCourseGroup86 := Array.filter<T.GolfCourse>(golfCourseGroup86, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 86{
        golfCourseGroup87 := Array.filter<T.GolfCourse>(golfCourseGroup87, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 87{
        golfCourseGroup88 := Array.filter<T.GolfCourse>(golfCourseGroup88, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 88{
        golfCourseGroup89 := Array.filter<T.GolfCourse>(golfCourseGroup89, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 89{
        golfCourseGroup90 := Array.filter<T.GolfCourse>(golfCourseGroup90, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 90{
        golfCourseGroup91 := Array.filter<T.GolfCourse>(golfCourseGroup91, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 91{
        golfCourseGroup92 := Array.filter<T.GolfCourse>(golfCourseGroup92, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 92{
        golfCourseGroup93 := Array.filter<T.GolfCourse>(golfCourseGroup93, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 93{
        golfCourseGroup94 := Array.filter<T.GolfCourse>(golfCourseGroup94, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 94{
        golfCourseGroup95 := Array.filter<T.GolfCourse>(golfCourseGroup95, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 95{
        golfCourseGroup96 := Array.filter<T.GolfCourse>(golfCourseGroup96, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 96{
        golfCourseGroup97 := Array.filter<T.GolfCourse>(golfCourseGroup97, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 97{
        golfCourseGroup98 := Array.filter<T.GolfCourse>(golfCourseGroup98, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 98{
        golfCourseGroup99 := Array.filter<T.GolfCourse>(golfCourseGroup99, func(golfCourse: T.GolfCourse){
          golfCourse.id != removeCourseId
        });
      };
      case 99{
        golfCourseGroup100 := Array.filter<T.GolfCourse>(golfCourseGroup100, func(golfCourse: T.GolfCourse){
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
