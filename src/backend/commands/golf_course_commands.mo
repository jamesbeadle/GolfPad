import T "../data-types/types";

module GolfCourseCommands {

    public type CreateGolfCourse = {
        name: Text;
        initialTeeGroup: T.TeeGroup;
        holes: [T.Hole]
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

  