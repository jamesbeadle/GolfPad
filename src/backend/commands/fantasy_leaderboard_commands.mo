import GolfIds "mo:waterway-mops/golf/GolfIds";
module GolfCourseCommands {

    public type CalculateLeaderboard = {
        tournamentId: GolfIds.TournamentId;
        year: Nat16;
    };
}