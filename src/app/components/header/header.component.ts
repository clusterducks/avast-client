import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
  selector: 'avast-header',
  template: require('./header.component.html'),
  styles: [
    require('./header.component.css')
  ],
  directives: [ROUTER_DIRECTIVES]
})

export class HeaderComponent {
  public title = 'Avast';
}
