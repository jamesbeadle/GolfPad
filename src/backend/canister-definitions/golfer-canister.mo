import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Iter "mo:base/Iter";
import Nat8 "mo:base/Nat8";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Time "mo:base/Time";
import List "mo:base/List";

import Environment "../utilities/Environment";
import T "../data-types/types";
import Debug "mo:base/Debug";
import GolferCommands "../commands/golfer_commands";
import GolferQueries "../queries/golfer_queries";
actor class _GolferCanister() {

  private stable var stable_golfer_group_indexes: [(T.GolferId, Nat8)] = [];
  private stable var golferGroup1: [T.Golfer] = [];
  private stable var golferGroup2: [T.Golfer] = [];
  private stable var golferGroup3: [T.Golfer] = [];
  private stable var golferGroup4: [T.Golfer] = [];
  private stable var golferGroup5: [T.Golfer] = [];
  private stable var golferGroup6: [T.Golfer] = [];
  private stable var golferGroup7: [T.Golfer] = [];
  private stable var golferGroup8: [T.Golfer] = [];
  private stable var golferGroup9: [T.Golfer] = [];
  private stable var golferGroup10: [T.Golfer] = [];
  private stable var golferGroup11: [T.Golfer] = [];
  private stable var golferGroup12: [T.Golfer] = [];
  
  private stable var activeGroupIndex: Nat8 = 0;
  private stable var totalGolfers = 0;
  private stable var MAX_GOLFERS_PER_GROUP: Nat = 1000;
  private stable var MAX_GOLFERS_PER_CANISTER: Nat = 12000;
  private stable var canisterFull = false;
 
  //Public endpoints



  public shared ({caller}) func getCaller() : async Text{
    return Principal.toText(caller);
  };

  public shared ({caller}) func getTotalGolfers() : async Nat{
    return totalGolfers;
  };

  public shared ({caller}) func getGolfer(dto: GolferQueries.GetGolfer) : async Result.Result<GolferQueries.Golfer, T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == dto.principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, dto.principalId);
        switch(golfer){
          case (?foundGolfer){
            let dto: GolferQueries.Golfer = {
              principalId = foundGolfer.principalId;
              username = foundGolfer.username;
              golferPicture = foundGolfer.profilePicture;
              golferPictureExtension = foundGolfer.profilePictureFileExtension;
              handicap = foundGolfer.handicap;
              activeGames = foundGolfer.activeGames;
              completedGames = foundGolfer.completedGames;
              upcomingGames = foundGolfer.upcomingGames;
              gameInvites = foundGolfer.gameInvites;
            };
            return #ok(dto);
          };
          case (null){
            return #err(#NotFound);
          }
        }
      };
    };
  };

  public shared ({caller}) func createUser(golferPrincipalId: T.GolferId, dto: GolferCommands.CreateUser) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;
    
    if(totalGolfers >= MAX_GOLFERS_PER_CANISTER){
      return #err(#CanisterFull);
    };
    
    if(getGolferCountInGroup(activeGroupIndex) >= MAX_GOLFERS_PER_GROUP){
      activeGroupIndex += 1;
    };
    Debug.print("Active group index incremented");
    if(activeGroupIndex > 11){
      canisterFull := true;
      return #err(#CanisterFull);
    };
    Debug.print("Canister is not full");

    let newGolfer: T.Golfer = {
      activeGames = [];
      completedGames = [];
      handicap = dto.handicap;
      homeCourseId = null;
      principalId = golferPrincipalId;
      profilePicture = null;
      profilePictureFileExtension = "";
      upcomingGames = [];
      username = dto.username;
      shots = [];
      friendRequests = [];
      friends = [];
      gameSummaries = [];
      buzzFeed = [];
      scheduledGames = [];
      gameInvites = [];
      favouriteGolfCourseIds = [];
      firstName = "";
      lastName = "";
      termsAgreed = false;
    };
    Debug.print("Adding golfer to group");
    addGolfer(newGolfer);
  };  

  public shared ({caller}) func updateUsername(dto: GolferCommands.UpdateUsername) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == dto.principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound) };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, dto.principalId);
        switch(golfer){
          case (?foundGolfer){
            let updatedGolfer: T.Golfer = {
              activeGames = foundGolfer.activeGames;
              completedGames = foundGolfer.completedGames;
              handicap = foundGolfer.handicap;
              homeCourseId = foundGolfer.homeCourseId;
              principalId = foundGolfer.principalId;
              profilePicture = foundGolfer.profilePicture;
              profilePictureFileExtension = foundGolfer.profilePictureFileExtension;
              upcomingGames = foundGolfer.upcomingGames;
              username = dto.username;
              shots = foundGolfer.shots;
              friendRequests = foundGolfer.friendRequests;
              friends = foundGolfer.friends;
              gameSummaries = foundGolfer.gameSummaries;
              buzzFeed = foundGolfer.buzzFeed;
              scheduledGames = foundGolfer.scheduledGames;
              gameInvites = foundGolfer.gameInvites;
              favouriteGolfCourseIds = foundGolfer.favouriteGolfCourseIds;
              firstName = foundGolfer.firstName;
              lastName = foundGolfer.lastName;
              termsAgreed = foundGolfer.termsAgreed;
            };
            saveGolfer(foundGroupIndex, updatedGolfer);
          };
          case (null){
            return #err(#NotFound);
          }
        }
      };
    };
  };

  public shared ({caller}) func updateFirstName(dto: GolferCommands.UpdateFirstName) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == dto.principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound) };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, dto.principalId);
        switch(golfer){
          case (?foundGolfer){
            let updatedGolfer: T.Golfer = {
              activeGames = foundGolfer.activeGames;
              completedGames = foundGolfer.completedGames;
              handicap = foundGolfer.handicap;
              homeCourseId = foundGolfer.homeCourseId;
              principalId = foundGolfer.principalId;
              profilePicture = foundGolfer.profilePicture;
              profilePictureFileExtension = foundGolfer.profilePictureFileExtension;
              upcomingGames = foundGolfer.upcomingGames;
              username = foundGolfer.username;
              shots = foundGolfer.shots;
              friendRequests = foundGolfer.friendRequests;
              friends = foundGolfer.friends;
              gameSummaries = foundGolfer.gameSummaries;
              buzzFeed = foundGolfer.buzzFeed;
              scheduledGames = foundGolfer.scheduledGames;
              gameInvites = foundGolfer.gameInvites;
              favouriteGolfCourseIds = foundGolfer.favouriteGolfCourseIds;
              firstName = dto.firstName;
              lastName = foundGolfer.lastName;
              termsAgreed = foundGolfer.termsAgreed;
            };
            saveGolfer(foundGroupIndex, updatedGolfer);
          };
          case (null){
            return #err(#NotFound);
          }
        }
      };
    };
  };

  public shared ({caller}) func updateLastName(dto: GolferCommands.UpdateLastName) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == dto.principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound) };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, dto.principalId);
        switch(golfer){
          case (?foundGolfer){
            let updatedGolfer: T.Golfer = {
              activeGames = foundGolfer.activeGames;
              completedGames = foundGolfer.completedGames;
              handicap = foundGolfer.handicap;
              homeCourseId = foundGolfer.homeCourseId;
              principalId = foundGolfer.principalId;
              profilePicture = foundGolfer.profilePicture;
              profilePictureFileExtension = foundGolfer.profilePictureFileExtension;
              upcomingGames = foundGolfer.upcomingGames;
              username = foundGolfer.username;
              shots = foundGolfer.shots;
              friendRequests = foundGolfer.friendRequests;
              friends = foundGolfer.friends;
              gameSummaries = foundGolfer.gameSummaries;
              buzzFeed = foundGolfer.buzzFeed;
              scheduledGames = foundGolfer.scheduledGames;
              gameInvites = foundGolfer.gameInvites;
              favouriteGolfCourseIds = foundGolfer.favouriteGolfCourseIds;
              firstName = foundGolfer.firstName;
              lastName = dto.lastName;
              termsAgreed = foundGolfer.termsAgreed;
            };
            saveGolfer(foundGroupIndex, updatedGolfer);
          };
          case (null){
            return #err(#NotFound);
          }
        }
      };
    };
  };

  public shared ({caller}) func updateProfilePicture(dto: GolferCommands.UpdateProfilePicture) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == dto.principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound) };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, dto.principalId);
        switch(golfer){
          case (?foundGolfer){
            let updatedGolfer: T.Golfer = {
              activeGames = foundGolfer.activeGames;
              completedGames = foundGolfer.completedGames;
              handicap = foundGolfer.handicap;
              homeCourseId = foundGolfer.homeCourseId;
              principalId = foundGolfer.principalId;
              profilePicture = dto.profilePicture;
              profilePictureFileExtension = dto.profilePictureExtension;
              upcomingGames = foundGolfer.upcomingGames;
              username = foundGolfer.username;
              shots = foundGolfer.shots;
              friendRequests = foundGolfer.friendRequests;
              friends = foundGolfer.friends;
              gameSummaries = foundGolfer.gameSummaries;
              buzzFeed = foundGolfer.buzzFeed;
              scheduledGames = foundGolfer.scheduledGames;
              gameInvites = foundGolfer.gameInvites;
              favouriteGolfCourseIds = foundGolfer.favouriteGolfCourseIds;
              firstName = foundGolfer.firstName;
              lastName = foundGolfer.lastName;
              termsAgreed = foundGolfer.termsAgreed;
            };
            saveGolfer(foundGroupIndex, updatedGolfer);
          };
          case (null){
            return #err(#NotFound);
          }
        }
      };
    };
  };

  public shared ({caller}) func updateHomeCourse(dto: GolferCommands.UpdateHomeCourse) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == dto.principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound) };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, dto.principalId);
        switch(golfer){
          case (?foundGolfer){
            let updatedGolfer: T.Golfer = {
              activeGames = foundGolfer.activeGames;
              completedGames = foundGolfer.completedGames;
              handicap = foundGolfer.handicap;
              homeCourseId = dto.homeCourseId;
              principalId = foundGolfer.principalId;
              profilePicture = foundGolfer.profilePicture;
              profilePictureFileExtension = foundGolfer.profilePictureFileExtension;
              upcomingGames = foundGolfer.upcomingGames;
              username = foundGolfer.username;
              shots = foundGolfer.shots;
              friendRequests = foundGolfer.friendRequests;
              friends = foundGolfer.friends;
              gameSummaries = foundGolfer.gameSummaries;
              buzzFeed = foundGolfer.buzzFeed;
              scheduledGames = foundGolfer.scheduledGames;
              gameInvites = foundGolfer.gameInvites;
              favouriteGolfCourseIds = foundGolfer.favouriteGolfCourseIds;
              firstName = foundGolfer.firstName;
              lastName = foundGolfer.lastName;
              termsAgreed = foundGolfer.termsAgreed;
            };
            saveGolfer(foundGroupIndex, updatedGolfer);
          };
          case (null){
            return #err(#NotFound);
          }
        }
      };
    };
  };

  public shared ({caller}) func deleteGolfer(golferPrincipalId: T.GolferId, dto: GolferCommands.DeleteGolfer) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == dto.principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound) };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, dto.principalId);
        switch(golfer){
          case (?_){
            removeGolfer(foundGroupIndex, dto.principalId);
          };
          case (null){
            return #err(#NotFound);
          }
        }
      };
    };
  };
  
  public shared ({caller}) func isCanisterFull() : async Bool{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;
    return (totalGolfers >= MAX_GOLFERS_PER_CANISTER);
  };

  public shared ({caller}) func getProfile(dto: GolferQueries.GetProfile) : async Result.Result<GolferQueries.Profile, T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == dto.principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, dto.principalId);
        switch(golfer){
          case (?foundGolfer){
            let dto: GolferQueries.Profile = {
              principalId = foundGolfer.principalId;
              username = foundGolfer.username;
              golferPicture = foundGolfer.profilePicture;
              golferPictureExtension = foundGolfer.profilePictureFileExtension;
              handicap = foundGolfer.handicap;
            };
            return #ok(dto);
          };
          case (null){
            return #err(#NotFound);
          }
        }
      };
    };
  };

  public shared ({caller}) func updateGolferPicture(dto: GolferCommands.UpdateProfilePicture) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == dto.principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){

        if(totalGolfers >= MAX_GOLFERS_PER_CANISTER){
          return #err(#CanisterFull);
        };

        if(getGolferCountInGroup(activeGroupIndex) >= MAX_GOLFERS_PER_GROUP){
          activeGroupIndex += 1;
        };

        if(activeGroupIndex > 11){
          canisterFull := true;
          return #err(#CanisterFull);
        };

        let newGolfer: T.Golfer = {
          activeGames = [];
          completedGames = [];
          handicap = null;
          homeCourseId = null;
          principalId = dto.principalId;
          profilePicture = dto.profilePicture;
          profilePictureFileExtension = dto.profilePictureExtension;
          upcomingGames = [];
          username = "";
          shots = [];
          friendRequests = [];
          friends = [];
          gameSummaries = [];
          buzzFeed = [];
          scheduledGames = [];
          gameInvites = [];
          favouriteGolfCourseIds = [];
          firstName = "";
          lastName = "";
          termsAgreed = false;
        };

        addGolfer(newGolfer);
      };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, dto.principalId);
        switch(golfer){
          case (?foundGolfer){
            let updatedGolfer: T.Golfer = {
              activeGames = foundGolfer.activeGames;
              completedGames = foundGolfer.completedGames;
              handicap = foundGolfer.handicap;
              homeCourseId = foundGolfer.homeCourseId;
              principalId = foundGolfer.principalId;
              profilePicture = dto.profilePicture;
              profilePictureFileExtension = dto.profilePictureExtension;
              upcomingGames = foundGolfer.upcomingGames;
              username = foundGolfer.username;
              shots = foundGolfer.shots;
              friendRequests = foundGolfer.friendRequests;
              friends = foundGolfer.friends;
              gameSummaries = foundGolfer.gameSummaries;
              buzzFeed = foundGolfer.buzzFeed;
              scheduledGames = foundGolfer.scheduledGames;
              gameInvites = foundGolfer.gameInvites;
              favouriteGolfCourseIds = foundGolfer.favouriteGolfCourseIds;
              firstName = foundGolfer.firstName;
              lastName = foundGolfer.lastName;
              termsAgreed = foundGolfer.termsAgreed;
            };
            saveGolfer(foundGroupIndex, updatedGolfer);
          };
          case (null){
            return #err(#NotFound);
          }
        }

      };
    };
  }; 
  
  public shared ({caller}) func listFriends(dto: GolferQueries.ListFriends) : async Result.Result<GolferQueries.Friends, T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == dto.principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, dto.principalId);

        switch(golfer){
          case (null) { #err(#NotFound); };
          case (?foundGolfer){

            let droppedEntries = List.drop<T.FriendRequest>(List.fromArray(foundGolfer.friendRequests), dto.offset);
            let paginatedEntries = List.take<T.FriendRequest>(droppedEntries, dto.limit);

            let friendRequests: GolferQueries.FriendRequests = {
              friendRequests = Array.map<T.FriendRequest, GolferQueries.FriendRequest>(List.toArray(paginatedEntries), 
                func(friendRequest: T.FriendRequest){
                  return {
                    principalId = friendRequest.requestedBy;
                    requestTime = friendRequest.requestedOn;
                  }
                }
              );
            };
            return #ok(friendRequests);
          }
        };
      };
    };
  };
  
  public shared ({caller}) func listFriendRequests(dto: GolferQueries.ListFriendRequests) : async Result.Result<GolferQueries.FriendRequests, T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == dto.principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, dto.principalId);

        switch(golfer){
          case (null) { #err(#NotFound); };
          case (?foundGolfer){

            let droppedEntries = List.drop<T.FriendRequest>(List.fromArray(foundGolfer.friendRequests), dto.offset);
            let paginatedEntries = List.take<T.FriendRequest>(droppedEntries, dto.limit);

            let friendRequests: GolferQueries.FriendRequests = {
              friendRequests = Array.map<T.FriendRequest, GolferQueries.FriendRequest>(List.toArray(paginatedEntries), 
                func(friendRequest: T.FriendRequest){
                  return {
                    principalId = friendRequest.requestedBy;
                    requestTime = friendRequest.requestedOn;
                  }
                }
              );
            };
            return #ok(friendRequests);
          }
        };
      };
    };
  };

  public shared ({caller}) func acceptFriendRequest(dto: GolferCommands.AcceptFriendRequest) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == dto.principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, dto.principalId);

        switch(golfer){
          case (null) { #err(#NotFound); };
          case (?foundGolfer){

            var updatedFriendsBuffer = Buffer.fromArray<T.GolferId>(foundGolfer.friends);
            updatedFriendsBuffer.add(dto.requestedBy);
            
            let updatedGolfer: T.Golfer = {
              principalId = foundGolfer.principalId;
              username = foundGolfer.username;
              profilePicture = foundGolfer.profilePicture;
              profilePictureFileExtension = foundGolfer.profilePictureFileExtension;
              handicap = foundGolfer.handicap;
              homeCourseId = foundGolfer.homeCourseId;
              upcomingGames = foundGolfer.upcomingGames;
              activeGames = foundGolfer.activeGames;
              completedGames = foundGolfer.completedGames;
              shots = foundGolfer.shots;  
              friendRequests = Array.filter<T.FriendRequest>(foundGolfer.friendRequests, func(request: T.FriendRequest) {
                request.requestedBy != dto.requestedBy
              });
              friends = Buffer.toArray(updatedFriendsBuffer);
              gameSummaries = foundGolfer.gameSummaries;
              buzzFeed = foundGolfer.buzzFeed;
              scheduledGames = foundGolfer.scheduledGames;
              gameInvites = foundGolfer.gameInvites;
              favouriteGolfCourseIds = foundGolfer.favouriteGolfCourseIds;
              firstName = foundGolfer.firstName;
              lastName = foundGolfer.lastName;
              termsAgreed = foundGolfer.termsAgreed;
            };

            saveGolfer(foundGroupIndex, updatedGolfer);
          }
        };
      };
    };
  };

  public shared ({caller}) func rejectFriendRequest(golferPrincipalId: T.GolferId, dto: GolferCommands.RejectFriendRequest) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == dto.principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, dto.principalId);

        switch(golfer){
          case (null) { #err(#NotFound); };
          case (?foundGolfer){
            
            let updatedGolfer: T.Golfer = {
              principalId = foundGolfer.principalId;
              username = foundGolfer.username;
              profilePicture = foundGolfer.profilePicture;
              profilePictureFileExtension = foundGolfer.profilePictureFileExtension;
              handicap = foundGolfer.handicap;
              homeCourseId = foundGolfer.homeCourseId;
              upcomingGames = foundGolfer.upcomingGames;
              activeGames = foundGolfer.activeGames;
              completedGames = foundGolfer.completedGames;
              shots = foundGolfer.shots;  
              friendRequests = Array.filter<T.FriendRequest>(foundGolfer.friendRequests, func(request: T.FriendRequest) {
                request.requestedBy != dto.requestedBy
              });
              friends = foundGolfer.friends;
              gameSummaries = foundGolfer.gameSummaries;
              buzzFeed = foundGolfer.buzzFeed;
              scheduledGames = foundGolfer.scheduledGames;
              gameInvites = foundGolfer.gameInvites;
              favouriteGolfCourseIds = foundGolfer.favouriteGolfCourseIds;
              firstName = foundGolfer.firstName;
              lastName = foundGolfer.lastName;
              termsAgreed = foundGolfer.termsAgreed;
            };

            saveGolfer(foundGroupIndex, updatedGolfer);
          }
        };
      };
    };
  };

  public shared ({caller}) func sendFriendRequest(golferPrincipalId: T.GolferId, dto: GolferCommands.SendFriendRequest) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == dto.principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, dto.requestedFriend);


        switch(golfer){
          case (null) { #err(#NotFound); };
          case (?foundGolfer){

            let friendRequestsBuffer = Buffer.fromArray<T.FriendRequest>(foundGolfer.friendRequests);
            friendRequestsBuffer.add({ requestedBy = golferPrincipalId; requestedOn = Time.now() });
            let updatedGolfer: T.Golfer = {
              principalId = foundGolfer.principalId;
              username = foundGolfer.username;
              profilePicture = foundGolfer.profilePicture;
              profilePictureFileExtension = foundGolfer.profilePictureFileExtension;
              handicap = foundGolfer.handicap;
              homeCourseId = foundGolfer.homeCourseId;
              upcomingGames = foundGolfer.upcomingGames;
              activeGames = foundGolfer.activeGames;
              completedGames = foundGolfer.completedGames;
              shots = foundGolfer.shots;  
              friendRequests = Buffer.toArray(friendRequestsBuffer);
              friends = foundGolfer.friends;
              gameSummaries = foundGolfer.gameSummaries;
              buzzFeed = foundGolfer.buzzFeed;
              scheduledGames = foundGolfer.scheduledGames;
              gameInvites = foundGolfer.gameInvites;
              favouriteGolfCourseIds = foundGolfer.favouriteGolfCourseIds;
              firstName = foundGolfer.firstName;
              lastName = foundGolfer.lastName;
              termsAgreed = foundGolfer.termsAgreed;
            };

            saveGolfer(foundGroupIndex, updatedGolfer);
          }
        };

      };
    };
  };
  
  public shared ({caller}) func friendRequestExists(dto: GolferQueries.FriendRequestExists) : async Bool{
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == dto.principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, dto.principalId);

        switch(golfer){
          case (null) {  };
          case (?foundGolfer){
            let friendRequest = Array.find(
              foundGolfer.friendRequests,
              func(friendRequest: T.FriendRequest) : Bool {
                return friendRequest.requestedBy == dto.requestedById;
              },
            );
            return Option.isSome(friendRequest);
          }
        };
      };
    };
    return false;
  };
  
  //todo: remove game invite

  //Private functions:

  private func findGolfer(golferGroupIndex: Nat8, golferPrincipalId: T.GolferId) : ?T.Golfer {
    switch(golferGroupIndex){
      case 0{
        let foundGolfer = Array.find<T.Golfer>(golferGroup1, func(golfer: T.Golfer){
          golfer.principalId == golferPrincipalId
        });
        return foundGolfer;
      };
      case 1{
        let foundGolfer = Array.find<T.Golfer>(golferGroup2, func(golfer: T.Golfer){
          golfer.principalId == golferPrincipalId
        });
        return foundGolfer;
      };
      case 2{
        let foundGolfer = Array.find<T.Golfer>(golferGroup3, func(golfer: T.Golfer){
          golfer.principalId == golferPrincipalId
        });
        return foundGolfer;
      };
      case 3{
        let foundGolfer = Array.find<T.Golfer>(golferGroup4, func(golfer: T.Golfer){
          golfer.principalId == golferPrincipalId
        });
        return foundGolfer;
      };
      case 4{
        let foundGolfer = Array.find<T.Golfer>(golferGroup5, func(golfer: T.Golfer){
          golfer.principalId == golferPrincipalId
        });
        return foundGolfer;
      };
      case 5{
        let foundGolfer = Array.find<T.Golfer>(golferGroup6, func(golfer: T.Golfer){
          golfer.principalId == golferPrincipalId
        });
        return foundGolfer;
      };
      case 6{
        let foundGolfer = Array.find<T.Golfer>(golferGroup7, func(golfer: T.Golfer){
          golfer.principalId == golferPrincipalId
        });
        return foundGolfer;
      };
      case 7{
        let foundGolfer = Array.find<T.Golfer>(golferGroup8, func(golfer: T.Golfer){
          golfer.principalId == golferPrincipalId
        });
        return foundGolfer;
      };
      case 8{
        let foundGolfer = Array.find<T.Golfer>(golferGroup9, func(golfer: T.Golfer){
          golfer.principalId == golferPrincipalId
        });
        return foundGolfer;
      };
      case 9{
        let foundGolfer = Array.find<T.Golfer>(golferGroup10, func(golfer: T.Golfer){
          golfer.principalId == golferPrincipalId
        });
        return foundGolfer;
      };
      case 10{
        let foundGolfer = Array.find<T.Golfer>(golferGroup11, func(golfer: T.Golfer){
          golfer.principalId == golferPrincipalId
        });
        return foundGolfer;
      };
      case 11{
        let foundGolfer = Array.find<T.Golfer>(golferGroup12, func(golfer: T.Golfer){
          golfer.principalId == golferPrincipalId
        });
        return foundGolfer;
      };
      case _ {
        return null;
      }
    }
  };

  private func addGolfer(newGolfer: T.Golfer) : Result.Result<(), T.Error> {
    switch(activeGroupIndex){
      case 0{
        let group1Buffer = Buffer.fromArray<T.Golfer>(golferGroup1);
        group1Buffer.add(newGolfer);
        golferGroup1 := Buffer.toArray(group1Buffer);
        Debug.print("Golfer added to group 1");
      };
      case 1{
        let group2Buffer = Buffer.fromArray<T.Golfer>(golferGroup2);
        group2Buffer.add(newGolfer);
        golferGroup2 := Buffer.toArray(group2Buffer);
      };
      case 2{
        let group3Buffer = Buffer.fromArray<T.Golfer>(golferGroup3);
        group3Buffer.add(newGolfer);
        golferGroup3 := Buffer.toArray(group3Buffer);
      };
      case 3{
        let group4Buffer = Buffer.fromArray<T.Golfer>(golferGroup4);
        group4Buffer.add(newGolfer);
        golferGroup4 := Buffer.toArray(group4Buffer);
      };
      case 4{
        let group5Buffer = Buffer.fromArray<T.Golfer>(golferGroup5);
        group5Buffer.add(newGolfer);
        golferGroup5 := Buffer.toArray(group5Buffer);
      };
      case 5{
        let group6Buffer = Buffer.fromArray<T.Golfer>(golferGroup6);
        group6Buffer.add(newGolfer);
        golferGroup6 := Buffer.toArray(group6Buffer);
      };
      case 6{
        let group7Buffer = Buffer.fromArray<T.Golfer>(golferGroup7);
        group7Buffer.add(newGolfer);
        golferGroup7 := Buffer.toArray(group7Buffer);
      };
      case 7{
        let group8Buffer = Buffer.fromArray<T.Golfer>(golferGroup8);
        group8Buffer.add(newGolfer);
        golferGroup8 := Buffer.toArray(group8Buffer);
      };
      case 8{
        let group9Buffer = Buffer.fromArray<T.Golfer>(golferGroup9);
        group9Buffer.add(newGolfer);
        golferGroup9 := Buffer.toArray(group9Buffer);
      };
      case 9{
        let group10Buffer = Buffer.fromArray<T.Golfer>(golferGroup10);
        group10Buffer.add(newGolfer);
        golferGroup10 := Buffer.toArray(group10Buffer);
      };
      case 10{
        let group11Buffer = Buffer.fromArray<T.Golfer>(golferGroup11);
        group11Buffer.add(newGolfer);
        golferGroup11 := Buffer.toArray(group11Buffer);
      };
      case 11{
        let group12Buffer = Buffer.fromArray<T.Golfer>(golferGroup12);
        group12Buffer.add(newGolfer);
        golferGroup12 := Buffer.toArray(group12Buffer);
      };
      case _ {
        return #err(#NotFound);
      }
    };
    totalGolfers += 1;
    return #ok();
  };

  private func saveGolfer(golferGroupIndex: Nat8, updatedGolfer: T.Golfer) : Result.Result<(), T.Error> {
    switch(golferGroupIndex){
      case 0{
        golferGroup1 := Array.map<T.Golfer, T.Golfer>(golferGroup1, func(golfer: T.Golfer){
          if(golfer.principalId == updatedGolfer.principalId){
            return updatedGolfer;
          } else {
            return golfer;
          };
        });
      };
      case 1{
        golferGroup2 := Array.map<T.Golfer, T.Golfer>(golferGroup2, func(golfer: T.Golfer){
          if(golfer.principalId == updatedGolfer.principalId){
            return updatedGolfer;
          } else {
            return golfer;
          };
        });
      };
      case 2{
        golferGroup3 := Array.map<T.Golfer, T.Golfer>(golferGroup3, func(golfer: T.Golfer){
          if(golfer.principalId == updatedGolfer.principalId){
            return updatedGolfer;
          } else {
            return golfer;
          };
        });
      };
      case 3{
        golferGroup4 := Array.map<T.Golfer, T.Golfer>(golferGroup4, func(golfer: T.Golfer){
          if(golfer.principalId == updatedGolfer.principalId){
            return updatedGolfer;
          } else {
            return golfer;
          };
        });
      };
      case 4{
        golferGroup5 := Array.map<T.Golfer, T.Golfer>(golferGroup5, func(golfer: T.Golfer){
          if(golfer.principalId == updatedGolfer.principalId){
            return updatedGolfer;
          } else {
            return golfer;
          };
        });
      };
      case 5{
        golferGroup6 := Array.map<T.Golfer, T.Golfer>(golferGroup6, func(golfer: T.Golfer){
          if(golfer.principalId == updatedGolfer.principalId){
            return updatedGolfer;
          } else {
            return golfer;
          };
        });
      };
      case 6{
        golferGroup7 := Array.map<T.Golfer, T.Golfer>(golferGroup7, func(golfer: T.Golfer){
          if(golfer.principalId == updatedGolfer.principalId){
            return updatedGolfer;
          } else {
            return golfer;
          };
        });
      };
      case 7{
        golferGroup8 := Array.map<T.Golfer, T.Golfer>(golferGroup8, func(golfer: T.Golfer){
          if(golfer.principalId == updatedGolfer.principalId){
            return updatedGolfer;
          } else {
            return golfer;
          };
        });
      };
      case 8{
        golferGroup9 := Array.map<T.Golfer, T.Golfer>(golferGroup9, func(golfer: T.Golfer){
          if(golfer.principalId == updatedGolfer.principalId){
            return updatedGolfer;
          } else {
            return golfer;
          };
        });
      };
      case 9{
        golferGroup10 := Array.map<T.Golfer, T.Golfer>(golferGroup10, func(golfer: T.Golfer){
          if(golfer.principalId == updatedGolfer.principalId){
            return updatedGolfer;
          } else {
            return golfer;
          };
        });
      };
      case 10{
        golferGroup11 := Array.map<T.Golfer, T.Golfer>(golferGroup11, func(golfer: T.Golfer){
          if(golfer.principalId == updatedGolfer.principalId){
            return updatedGolfer;
          } else {
            return golfer;
          };
        });
      };
      case 11{
        golferGroup12 := Array.map<T.Golfer, T.Golfer>(golferGroup12, func(golfer: T.Golfer){
          if(golfer.principalId == updatedGolfer.principalId){
            return updatedGolfer;
          } else {
            return golfer;
          };
        });
      };
      case _ {
        return #err(#NotFound);
      }
    };
    return #ok();
  };

  private func removeGolfer(golferGroupIndex: Nat8, removeGolferId: T.GolferId) : Result.Result<(), T.Error>{
     switch(golferGroupIndex){
      case 0{
        golferGroup1 := Array.filter<T.Golfer>(golferGroup1, func(golfer: T.Golfer){
          golfer.principalId != removeGolferId
        });
      };
      case 1{
        golferGroup2 := Array.filter<T.Golfer>(golferGroup2, func(golfer: T.Golfer){
          golfer.principalId != removeGolferId
        });
      };
      case 2{
        golferGroup3 := Array.filter<T.Golfer>(golferGroup3, func(golfer: T.Golfer){
          golfer.principalId != removeGolferId
        });
      };
      case 3{
        golferGroup4 := Array.filter<T.Golfer>(golferGroup4, func(golfer: T.Golfer){
          golfer.principalId != removeGolferId
        });
      };
      case 4{
        golferGroup5 := Array.filter<T.Golfer>(golferGroup5, func(golfer: T.Golfer){
          golfer.principalId != removeGolferId
        });
      };
      case 5{
        golferGroup6 := Array.filter<T.Golfer>(golferGroup6, func(golfer: T.Golfer){
          golfer.principalId != removeGolferId
        });
      };
      case 6{
        golferGroup7 := Array.filter<T.Golfer>(golferGroup7, func(golfer: T.Golfer){
          golfer.principalId != removeGolferId
        });
      };
      case 7{
        golferGroup8 := Array.filter<T.Golfer>(golferGroup8, func(golfer: T.Golfer){
          golfer.principalId != removeGolferId
        });
      };
      case 8{
        golferGroup9 := Array.filter<T.Golfer>(golferGroup9, func(golfer: T.Golfer){
          golfer.principalId != removeGolferId
        });
      };
      case 9{
        golferGroup10 := Array.filter<T.Golfer>(golferGroup10, func(golfer: T.Golfer){
          golfer.principalId != removeGolferId
        });
      };
      case 10{
        golferGroup11 := Array.filter<T.Golfer>(golferGroup11, func(golfer: T.Golfer){
          golfer.principalId != removeGolferId
        });
      };
      case 11{
        golferGroup12 := Array.filter<T.Golfer>(golferGroup12, func(golfer: T.Golfer){
          golfer.principalId != removeGolferId
        });
      };
      case _ {
        return #err(#NotFound);
      }
    };
    return #ok();
  };

  private func getGolferCountInGroup(groupIndex: Nat8) : Nat {
    switch(groupIndex){
      case 0{
        return golferGroup1.size();
      };
      case 1{
        return golferGroup2.size();
      };
      case 2{
        return golferGroup3.size();
      };
      case 3{
        return golferGroup4.size();
      };
      case 4{
        return golferGroup5.size();
      };
      case 5{
        return golferGroup6.size();
      };
      case 6{
        return golferGroup7.size();
      };
      case 7{
        return golferGroup8.size();
      };
      case 8{
        return golferGroup9.size();
      };
      case 9{
        return golferGroup10.size();
      };
      case 10{
        return golferGroup11.size();
      };
      case 11{
        return golferGroup12.size();
      };
      case _{
        return 0;
      }
    }
  };

};
