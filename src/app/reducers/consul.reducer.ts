///<reference path="../../../node_modules/immutable/dist/immutable.d.ts"/>
import {List} from 'immutable';

import * as ConsulActions from '../actions/consul.actions';
import {SwarmNode, SwarmHealthCheck} from '../components/nodes/interfaces/swarm-node';

export const initialConsulState = {
  datacenters: List([]),
  nodes: List([]),
};

function consulDatacenters(state: List<string> = List([]), action: any) {
  switch (action.type) {
    case ConsulActions.RECEIVE_DATACENTERS:
      return List(action.datacenters);

    default:
      return state;
  }
}

function consulNodes(state: List<SwarmNode> = List([]), action: any) {
  switch (action.type) {
    case ConsulActions.RECEIVE_NODES:
      return state.mergeDeep(action.nodes);

    //case ConsulActions.RECEIVE_NODE:
    //  return Object.assign({}, state, {
    //    node: action.node,
    //    isFetchingNode: false
    //  });

    case ConsulActions.RECEIVE_NODE_HEALTH:
      return updateNodeHealth(state, action);

    case ConsulActions.RECEIVE_LEADER:
      return updateNodeLeader(state, action);

    default:
      return state;
  }
}

function updateNodeHealth(state, action) {
  let i = state.findIndex((node: SwarmNode) => node.name === action.check.node);
  let node: SwarmNode = state.get(i);
  if (!node) {
    return state;
  }
  if (!node.checks) {
    return state.set(i, Object.assign({}, node, {
      checks: List([new SwarmHealthCheck(action.check)])
    }));
  }

  let j = node.checks.findIndex((chk: SwarmHealthCheck) => chk.checkId === action.check.checkId);
  return state.set(i, Object.assign({}, node, {
    checks: node.checks.set(j, new SwarmHealthCheck(action.check))
  }));
}

function updateNodeLeader(state, action) {
  state.forEach((node: SwarmNode) => node.isLeader = false);
  let i = state.findIndex((node: SwarmNode) => node.address === action.leader);
  let node: SwarmNode = state.get(i);
  if (!node) {
    return state.push(new SwarmNode({
      name: 'Loading...',
      address: action.leader,
      services: List([]),
      checks: List([]),
      isLeader: true
    }));
  }

  return state.set(i, Object.assign({}, node, {
    isLeader: true
  }));
}

export {consulDatacenters, consulNodes};
