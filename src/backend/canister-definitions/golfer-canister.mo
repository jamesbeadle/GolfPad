import Array "mo:base/Array";
import Buffer "mo:base/Buffer";
import Cycles "mo:base/ExperimentalCycles";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Nat8 "mo:base/Nat8";
import Option "mo:base/Option";
import Order "mo:base/Order";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Timer "mo:base/Timer";
import TrieMap "mo:base/TrieMap";

import DTOs "../dtos/DTOs";
import Environment "../utilities/Environment";
import T "../data-types/types";
import Utilities "../utilities/Utilities";

actor class _GolferCanister() {

  private var profileGroupIndexes : TrieMap.TrieMap<T.PrincipalId, Nat8> = TrieMap.TrieMap<T.PrincipalId, Nat8>(Text.equal, Text.hash);

  private stable var stable_manager_group_indexes : [(T.PrincipalId, Nat8)] = [];
  private stable var profileGroup1 : [T.Golfer] = [];
  private stable var profileGroup2 : [T.Golfer] = [];
  private stable var profileGroup3 : [T.Golfer] = [];
  private stable var profileGroup4 : [T.Golfer] = [];
  private stable var profileGroup5 : [T.Golfer] = [];
  private stable var profileGroup6 : [T.Golfer] = [];
  private stable var profileGroup7 : [T.Golfer] = [];
  private stable var profileGroup8 : [T.Golfer] = [];
  private stable var profileGroup9 : [T.Golfer] = [];
  private stable var profileGroup10 : [T.Golfer] = [];
  private stable var profileGroup11 : [T.Golfer] = [];
  private stable var profileGroup12 : [T.Golfer] = [];
  private stable let cyclesCheckInterval : Nat = Utilities.getHour() * 24;
  private stable var cyclesCheckTimerId : ?Timer.TimerId = null;
  private stable var activeGroupIndex : Nat8 = 0;
  private stable var totalProfiles = 0;


  public shared ({caller}) func hasFriends(golferPrincipalId: T.PrincipalId, inviteIds: [T.PrincipalId]) : async Bool{

    



    return false;
  }

  ///TODO: Checks - move add yardage club checks and all checks in here for single call
      

};
