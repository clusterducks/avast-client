import {Injectable} from 'angular2/core';
import {AppStore} from 'angular2-redux';

import {socket} from '../../../socket';
import {ConsulActions} from '../../../actions/consul.actions';

@Injectable()
export class NodesService {

  constructor (private _appStore: AppStore,
               private _consulActions: ConsulActions) {
    var vm = this;

    socket.onmessage = function(e) {
      var d = JSON.parse(e.data);

      switch (d.from) {
        case 'consul':
          switch (d.type) {
            case 'nodes':
              vm._appStore.dispatch(vm._consulActions.receiveNodes(null, d.data));
              break;
            case 'checks':
              vm._appStore.dispatch(vm._consulActions.updateNodeHealth(d.data));
              break;
            case 'service':
              break;
          }
      }
    };
  }

}
