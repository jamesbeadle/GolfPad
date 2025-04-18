import Types "../data-types/types";
module GolfCourseCommands {

    public type CalculateLeaderboard = {
        tournamentId: Types.TournamentId;
        year: Nat16;
    };
}