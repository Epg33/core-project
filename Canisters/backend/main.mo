import Principal "mo:base/Principal";
import Proposals "proposals";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Cycles "mo:base/ExperimentalCycles";
import Result "mo:base/Result";

shared ({ caller = owner }) actor class Backend() = {
  type Err = {
    #Unauthorized;
    #NoFound;
    #NotEnoughCycles;
    #ProposalNotFound;
  };

  stable var creator : Principal = owner;

  public type Proposal = Proposals.Proposal;

  stable var proposalsArray : [Proposal] = [];
  var proposalsMap = HashMap.HashMap<Nat, Proposal>(0, Nat.equal, Hash.hash);
  stable var proposalsCount = 0;

  stable var userArray : [Principal] = [];
  stable var userCounter = 0;
  let price = 1_000_000_000;

  // public shared ({ caller = user }) func createProposal( proposal : Proposal ) : async Result.Result<Text, Err> {

  // };

  //USERS

  //PROPOSALS
  public shared ({ caller = user }) func createProposal(proposal : Proposal) : async Result.Result<Text, Err> {
    var isUser : ?Principal = Array.find<Principal>(userArray, func x = x == user);
    switch (isUser) {
      case (?isUser) {
        proposalsCount := proposalsCount +1;
        var newProposal : Proposal = proposal;
        proposalsMap.put(proposalsCount, newProposal);
        #ok "created succesfully";
      };
      case (_) {
        #err(#Unauthorized);
      };
    };
  };

  public shared ({ caller = user }) func voteProposal(id : Nat, vote : Bool) : async Result.Result<Text, Err> {
    var isUser : ?Principal = Array.find<Principal>(userArray, func x = x == user);
    switch (isUser) {
      case (?isUser) {
        let cycles = Cycles.available();
        if (cycles < price) {
          return #err(#NotEnoughCycles);
        } else {
          ignore Cycles.accept(price);

          var currentProposal : ?Proposal = proposalsMap.get(id);
          switch (currentProposal) {
            case (null) {
              return #err(#ProposalNotFound);
            };
            case (?proposal) {
              if (vote) {
                var votedProposal = {
                  id = proposal.id;
                  user = proposal.user;
                  body = proposal.body;
                  voteCount = {
                    yes = proposal.voteCount.yes + cycles;
                    no = proposal.voteCount.no;
                  };
                };
                proposalsMap.put(id, votedProposal);
                #ok("propuesta votada");
              } else {
                var votedProposal = {
                  id = proposal.id;
                  user = proposal.user;
                  body = proposal.body;
                  voteCount = {
                    yes = proposal.voteCount.yes;
                    no = proposal.voteCount.no + cycles;
                  };
                };
                proposalsMap.put(id, votedProposal);
                #ok("propuesta votada");
              };
            };
          };
        };
      };
      case (_) {
        return #err(#Unauthorized);
      };
    };
  };
  
  system func preupgrade() {
    proposalsArray := Iter.toArray<Proposal>(proposalsMap.vals());
  };

  system func postupgrade() {
    proposalsArray := [];
    userArray := [];

  };

};
