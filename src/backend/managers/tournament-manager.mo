import Result "mo:base/Result";
import Enums "mo:waterway-mops/base/enums";
import TournamentQueries "mo:waterway-mops/product/icgc/data-canister-queries/tournament-queries";

module {
    public class TournamentManager() {

        public func getTournamentInstance() : Result.Result<TournamentQueries.TournamentInstance, Enums.Error>{
            return #err(#NotFound); // TODO
        };
        
    };
};
