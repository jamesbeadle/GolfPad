module GolfCourseCommands {
    public type CreateGolfCourse = {
        holes: [GolfHole]
    };

    public type GolfHole = {
        holeNumber: Nat8;
        strokeIndex: Nat8;
        yardage: Nat16;
    }
}