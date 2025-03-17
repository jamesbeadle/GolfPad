import T "../data-types/types";
import Base "mo:waterway-mops/BaseTypes";

module GolfCourseQueries {
    
    public type GetGolfCourse = {
        id: T.GolfCourseId;
    };

    public type GolfCourse = {
        id: T.GolfCourseId;
        name: Text;
        tees: [T.TeeGroup];
        activeVersion: T.GolfCourseVersion;
        mainImage: ?Blob;
        mainImageExtension: Text;
        totalHoles: Nat8;
        founded: Int;
        countryId: T.CountryId;
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
        id: T.GolfCourseId;
    };

    public type GolfCourseSummary = {
        id: T.GolfCourseId;
        name: Text;
        mainImage: ?Blob;
        mainImageExtension: Text;
        founded: Int;
        countryId: T.CountryId;
        version: T.GolfCourseVersion;
    };

    public type GetGolfCourseCanisterId = {
        id: T.GolfCourseId;
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
        id: T.GolfCourseId;
        name: Text;
        mainImage: ?Blob;
        mainImageExtension: Text;
    };
    
    public type GetGolfCourseTees = {
        golfCourseId: T.GolfCourseId;
    };

    public type GolfCourseTees = {
        id: T.GolfCourseId;
        tees: [T.TeeGroup];
    };
    
}

  