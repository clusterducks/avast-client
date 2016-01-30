import {provide, enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
//import 'rxjs/add/operator/map';

import {AppComponent} from './app/components/app.component';
import {NodesService} from './app/components/nodes/providers/nodes.service';
import {AppStore} from './app/store/index.store';
import {ConsulActions} from './app/actions/consul.actions';
import {DockerActions} from './app/actions/docker.actions';
import {UiStateActions} from './app/actions/ui-state.actions';

enableProdMode();
bootstrap(AppComponent, [
  ...HTTP_PROVIDERS,
  ...ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  NodesService,
  AppStore,
  ConsulActions,
  DockerActions,
  UiStateActions
])
.catch(err => console.error(err));
