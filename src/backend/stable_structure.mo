import Base "mo:waterway-mops/BaseTypes";

module StableStructure {

    public class ScalableType()  {
        private var stable_canister_index : [(Any, Base.CanisterId)] = [];
        private var stable_active_canister_id : Base.CanisterId = "";
        private var stable_unique_canister_ids : [Base.CanisterId] = [];
        private var stable_total_entries: Nat = 0;
        private var stable_next_id : Any = "";

        
    };
}