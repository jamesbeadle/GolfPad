module GolfCourseCommands {
    public type CreateGolfer = {
        username: Text;
        lastName: Text;
    };

    public type UpdateGolfer = {
        firstName: Text;
        lastName: Text;
    };
}