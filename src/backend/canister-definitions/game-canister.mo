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

actor class _GameCanister() {

  private var activeGroup: Nat8 = 1;
  private var golferGroupIndexes : TrieMap.TrieMap<T.PrincipalId, Nat8> = TrieMap.TrieMap<T.PrincipalId, Nat8>(Text.equal, Text.hash);
  
  private stable var gameGroup1 : [T.Game] = [];
  private stable var gameGroup2 : [T.Game] = [];
  private stable var gameGroup3 : [T.Game] = [];
  private stable var gameGroup4 : [T.Game] = [];
  private stable var gameGroup5 : [T.Game] = [];
  private stable var gameGroup6 : [T.Game] = [];
  private stable var gameGroup7 : [T.Game] = [];
  private stable var gameGroup8 : [T.Game] = [];
  private stable var gameGroup9 : [T.Game] = [];
  private stable var gameGroup10 : [T.Game] = [];
  private stable var gameGroup11 : [T.Game] = [];
  private stable var gameGroup12 : [T.Game] = [];
  private stable var gameGroup13 : [T.Game] = [];
  private stable var gameGroup14 : [T.Game] = [];
  private stable var gameGroup15 : [T.Game] = [];
  private stable var gameGroup16 : [T.Game] = [];
  private stable var gameGroup17 : [T.Game] = [];
  private stable var gameGroup18 : [T.Game] = [];
  private stable var gameGroup19 : [T.Game] = [];
  private stable var gameGroup20 : [T.Game] = [];
  private stable var gameGroup21 : [T.Game] = [];
  private stable var gameGroup22 : [T.Game] = [];
  private stable var gameGroup23 : [T.Game] = [];
  private stable var gameGroup24 : [T.Game] = [];
  private stable var gameGroup25 : [T.Game] = [];
  private stable var gameGroup26 : [T.Game] = [];
  private stable var gameGroup27 : [T.Game] = [];
  private stable var gameGroup28 : [T.Game] = [];
  private stable var gameGroup29 : [T.Game] = [];
  private stable var gameGroup30 : [T.Game] = [];
  private stable var gameGroup31 : [T.Game] = [];
  private stable var gameGroup32 : [T.Game] = [];
  private stable var gameGroup33 : [T.Game] = [];
  private stable var gameGroup34 : [T.Game] = [];
  private stable var gameGroup35 : [T.Game] = [];
  private stable var gameGroup36 : [T.Game] = [];
  private stable var gameGroup37 : [T.Game] = [];
  private stable var gameGroup38 : [T.Game] = [];
  private stable var gameGroup39 : [T.Game] = [];
  private stable var gameGroup40 : [T.Game] = [];
  private stable var gameGroup41 : [T.Game] = [];
  private stable var gameGroup42 : [T.Game] = [];
  private stable var gameGroup43 : [T.Game] = [];
  private stable var gameGroup44 : [T.Game] = [];
  private stable var gameGroup45 : [T.Game] = [];
  private stable var gameGroup46 : [T.Game] = [];
  private stable var gameGroup47 : [T.Game] = [];
  private stable var gameGroup48 : [T.Game] = [];
  private stable var gameGroup49 : [T.Game] = [];
  private stable var gameGroup50 : [T.Game] = [];

  //add game

  //get game

  //update game

  //delete game

  //post upgrade

};
