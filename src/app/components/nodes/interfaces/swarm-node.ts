///<reference path="../../../../../node_modules/immutable/dist/immutable.d.ts"/>
import {List, Record} from 'immutable';

const SwarmNodeRecord = Record({
  name: '',
  address: '',
  services: List([]),
  checks: List([]),
  isLeader: false
});

export class SwarmNode extends SwarmNodeRecord {
  name:     string;
  address:  string;
  services: List<SwarmService>;
  checks:   List<SwarmHealthCheck>;
  isLeader: boolean;

  constructor(props) {
    super(props);
  }
}

const SwarmServiceRecord = Record({
  id: '',
  service: '',
  tags: [],
  port: 0,
  address: ''
});

export class SwarmService extends SwarmServiceRecord {
  id:       string;
  service:  string;
  tags:     string[];
  port:     number;
  address:  string;

  constructor(props) {
    super(props);
  }
}

const SwarmHealthCheckRecord = Record({
  node: '',
  checkId: '',
  name: '',
  status: '',
  notes: '',
  output: '',
  serviceId: '',
  serviceName: ''
});

export class SwarmHealthCheck extends SwarmHealthCheckRecord {
  node:         string;
  checkId:      string;
  name:         string;
  status:       string;
  notes:        string;
  output:       string;
  serviceId:    string;
  serviceName:  string;

  constructor(props) {
    super(props);
  }
}
