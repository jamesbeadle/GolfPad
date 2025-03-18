import ID "../data-types/id_types";
import GolfCourse "../data-types/golf_course_types";
import Base "mo:waterway-mops/BaseTypes";

module GolfCourseQueries {
    
    public type GetGolfCourse = {
        id: ID.GolfCourseId;
    };

    public type GolfCourse = {
        id: ID.GolfCourseId;
        name: Text;
        tees: [GolfCourseTeeGroup];
        activeVersion: GolfCourse.GolfCourseVersion;
        mainImage: ?Blob;
        mainImageExtension: Text;
        totalHoles: Nat8;
        founded: Int;
        countryId: ID.CountryId;
        manager: Text;
    };

    public type GetGolfCourses = {
        principalId: Base.PrincipalId;
        page: Nat;
        searchTerm: Text;
    };

    public type GolfCourses = {
        entries: [GolfCourseSummary];
        page: Nat;
        total: Nat;
        pageSize: Nat;
    };

    public type GetGolfCourseSummary = {
        id: ID.GolfCourseId;
    };

    public type GolfCourseSummary = {
        id: ID.GolfCourseId;
        name: Text;
        mainImage: ?Blob;
        mainImageExtension: Text;
        founded: Int;
        countryId: ID.CountryId;
        version: GolfCourse.GolfCourseVersion;
    };

    public type GetGolfCourseCanisterId = {
        id: ID.GolfCourseId;
    };

    public type GolfCourseCanisterId = {
        canisterId: Base.CanisterId;
    };

    public type GetUserFavouriteCourses = {
        principalId: Base.PrincipalId;
        searchTerm: Text;
    };

    public type UserFavouriteCourses = {
        page: Nat;
        total: Nat;
        pageSize: Nat;
        entries: [FavouriteCourse];
    };

    public type FavouriteCourse = {
        id: ID.GolfCourseId;
        name: Text;
        mainImage: ?Blob;
        mainImageExtension: Text;
    };
    
    public type GetGolfCourseTees = {
        golfCourseId: ID.GolfCourseId;
    };

    public type GolfCourseTees = {
        id: ID.GolfCourseId;
        tees: [GolfCourse.TeeGroup];
    };

    public type GetGolfCourseTeeGroup = {
        id: ID.GolfCourseId;
        index: GolfCourse.TeeGroupIndex;
    };

    public type GolfCourseTeeGroup = {
        golfCourseId: ID.GolfCourseId;
        index: GolfCourse.TeeGroupIndex;
        name: Text;
        colour: Text;
        added: Int;
        holes: [HoleSummary];
        mainImage: ?Blob;
        totalHoles: Nat8;
    };

    public type HoleSummary = {
        number: Nat8;
        name: Text;
        colour: Text;
        yardage: Nat;
        par: Nat8;
        strokeIndex: Nat8;
    };
    
}

  