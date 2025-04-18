import Types "../data-types/types";
module GolfCourseCommands {
    public type CreateGolfCourse = {
        name: Text;
        holes: [GolfHole];
        yardage: Nat16;
        coursePar: Nat8;
    };

    public type GolfHole = {
        holeNumber: Nat8;
        strokeIndex: Nat8;
        yardage: Nat16;
        par: Nat8;
    };

    public type UpdateGolfCourse = {
        id: Types.GolfCourseId;
        name: Text;
        holes: [GolfHole];
        yardage: Nat16;
        coursePar: Nat8;
    };
}