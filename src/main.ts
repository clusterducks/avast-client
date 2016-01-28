import {provide, enableProdMode} from 'angular2/core';
import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {createStore, combineReducers, applyMiddleware} from 'redux';
//import thunk from 'redux-thunk';
const thunkMiddleware = require('redux-thunk');
import {AppStore} from 'angular2-redux';
import 'rxjs/add/operator/map';

import {AppComponent} from './app/components/app.component';
import {NodesService} from './app/components/nodes/providers/nodes.service';
import {ConsulActions} from './app/actions/consul.actions';
import {DockerActions} from './app/actions/docker.actions';
import rootReducer from './app/reducers/index.reducer';

const loggerMiddleware = store => next => action => {
    //console.log('dispatching', action);
    let result = next(action);
    //console.log('next state', store.getState());
    return result;
};

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, loggerMiddleware)(createStore);
const appStore = new AppStore(createStoreWithMiddleware(rootReducer));

enableProdMode();
bootstrap(AppComponent, [
  ...HTTP_PROVIDERS,
  ...ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy}),
  provide(AppStore, {useValue: appStore}),
  NodesService,
  ConsulActions,
  DockerActions
])
.catch(err => console.error(err));
