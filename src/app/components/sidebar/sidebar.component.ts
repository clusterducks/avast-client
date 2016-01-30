import {Component, NgZone, OnInit, OnDestroy} from 'angular2/core';
import {Router} from 'angular2/router';
import {AppStore} from '../../store/index.store';

import {ConsulActions} from '../../actions/consul.actions';
import {NodesService} from '../nodes/providers/nodes.service';
import {SwarmNode, SwarmHealthCheck} from '../nodes/interfaces/swarm-node';

@Component({
  selector: 'avast-sidebar',
  template: require('./sidebar.component.html'),
  styles: [
    require('./sidebar.component.css')
  ]
})

export class SidebarComponent {
  public datacenters: string[] = [];
  public currentDatacenter: string = 'dc1';
  public nodes: SwarmNode[] = [];
  private zone: NgZone;
  private leader: string;
  private nodeStatus: SwarmHealthCheck;
  private isFetchingDatacenters: boolean = false;
  private isFetchingNodes: boolean = false;
  private unsubscribe: Function;

  constructor(private _router: Router,
              private _zone: NgZone,
              private _appStore: AppStore,
              private _consulActions: ConsulActions,
              private _nodesService: NodesService) {
    this.zone = _zone;
  }

  ngOnInit() {
    //this.unsubscribe =
    this._appStore.subscribe((state) => {
      this.zone.run(() => {
        this.datacenters = state.consul.datacenters;
        this.nodes = state.consul.nodes;
        this.leader = state.consul.leader;
        this.isFetchingDatacenters = state.consul.isFetchingDatacenters;
        this.isFetchingNodes = state.consul.isFetchingNodes;
      });
    });

    this._appStore.dispatch(this._consulActions.fetchDatacenters());
    this._appStore.dispatch(this._consulActions.fetchNodes(this.currentDatacenter));
  }

  // @TODO: attach this to a change detection (EventEmitter) so that it can be:
  // 1.) loaded by default at the app load
  // 2.) work when someone picks a different dc
  selectDatacenter(dc: string) {
    this.currentDatacenter = dc;
    //this._appStore.dispatch(this._consulActions.fetchNodes(this.currentDatacenter));
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

  isLeader(node: SwarmNode) {
    return !!(node.address === this.leader);
  }

  private ngOnDestroy() {
    //this.unsubscribe();
  }
}
