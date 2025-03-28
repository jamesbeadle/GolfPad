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
import T "../data-types/app_types";
import ID "../data-types/id_types";
import Golfer "../data-types/golfer_types";
import Debug "mo:base/Debug";
import Int "mo:base/Int";
import Timer "mo:base/Timer";
import GolferCommands "../commands/golfer_commands";
import GolferQueries "../queries/golfer_queries";
import FriendRequestCommands "../commands/friend_request_commands";
import FriendRequestQueries "../queries/friend_request_queries";
import Base "mo:waterway-mops/BaseTypes";
import FriendQueries "../queries/friend_queries";
import GolfCourseQueries "../queries/golf_course_queries";
import Utilities "../utilities/Utilities";

actor class _GolferCanister() {

  private stable var stable_golfer_group_indexes : [(Base.PrincipalId, Nat8)] = [];
  private stable var golferGroup1 : [Golfer.Golfer] = [];
  private stable var golferGroup2 : [Golfer.Golfer] = [];
  private stable var golferGroup3 : [Golfer.Golfer] = [];
  private stable var golferGroup4 : [Golfer.Golfer] = [];
  private stable var golferGroup5 : [Golfer.Golfer] = [];
  private stable var golferGroup6 : [Golfer.Golfer] = [];
  private stable var golferGroup7 : [Golfer.Golfer] = [];
  private stable var golferGroup8 : [Golfer.Golfer] = [];
  private stable var golferGroup9 : [Golfer.Golfer] = [];
  private stable var golferGroup10 : [Golfer.Golfer] = [];
  private stable var golferGroup11 : [Golfer.Golfer] = [];
  private stable var golferGroup12 : [Golfer.Golfer] = [];

  private stable var activeGroupIndex : Nat8 = 0;
  private stable var totalGolfers = 0;
  private stable var MAX_GOLFERS_PER_GROUP : Nat = 1000;
  private stable var MAX_GOLFERS_PER_CANISTER : Nat = 12000;
  private stable var canisterFull = false;

  //Public endpoints

  public shared ({ caller }) func getGolfer(dto : GolferQueries.GetGolfer) : async Result.Result<GolferQueries.Golfer, T.Error> {
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex : ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if (golferGroupIndex.0 == dto.principalId) {
        groupIndex := ?golferGroupIndex.1;
      };
    };
    switch (groupIndex) {
      case (null) { return #err(#NotFound) };
      case (?foundGroupIndex) {
        let golfer = findGolfer(foundGroupIndex, dto.principalId);
        switch (golfer) {
          case (?foundGolfer) {

            var homeCourse : Text = "";

            var homeCourseId : ?ID.GolfCourseId = foundGolfer.homeCourseId;
            var homeCourseImage : ?Blob = null;
            var homeCourseImageExtension = "";

            switch (foundGolfer.homeCourseId) {
              case (?foundHomeCourseId) {

                let main_canister = actor (Environment.BACKEND_CANISTER_ID) : actor {
                  getGolfCourseCanisterId : (dto : GolfCourseQueries.GetGolfCourseCanisterId) -> async Result.Result<GolfCourseQueries.GolfCourseCanisterId, T.Error>;
                };

                let golfCourseCanisterId = await main_canister.getGolfCourseCanisterId({
                  id = foundHomeCourseId;
                });
                switch (golfCourseCanisterId) {
                  case (#ok foundGolfCourseCanisterId) {

                    let golf_course_canister = actor (foundGolfCourseCanisterId.canisterId) : actor {
                      getGolfCourse : (dto : GolfCourseQueries.GetGolfCourse) -> async Result.Result<GolfCourseQueries.GolfCourse, T.Error>;
                    };

                    let golfCourseResult = await golf_course_canister.getGolfCourse({
                      id = foundHomeCourseId;
                    });
                    switch (golfCourseResult) {
                      case (#ok golfCourse) {

                        homeCourse := golfCourse.name;
                        homeCourseId := ?golfCourse.id;
                        homeCourseImage := golfCourse.mainImage;
                        homeCourseImageExtension := golfCourse.mainImageExtension;
                      };
                      case (#err _) {};
                    }

                  };
                  case (#err _) {};
                };
              };
              case (null) {

              };
            };

            let dto : GolferQueries.Golfer = {
              principalId = foundGolfer.principalId;
              username = foundGolfer.username;
              firstName = foundGolfer.firstName;
              lastName = foundGolfer.lastName;
              golferPicture = foundGolfer.profilePicture;
              golferPictureExtension = foundGolfer.profilePictureFileExtension;
              handicap = foundGolfer.handicap;
              activeGames = foundGolfer.activeGames;
              completedGames = foundGolfer.completedGames;
              upcomingGames = foundGolfer.upcomingGames;
              gameInvites = foundGolfer.gameInvites;
              joinedOn = foundGolfer.joinedOn;
              homeCourse;
              homeCourseId;
              homeCourseImage;
              homeCourseImageExtension;
            };
            return #ok(dto);
          };
          case (null) {
            return #err(#NotFound);
          };
        };
      };
    };
  };

  public shared ({ caller }) func createUser(golferPrincipalId : Base.PrincipalId, dto : GolferCommands.CreateUser) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    if (totalGolfers >= MAX_GOLFERS_PER_CANISTER) {
      return #err(#CanisterFull);
    };

    if (getGolferCountInGroup(activeGroupIndex) >= MAX_GOLFERS_PER_GROUP) {
      activeGroupIndex += 1;
    };
    Debug.print("Active group index incremented");
    if (activeGroupIndex > 11) {
      canisterFull := true;
      return #err(#CanisterFull);
    };
    Debug.print("Canister is not full");

    let newGolfer : Golfer.Golfer = {
      joinedOn = Time.now();
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
      totalFriends = 0;
      membershipType = #NotClaimed;
      membershipClaims = [];
      membershipExpiryTime = 0;
    };
    Debug.print("Adding golfer to group");
    addGolfer(newGolfer);

  };

  public shared ({ caller }) func updateUsername(dto : GolferCommands.UpdateUsername) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex : ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if (golferGroupIndex.0 == dto.principalId) {
        groupIndex := ?golferGroupIndex.1;
      };
    };
    switch (groupIndex) {
      case (null) { return #err(#NotFound) };
      case (?foundGroupIndex) {
        let golfer = findGolfer(foundGroupIndex, dto.principalId);
        switch (golfer) {
          case (?foundGolfer) {
            let updatedGolfer : Golfer.Golfer = {
              joinedOn = foundGolfer.joinedOn;
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
              totalFriends = foundGolfer.totalFriends;
              membershipType = foundGolfer.membershipType;
              membershipClaims = foundGolfer.membershipClaims;
              membershipExpiryTime = foundGolfer.membershipExpiryTime;
            };
            saveGolfer(foundGroupIndex, updatedGolfer);
          };
          case (null) {
            return #err(#NotFound);
          };
        };
      };
    };
  };

  public shared ({ caller }) func updateFirstName(dto : GolferCommands.UpdateFirstName) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex : ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if (golferGroupIndex.0 == dto.principalId) {
        groupIndex := ?golferGroupIndex.1;
      };
    };
    switch (groupIndex) {
      case (null) { return #err(#NotFound) };
      case (?foundGroupIndex) {
        let golfer = findGolfer(foundGroupIndex, dto.principalId);
        switch (golfer) {
          case (?foundGolfer) {
            let updatedGolfer : Golfer.Golfer = {
              joinedOn = foundGolfer.joinedOn;
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
              totalFriends = foundGolfer.totalFriends;
              membershipType = foundGolfer.membershipType;
              membershipClaims = foundGolfer.membershipClaims;
              membershipExpiryTime = foundGolfer.membershipExpiryTime;
            };
            saveGolfer(foundGroupIndex, updatedGolfer);
          };
          case (null) {
            return #err(#NotFound);
          };
        };
      };
    };
  };

  public shared ({ caller }) func updateLastName(dto : GolferCommands.UpdateLastName) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex : ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if (golferGroupIndex.0 == dto.principalId) {
        groupIndex := ?golferGroupIndex.1;
      };
    };
    switch (groupIndex) {
      case (null) { return #err(#NotFound) };
      case (?foundGroupIndex) {
        let golfer = findGolfer(foundGroupIndex, dto.principalId);
        switch (golfer) {
          case (?foundGolfer) {
            let updatedGolfer : Golfer.Golfer = {
              joinedOn = foundGolfer.joinedOn;
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
              totalFriends = foundGolfer.totalFriends;
              membershipType = foundGolfer.membershipType;
              membershipClaims = foundGolfer.membershipClaims;
              membershipExpiryTime = foundGolfer.membershipExpiryTime;
            };
            saveGolfer(foundGroupIndex, updatedGolfer);
          };
          case (null) {
            return #err(#NotFound);
          };
        };
      };
    };
  };

  public shared ({ caller }) func updateMembership(dto : GolferCommands.UpdateMembership) : async Result.Result<(T.MembershipClaim), T.Error> {
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex : ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if (golferGroupIndex.0 == dto.principalId) {
        groupIndex := ?golferGroupIndex.1;
      };
    };

    switch (groupIndex) {
      case (null) { return #err(#NotFound) };
      case (?foundGroupIndex) {
        let golfer = findGolfer(foundGroupIndex, dto.principalId);
        switch (golfer) {
          case (?foundGolfer) {
            let membershipClaimsBuffer = Buffer.fromArray<T.MembershipClaim>(foundGolfer.membershipClaims);
            let newClaim : T.MembershipClaim = {
              membershipType = dto.membershipType;
              claimedOn = Time.now();
              expiresOn = ?Utilities.getMembershipExpirationDate(dto.membershipType);
            };
            membershipClaimsBuffer.add(newClaim);
            let updatedMembershipClaims = Buffer.toArray(membershipClaimsBuffer);

            let updatedProfile : Golfer.Golfer = {
              joinedOn = foundGolfer.joinedOn;
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
              lastName = foundGolfer.lastName;
              termsAgreed = foundGolfer.termsAgreed;
              totalFriends = foundGolfer.totalFriends;
              membershipType = dto.membershipType;
              membershipClaims = updatedMembershipClaims;
              membershipExpiryTime = switch (newClaim.expiresOn) {
                case (?expiryTime) {
                  expiryTime;
                };
                case (null) {
                  0;
                };
              };
            };

            let res = saveGolfer(foundGroupIndex, updatedProfile);
            switch (res) {
              case (#err(error)) {
                return #err(error);
              };
              case (#ok) {
                return #ok(newClaim);
              };
            };
          };
          case (null) {
            return #err(#NotFound);
          };
        };
      };
    };
  };

  public shared ({ caller }) func updateProfilePicture(dto : GolferCommands.UpdateProfilePicture) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex : ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if (golferGroupIndex.0 == dto.principalId) {
        groupIndex := ?golferGroupIndex.1;
      };
    };
    switch (groupIndex) {
      case (null) { return #err(#NotFound) };
      case (?foundGroupIndex) {
        let golfer = findGolfer(foundGroupIndex, dto.principalId);
        switch (golfer) {
          case (?foundGolfer) {
            let updatedGolfer : Golfer.Golfer = {
              joinedOn = foundGolfer.joinedOn;
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
              totalFriends = foundGolfer.totalFriends;
              membershipType = foundGolfer.membershipType;
              membershipClaims = foundGolfer.membershipClaims;
              membershipExpiryTime = foundGolfer.membershipExpiryTime;
            };
            saveGolfer(foundGroupIndex, updatedGolfer);
          };
          case (null) {
            return #err(#NotFound);
          };
        };
      };
    };
  };

  public shared ({ caller }) func updateHomeCourse(dto : GolferCommands.UpdateHomeCourse) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex : ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if (golferGroupIndex.0 == dto.principalId) {
        groupIndex := ?golferGroupIndex.1;
      };
    };
    switch (groupIndex) {
      case (null) { return #err(#NotFound) };
      case (?foundGroupIndex) {
        let golfer = findGolfer(foundGroupIndex, dto.principalId);
        switch (golfer) {
          case (?foundGolfer) {
            let updatedGolfer : Golfer.Golfer = {
              joinedOn = foundGolfer.joinedOn;
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
              totalFriends = foundGolfer.totalFriends;
              membershipType = foundGolfer.membershipType;
              membershipClaims = foundGolfer.membershipClaims;
              membershipExpiryTime = foundGolfer.membershipExpiryTime;
            };
            saveGolfer(foundGroupIndex, updatedGolfer);
          };
          case (null) {
            return #err(#NotFound);
          };
        };
      };
    };
  };
  public shared ({ caller }) func createMembershipExpiredTimers() : async () {
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    for (index in Iter.range(0, 11)) {
      switch (index) {
        case 0 {
          for (golfer in Iter.fromArray(golferGroup1)) {
            let durationUntilExpiry = #nanoseconds(Int.abs(((golfer.membershipExpiryTime) - Time.now())));
            ignore Timer.setTimer<system>(durationUntilExpiry, membershipExpired);
          };
        };
        case 1 {
          for (golfer in Iter.fromArray(golferGroup2)) {
            let durationUntilExpiry = #nanoseconds(Int.abs(((golfer.membershipExpiryTime) - Time.now())));
            ignore Timer.setTimer<system>(durationUntilExpiry, membershipExpired);
          };
        };
        case 2 {
          for (golfer in Iter.fromArray(golferGroup3)) {
            let durationUntilExpiry = #nanoseconds(Int.abs(((golfer.membershipExpiryTime) - Time.now())));
            ignore Timer.setTimer<system>(durationUntilExpiry, membershipExpired);
          };
        };
        case 3 {
          for (golfer in Iter.fromArray(golferGroup4)) {
            let durationUntilExpiry = #nanoseconds(Int.abs(((golfer.membershipExpiryTime) - Time.now())));
            ignore Timer.setTimer<system>(durationUntilExpiry, membershipExpired);
          };
        };
        case 4 {
          for (golfer in Iter.fromArray(golferGroup5)) {
            let durationUntilExpiry = #nanoseconds(Int.abs(((golfer.membershipExpiryTime) - Time.now())));
            ignore Timer.setTimer<system>(durationUntilExpiry, membershipExpired);
          };
        };
        case 5 {
          for (golfer in Iter.fromArray(golferGroup6)) {
            let durationUntilExpiry = #nanoseconds(Int.abs(((golfer.membershipExpiryTime) - Time.now())));
            ignore Timer.setTimer<system>(durationUntilExpiry, membershipExpired);
          };
        };
        case 6 {
          for (golfer in Iter.fromArray(golferGroup7)) {
            let durationUntilExpiry = #nanoseconds(Int.abs(((golfer.membershipExpiryTime) - Time.now())));
            ignore Timer.setTimer<system>(durationUntilExpiry, membershipExpired);
          };
        };
        case 7 {
          for (golfer in Iter.fromArray(golferGroup8)) {
            let durationUntilExpiry = #nanoseconds(Int.abs(((golfer.membershipExpiryTime) - Time.now())));
            ignore Timer.setTimer<system>(durationUntilExpiry, membershipExpired);
          };
        };
        case 8 {
          for (golfer in Iter.fromArray(golferGroup9)) {
            let durationUntilExpiry = #nanoseconds(Int.abs(((golfer.membershipExpiryTime) - Time.now())));
            ignore Timer.setTimer<system>(durationUntilExpiry, membershipExpired);
          };
        };
        case 9 {
          for (golfer in Iter.fromArray(golferGroup10)) {
            let durationUntilExpiry = #nanoseconds(Int.abs(((golfer.membershipExpiryTime) - Time.now())));
            ignore Timer.setTimer<system>(durationUntilExpiry, membershipExpired);
          };
        };
        case 10 {
          for (golfer in Iter.fromArray(golferGroup11)) {
            let durationUntilExpiry = #nanoseconds(Int.abs(((golfer.membershipExpiryTime) - Time.now())));
            ignore Timer.setTimer<system>(durationUntilExpiry, membershipExpired);
          };
        };
        case 11 {
          for (golfer in Iter.fromArray(golferGroup12)) {
            let durationUntilExpiry = #nanoseconds(Int.abs(((golfer.membershipExpiryTime) - Time.now())));
            ignore Timer.setTimer<system>(durationUntilExpiry, membershipExpired);
          };
        };
        case _ {};
      };
    };
  };
  private func membershipExpired() : async () {

    for (index in Iter.range(0, 11)) {
      switch (index) {
        case 0 {
          for (golfer in Iter.fromArray(golferGroup1)) {
            if (golfer.membershipExpiryTime < Time.now()) {
              expireMembership(golfer.principalId);
            };
          };
        };
        case 1 {
          for (golfer in Iter.fromArray(golferGroup2)) {
            if (golfer.membershipExpiryTime < Time.now()) {
              expireMembership(golfer.principalId);
            };
          };
        };
        case 2 {
          for (golfer in Iter.fromArray(golferGroup3)) {
            if (golfer.membershipExpiryTime < Time.now()) {
              expireMembership(golfer.principalId);
            };
          };
        };
        case 3 {
          for (golfer in Iter.fromArray(golferGroup4)) {
            if (golfer.membershipExpiryTime < Time.now()) {
              expireMembership(golfer.principalId);
            };
          };
        };
        case 4 {
          for (golfer in Iter.fromArray(golferGroup5)) {
            if (golfer.membershipExpiryTime < Time.now()) {
              expireMembership(golfer.principalId);
            };
          };
        };
        case 5 {
          for (golfer in Iter.fromArray(golferGroup6)) {
            if (golfer.membershipExpiryTime < Time.now()) {
              expireMembership(golfer.principalId);
            };
          };
        };
        case 6 {
          for (golfer in Iter.fromArray(golferGroup7)) {
            if (golfer.membershipExpiryTime < Time.now()) {
              expireMembership(golfer.principalId);
            };
          };
        };
        case 7 {
          for (golfer in Iter.fromArray(golferGroup8)) {
            if (golfer.membershipExpiryTime < Time.now()) {
              expireMembership(golfer.principalId);
            };
          };
        };
        case 8 {
          for (golfer in Iter.fromArray(golferGroup9)) {
            if (golfer.membershipExpiryTime < Time.now()) {
              expireMembership(golfer.principalId);
            };
          };
        };
        case 9 {
          for (golfer in Iter.fromArray(golferGroup10)) {
            if (golfer.membershipExpiryTime < Time.now()) {
              expireMembership(golfer.principalId);
            };
          };
        };
        case 10 {
          for (golfer in Iter.fromArray(golferGroup11)) {
            if (golfer.membershipExpiryTime < Time.now()) {
              expireMembership(golfer.principalId);
            };
          };
        };
        case 11 {
          for (golfer in Iter.fromArray(golferGroup12)) {
            if (golfer.membershipExpiryTime < Time.now()) {
              expireMembership(golfer.principalId);
            };
          };
        };
        case _ {};
      };
    };
  };

  private func expireMembership(principalId : Base.PrincipalId) {
    // expire the membership

    var groupIndex : ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if (golferGroupIndex.0 == principalId) {
        groupIndex := ?golferGroupIndex.1;
      };
    };

    switch (groupIndex) {
      case (null) {};
      case (?foundGroupIndex) {
        let golfer = findGolfer(foundGroupIndex, principalId);
        switch (golfer) {
          case (?foundGolfer) {

            let updatedGolfer : Golfer.Golfer = {
              joinedOn = foundGolfer.joinedOn;
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
              lastName = foundGolfer.lastName;
              termsAgreed = foundGolfer.termsAgreed;
              totalFriends = foundGolfer.totalFriends;
              membershipType = #Expired;
              membershipClaims = foundGolfer.membershipClaims;
              membershipExpiryTime = 0;
            };

            let _ = saveGolfer(foundGroupIndex, updatedGolfer);

          };
          case (null) {};
        };
      };
    };

  };

  public shared ({ caller }) func isCanisterFull() : async Bool {
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;
    return (totalGolfers >= MAX_GOLFERS_PER_CANISTER);
  };

  public shared ({ caller }) func getProfile(dto : GolferQueries.GetProfile) : async Result.Result<GolferQueries.Profile, T.Error> {
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex : ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if (golferGroupIndex.0 == dto.principalId) {
        groupIndex := ?golferGroupIndex.1;
      };
    };
    switch (groupIndex) {
      case (null) { return #err(#NotFound) };
      case (?foundGroupIndex) {
        let golfer = findGolfer(foundGroupIndex, dto.principalId);
        switch (golfer) {
          case (?foundGolfer) {
            let dto : GolferQueries.Profile = {
              principalId = foundGolfer.principalId;
              username = foundGolfer.username;
              golferPicture = foundGolfer.profilePicture;
              golferPictureExtension = foundGolfer.profilePictureFileExtension;
              handicap = foundGolfer.handicap;
              firstName = foundGolfer.firstName;
              lastName = foundGolfer.lastName;
              homeCourseId = foundGolfer.homeCourseId;
            };
            return #ok(dto);
          };
          case (null) {
            return #err(#NotFound);
          };
        };
      };
    };
  };

  public shared ({ caller }) func updateGolferPicture(dto : GolferCommands.UpdateProfilePicture) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex : ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if (golferGroupIndex.0 == dto.principalId) {
        groupIndex := ?golferGroupIndex.1;
      };
    };
    switch (groupIndex) {
      case (null) {
        return #err(#NotFound);
      };
      case (?foundGroupIndex) {
        let golfer = findGolfer(foundGroupIndex, dto.principalId);
        switch (golfer) {
          case (?foundGolfer) {
            let updatedGolfer : Golfer.Golfer = {
              joinedOn = foundGolfer.joinedOn;
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
              totalFriends = foundGolfer.totalFriends;
              membershipType = foundGolfer.membershipType;
              membershipClaims = foundGolfer.membershipClaims;
              membershipExpiryTime = foundGolfer.membershipExpiryTime;
            };
            saveGolfer(foundGroupIndex, updatedGolfer);
          };
          case (null) {
            return #err(#NotFound);
          };
        }

      };
    };
  };

  public shared ({ caller }) func getFriends(dto : FriendQueries.GetFriends) : async Result.Result<FriendQueries.Friends, T.Error> {
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;
    return #err(#NotFound);

    //TODO
    /*
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

            let droppedEntries = List.drop<(T.Friend)>(List.fromArray(foundGolfer.friends), 0); //TODO
            let paginatedEntries = List.take<T.Friend>(droppedEntries, 10);

            let friends: FriendQueries.Friend = {
              friends = Array.map<T.Friend, FriendQueries.Friend>(List.toArray(paginatedEntries),
                func(friend: T.Friend){
                  return {
                    principalId = friendRequest.requestedBy;
                    requestTime = friendRequest.requestedOn;
                  }
                }
              );
            };
            return #ok({
              friends;
              page = 1;
              total = 0;
              pageSize = 10; //todo
            });
          }
        };
      };
    };
    */
  };

  public shared ({ caller }) func getFriendRequests(dto : FriendRequestQueries.GetFriendRequests) : async Result.Result<FriendRequestQueries.FriendRequests, T.Error> {
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex : ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if (golferGroupIndex.0 == dto.principalId) {
        groupIndex := ?golferGroupIndex.1;
      };
    };
    switch (groupIndex) {
      case (null) { return #err(#NotFound) };
      case (?foundGroupIndex) {
        let golfer = findGolfer(foundGroupIndex, dto.principalId);

        switch (golfer) {
          case (null) { #err(#NotFound) };
          case (?foundGolfer) {

            let droppedEntries = List.drop<Golfer.FriendRequest>(List.fromArray(foundGolfer.friendRequests), dto.offset);
            let paginatedEntries = List.take<Golfer.FriendRequest>(droppedEntries, dto.limit);

            let friendRequests : FriendRequestQueries.FriendRequests = {
              friendRequests = Array.map<Golfer.FriendRequest, FriendRequestQueries.FriendRequest>(
                List.toArray(paginatedEntries),
                func(friendRequest : Golfer.FriendRequest) {
                  return {
                    principalId = friendRequest.requestedBy;
                    requestTime = friendRequest.requestedOn;
                  };
                },
              );
            };
            return #ok(friendRequests);
          };
        };
      };
    };
  };

  public shared ({ caller }) func acceptFriendRequest(dto : FriendRequestCommands.AcceptFriendRequest) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex : ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if (golferGroupIndex.0 == dto.principalId) {
        groupIndex := ?golferGroupIndex.1;
      };
    };
    switch (groupIndex) {
      case (null) { return #err(#NotFound) };
      case (?foundGroupIndex) {
        let golfer = findGolfer(foundGroupIndex, dto.principalId);

        switch (golfer) {
          case (null) { #err(#NotFound) };
          case (?foundGolfer) {

            var updatedFriendsBuffer = Buffer.fromArray<Golfer.Friend>(foundGolfer.friends);
            updatedFriendsBuffer.add({
              principalId = dto.principalId;
              addedOn = Time.now();
            });

            let updatedGolfer : Golfer.Golfer = {
              joinedOn = foundGolfer.joinedOn;
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
              friendRequests = Array.filter<Golfer.FriendRequest>(
                foundGolfer.friendRequests,
                func(request : Golfer.FriendRequest) {
                  request.requestedBy != dto.requestedBy;
                },
              );
              friends = Buffer.toArray(updatedFriendsBuffer);
              gameSummaries = foundGolfer.gameSummaries;
              buzzFeed = foundGolfer.buzzFeed;
              scheduledGames = foundGolfer.scheduledGames;
              gameInvites = foundGolfer.gameInvites;
              favouriteGolfCourseIds = foundGolfer.favouriteGolfCourseIds;
              firstName = foundGolfer.firstName;
              lastName = foundGolfer.lastName;
              termsAgreed = foundGolfer.termsAgreed;
              totalFriends = foundGolfer.totalFriends;
              membershipType = foundGolfer.membershipType;
              membershipClaims = foundGolfer.membershipClaims;
              membershipExpiryTime = foundGolfer.membershipExpiryTime;
            };

            saveGolfer(foundGroupIndex, updatedGolfer);
          };
        };
      };
    };
  };

  public shared ({ caller }) func rejectFriendRequest(dto : FriendRequestCommands.RejectFriendRequest) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex : ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if (golferGroupIndex.0 == dto.principalId) {
        groupIndex := ?golferGroupIndex.1;
      };
    };
    switch (groupIndex) {
      case (null) { return #err(#NotFound) };
      case (?foundGroupIndex) {
        let golfer = findGolfer(foundGroupIndex, dto.principalId);

        switch (golfer) {
          case (null) { #err(#NotFound) };
          case (?foundGolfer) {

            let updatedGolfer : Golfer.Golfer = {
              joinedOn = foundGolfer.joinedOn;
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
              friendRequests = Array.filter<Golfer.FriendRequest>(
                foundGolfer.friendRequests,
                func(request : Golfer.FriendRequest) {
                  request.requestedBy != dto.requestedBy;
                },
              );
              friends = foundGolfer.friends;
              gameSummaries = foundGolfer.gameSummaries;
              buzzFeed = foundGolfer.buzzFeed;
              scheduledGames = foundGolfer.scheduledGames;
              gameInvites = foundGolfer.gameInvites;
              favouriteGolfCourseIds = foundGolfer.favouriteGolfCourseIds;
              firstName = foundGolfer.firstName;
              lastName = foundGolfer.lastName;
              termsAgreed = foundGolfer.termsAgreed;
              totalFriends = foundGolfer.totalFriends;
              membershipType = foundGolfer.membershipType;
              membershipClaims = foundGolfer.membershipClaims;
              membershipExpiryTime = foundGolfer.membershipExpiryTime;
            };

            saveGolfer(foundGroupIndex, updatedGolfer);
          };
        };
      };
    };
  };

  public shared ({ caller }) func sendFriendRequest(dto : FriendRequestCommands.SendFriendRequest) : async Result.Result<(), T.Error> {
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex : ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if (golferGroupIndex.0 == dto.principalId) {
        groupIndex := ?golferGroupIndex.1;
      };
    };
    switch (groupIndex) {
      case (null) { return #err(#NotFound) };
      case (?foundGroupIndex) {
        let golfer = findGolfer(foundGroupIndex, dto.requestedFriend);

        switch (golfer) {
          case (null) { #err(#NotFound) };
          case (?foundGolfer) {

            let friendRequestsBuffer = Buffer.fromArray<Golfer.FriendRequest>(foundGolfer.friendRequests);
            friendRequestsBuffer.add({
              requestedBy = dto.principalId;
              requestedOn = Time.now();
            });
            let updatedGolfer : Golfer.Golfer = {
              joinedOn = foundGolfer.joinedOn;
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
              totalFriends = foundGolfer.totalFriends;
              membershipType = foundGolfer.membershipType;
              membershipClaims = foundGolfer.membershipClaims;
              membershipExpiryTime = foundGolfer.membershipExpiryTime;
            };

            saveGolfer(foundGroupIndex, updatedGolfer);
          };
        };

      };
    };
  };

  public shared ({ caller }) func friendRequestExists(dto : FriendRequestQueries.FriendRequestExists) : async Bool {
    assert not Principal.isAnonymous(caller);
    let backendPrincipalId = Principal.toText(caller);
    assert backendPrincipalId == Environment.BACKEND_CANISTER_ID;

    var groupIndex : ?Nat8 = null;
    for (golferGroupIndex in Iter.fromArray(stable_golfer_group_indexes)) {
      if (golferGroupIndex.0 == dto.principalId) {
        groupIndex := ?golferGroupIndex.1;
      };
    };
    switch (groupIndex) {
      case (null) {};
      case (?foundGroupIndex) {
        let golfer = findGolfer(foundGroupIndex, dto.principalId);

        switch (golfer) {
          case (null) {};
          case (?foundGolfer) {
            let friendRequest = Array.find(
              foundGolfer.friendRequests,
              func(friendRequest : Golfer.FriendRequest) : Bool {
                return friendRequest.requestedBy == dto.requestedById;
              },
            );
            return Option.isSome(friendRequest);
          };
        };
      };
    };
    return false;
  };

  //Private functions:

  private func findGolfer(golferGroupIndex : Nat8, golferPrincipalId : Base.PrincipalId) : ?Golfer.Golfer {
    switch (golferGroupIndex) {
      case 0 {
        let foundGolfer = Array.find<Golfer.Golfer>(
          golferGroup1,
          func(golfer : Golfer.Golfer) {
            golfer.principalId == golferPrincipalId;
          },
        );
        return foundGolfer;
      };
      case 1 {
        let foundGolfer = Array.find<Golfer.Golfer>(
          golferGroup2,
          func(golfer : Golfer.Golfer) {
            golfer.principalId == golferPrincipalId;
          },
        );
        return foundGolfer;
      };
      case 2 {
        let foundGolfer = Array.find<Golfer.Golfer>(
          golferGroup3,
          func(golfer : Golfer.Golfer) {
            golfer.principalId == golferPrincipalId;
          },
        );
        return foundGolfer;
      };
      case 3 {
        let foundGolfer = Array.find<Golfer.Golfer>(
          golferGroup4,
          func(golfer : Golfer.Golfer) {
            golfer.principalId == golferPrincipalId;
          },
        );
        return foundGolfer;
      };
      case 4 {
        let foundGolfer = Array.find<Golfer.Golfer>(
          golferGroup5,
          func(golfer : Golfer.Golfer) {
            golfer.principalId == golferPrincipalId;
          },
        );
        return foundGolfer;
      };
      case 5 {
        let foundGolfer = Array.find<Golfer.Golfer>(
          golferGroup6,
          func(golfer : Golfer.Golfer) {
            golfer.principalId == golferPrincipalId;
          },
        );
        return foundGolfer;
      };
      case 6 {
        let foundGolfer = Array.find<Golfer.Golfer>(
          golferGroup7,
          func(golfer : Golfer.Golfer) {
            golfer.principalId == golferPrincipalId;
          },
        );
        return foundGolfer;
      };
      case 7 {
        let foundGolfer = Array.find<Golfer.Golfer>(
          golferGroup8,
          func(golfer : Golfer.Golfer) {
            golfer.principalId == golferPrincipalId;
          },
        );
        return foundGolfer;
      };
      case 8 {
        let foundGolfer = Array.find<Golfer.Golfer>(
          golferGroup9,
          func(golfer : Golfer.Golfer) {
            golfer.principalId == golferPrincipalId;
          },
        );
        return foundGolfer;
      };
      case 9 {
        let foundGolfer = Array.find<Golfer.Golfer>(
          golferGroup10,
          func(golfer : Golfer.Golfer) {
            golfer.principalId == golferPrincipalId;
          },
        );
        return foundGolfer;
      };
      case 10 {
        let foundGolfer = Array.find<Golfer.Golfer>(
          golferGroup11,
          func(golfer : Golfer.Golfer) {
            golfer.principalId == golferPrincipalId;
          },
        );
        return foundGolfer;
      };
      case 11 {
        let foundGolfer = Array.find<Golfer.Golfer>(
          golferGroup12,
          func(golfer : Golfer.Golfer) {
            golfer.principalId == golferPrincipalId;
          },
        );
        return foundGolfer;
      };
      case _ {
        return null;
      };
    };
  };

  private func addGolfer(newGolfer : Golfer.Golfer) : Result.Result<(), T.Error> {
    switch (activeGroupIndex) {
      case 0 {
        let group1Buffer = Buffer.fromArray<Golfer.Golfer>(golferGroup1);
        group1Buffer.add(newGolfer);
        golferGroup1 := Buffer.toArray(group1Buffer);
        Debug.print("Golfer added to group 1");
      };
      case 1 {
        let group2Buffer = Buffer.fromArray<Golfer.Golfer>(golferGroup2);
        group2Buffer.add(newGolfer);
        golferGroup2 := Buffer.toArray(group2Buffer);
      };
      case 2 {
        let group3Buffer = Buffer.fromArray<Golfer.Golfer>(golferGroup3);
        group3Buffer.add(newGolfer);
        golferGroup3 := Buffer.toArray(group3Buffer);
      };
      case 3 {
        let group4Buffer = Buffer.fromArray<Golfer.Golfer>(golferGroup4);
        group4Buffer.add(newGolfer);
        golferGroup4 := Buffer.toArray(group4Buffer);
      };
      case 4 {
        let group5Buffer = Buffer.fromArray<Golfer.Golfer>(golferGroup5);
        group5Buffer.add(newGolfer);
        golferGroup5 := Buffer.toArray(group5Buffer);
      };
      case 5 {
        let group6Buffer = Buffer.fromArray<Golfer.Golfer>(golferGroup6);
        group6Buffer.add(newGolfer);
        golferGroup6 := Buffer.toArray(group6Buffer);
      };
      case 6 {
        let group7Buffer = Buffer.fromArray<Golfer.Golfer>(golferGroup7);
        group7Buffer.add(newGolfer);
        golferGroup7 := Buffer.toArray(group7Buffer);
      };
      case 7 {
        let group8Buffer = Buffer.fromArray<Golfer.Golfer>(golferGroup8);
        group8Buffer.add(newGolfer);
        golferGroup8 := Buffer.toArray(group8Buffer);
      };
      case 8 {
        let group9Buffer = Buffer.fromArray<Golfer.Golfer>(golferGroup9);
        group9Buffer.add(newGolfer);
        golferGroup9 := Buffer.toArray(group9Buffer);
      };
      case 9 {
        let group10Buffer = Buffer.fromArray<Golfer.Golfer>(golferGroup10);
        group10Buffer.add(newGolfer);
        golferGroup10 := Buffer.toArray(group10Buffer);
      };
      case 10 {
        let group11Buffer = Buffer.fromArray<Golfer.Golfer>(golferGroup11);
        group11Buffer.add(newGolfer);
        golferGroup11 := Buffer.toArray(group11Buffer);
      };
      case 11 {
        let group12Buffer = Buffer.fromArray<Golfer.Golfer>(golferGroup12);
        group12Buffer.add(newGolfer);
        golferGroup12 := Buffer.toArray(group12Buffer);
      };
      case _ {
        return #err(#NotFound);
      };
    };
    totalGolfers += 1;

    let groupIndexBuffer = Buffer.fromArray<(Base.PrincipalId, Nat8)>(stable_golfer_group_indexes);
    groupIndexBuffer.add((newGolfer.principalId, activeGroupIndex));
    stable_golfer_group_indexes := Buffer.toArray(groupIndexBuffer);
    return #ok();
  };

  private func saveGolfer(golferGroupIndex : Nat8, updatedGolfer : Golfer.Golfer) : Result.Result<(), T.Error> {
    switch (golferGroupIndex) {
      case 0 {
        golferGroup1 := Array.map<Golfer.Golfer, Golfer.Golfer>(
          golferGroup1,
          func(golfer : Golfer.Golfer) {
            if (golfer.principalId == updatedGolfer.principalId) {
              return updatedGolfer;
            } else {
              return golfer;
            };
          },
        );
      };
      case 1 {
        golferGroup2 := Array.map<Golfer.Golfer, Golfer.Golfer>(
          golferGroup2,
          func(golfer : Golfer.Golfer) {
            if (golfer.principalId == updatedGolfer.principalId) {
              return updatedGolfer;
            } else {
              return golfer;
            };
          },
        );
      };
      case 2 {
        golferGroup3 := Array.map<Golfer.Golfer, Golfer.Golfer>(
          golferGroup3,
          func(golfer : Golfer.Golfer) {
            if (golfer.principalId == updatedGolfer.principalId) {
              return updatedGolfer;
            } else {
              return golfer;
            };
          },
        );
      };
      case 3 {
        golferGroup4 := Array.map<Golfer.Golfer, Golfer.Golfer>(
          golferGroup4,
          func(golfer : Golfer.Golfer) {
            if (golfer.principalId == updatedGolfer.principalId) {
              return updatedGolfer;
            } else {
              return golfer;
            };
          },
        );
      };
      case 4 {
        golferGroup5 := Array.map<Golfer.Golfer, Golfer.Golfer>(
          golferGroup5,
          func(golfer : Golfer.Golfer) {
            if (golfer.principalId == updatedGolfer.principalId) {
              return updatedGolfer;
            } else {
              return golfer;
            };
          },
        );
      };
      case 5 {
        golferGroup6 := Array.map<Golfer.Golfer, Golfer.Golfer>(
          golferGroup6,
          func(golfer : Golfer.Golfer) {
            if (golfer.principalId == updatedGolfer.principalId) {
              return updatedGolfer;
            } else {
              return golfer;
            };
          },
        );
      };
      case 6 {
        golferGroup7 := Array.map<Golfer.Golfer, Golfer.Golfer>(
          golferGroup7,
          func(golfer : Golfer.Golfer) {
            if (golfer.principalId == updatedGolfer.principalId) {
              return updatedGolfer;
            } else {
              return golfer;
            };
          },
        );
      };
      case 7 {
        golferGroup8 := Array.map<Golfer.Golfer, Golfer.Golfer>(
          golferGroup8,
          func(golfer : Golfer.Golfer) {
            if (golfer.principalId == updatedGolfer.principalId) {
              return updatedGolfer;
            } else {
              return golfer;
            };
          },
        );
      };
      case 8 {
        golferGroup9 := Array.map<Golfer.Golfer, Golfer.Golfer>(
          golferGroup9,
          func(golfer : Golfer.Golfer) {
            if (golfer.principalId == updatedGolfer.principalId) {
              return updatedGolfer;
            } else {
              return golfer;
            };
          },
        );
      };
      case 9 {
        golferGroup10 := Array.map<Golfer.Golfer, Golfer.Golfer>(
          golferGroup10,
          func(golfer : Golfer.Golfer) {
            if (golfer.principalId == updatedGolfer.principalId) {
              return updatedGolfer;
            } else {
              return golfer;
            };
          },
        );
      };
      case 10 {
        golferGroup11 := Array.map<Golfer.Golfer, Golfer.Golfer>(
          golferGroup11,
          func(golfer : Golfer.Golfer) {
            if (golfer.principalId == updatedGolfer.principalId) {
              return updatedGolfer;
            } else {
              return golfer;
            };
          },
        );
      };
      case 11 {
        golferGroup12 := Array.map<Golfer.Golfer, Golfer.Golfer>(
          golferGroup12,
          func(golfer : Golfer.Golfer) {
            if (golfer.principalId == updatedGolfer.principalId) {
              return updatedGolfer;
            } else {
              return golfer;
            };
          },
        );
      };
      case _ {
        return #err(#NotFound);
      };
    };
    return #ok();
  };

  private func getGolferCountInGroup(groupIndex : Nat8) : Nat {
    switch (groupIndex) {
      case 0 {
        return golferGroup1.size();
      };
      case 1 {
        return golferGroup2.size();
      };
      case 2 {
        return golferGroup3.size();
      };
      case 3 {
        return golferGroup4.size();
      };
      case 4 {
        return golferGroup5.size();
      };
      case 5 {
        return golferGroup6.size();
      };
      case 6 {
        return golferGroup7.size();
      };
      case 7 {
        return golferGroup8.size();
      };
      case 8 {
        return golferGroup9.size();
      };
      case 9 {
        return golferGroup10.size();
      };
      case 10 {
        return golferGroup11.size();
      };
      case 11 {
        return golferGroup12.size();
      };
      case _ {
        return 0;
      };
    };
  };

  system func postupgrade() {};

};
