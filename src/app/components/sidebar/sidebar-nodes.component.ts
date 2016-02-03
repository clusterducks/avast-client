import {Component, Input} from 'angular2/core';
import {Router} from 'angular2/router';
import {List} from 'immutable';

import {SwarmNode, SwarmHealthCheck} from '../nodes/interfaces/swarm-node';

@Component({
  selector: 'sidebar-nodes',
  template: require('./sidebar-nodes.component.html'),
  styles: [
    require('./sidebar-nodes.component.css')
  ]
})

export class SidebarNodesComponent {
  @Input() nodes: List<SwarmNode>;

  private nodeStatus: SwarmHealthCheck;
  private isFetchingDatacenters: boolean = false;
  private isFetchingNodes: boolean = false;

  constructor(private _router: Router) {
  }

  getNodeStatus(node?: SwarmNode) {
    if (!node || !node.checks) {
      return;
    }
    let nodeCheck: SwarmHealthCheck;
    node.checks.some((check) => {
      if (check.checkId === 'serfHealth') {
        nodeCheck = check;
        return true;
      }
    });
    this.nodeStatus = nodeCheck;
    return nodeCheck;
  }

  gotoNode(name: string) {
    this._router.navigate(['NodeDetail', { name: name }]);
  }
}
