import {Component, NgZone, OnInit, OnDestroy} from 'angular2/core';
import {Router} from 'angular2/router';
import {AppStore} from '../../store/index.store';

import {DockerActions} from '../../actions/docker.actions';
import {DockerContainer} from './interfaces/docker-container';
import {ContainersGraph} from './directives/containers-graph.directive';

@Component({
  selector: 'avast-containers',
  template: require('./containers.component.html'),
  styles: [
    require('./containers.component.css')
  ],
  directives: [ContainersGraph]
})

export class ContainersComponent implements OnInit {
  public containers: DockerContainer[];
  public selectedContainer: DockerContainer;
  private zone: NgZone;
  private isFetchingContainers: boolean = false;
  private unsubscribe: Function;

  constructor(private _router: Router,
              private _zone: NgZone,
              private _appStore: AppStore,
              private _dockerActions: DockerActions) {
    this.zone = _zone;
  }

  ngOnInit() {
    //this.unsubscribe =
    this._appStore.subscribe((state) => {
      this.zone.run(() => {
        this.containers = state.docker.containers;
        this.isFetchingContainers = state.docker.isFetchingContainers;
      });
    });

    this._appStore.dispatch(this._dockerActions.fetchContainers());
  }

  onSelect(container: DockerContainer) {
    this.selectedContainer = container;
  }

  private ngOnDestroy() {
    //this.unsubscribe();
  }
}
