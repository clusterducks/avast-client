import {List} from 'immutable';

import * as ConsulActions from '../actions/consul.actions';
import {SwarmNode, SwarmHealthCheck, INodeState} from '../components/nodes/interfaces/swarm-node';

export const initialConsulState = {
  datacenters: List([]),
  nodes: List([]),
};

export default (state: INodeState = <INodeState>{}, action: any = {}) => {
  switch (action.type) {
    case ConsulActions.REQUEST_DATACENTERS:
      return Object.assign({}, state, {
        isFetchingDatacenters: true
      });

    case ConsulActions.RECEIVE_DATACENTERS:
      return Object.assign({}, state, {
        datacenters: action.datacenters,
        isFetchingDatacenters: false
      });

    case ConsulActions.REQUEST_NODES:
      return Object.assign({}, state, {
        dc: action.dc,
        isFetchingNodes: true
      });

    case ConsulActions.RECEIVE_NODES:
      return Object.assign({}, state, {
        dc: action.dc,
        nodes: action.nodes,
        isFetchingNodes: false
      });

    case ConsulActions.REQUEST_NODE:
      return Object.assign({}, state, {
        name: action.name,
        isFetchingNode: true
      });

    case ConsulActions.RECEIVE_NODE:
      return Object.assign({}, state, {
        name: action.dc,
        node: action.node,
        isFetchingNode: false
      });

    case ConsulActions.RECEIVE_NODE_HEALTH: {
      if (!state.nodes) {
        return state;
      }

      let i: number = (state.nodes || [])
        .map((node) => node.name)
        .indexOf(action.check.node);
      let c = (state.nodes[i].checks || [])
        .map((chk) => chk.checkId)
        .indexOf(action.check.checkId);

      return Object.assign({}, state, {
        nodes: [
          ...state.nodes.slice(0, i),
          Object.assign({}, state.nodes[i], {
            checks: [
              ...(state.nodes[i].checks || []).slice(0, c),
              action.check,
              ...(state.nodes[i].checks || []).slice(c + 1)
            ]
          }),
          ...state.nodes.slice(i + 1)
        ]
      });
    }

    case ConsulActions.RECEIVE_LEADER:
      return Object.assign({}, state, {
        leader: action.leader
      });

    default:
      return state;
  }
};
