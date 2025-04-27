import GolfIds "mo:waterway-mops/golf/GolfIds";

module UserCommands {
    public type CreateProfile = {
        username: Text;
        profilePicture: ?Blob;
    };

    public type UpdateProfilePicture = {
        profilePicture: ?Blob;
    };

    public type UpdateUsername = {
        username: Text;
    };

    public type SubmitPrediction = {
        tournamentId: GolfIds.TournamentId;
        year: Nat16;
        hole1GolferId: GolfIds.ProGolferId;
        hole2GolferId: GolfIds.ProGolferId;
        hole3GolferId: GolfIds.ProGolferId;
        hole4GolferId: GolfIds.ProGolferId;
        hole5GolferId: GolfIds.ProGolferId;
        hole6GolferId: GolfIds.ProGolferId;
        hole7GolferId: GolfIds.ProGolferId;
        hole8GolferId: GolfIds.ProGolferId;
        hole9GolferId: GolfIds.ProGolferId;
        hole10GolferId: GolfIds.ProGolferId;
        hole11GolferId: GolfIds.ProGolferId;
        hole12GolferId: GolfIds.ProGolferId;
        hole13GolferId: GolfIds.ProGolferId;
        hole14GolferId: GolfIds.ProGolferId;
        hole15GolferId: GolfIds.ProGolferId;
        hole16GolferId: GolfIds.ProGolferId;
        hole17GolferId: GolfIds.ProGolferId;
        hole18GolferId: GolfIds.ProGolferId;
    };

    public type SwapGolfer = {
        tournamentId: GolfIds.TournamentId;
        year: Nat16;
        removedGolferId: GolfIds.ProGolferId;
        removedGolferHole: Nat8;
        newGolferId: GolfIds.ProGolferId;
        newGolferHole: Nat8;
    };
}

  