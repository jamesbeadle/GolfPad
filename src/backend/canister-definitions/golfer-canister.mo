import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Cycles "mo:base/ExperimentalCycles";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Nat8 "mo:base/Nat8";
import Option "mo:base/Option";
import Order "mo:base/Order";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Timer "mo:base/Timer";
import TrieMap "mo:base/TrieMap";
import Time "mo:base/Time";

import DTOs "../dtos/DTOs";
import Environment "../utilities/Environment";
import T "../data-types/types";
import Utilities "../utilities/Utilities";

actor class _GolferCanister() {

  private var golferGroupIndexes : TrieMap.TrieMap<T.PrincipalId, Nat8> = TrieMap.TrieMap<T.PrincipalId, Nat8>(Text.equal, Text.hash);

  private stable var stable_golfer_group_indexes: [(T.PrincipalId, Nat8)] = [];
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
  private stable let cyclesCheckInterval: Nat = Utilities.getHour() * 24;
  private stable var cyclesCheckTimerId: ?Timer.TimerId = null;
  private stable var activeGroupIndex: Nat8 = 0;
  private stable var totalGolfers = 0;
  private stable var MAX_GOLFERS_PER_GROUP: Nat = 1000;
  private stable var MAX_GOLFERS_PER_CANISTER: Nat = 12000;
  private stable var canisterFull = false;

  public shared ({caller}) func isCanisterFull() : async Bool{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert principalId == Environment.BACKEND_CANISTER_ID;
    return (totalGolfers >= 12000);
  };

  public shared ({caller}) func saveGolfer(principalId: T.PrincipalId, dto: DTOs.SaveGolferDTO) : async Result.Result<(), T.Error>{
    
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert principalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == principalId){
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
          friendRequestCount = 0;
          handicap = dto.handicap;
          homeCourseId = 0;
          principalId = principalId;
          profilePicture = null;
          profilePictureFileExtension = "";
          upcomingGames = [];
          username = dto.username;
          yardageSets = [];
        };

        addGolfer(newGolfer);
      };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, principalId);
        switch(golfer){
          case (?foundGolfer){
            let updatedGolfer: T.Golfer = {
              activeGames = foundGolfer.activeGames;
              completedGames = foundGolfer.completedGames;
              friendRequestCount = foundGolfer.friendRequestCount;
              handicap = dto.handicap;
              homeCourseId = foundGolfer.homeCourseId;
              principalId = foundGolfer.principalId;
              profilePicture = foundGolfer.profilePicture;
              profilePictureFileExtension = foundGolfer.profilePictureFileExtension;
              upcomingGames = foundGolfer.upcomingGames;
              username = dto.username;
              yardageSets = foundGolfer.yardageSets
            };
            updateGolfer(foundGroupIndex, updatedGolfer);
          };
          case (null){
            return #err(#NotFound);
          }
        }

      };
    };
  };  

  public shared ({caller}) func saveGolferPicture(principal: T.PrincipalId, dto: DTOs.SaveGolferPictureDTO) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert principalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == principalId){
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
          friendRequestCount = 0;
          handicap = null;
          homeCourseId = 0;
          principalId = principalId;
          profilePicture = ?dto.golferPicture;
          profilePictureFileExtension = dto.golferPictureExtension;
          upcomingGames = [];
          username = "";
          yardageSets = [];
        };

        addGolfer(newGolfer);
      };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, principalId);
        switch(golfer){
          case (?foundGolfer){
            let updatedGolfer: T.Golfer = {
              activeGames = foundGolfer.activeGames;
              completedGames = foundGolfer.completedGames;
              friendRequestCount = foundGolfer.friendRequestCount;
              handicap = foundGolfer.handicap;
              homeCourseId = foundGolfer.homeCourseId;
              principalId = foundGolfer.principalId;
              profilePicture = ?dto.golferPicture;
              profilePictureFileExtension = dto.golferPictureExtension;
              upcomingGames = foundGolfer.upcomingGames;
              username = foundGolfer.username;
              yardageSets = foundGolfer.yardageSets
            };
            updateGolfer(foundGroupIndex, updatedGolfer);
          };
          case (null){
            return #err(#NotFound);
          }
        }

      };
    };
  }; 
  public shared ({caller}) func getMyGolfer(principalId: T.PrincipalId) : async DTOs.MyGolferDTO{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert principalId == Environment.BACKEND_CANISTER_ID;




  };
  public shared ({caller}) func getGolfer(principalId: T.PrincipalId) : async DTOs.GolferDTO{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert principalId == Environment.BACKEND_CANISTER_ID;
  };
  public shared ({caller}) func saveYardageSet(principal: T.PrincipalId, dto: DTOs.SaveYardageSetDTO) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert principalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, principalId);
        switch(golfer){
          case (?foundGolfer){
            
            var updatedYardageSets: [T.YardageSet] = [];
            
            switch(dto.id){
              case (null){
                var yardageSetBuffer = Buffer.fromArray<T.YardageSet>([]);
                yardageSetBuffer := Buffer.fromArray(foundGolfer.yardageSets);
                
                var nextId: T.YardageSetId = 1;
                if(Array.size(foundGolfer.yardageSets) > 0){
                  nextId := Array.sort(
                    foundGolfer.yardageSets,
                    func(a : T.YardageSet, b : T.YardageSet) : Order.Order {
                      if (a.id < b.id) { return #greater };
                      if (a.id == b.id) { return #equal };
                      return #less;
                    },
                  )[0].id + 1;
                };
                
                let newYardageSet: T.YardageSet = {
                  clubs = dto.clubs;
                  name = dto.name;
                  id = nextId;
                };
                yardageSetBuffer.add(newYardageSet);
                updatedYardageSets := Buffer.toArray(yardageSetBuffer);
              };
              case (?foundId){
                updatedYardageSets := Array.map<T.YardageSet, T.YardageSet>(foundGolfer.yardageSets, func (yardageSet: T.YardageSet){
                  if(yardageSet.id == foundId){
                    let updatedYardageSet: T.YardageSet = {
                      clubs = dto.clubs;
                      name = dto.name;
                      id = yardageSet.id;
                    };
                    return updatedYardageSet;
                  } else {
                    return yardageSet;
                  }
                });
              };
            };

            let updatedGolfer: T.Golfer = {
              activeGames = foundGolfer.activeGames;
              completedGames = foundGolfer.completedGames;
              friendRequestCount = foundGolfer.friendRequestCount;
              handicap = foundGolfer.handicap;
              homeCourseId = foundGolfer.homeCourseId;
              principalId = foundGolfer.principalId;
              profilePicture = foundGolfer.profilePicture;
              profilePictureFileExtension = foundGolfer.profilePictureFileExtension;
              upcomingGames = foundGolfer.upcomingGames;
              username = foundGolfer.username;
              yardageSets = updatedYardageSets;
            };
            updateGolfer(foundGroupIndex, updatedGolfer);

          };
          case (null){
            return #err(#NotFound);
          }
        }

      };
    };
  };

  public shared ({caller}) func deleteYardageSet(principal: T.PrincipalId, dto: DTOs.DeleteYardageSetDTO) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert principalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, principalId);
        switch(golfer){
          case (?foundGolfer){

            let updatedYardageSets = Array.filter<T.YardageSet>(foundGolfer.yardageSets, func(yardageSet: T.YardageSet){
              yardageSet.id != dto.id
            });
            
            let updatedGolfer: T.Golfer = {
              activeGames = foundGolfer.activeGames;
              completedGames = foundGolfer.completedGames;
              friendRequestCount = foundGolfer.friendRequestCount;
              handicap = foundGolfer.handicap;
              homeCourseId = foundGolfer.homeCourseId;
              principalId = foundGolfer.principalId;
              profilePicture = foundGolfer.profilePicture;
              profilePictureFileExtension = foundGolfer.profilePictureFileExtension;
              upcomingGames = foundGolfer.upcomingGames;
              username = foundGolfer.username;
              yardageSets = updatedYardageSets;
            };
            
            updateGolfer(foundGroupIndex, updatedGolfer);

          };
          case (null){
            return #err(#NotFound);
          }
        }

      };
    };
  };
  public shared ({caller}) func getYardageSet(principalId: T.PrincipalId, dto: DTOs.GetYardageSetDTO) : async Result.Result<DTOs.YardageSetDTO, T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert principalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, principalId);
        switch(golfer){
          case (?foundGolfer){

            let yardageSet = Array.find<T.YardageSet>(foundGolfer.yardageSets, func(yardageSet: T.YardageSet){
              yardageSet.id == dto.id
            });
            switch(yardageSet){
              case (null){ return #err(#NotFound) };
              case (?foundYardageSet){ #ok(foundYardageSet); }
            };
          };
          case (null){
            return #err(#NotFound);
          }
        }
      };
    };
  };
  public shared ({caller}) func saveYardageSetClub(principal: T.PrincipalId, dto: DTOs.SaveYardageSetClubDTO) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert principalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, principalId);
        switch(golfer){
          case (?foundGolfer){
            
            var updatedYardageSets: [T.YardageSet] = [];
            
            updatedYardageSets := Array.map<T.YardageSet, T.YardageSet>(foundGolfer.yardageSets, 
              func (yardageSet: T.YardageSet){
                if(yardageSet.id == dto.yardageSetId){
                  var updatedYardageSetClubs: [T.YardageClub] = [];
                  
                  switch(dto.index){
                    
                    case (null){
                      let updatedYardageSetClubsBuffer = Buffer.fromArray<T.YardageClub>(yardageSet.clubs);

                      var nextIndex: T.ClubIndex = 1;

                      if(updatedYardageSetClubsBuffer.size() > 0){
                        nextIndex := Array.sort(
                          yardageSet.clubs,
                          func(a : T.YardageClub, b : T.YardageClub) : Order.Order {
                            if (a.index < b.index) { return #greater };
                            if (a.index == b.index) { return #equal };
                            return #less;
                          },
                        )[0].index + 1; 
                      };

                      updatedYardageSetClubsBuffer.add({index = nextIndex; name = dto.name; yards = dto.yards});
                      updatedYardageSetClubs := Buffer.toArray(updatedYardageSetClubsBuffer);
                    };
                    
                    case (?foundIndex){
                      updatedYardageSetClubs := Array.map<T.YardageClub, T.YardageClub>(yardageSet.clubs, 
                        func(yardageSetClub: T.YardageClub){
                          if(yardageSetClub.index == foundIndex){
                            return {
                              index = yardageSetClub.index; name = dto.name; yards = dto.yards
                            };
                          } else{
                            return yardageSetClub;
                          };
                        }
                      );
                    };
                  };

                  return {
                    clubs = updatedYardageSetClubs; id = dto.yardageSetId; name = dto.name
                  };

                } else {
                    return yardageSet;
                };
            });

            let updatedGolfer: T.Golfer = {
              activeGames = foundGolfer.activeGames;
              completedGames = foundGolfer.completedGames;
              friendRequestCount = foundGolfer.friendRequestCount;
              handicap = foundGolfer.handicap;
              homeCourseId = foundGolfer.homeCourseId;
              principalId = foundGolfer.principalId;
              profilePicture = foundGolfer.profilePicture;
              profilePictureFileExtension = foundGolfer.profilePictureFileExtension;
              upcomingGames = foundGolfer.upcomingGames;
              username = foundGolfer.username;
              yardageSets = updatedYardageSets;
            };
            updateGolfer(foundGroupIndex, updatedGolfer);
          
          };
          case (null){ return #err(#NotFound); };
        };
      };
    };
  };


  public shared ({caller}) func deleteYardageSetClub(principal: T.PrincipalId, dto: DTOs.DeleteYardageSetClubDTO) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert principalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, principalId);
        switch(golfer){
          case (?foundGolfer){
            
            var updatedYardageSets: [T.YardageSet] = [];
            
            updatedYardageSets := Array.map<T.YardageSet, T.YardageSet>(foundGolfer.yardageSets, 
              func (yardageSet: T.YardageSet){
                if(yardageSet.id == dto.yardageSetId){
                  var updatedYardageSetClubs: [T.YardageClub] = [];
                  
                  updatedYardageSetClubs := Array.filter<T.YardageClub>(yardageSet.clubs, 
                    func(yardageSetClub: T.YardageClub){
                      return yardageSetClub.index != dto.index;
                    }
                  );

                  return {
                    clubs = updatedYardageSetClubs; id = yardageSet.id; name = yardageSet.name
                  };

                } else {
                    return yardageSet;
                };
            });

            let updatedGolfer: T.Golfer = {
              activeGames = foundGolfer.activeGames;
              completedGames = foundGolfer.completedGames;
              friendRequestCount = foundGolfer.friendRequestCount;
              handicap = foundGolfer.handicap;
              homeCourseId = foundGolfer.homeCourseId;
              principalId = foundGolfer.principalId;
              profilePicture = foundGolfer.profilePicture;
              profilePictureFileExtension = foundGolfer.profilePictureFileExtension;
              upcomingGames = foundGolfer.upcomingGames;
              username = foundGolfer.username;
              yardageSets = updatedYardageSets;
            };
            updateGolfer(foundGroupIndex, updatedGolfer);
          
          };
          case (null){ return #err(#NotFound); };
        };
      };
    };
  };
  
  public shared ({caller}) func listFriendRequests(principalId: T.PrincipalId, dto: DTOs.ListFriendRequestsDTO) : async Result.Result<DTOs.FriendRequestsDTO, T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert principalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, principalId);

        switch(golfer){
          case (null) { #err(#NotFound); };
          case (?foundGolfer){


            let dto: DTOs.FriendRequestsDTO = {
              friendRequests = Array.map<T.FriendRequest, DTOs.FriendRequestDTO>(foundGolfer.friendRequests, 
                func(friendRequest: T.FriendRequest){
                  return {
                    principalId = friendRequest.requestedBy;
                    requestTime = friendRequest.requestedOn;
                  }
                }
              );
            };
            return #ok(dto);
          }
        };
      };
    };
  };

  public shared ({caller}) func acceptFriendRequest(principalId: T.PrincipalId, dto: DTOs.AcceptFriendRequestDTO) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert principalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, principalId);

        switch(golfer){
          case (null) { #err(#NotFound); };
          case (?foundGolfer){

            var updatedFriendsBuffer = Buffer.fromArray<T.PrincipalId>(foundGolfer.friends);
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
              yardageSets = foundGolfer.yardageSets;  
              friendRequests = Array.filter<T.FriendRequest>(foundGolfer.friendRequests, func(request: T.FriendRequest) {
                request.requestedBy != dto.requestedBy
              });
              friends = Buffer.toArray(updatedFriendsBuffer);
            };

            updateGolfer(foundGroupIndex, updatedGolfer);
          }
        };
      };
    };
  };
  public shared ({caller}) func rejectFriendRequest(principalId: T.PrincipalId, dto: DTOs.RejectFriendRequestDTO) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert principalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, principalId);

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
              yardageSets = foundGolfer.yardageSets;  
              friendRequests = Array.filter<T.FriendRequest>(foundGolfer.friendRequests, func(request: T.FriendRequest) {
                request.requestedBy != dto.requestedBy
              });
              friends = foundGolfer.friends;
            };

            updateGolfer(foundGroupIndex, updatedGolfer);
          }
        };
      };
    };
  };

  public shared ({caller}) func sendFriendRequest(principalId: T.PrincipalId, dto: DTOs.SendFriendRequestDTO) : async Result.Result<(), T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert principalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == principalId){
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
            friendRequestsBuffer.add({ requestedBy = principalId; requestedOn = Time.now() });
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
              yardageSets = foundGolfer.yardageSets;  
              friendRequests = Buffer.toArray(friendRequestsBuffer);
              friends = foundGolfer.friends;
            };

            updateGolfer(foundGroupIndex, updatedGolfer);
          }
        };

      };
    };
  };
  public shared ({caller}) func getGolferGameHistory(principalId: T.PrincipalId, dto: DTOs.GetGolferGameHistoryDTO) : async Result.Result<DTOs.GolferGameHistoryDTO, T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert principalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, principalId);

        switch(golfer){
          case (null) { #err(#NotFound); };
          case (?foundGolfer){
            
          }
        };

      };
    };
  };
  public shared ({caller}) func getMyGames(principalId: T.PrincipalId, dto: DTOs.GetMyGamesDTO) : async Result.Result<DTOs.MyGamesDTO, T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert principalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, principalId);

        switch(golfer){
          case (null) { #err(#NotFound); };
          case (?foundGolfer){
            
          }
        };

      };
    };
  };
  public shared ({caller}) func getBuzz(principalId: T.PrincipalId, dto: DTOs.GetGolferBuzzDTO) : async Result.Result<DTOs.GolferBuzzDTO, T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert principalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, principalId);

        switch(golfer){
          case (null) { #err(#NotFound); };
          case (?foundGolfer){
            
          }
        };

      };
    };
  };
  public shared ({caller}) func getUpcomingGames(principalId: T.PrincipalId, dto: DTOs.GetUpcomingGamesDTO) : async Result.Result<DTOs.UpcomingGamesDTO, T.Error>{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert principalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, principalId);

        switch(golfer){
          case (null) { #err(#NotFound); };
          case (?foundGolfer){
            
          }
        };

      };
    };
  };
  public shared ({caller}) func hasFriends(golferPrincipalId: T.PrincipalId, inviteIds: [T.PrincipalId]) : async Bool{
    assert not Principal.isAnonymous(caller);
    let principalId = Principal.toText(caller);
    assert principalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex: ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if(golferGroupIndex.0 == principalId){
        groupIndex := ?golferGroupIndex.1;
      }
    };
    switch(groupIndex){
      case (null){ return #err(#NotFound); };
      case (?foundGroupIndex){
        let golfer = findGolfer(foundGroupIndex, principalId);

        switch(golfer){
          case (null) { #err(#NotFound); };
          case (?foundGolfer){
            
          }
        };

      };
    };
  };

  private func findGolfer(golferGroupIndex: Nat8, golferPrincipalId: T.PrincipalId) : ?T.Golfer {
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
    return #ok();
  };

  private func updateGolfer(golferGroupIndex: Nat8, updatedGolfer: T.Golfer) : Result.Result<(), T.Error> {
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

  ///TODO: Checks - move add yardage club checks and all checks in here for single call
      
  //todo when accepting friend request or adding one update friendRequestCount

  //TODO: Checks on accepting friend requests
  //Rejct too

};
