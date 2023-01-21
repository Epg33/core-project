import Principal "mo:base/Principal";
import Proposals "proposals";
import HashMap "mo:base/HashMap";
import Nat "mo:base/Nat";
import Hash "mo:base/Hash";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Cycles "mo:base/ExperimentalCycles";
import Result "mo:base/Result";
import Bool "mo:base/Bool";


shared ({ caller = owner }) actor class Backend() = {
  type Err = {
    #Unauthorized;
    #Anonymus;
    #NotEnoughMBT;
    #ProposalNotFound;
  };

  type Ok = {
    #Completed;
    #Loged : Bool;
  };

  let mbtBalance : actor{ icrc1_balance_of : ({owner: Principal; subaccount: ?Nat8}) -> async Nat} = actor("db3eq-6iaaa-aaaah-abz6a-cai");

  let updateText : actor{ update_current_text: (text: Text ) -> async () } = actor("r7inp-6aaaa-aaaaa-aaabq-cai");

  stable var creator : Principal = owner;

  public type Proposal = Proposals.Proposal;
  stable var proposalsArray : [(Nat, Proposal)] = [];
  var proposalsMap = HashMap.fromIter<Nat, Proposal>(proposalsArray.vals(), 0, Nat.equal, Hash.hash);
  stable var proposalsCount = 0;

  stable var userArray : [Principal] = [];
  stable var userCounter = 0;

  private func validateUser(user: Principal) : Bool {
    var User : ?Principal = Array.find<Principal>(userArray, func x = x==user);
    switch(User){
      case(? userExist) { true };
      case(_) {false};
    };
  };

  public shared ({caller = user}) func loginUser(): async Result.Result<Ok, Err>{
    let User : ?Principal = Array.find<Principal>(userArray, func x = x==user);
    switch(User){
      case(null) {
        if(Principal.isAnonymous(user)){
          return #err(#Anonymus);
        } else {
          userArray := Array.append(userArray,  [user]);
          return #ok(#Loged(true));
        };
      };
      case(? userExist) {
        return #ok(#Loged(true));
       };
    };
  };

  public shared ({ caller = user }) func createProposal(proposal : Proposal) : async Result.Result<Ok, Err> {
    if(validateUser(user)){
      let userTokens : Nat = await mbtBalance.icrc1_balance_of({owner = user; subaccount = null});
      if(userTokens > 1){
        proposalsCount += 1;
        let id : Nat = proposalsCount;
        proposalsMap.put(id, proposal);
        #ok(#Completed);        
      } else {
        #err(#NotEnoughMBT);
      }
    } else {
      #err(#Unauthorized);
    };
  };

  public shared ({ caller = user }) func voteProposal(id : Nat, vote : Bool) : async Result.Result<Ok, Err> {
    let currProposal : ?Proposal = proposalsMap.get(id);
    if(validateUser(user)){
      let userTokens : Nat = await mbtBalance.icrc1_balance_of({owner = user; subaccount = null});
      if(userTokens>=1){
        switch(currProposal) {
          case(null) { 
            return #err(#ProposalNotFound);
           };
          case(? proposal) { 
            var votesY: Nat = proposal.voteCount.yes;
            var votesN: Nat = proposal.voteCount.no;
            var passed : Bool = false;
            if(vote){
              votesY += userTokens;
            } else {
              votesN += userTokens;
            };
            let balance : Nat = votesY-votesN;
            if(balance>=100){
              passed := true;
              ignore updateText.update_current_text(proposal.body);
            };
            var updatedProposal : Proposal = {
              user = proposal.user;
              body = proposal.body;
              voteCount = {
                yes = votesY;
                no = votesN;
              };
              passed = passed;
            };
            proposalsMap.put(id, updatedProposal);
            return #ok(#Completed);
          };
        };
      } else {
        return #err(#NotEnoughMBT);
      }
    } else {
      return #err(#Unauthorized);
    }
  };

  public shared ({caller = user}) func deleteProposal(id : Nat) : async Result.Result<Ok, Err> {
    if(user == creator) {
      let proposal : ?Proposal = proposalsMap.get(id);
      switch(proposal) {
        case(null) { 
          return #err(#ProposalNotFound);
         };
        case(? pro) { 
          ignore proposalsMap.remove(id);
          return #ok(#Completed);
        };
      };
    } else {
      return #err(#Unauthorized);
    }
  };  

  public query func getProposals() : async [Proposal] {
    return Iter.toArray<Proposal>(proposalsMap.vals());
  };
  
  public query func getProposal(id: Nat) : async ?Proposal {
    return proposalsMap.get(id);
  };

  system func preupgrade() {
    proposalsArray := Iter.toArray<(Nat,Proposal)>(proposalsMap.entries());
  };

  system func postupgrade() {
    proposalsArray := [];
  };

};
