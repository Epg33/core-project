import Principal "mo:base/Principal";
import Text "mo:base/Text";

module Proposal {
  public type Proposal = {
    id : Nat;
    user: Principal;
    body: Text;
    voteCount: {
      yes : Nat;
      no : Nat;
    };
  };
}