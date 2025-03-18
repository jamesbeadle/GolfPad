import T "../data-types/app_types";
import ID "../data-types/id_types";
import Game "../data-types/game_types";
import Base "mo:waterway-mops/BaseTypes";
import GolfCourseQueries "golf_course_queries";

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
        homeCourseId: ?ID.GolfCourseId;
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
        upcomingGames: [ID.GameId];
        activeGames: [ID.GameId];
        completedGames: [ID.GameId];
        gameInvites: [Game.GameInvite];
        homeCourse: Text;
        homeCourseId: ?ID.GolfCourseId;
        homeCourseImage: ?Blob;
    };

    public type IsUsernameAvailable = {
        username: Text;
        principalId: Base.PrincipalId;
    };

    public type UsernameAvailable = Bool;

    public type GetGameGolferSummaries = {
        gameId: ID.GameId;
    };


    public type GameGolferSummaries = {
        entries: [GolferSummary];
    };
    
}

  