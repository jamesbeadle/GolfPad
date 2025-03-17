import T "../data-types/types";

module GolfCourseCommands {

    public type CreateGolfCourse = {
        name: Text;
        initialTeeGroup: T.TeeGroup;
        holes: [T.Hole];
        mainImage: ?Blob;
        mainImageExtension: Text;
        bannerImage: ?Blob;
        totalHoles: Nat8;
        founded: Int;
        countryId: T.CountryId;
    };

    public type UpdateGolfCourse = {
        courseId: T.GolfCourseId;
        name: Text;
        updatedTeeGroup: ?T.TeeGroup;
    };

    public type DeleteGolfCourse = {
        courseId: T.GolfCourseId;

    };
}

  