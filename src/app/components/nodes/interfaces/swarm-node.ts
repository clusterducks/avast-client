export interface SwarmService {
  id:       string;
  service:  string;
  tags:     string[];
  port:     number;
  address:  string;
}

export interface SwarmHealthCheck {
  node:         string;
  checkId:      string;
  name:         string;
  status:       string;
  notes:        string;
  output:       string;
  serviceId:    string;
  serviceName:  string;
}

export interface SwarmNode {
  name:     string;
  address:  string;
  services: SwarmService[];
  checks:   SwarmHealthCheck[];
}

export interface INodeState {
  //constructor(defaults: INodeState): INodeState;
  nodes: SwarmNode[];
}
