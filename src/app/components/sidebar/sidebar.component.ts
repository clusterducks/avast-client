import {Component, OnInit, OnDestroy} from 'angular2/core';
import {Router} from 'angular2/router';
import {AppStore} from 'angular2-redux';

import {ConsulActions} from '../../actions/consul.actions';
import {SwarmNode} from '../nodes/interfaces/swarm-node';
import {NodesService} from '../nodes/providers/nodes.service';

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
  private isFetchingDatacenters: boolean = false;
  private isFetchingNodes: boolean = false;
  private unsubscribe: Function;

  constructor (private _router: Router,
               private _appStore: AppStore,
               private _consulActions: ConsulActions,
               private _nodesService: NodesService) {
  }

  ngOnInit() {
    this.unsubscribe = this._appStore.subscribe((state) => {
      console.log(state.consul);
      this.datacenters = state.consul.datacenters;
      this.nodes = state.consul.nodes;
      this.isFetchingDatacenters = state.consul.isFetchingDatacenters;
      this.isFetchingNodes = state.consul.isFetchingNodes;
    });

    this._appStore.dispatch(this._consulActions.fetchDatacenters());
    this._appStore.dispatch(this._consulActions.fetchNodes(this.currentDatacenter));
  }

  // @TODO: attach this to a change detection (EventEmitter) so that it can be:
  // 1.) loaded by default at the app load
  // 2.) work when someone picks a different dc
  selectDatacenter(dc: string) {
    this.currentDatacenter = dc;
    this._appStore.dispatch(this._consulActions.fetchNodes(this.currentDatacenter));
  }

  gotoNode(name: string) {
    console.log(name);
    this._router.navigate(['NodeDetail', { name: name }]);
  }

  private ngOnDestroy() {
    this.unsubscribe();
  }
}
