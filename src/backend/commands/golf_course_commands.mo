import ID "../data-types/id_types";
import GolfCourse "../data-types/golf_course_types";

module GolfCourseCommands {

    public type CreateGolfCourse = {
        name: Text;
        initialTeeGroup: GolfCourse.TeeGroup;
        holes: [GolfCourse.Hole];
        mainImage: ?Blob;
        mainImageExtension: Text;
        bannerImage: ?Blob;
        totalHoles: Nat8;
        founded: Int;
        countryId: ID.CountryId;
    };

    public type UpdateGolfCourse = {
        courseId: ID.GolfCourseId;
        name: Text;
        updatedTeeGroup: ?GolfCourse.TeeGroup;
    };

    public type DeleteGolfCourse = {
        courseId: ID.GolfCourseId;

    };
}

  