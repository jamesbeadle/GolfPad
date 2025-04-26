import MopsGolfIds "../mops_golf_ids";

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
        tournamentId: MopsGolfIds.TournamentId;
        year: Nat16;
        hole1GolferId: MopsGolfIds.GolferId;
        hole2GolferId: MopsGolfIds.GolferId;
        hole3GolferId: MopsGolfIds.GolferId;
        hole4GolferId: MopsGolfIds.GolferId;
        hole5GolferId: MopsGolfIds.GolferId;
        hole6GolferId: MopsGolfIds.GolferId;
        hole7GolferId: MopsGolfIds.GolferId;
        hole8GolferId: MopsGolfIds.GolferId;
        hole9GolferId: MopsGolfIds.GolferId;
        hole10GolferId: MopsGolfIds.GolferId;
        hole11GolferId: MopsGolfIds.GolferId;
        hole12GolferId: MopsGolfIds.GolferId;
        hole13GolferId: MopsGolfIds.GolferId;
        hole14GolferId: MopsGolfIds.GolferId;
        hole15GolferId: MopsGolfIds.GolferId;
        hole16GolferId: MopsGolfIds.GolferId;
        hole17GolferId: MopsGolfIds.GolferId;
        hole18GolferId: MopsGolfIds.GolferId;
    };

    public type SwapGolfer = {
        tournamentId: MopsGolfIds.TournamentId;
        year: Nat16;
        removedGolferId: MopsGolfIds.GolferId;
        removedGolferHole: Nat8;
        newGolferId: MopsGolfIds.GolferId;
        newGolferHole: Nat8;
    };
}

  