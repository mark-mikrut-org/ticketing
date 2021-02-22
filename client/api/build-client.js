import axios from 'axios';

// namespace ingress-nginx
// http://service.namespace.svc.cluster.local
// http://ingress-nginx-cotroller.ingress-nginx.svc.cluster.local

const buildClient = ({ req }) => {
  if (typeof window === 'undefined') {
    // server

    return axios.create({
      baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers
    });
  } else {
    // browser
    return axios.create({
      baseURL: '/'
    });
  }
};

export default buildClient;
