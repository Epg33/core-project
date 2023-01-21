export const idlFactory = ({ IDL }) => {
  const Proposal = IDL.Record({
    'voteCount' : IDL.Record({ 'no' : IDL.Nat, 'yes' : IDL.Nat }),
    'body' : IDL.Text,
    'user' : IDL.Principal,
    'passed' : IDL.Bool,
  });
  const Ok = IDL.Variant({ 'Loged' : IDL.Bool, 'Completed' : IDL.Null });
  const Err = IDL.Variant({
    'ProposalNotFound' : IDL.Null,
    'Anonymus' : IDL.Null,
    'Unauthorized' : IDL.Null,
    'NotEnoughMBT' : IDL.Null,
  });
  const Result = IDL.Variant({ 'ok' : Ok, 'err' : Err });
  const Backend = IDL.Service({
    'createProposal' : IDL.Func([Proposal], [Result], []),
    'deleteProposal' : IDL.Func([IDL.Nat], [Result], []),
    'getProposal' : IDL.Func([IDL.Nat], [IDL.Opt(Proposal)], ['query']),
    'getProposals' : IDL.Func([], [IDL.Vec(Proposal)], ['query']),
    'loginUser' : IDL.Func([], [Result], []),
    'voteProposal' : IDL.Func([IDL.Nat, IDL.Bool], [Result], []),
  });
  return Backend;
};
export const init = ({ IDL }) => { return []; };
