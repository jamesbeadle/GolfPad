import GolfCourse "../data-types/golf_course_types";
import Base "mo:waterway-mops/BaseTypes";
import MopsIds "../data-types/mops_ids";

module GolfCourseCommands {

    public type CreateGolfCourse = {
        name: Text;
        teeGroups: [GolfCourse.TeeGroup];
        mainImage: ?Blob;
        mainImageExtension: Text;
        bannerImage: ?Blob;
        bannerImageExtension: Text;
        founded: Int;
        countryId: MopsIds.CountryId;
        manager: Base.PrincipalId;
    };

    public type UpdateGolfCourse = {
        courseId: MopsIds.GolfCourseId;
        name: Text;
        teeGroups: [GolfCourse.TeeGroup];
        mainImage: ?Blob;
        mainImageExtension: Text;
        bannerImage: ?Blob;
        bannerImageExtension: Text;
        manager: Base.PrincipalId;
    };

    public type DeleteGolfCourse = {
        courseId: MopsIds.GolfCourseId;

    };
}

  