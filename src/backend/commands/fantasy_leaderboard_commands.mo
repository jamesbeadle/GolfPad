import GolfIds "mo:waterway-mops/domain/golf/ids";
module GolfCourseCommands {
    public type CalculateLeaderboard = {
        tournamentId: GolfIds.TournamentId;
        year: Nat16;
    };
}