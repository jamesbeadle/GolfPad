import GolfCourse "../data-types/golf_course_types";
import Base "mo:waterway-mops/BaseTypes";
import MopsIds "../data-types/mops_ids";

module GolfCourseQueries {
    
    public type GetGolfCourse = {
        id: MopsIds.GolfCourseId;
    };

    public type GolfCourse = {
        id: MopsIds.GolfCourseId;
        name: Text;
        tees: [GolfCourseTeeGroup];
        activeVersion: GolfCourse.GolfCourseVersion;
        mainImage: ?Blob;
        mainImageExtension: Text;
        totalHoles: Nat8;
        founded: Int;
        countryId: MopsIds.CountryId;
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
        id: MopsIds.GolfCourseId;
    };

    public type GolfCourseSummary = {
        id: MopsIds.GolfCourseId;
        name: Text;
        mainImage: ?Blob;
        mainImageExtension: Text;
        founded: Int;
        countryId: MopsIds.CountryId;
        version: GolfCourse.GolfCourseVersion;
    };

    public type GetGolfCourseCanisterId = {
        id: MopsIds.GolfCourseId;
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
        id: MopsIds.GolfCourseId;
        name: Text;
        mainImage: ?Blob;
        mainImageExtension: Text;
    };
    
    public type GetGolfCourseTees = {
        golfCourseId: MopsIds.GolfCourseId;
    };

    public type GolfCourseTees = {
        id: MopsIds.GolfCourseId;
        tees: [GolfCourse.TeeGroup];
    };

    public type GetGolfCourseTeeGroup = {
        id: MopsIds.GolfCourseId;
        index: GolfCourse.TeeGroupIndex;
    };

    public type GolfCourseTeeGroup = {
        golfCourseId: MopsIds.GolfCourseId;
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

  