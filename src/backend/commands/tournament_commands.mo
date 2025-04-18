import Types "../data-types/types";
module GolfCourseCommands {
    public type CreateTournament = {
        name: Text;
    };

    public type CreateTournamentInstance = {
        tournamentId: Types.TournamentId;
        golfCourseId: Types.GolfCourseId;
        year: Nat16;
        startDate: Int;
        endDate: Int;
    };

    public type AddTournamentResult = {
        tournamentId: Types.TournamentId;
        year: Nat16;
        golferId: Types.GolferId;
    };

    public type UpdateTournamentStage = {
        tournamentId: Types.TournamentId;
        year: Nat16;
        stage: Types.TournamentStage;
    };
}