import Types "../data-types/types";
module GolfCourseCommands {
    public type CreateTournament = {
        name: Text;
        golfCourseId: Int;
        startDate: Int;
        endDate: Int;
    };

    public type AddTournamentResult = {
        tournamentId: Types.TournamentId;
        golferId: Types.GolferId;
    };

    public type UpdateTournamentStage = {
        tournamentId: Types.TournamentId;
        stage: Types.TournamentStage;
    };
}