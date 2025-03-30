import T "../data-types/app_types";
import Game "../data-types/game_types";
import Membership "../data-types/membership_types";
import Base "mo:waterway-mops/BaseTypes";
import GolfCourseQueries "golf_course_queries";
import SNSGovernance "../sns-wrappers/governance";
import MopsIds "../data-types/mops_ids";

module GolferQueries {
    
    public type GetProfile = {
        principalId: Base.PrincipalId;
    };

    public type Profile = {
        principalId: Base.PrincipalId;
        username: Text;
        firstName: Text;
        lastName: Text;
        golferPicture: ?Blob;
        golferPictureExtension: Text;
        handicap: ?T.Handicap;
        homeCourseId: ?MopsIds.GolfCourseId;
        membershipType : T.MembershipType;
        membershipClaims : [T.MembershipClaim];
    };

    public type GetGolfers = {
        principalId: Base.PrincipalId;
        page: Nat;
        searchTerm: Text;
    };

    public type Golfers = {
        entries: [GolferSummary];
        page: Nat;
        total: Nat;
        pageSize: Nat;
    };

    public type GolferSummary = {
        principalId: Base.PrincipalId;
        name: Text;
        profilePicture: ?Blob;
        profilePictureExtension: Text;
        handicap: ?T.Handicap;
        joinedOn: Int;
        homeCourse: ?GolfCourseQueries.GolfCourseSummary;
    };

    public type GetGolfer = {
        principalId: Base.PrincipalId;
    };

    public type Golfer = {
        principalId: Base.PrincipalId;
        joinedOn: Int;
        username: Text;
        firstName: Text;
        lastName: Text;
        golferPicture: ?Blob;
        golferPictureExtension: Text;
        handicap: ?T.Handicap;
        upcomingGames: [MopsIds.GameId];
        activeGames: [MopsIds.GameId];
        completedGames: [MopsIds.GameId];
        gameInvites: [Game.GameInvite];
        homeCourse: Text;
        homeCourseId: ?MopsIds.GolfCourseId;
        homeCourseImage: ?Blob;
    };

    public type IsUsernameAvailable = {
        username: Text;
        principalId: Base.PrincipalId;
    };

    public type UsernameAvailable = Bool;

    public type GetGameGolferSummaries = {
        gameId: MopsIds.GameId;
    };


    public type GameGolferSummaries = {
        entries: [GolferSummary];
    };

    public type GolferNeurons = {
        userNeurons : [SNSGovernance.Neuron];
        totalMaxStaked : Nat64;
        userMembershipEligibility : Membership.EligibleMembership;
    };
    
}

  