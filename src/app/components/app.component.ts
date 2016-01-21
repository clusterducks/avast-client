import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {NodesComponent} from './nodes/nodes.component';
import {NodeDetailComponent} from './nodes/node-detail.component';
import {ContainersComponent} from './containers/containers.component';
import {ImagesComponent} from './images/images.component';
import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';

@Component({
  selector: 'avast',
  template: require('./app.component.html'),
  styles: [require('./app.component.css')],
  directives: [
    ROUTER_DIRECTIVES,
    HeaderComponent,
    SidebarComponent
  ]
})

@RouteConfig([
  {
    path: '/',
    redirectTo: ['Dashboard']
  }, {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardComponent,
    useAsDefault: true
  }, {
    path: '/nodes',
    name: 'Nodes',
    component: NodesComponent
  }, {
    path: '/node/detail/:name',
    name: 'NodeDetail',
    component: NodeDetailComponent
  }, {
    path: '/containers',
    name: 'Containers',
    component: ContainersComponent
  }, {
    path: '/images',
    name: 'Images',
    component: ImagesComponent
  }
])

export class AppComponent {
}
