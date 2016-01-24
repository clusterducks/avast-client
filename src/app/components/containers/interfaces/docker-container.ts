import * as d3 from 'd3';

export interface DockerContainer {
  Id:               string;
  Names:            string[];
  Image:            string;
  ImageID:          string;
  Command:          string;
  Created:          number;
  Ports:            number[];
  Labels:           any;   // make interface?
  Status:           string;
  HostConfig:       any;   // make interface?
  NetworkSettings:  any;   // make interface?
}

export interface Result extends d3.layout.cluster.Result {
  key:    string;
  parent: Result;
  type:   string;
  images: Result[];
  //size: number;
  //source: Result;
  //target: Result;
}
