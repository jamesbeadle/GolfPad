import Types "../data-types/types";

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
        tournamentId: Types.TournamentId;
        year: Nat16;
        hole1GolferId: Types.GolferId;
        hole2GolferId: Types.GolferId;
        hole3GolferId: Types.GolferId;
        hole4GolferId: Types.GolferId;
        hole5GolferId: Types.GolferId;
        hole6GolferId: Types.GolferId;
        hole7GolferId: Types.GolferId;
        hole8GolferId: Types.GolferId;
        hole9GolferId: Types.GolferId;
        hole10GolferId: Types.GolferId;
        hole11GolferId: Types.GolferId;
        hole12GolferId: Types.GolferId;
        hole13GolferId: Types.GolferId;
        hole14GolferId: Types.GolferId;
        hole15GolferId: Types.GolferId;
        hole16GolferId: Types.GolferId;
        hole17GolferId: Types.GolferId;
        hole18GolferId: Types.GolferId;
    };

    public type SwapGolfer = {
        tournamentId: Types.TournamentId;
        year: Nat16;
        removedGolferId: Types.GolferId;
        removedGolferHole: Nat8;
        newGolferId: Types.GolferId;
        newGolferHole: Nat8;
    };
}

  