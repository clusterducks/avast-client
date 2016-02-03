import {Injectable} from 'angular2/core';
import {AppStore} from '../../../store/index.store';

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
            case 'key':
              switch (d.data.key) {
                case 'barney/docker/swarm/leader':
                  vm._appStore.dispatch(vm._consulActions.receiveLeader(atob(d.data.value)));
                  break;
              }
              break;
            case 'nodes':
              //vm._appStore.dispatch(vm._consulActions.receiveNodes(null, d.data));
              break;
            case 'checks':
              vm._appStore.dispatch(vm._consulActions.receiveNodeHealth(d.data));
              break;
            case 'service':
              break;
          }
      }
    };
  }

}
