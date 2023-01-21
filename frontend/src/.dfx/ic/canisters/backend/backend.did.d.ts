import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Backend {
  'createProposal' : ActorMethod<[Proposal], Result>,
  'deleteProposal' : ActorMethod<[bigint], Result>,
  'getProposal' : ActorMethod<[bigint], [] | [Proposal]>,
  'getProposals' : ActorMethod<[], Array<Proposal>>,
  'loginUser' : ActorMethod<[], Result>,
  'voteProposal' : ActorMethod<[bigint, boolean], Result>,
}
export type Err = { 'ProposalNotFound' : null } |
  { 'Anonymus' : null } |
  { 'Unauthorized' : null } |
  { 'NotEnoughMBT' : null };
export type Ok = { 'Loged' : boolean } |
  { 'Completed' : null };
export interface Proposal {
  'voteCount' : { 'no' : bigint, 'yes' : bigint },
  'body' : string,
  'user' : Principal,
  'passed' : boolean,
}
export type Result = { 'ok' : Ok } |
  { 'err' : Err };
export interface _SERVICE extends Backend {}
