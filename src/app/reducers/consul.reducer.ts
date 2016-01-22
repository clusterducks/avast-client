import * as ConsulActions from '../actions/consul.actions';
import {SwarmNode, SwarmHealthCheck, INodeState} from '../components/nodes/interfaces/swarm-node';

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

    case ConsulActions.UPDATE_NODE_HEALTH: {
      // @TODO: move this to nodes.service
      let nodes: SwarmNode[] = <SwarmNode[]>state.nodes;
      if (!nodes) {
        return state;
      }

      nodes.some(function(node) {
        if (node.name === action.check.node) {
          if (!node.checks) {
            node.checks = [action.check];
            return true;
          }
          node.checks.some(function(check) {
            if (check.checkId === action.check.checkId) {
              Object.assign(check, check, action.check);
              return true;
            }
          });
        }
      });

      return Object.assign({}, state, {
        nodes: nodes
      });
    }

    default:
      return state;
  }
};
