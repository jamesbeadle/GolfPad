import ID "../data-types/id_types";
import GolfCourse "../data-types/golf_course_types";
import Base "mo:waterway-mops/BaseTypes";

module GolfCourseCommands {

    public type CreateGolfCourse = {
        name: Text;
        teeGroups: [GolfCourse.TeeGroup];
        mainImage: ?Blob;
        mainImageExtension: Text;
        bannerImage: ?Blob;
        bannerImageExtension: Text;
        founded: Int;
        countryId: ID.CountryId;
        manager: Base.PrincipalId;
    };

    public type UpdateGolfCourse = {
        courseId: ID.GolfCourseId;
        name: Text;
        teeGroups: [GolfCourse.TeeGroup];
        mainImage: ?Blob;
        mainImageExtension: Text;
        bannerImage: ?Blob;
        bannerImageExtension: Text;
        manager: Base.PrincipalId;
    };

    public type DeleteGolfCourse = {
        courseId: ID.GolfCourseId;

    };
}

  