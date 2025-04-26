import MopsGolfIds "../mops_golf_ids";
import MopsGolfEnums "../mops_golf_enums";
module GolfCourseCommands {
    public type CreateTournament = {
        name: Text;
    };

    public type CreateTournamentInstance = {
        tournamentId: MopsGolfIds.TournamentId;
        golfCourseId: MopsGolfIds.GolfCourseId;
        year: Nat16;
        startDate: Int;
        endDate: Int;
    };

    public type AddTournamentResult = {
        tournamentId: MopsGolfIds.TournamentId;
        year: Nat16;
        golferId: MopsGolfIds.GolferId;
    };

    public type UpdateTournamentStage = {
        tournamentId: MopsGolfIds.TournamentId;
        year: Nat16;
        stage: MopsGolfEnums.TournamentStage;
    };
}