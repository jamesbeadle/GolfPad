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
        totalHoles: Nat8;
        founded: Int;
        countryId: ID.CountryId;
        manager: Base.PrincipalId;
    };

    public type UpdateGolfCourse = {
        courseId: ID.GolfCourseId;
        name: Text;
        updatedTeeGroup: ?GolfCourse.TeeGroup;
        bannerImage: ?Blob;
    };

    public type DeleteGolfCourse = {
        courseId: ID.GolfCourseId;

    };
}

  