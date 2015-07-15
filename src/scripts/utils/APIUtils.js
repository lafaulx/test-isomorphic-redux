import superagent from 'superagent';

function prepareURL(endpoint) {
  if (process.env.API_ORIGIN) {
    if (endpoint.indexOf(process.env.API_ORIGIN) === -1) {
      return process.env.API_ORIGIN + endpoint;
    }
  }

  return endpoint;
}

export function get(endpoint) {
  return superagent.get(prepareURL(endpoint));
}

export function post(endpoint) {
  return superagent.post(prepareURL(endpoint));
}

