import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Bool "mo:base/Bool";
import Buffer "mo:base/Buffer";
import Cycles "mo:base/ExperimentalCycles";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Result "mo:base/Result";
import Text "mo:base/Text";
import TrieMap "mo:base/TrieMap";
import Principal "mo:base/Principal";
import Base "mo:waterway-mops/BaseTypes";

import T "../data-types/types";
import Management "../utilities/Management";
import Utilities "../utilities/Utilities";
import Environment "../utilities/Environment";

import GolferCanister "../canister-definitions/golfer-canister";
import GolferCommands "../commands/golfer_commands";
import GolferQueries "../queries/golfer_queries";

import FriendRequestCommands "../commands/friend_request_commands";
import GameCommands "../commands/game_commands";

import ShotCommands "../commands/shot_commands";
import ShotQueries "../queries/shot_queries";
import FriendRequestQueries "../queries/friend_request_queries";
import BuzzQueries "../queries/buzz_queries";
import UpcomingGamesQueries "../queries/upcoming_games_queries";
import GameQueries "../queries/game_queries";
import FriendCommands "../commands/friend_commands";
import FriendQueries "../queries/friend_queries";
import GolfCourseQueries "../queries/golf_course_queries";
import SNSGovernance "../sns-wrappers/governance";
import SNSManager "../managers/sns-manager";

