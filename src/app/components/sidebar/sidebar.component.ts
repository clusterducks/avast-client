import {Component, NgZone, OnInit, OnDestroy} from 'angular2/core';
import {Router} from 'angular2/router';
import {AppStore} from '../../store/index.store';

import {SidebarNodesComponent} from './sidebar-nodes.component';
import {ConsulActions} from '../../actions/consul.actions';
import {NodesService} from '../nodes/providers/nodes.service';
import {SwarmNode, SwarmHealthCheck} from '../nodes/interfaces/swarm-node';

@Component({
  selector: 'avast-sidebar',
  directives: [SidebarNodesComponent],
  template: require('./sidebar.component.html'),
  styles: [
    require('./sidebar.component.css')
  ]
})

export class SidebarComponent {
  public datacenters: string[] = [];
  public currentDatacenter: string = 'dc1';
  private isFetchingDatacenters: boolean = false;
  private isFetchingNodes: boolean = false;
  //private unsubscribe: Function;

  constructor(private _router: Router,
              //private _zone: NgZone,
              private _appStore: AppStore,
              private _consulActions: ConsulActions,
              private _nodesService: NodesService) {
  }

  ngOnInit() {
    //this.unsubscribe =
    //this._appStore.subscribe((state) => {
    //  this._zone.run(() => {
    //    this.datacenters = state.consulDatacenters;
    //    //this.nodes = state.consulNodes;
    //    //this.leader = state.consul.leader;
    //    //this.isFetchingDatacenters = state.uiState.isFetchingDatacenters;
    //    //this.isFetchingNodes = state.uiState.isFetchingNodes;
    //  });
    //});

    //this._appStore.dispatch(this._consulActions.fetchDatacenters());
    //this._appStore.dispatch(this._consulActions.fetchNodes(this.currentDatacenter));
  }

  // @TODO: attach this to a change detection (EventEmitter) so that it can be:
  // 1.) loaded by default at the app load
  // 2.) work when someone picks a different dc
  selectDatacenter(dc: string) {
    this.currentDatacenter = dc;
    //this._appStore.dispatch(this._consulActions.fetchNodes(this.currentDatacenter));
  }

  private ngOnDestroy() {
    //this.unsubscribe();
  }
}
