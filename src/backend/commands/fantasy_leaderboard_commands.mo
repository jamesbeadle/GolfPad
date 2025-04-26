import MopsGolfIds "../mops_golf_ids";
module GolfCourseCommands {

    public type CalculateLeaderboard = {
        tournamentId: MopsGolfIds.TournamentId;
        year: Nat16;
    };
}