module {
  public class GolferManager() {

    private var golferCanisterIndex : TrieMap.TrieMap<Base.PrincipalId, Base.CanisterId> = TrieMap.TrieMap<Base.PrincipalId, Base.CanisterId>(Text.equal, Text.hash);
    private var activeCanisterId : Base.CanisterId = "";
    private var usernames : TrieMap.TrieMap<Base.PrincipalId, Text> = TrieMap.TrieMap<Base.PrincipalId, Text>(Text.equal, Text.hash);
    private var uniqueGolferCanisterIds : List.List<Base.CanisterId> = List.nil();
    private var totalGolfers : Nat = 0;

    //Getters

    public func getProfilePicture(principalId : Base.PrincipalId) : async ?Blob {
      let existingGolferCanisterId = golferCanisterIndex.get(principalId);
      switch (existingGolferCanisterId) {
        case (?foundCanisterId) {

          let golfer_canister = actor (foundCanisterId) : actor {
            getProfilePicture : (principalId : Base.PrincipalId) -> async ?Blob;
          };

          let golfer = await golfer_canister.getProfilePicture(principalId);
          return golfer;
        };
        case (null) {
          return null;
        };
      };
    };

    public func isUsernameAvailable(dto : GolferQueries.IsUsernameAvailable) : GolferQueries.UsernameAvailable {
      return not isUsernameTaken(dto.username, dto.principalId);
    };

    public func getProfile(dto : GolferQueries.GetProfile) : async Result.Result<GolferQueries.Profile, T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch (existingGolferCanisterId) {
        case (?foundCanisterId) {

          let golfer_canister = actor (foundCanisterId) : actor {
            getProfile : (dto : GolferQueries.GetProfile) -> async Result.Result<GolferQueries.Profile, T.Error>;
          };

          let golfer = await golfer_canister.getProfile(dto);
          return golfer;
        };
        case (null) {
          return #err(#NotFound);
        };
      };
    };

    public func getBuzz(dto : BuzzQueries.GetBuzz) : async Result.Result<BuzzQueries.Buzz, T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch (existingGolferCanisterId) {
        case (?foundCanisterId) {

          let golfer_canister = actor (foundCanisterId) : actor {
            getBuzz : (dto : BuzzQueries.GetBuzz) -> async Result.Result<BuzzQueries.Buzz, T.Error>;
          };

          return await golfer_canister.getBuzz(dto);
        };
        case (null) {
          return #err(#NotFound);
        };
      };
    };

    public func getUpcomingGames(dto : UpcomingGamesQueries.GetUpcomingGames) : async Result.Result<UpcomingGamesQueries.UpcomingGames, T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch (existingGolferCanisterId) {
        case (?foundCanisterId) {

          let golfer_canister = actor (foundCanisterId) : actor {
            getUpcomingGames : (dto : UpcomingGamesQueries.GetUpcomingGames) -> async Result.Result<UpcomingGamesQueries.UpcomingGames, T.Error>;
          };

          return await golfer_canister.getUpcomingGames(dto);
        };
        case (null) {
          return #err(#NotFound);
        };
      };
    };

    public func getGameSummaries(dto : GameQueries.GetGameSummaries) : async Result.Result<GameQueries.GameSummaries, T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch (existingGolferCanisterId) {
        case (?foundCanisterId) {

          let golfer_canister = actor (foundCanisterId) : actor {
            getGameSummaries : (dto : GameQueries.GetGameSummaries) -> async Result.Result<GameQueries.GameSummaries, T.Error>;
          };

          return await golfer_canister.getGameSummaries(dto);
        };
        case (null) {
          return #err(#NotFound);
        };
      };
    };

    public func getGolfer(dto : GolferQueries.GetGolfer) : async Result.Result<GolferQueries.Golfer, T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch (existingGolferCanisterId) {
        case (?foundCanisterId) {

          let golfer_canister = actor (foundCanisterId) : actor {
            getGolfer : (dto : GolferQueries.GetGolfer) -> async Result.Result<GolferQueries.Golfer, T.Error>;
          };

          let golfer = await golfer_canister.getGolfer(dto);
          return golfer;
        };
        case (null) {
          return #err(#NotFound);
        };
      };
    };

    public func getGolfers(dto : GolferQueries.GetGolfers, homeCourse: ?GolfCourseQueries.GolfCourseSummary) : async Result.Result<GolferQueries.Golfers, T.Error> {
      if (Text.size(dto.searchTerm) < 3) {
        return #err(#TooShort);
      };

      let lowerCaseSearchTerm = Utilities.toLowercase(dto.searchTerm);
      let searchTermLength = Text.size(lowerCaseSearchTerm);
      let leftTrimmedUsernameText = Utilities.trimStartToLength(lowerCaseSearchTerm, searchTermLength);

      let golferBuffer = Buffer.fromArray<GolferQueries.GolferSummary>([]);

      label userNameLoop for (managerUsernameEntry in usernames.entries()) {

        let trimmedLowerUsername = Utilities.toLowercase(Utilities.trimStartToLength(managerUsernameEntry.1, searchTermLength));
        if (trimmedLowerUsername == leftTrimmedUsernameText) {
          let existingGolferCanisterId = golferCanisterIndex.get(managerUsernameEntry.0);
          switch (existingGolferCanisterId) {
            case (?foundCanisterId) {

              let golfer_canister = actor (foundCanisterId) : actor {
                getGolfer : (dto : GolferQueries.GetGolfer) -> async Result.Result<GolferQueries.Golfer, T.Error>;
              };
              let result = await golfer_canister.getGolfer({
                principalId = managerUsernameEntry.0;
              });
              switch (result) {
                case (#ok foundGolfer) {
                  golferBuffer.add({
                    name = foundGolfer.username;
                    profilePicture = foundGolfer.golferPicture;
                    profilePictureExtension = foundGolfer.golferPictureExtension;
                    principalId = foundGolfer.principalId;
                    handicap = foundGolfer.handicap;
                    joinedOn = foundGolfer.joinedOn;
                    homeCourse;
                  });

                };
                case _ {
                  return #err(#NotFound);
                };
              };
            };
            case (null) {};
          };
        };

        if (golferBuffer.size() > 3) {
          break userNameLoop;
        }

      };

      let golfersDTO : GolferQueries.Golfers = {
        entries = Buffer.toArray(golferBuffer);
        total = 0; //TODO
        page = dto.page;
        pageSize = 10; //TODO Make env variable
      };

      return #ok(golfersDTO);
    };


    public func getGameGolferSummaries(dto: GolferQueries.GetGameGolferSummaries) : async Result.Result<GolferQueries.GameGolferSummaries, T.Error>{
      return #err(#NotFound); //TODO
    };

    public func getFriends(dto: FriendQueries.GetFriends) : async Result.Result<FriendQueries.Friends, T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch (existingGolferCanisterId) {
        case (?foundCanisterId) {

          let golfer_canister = actor (foundCanisterId) : actor {
            getFriends : (dto : FriendQueries.GetFriends) -> async Result.Result<FriendQueries.Friends, T.Error>;
          };

          return await golfer_canister.getFriends(dto);
        };
        case (null) {
          return #err(#NotFound);
        };
      };
    };

    public func getFriendRequests(dto : FriendRequestQueries.GetFriendRequests) : async Result.Result<FriendRequestQueries.FriendRequests, T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch (existingGolferCanisterId) {
        case (?foundCanisterId) {

          let golfer_canister = actor (foundCanisterId) : actor {
            getFriendRequests : (dto : FriendRequestQueries.GetFriendRequests) -> async Result.Result<FriendRequestQueries.FriendRequests, T.Error>;
          };

          return await golfer_canister.getFriendRequests(dto);
        };
        case (null) {
          return #err(#NotFound);
        };
      };
    };

    public func getUserFavouriteCourses(dto : GolfCourseQueries.GetUserFavouriteCourses) : async Result.Result<GolfCourseQueries.UserFavouriteCourses, T.Error> {
      return #err(#NotFound);
    };

    //Update functions

    public func createUser(principalId : Base.PrincipalId, dto : GolferCommands.CreateUser) : async Result.Result<(), T.Error> {

      if (Text.size(dto.username) < 5 or Text.size(dto.username) > 20) {
        return #err(#TooLong);
      };

      switch (dto.handicap) {
        case (null) {};
        case (?foundHandicap) {
          if (foundHandicap < -540 or foundHandicap > 540) {
            return #err(#OutOfRange);
          };
        };
      };

      let invalidUsername = isUsernameTaken(dto.username, principalId);
      if (invalidUsername) {
        return #err(#AlreadyExists);
      };

      let existingGolferCanisterId = golferCanisterIndex.get(principalId);
      switch (existingGolferCanisterId) {
        case (?_) {
          return #err(#AlreadyExists);
        };
        case (null) {
          if (activeCanisterId == "") {
            await createNewCanister();
          };

          var golfer_canister = actor (activeCanisterId) : actor {
            isCanisterFull : () -> async Bool;
            createUser : (principalId : Base.PrincipalId, dto : GolferCommands.CreateUser) -> async Result.Result<(), T.Error>;
          };

          let isCanisterFull = await golfer_canister.isCanisterFull();

          if (isCanisterFull) {
            await createNewCanister();
            golfer_canister := actor (activeCanisterId) : actor {
              isCanisterFull : () -> async Bool;
              createUser : (principalId : Base.PrincipalId, dto : GolferCommands.CreateUser) -> async Result.Result<(), T.Error>;
            };
          };

          golferCanisterIndex.put((principalId, activeCanisterId));
          usernames.put(principalId, activeCanisterId);
          return await golfer_canister.createUser(principalId, dto);
        };
      };
    };

    public func claimMembership(dto : GolferCommands.ClaimMembership) : async Result.Result<(T.MembershipClaim), T.Error> {
      let existingProfileCanisterId = golferCanisterIndex.get(dto.principalId);
      switch (existingProfileCanisterId) {
        case (?_) {
          let snsManager = SNSManager.SNSManager();
          let userNeurons : [SNSGovernance.Neuron] = await snsManager.getUsersNeurons(Principal.fromText(dto.principalId));

          let eligibleMembershipType : ?T.MembershipType = Utilities.getMembershipType(userNeurons);

          // TODO: Add temporary logic to allow whitelisted principal ids to gain access

          switch (eligibleMembershipType) {
            case (?membershipType) {
              let updateMembershipCommand : GolferCommands.UpdateMembership = {
                principalId = dto.principalId;
                membershipType = membershipType;
              };
              return await updateMembership(updateMembershipCommand);
            };
            case (null) {
              return #err(#InEligible);
            };
          };
        };
        case (null) {
          return #err(#NotFound);
        };

      };
    };

    public func updateMembership(dto : GolferCommands.UpdateMembership) : async Result.Result<(T.MembershipClaim), T.Error> {
      let existingProfileCanisterId = golferCanisterIndex.get(dto.principalId);
      switch (existingProfileCanisterId) {
        case (?foundCanisterId) {
          let profile_canister = actor (foundCanisterId) : actor {
            updateMembership : (dto : GolferCommands.UpdateMembership) -> async Result.Result<(T.MembershipClaim), T.Error>;
          };
          return await profile_canister.updateMembership(dto);
        };
        case (null) {
          return #err(#NotFound);
        };
      };
    };

    public func updateUsername(dto : GolferCommands.UpdateUsername) : async Result.Result<(), T.Error> {

      if (Text.size(dto.username) < 5 or Text.size(dto.username) > 20) {
        return #err(#TooLong);
      };

      let invalidUsername = isUsernameTaken(dto.username, dto.principalId);
      if (invalidUsername) {
        return #err(#AlreadyExists);
      };

      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch (existingGolferCanisterId) {
        case (?foundCanisterId) {
          let golfer_canister = actor (foundCanisterId) : actor {
            updateUsername : (dto : GolferCommands.UpdateUsername) -> async Result.Result<(), T.Error>;
          };
          usernames.put(dto.principalId, activeCanisterId);
          return await golfer_canister.updateUsername(dto);
        };
        case (null) {
          return #err(#NotFound);
        };
      };
    };

    public func updateHandicap(dto : GolferCommands.UpdateHandicap) : async Result.Result<(), T.Error> {

      switch (dto.handicap) {
        case (null) {};
        case (?foundHandicap) {
          if (foundHandicap < -540 or foundHandicap > 540) {
            return #err(#OutOfRange);
          };
        };
      };

      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch (existingGolferCanisterId) {
        case (?foundCanisterId) {
          let golfer_canister = actor (foundCanisterId) : actor {
            updateHandicap : (dto : GolferCommands.UpdateHandicap) -> async Result.Result<(), T.Error>;
          };
          return await golfer_canister.updateHandicap(dto);
        };
        case (null) {
          return #err(#NotFound);
        };
      };
    };

    public func updateFirstName(dto : GolferCommands.UpdateFirstName) : async Result.Result<(), T.Error> {

      if (Text.size(dto.firstName) < 1 or Text.size(dto.firstName) > 20) {
        return #err(#TooLong);
      };

      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch (existingGolferCanisterId) {
        case (?foundCanisterId) {
          let golfer_canister = actor (foundCanisterId) : actor {
            updateFirstName : (dto : GolferCommands.UpdateFirstName) -> async Result.Result<(), T.Error>;
          };
          return await golfer_canister.updateFirstName(dto);
        };
        case (null) {
          return #err(#NotFound);
        };
      };
    };

    public func updateLastName(dto : GolferCommands.UpdateLastName) : async Result.Result<(), T.Error> {

      if (Text.size(dto.lastName) < 1 or Text.size(dto.lastName) > 50) {
        return #err(#TooLong);
      };

      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch (existingGolferCanisterId) {
        case (?foundCanisterId) {
          let golfer_canister = actor (foundCanisterId) : actor {
            updateFirstName : (dto : GolferCommands.UpdateLastName) -> async Result.Result<(), T.Error>;
          };
          return await golfer_canister.updateFirstName(dto);
        };
        case (null) {
          return #err(#NotFound);
        };
      };
    };

    public func updateHomeCourse(dto : GolferCommands.UpdateHomeCourse) : async Result.Result<(), T.Error> {

      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch (existingGolferCanisterId) {
        case (?foundCanisterId) {
          let golfer_canister = actor (foundCanisterId) : actor {
            updateHomeCourse : (dto : GolferCommands.UpdateHomeCourse) -> async Result.Result<(), T.Error>;
          };
          return await golfer_canister.updateHomeCourse(dto);
        };
        case (null) {
          return #err(#NotFound);
        };
      };
    };

    public func updateProfilePicture(dto : GolferCommands.UpdateProfilePicture) : async Result.Result<(), T.Error> {
      let validProfilePicture = isProfilePictureValid(dto.profilePicture);
      if (not validProfilePicture) {
        return #err(#InvalidProfilePicture);
      };

      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch (existingGolferCanisterId) {
        case (?foundCanisterId) {
          let golfer_canister = actor (foundCanisterId) : actor {
            updateProfilePicture : (dto : GolferCommands.UpdateProfilePicture) -> async Result.Result<(), T.Error>;
          };
          return await golfer_canister.updateProfilePicture(dto);
        };
        case (null) {
          if (activeCanisterId == "") {
            await createNewCanister();
          };

          var golfer_canister = actor (activeCanisterId) : actor {
            isCanisterFull : () -> async Bool;
            updateProfilePicture : (dto : GolferCommands.UpdateProfilePicture) -> async Result.Result<(), T.Error>;
          };

          let isCanisterFull = await golfer_canister.isCanisterFull();
          if (isCanisterFull) {
            await createNewCanister();

            golfer_canister := actor (activeCanisterId) : actor {
              updateProfilePicture : (dto : GolferCommands.UpdateProfilePicture) -> async Result.Result<(), T.Error>;
              isCanisterFull : () -> async Bool;
            };
          };

          return await golfer_canister.updateProfilePicture(dto);
        };
      };

      return #err(#NotFound);
    };

    public func acceptFriendRequest(dto : FriendRequestCommands.AcceptFriendRequest) : async Result.Result<(), T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch (existingGolferCanisterId) {
        case (?foundCanisterId) {

          let golfer_canister = actor (foundCanisterId) : actor {
            acceptFriendRequest : (dto : FriendRequestCommands.AcceptFriendRequest) -> async Result.Result<(), T.Error>;
          };

          let _ = await golfer_canister.acceptFriendRequest(dto);
          return await golfer_canister.acceptFriendRequest(dto);
        };
        case (null) {
          return #err(#NotFound);
        };
      };
    };

    public func rejectFriendRequest(dto : FriendRequestCommands.RejectFriendRequest) : async Result.Result<(), T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch (existingGolferCanisterId) {
        case (?foundCanisterId) {

          let golfer_canister = actor (foundCanisterId) : actor {
            rejectFriendRequest : (dto : FriendRequestCommands.RejectFriendRequest) -> async Result.Result<(), T.Error>;
          };

          return await golfer_canister.rejectFriendRequest(dto);
        };
        case (null) {
          return #err(#NotFound);
        };
      };
    };

    public func sendFriendRequest(dto : FriendRequestCommands.SendFriendRequest) : async Result.Result<(), T.Error> {
      let existingGolferCanisterId = golferCanisterIndex.get(dto.principalId);
      switch (existingGolferCanisterId) {
        case (?foundCanisterId) {

          let golfer_canister = actor (foundCanisterId) : actor {
            sendFriendRequest : (dto : FriendRequestCommands.SendFriendRequest) -> async Result.Result<(), T.Error>;
          };

          return await golfer_canister.sendFriendRequest(dto);
        };
        case (null) {
          return #err(#NotFound);
        };
      };
    };

    public func removeUserGolfCourse(dto : GolferCommands.RemoveUserGolfCourse) : async Result.Result<(), T.Error> {
      return #err(#NotFound); //TODO
    };

    public func addGame(dto : GameCommands.AddGame) : async Result.Result<(), T.Error> {
      for (principalId in Iter.fromArray(dto.inviteIds)) {
        let golferCanisterId = golferCanisterIndex.get(principalId);

        switch (golferCanisterId) {
          case (?foundCanisterId) {

            let golfer_canister = actor (foundCanisterId) : actor {
              addGameInvite : (dto : GameCommands.AddGame) -> async Result.Result<(), T.Error>;
            };

            return await golfer_canister.addGameInvite(dto);
          };
          case _ {
            return #err(#NotFound);
          };
        };
      };
      return #ok();
    };

    public func removeFriend(dto : FriendCommands.RemoveFriend) : async Result.Result<(), T.Error> {
      //TOOD
      let golferCanisterId = golferCanisterIndex.get(dto.requestedBy);
      let friendCanisterId = golferCanisterIndex.get(dto.principalId);

      switch (golferCanisterId) {
        case (?foundCanisterId) {

          let golfer_canister = actor (foundCanisterId) : actor {
            removeFriend : (dto : FriendCommands.RemoveFriend) -> async Result.Result<(), T.Error>;
          };

          return await golfer_canister.removeFriend(dto);
        };
        case _ {
          return #err(#NotFound);
        };
      };
      return #ok();
    };

    //Shot Functions

    public func addShot(dto : ShotCommands.AddShot) : async Result.Result<(), T.Error> {

      let golferCanisterId = golferCanisterIndex.get(dto.principalId);

      switch (golferCanisterId) {
        case (?foundCanisterId) {

          let golfer_canister = actor (foundCanisterId) : actor {
            addShot : (dto : ShotCommands.AddShot) -> async Result.Result<(), T.Error>;
          };

          return await golfer_canister.addShot(dto);
        };
        case _ {
          return #err(#NotFound);
        };
      };
    };

    public func updateShot(dto : ShotCommands.UpdateShot) : async Result.Result<(), T.Error> {

      let golferCanisterId = golferCanisterIndex.get(dto.principalId);

      switch (golferCanisterId) {
        case (?foundCanisterId) {

          let golfer_canister = actor (foundCanisterId) : actor {
            updateShot : (dto : ShotCommands.UpdateShot) -> async Result.Result<(), T.Error>;
          };

          return await golfer_canister.updateShot(dto);
        };
        case _ {
          return #err(#NotFound);
        };
      };
    };

    public func deleteShot(dto : ShotCommands.DeleteShot) : async Result.Result<(), T.Error> {

      let golferCanisterId = golferCanisterIndex.get(dto.principalId);

      switch (golferCanisterId) {
        case (?foundCanisterId) {

          let golfer_canister = actor (foundCanisterId) : actor {
            deleteShot : (dto : ShotCommands.DeleteShot) -> async Result.Result<(), T.Error>;
          };

          return await golfer_canister.deleteShot(dto);
        };
        case _ {
          return #err(#NotFound);
        };
      };
    };

    //Golfer Shot Management Queries:

    public func getShotAverages(dto : ShotQueries.GetShotAverages) : async Result.Result<ShotQueries.ShotAverages, T.Error> {
      let golferCanisterId = golferCanisterIndex.get(dto.principalId);

      switch (golferCanisterId) {
        case (?foundCanisterId) {

          let golfer_canister = actor (foundCanisterId) : actor {
            getShotAverages : (dto : ShotQueries.GetShotAverages) -> async Result.Result<ShotQueries.ShotAverages, T.Error>;
          };

          return await golfer_canister.getShotAverages(dto);
        };
        case _ {
          return #err(#NotFound);
        };
      };
    };

    public func getClubShots(dto : ShotQueries.GetClubShots) : async Result.Result<ShotQueries.ClubShots, T.Error> {
      let golferCanisterId = golferCanisterIndex.get(dto.principalId);

      switch (golferCanisterId) {
        case (?foundCanisterId) {

          let golfer_canister = actor (foundCanisterId) : actor {
            getClubShots : (dto : ShotQueries.GetClubShots) -> async Result.Result<ShotQueries.ClubShots, T.Error>;
          };

          return await golfer_canister.getClubShots(dto);
        };
        case _ {
          return #err(#NotFound);
        };
      };
    };

    public func friendRequestExists(golferPrincipalId : Base.PrincipalId, requestedById : Base.PrincipalId) : async Bool {

      let golferCanisterId = golferCanisterIndex.get(golferPrincipalId);

      switch (golferCanisterId) {
        case (?foundCanisterId) {
          let golfer_canister = actor (foundCanisterId) : actor {
            friendRequestExists : (golferPrincipalId : Base.PrincipalId, requestedById : Base.PrincipalId) -> async Bool;
          };

          return await golfer_canister.friendRequestExists(golferPrincipalId, requestedById);
        };
        case (null) {
          return false;
        };
      };
    };

    //private functions

    private func isUsernameTaken(username : Text, principalId : Base.PrincipalId) : Bool {
      for (managerUsername in usernames.entries()) {

        let lowerCaseUsername = Utilities.toLowercase(username);
        let existingUsername = Utilities.toLowercase(managerUsername.1);

        if (lowerCaseUsername == existingUsername and managerUsername.0 != principalId) {
          return true;
        };
      };

      return false;
    };

    private func isProfilePictureValid(profilePicture : ?Blob) : Bool {
      switch (profilePicture) {
        case (?foundProfilePicture) {
          let sizeInKB = Array.size(Blob.toArray(foundProfilePicture)) / 1024;
          return (sizeInKB > 0 or sizeInKB <= 500);
        };
        case (null) { return true };
      };
    };

    public func isGolferCanisterId(principalId : Base.PrincipalId) : Bool {
      return false; //TODO
    };

    public func getGameInvites(dto : GameQueries.GetGameInvites) : async Result.Result<GameQueries.GameInvites, T.Error> {
      return #err(#NotFound); //TODO
    };

    private func createNewCanister() : async () {
      Cycles.add<system>(10_000_000_000_000);
      let canister = await GolferCanister._GolferCanister();
      let IC : Management.Management = actor (Environment.Default);
      let principal = ?Principal.fromText(Environment.BACKEND_CANISTER_ID);
      let _ = await Utilities.updateCanister_(canister, principal, IC);
      let canister_principal = Principal.fromActor(canister);
      let canisterId = Principal.toText(canister_principal);

      if (canisterId == "") {
        return;
      };
      let uniqueCanisterIdBuffer = Buffer.fromArray<Base.CanisterId>(List.toArray(uniqueGolferCanisterIds));
      uniqueCanisterIdBuffer.add(canisterId);
      uniqueGolferCanisterIds := List.fromArray(Buffer.toArray(uniqueCanisterIdBuffer));
      activeCanisterId := canisterId;
      return;
    };

    //stable storage getters and setters

    public func getStableCanisterIndex() : [(Base.PrincipalId, Base.CanisterId)] {
      return Iter.toArray(golferCanisterIndex.entries());
    };

    public func setStableCanisterIndex(stable_golfer_canister_index : [(Base.PrincipalId, Base.CanisterId)]) {
      let canisterIds : TrieMap.TrieMap<Base.PrincipalId, Base.CanisterId> = TrieMap.TrieMap<Base.PrincipalId, Base.CanisterId>(Text.equal, Text.hash);

      for (canisterId in Iter.fromArray(stable_golfer_canister_index)) {
        canisterIds.put(canisterId);
      };
      golferCanisterIndex := canisterIds;
    };

    public func getStableActiveCanisterId() : Base.CanisterId {
      return activeCanisterId;
    };

    public func setStableActiveCanisterId(stable_active_canister_id : Base.CanisterId) {
      activeCanisterId := stable_active_canister_id;
    };

    public func getStableUsernames() : [(Base.PrincipalId, Text)] {
      return Iter.toArray(usernames.entries());
    };

    public func setStableUsernames(stable_usernames : [(Base.PrincipalId, Text)]) : () {
      let usernames_map : TrieMap.TrieMap<Base.PrincipalId, Base.CanisterId> = TrieMap.TrieMap<Base.PrincipalId, Base.CanisterId>(Text.equal, Text.hash);

      for (username in Iter.fromArray(stable_usernames)) {
        usernames_map.put(username);
      };
      usernames := usernames_map;
    };

    public func getStableUniqueCanisterIds() : [Base.CanisterId] {
      return List.toArray(uniqueGolferCanisterIds);
    };

    public func setStableUniqueCanisterIds(stable_unique_canister_ids : [Base.CanisterId]) : () {
      let canisterIdBuffer = Buffer.fromArray<Base.CanisterId>([]);

      for (canisterId in Iter.fromArray(stable_unique_canister_ids)) {
        canisterIdBuffer.add(canisterId);
      };
      uniqueGolferCanisterIds := List.fromArray(Buffer.toArray(canisterIdBuffer));
    };

    public func getStableTotalGolfers() : Nat {
      return totalGolfers;
    };

    public func setStableTotalGolfers(stable_total_golfers : Nat) : () {
      totalGolfers := stable_total_golfers;
    };

  };
};
