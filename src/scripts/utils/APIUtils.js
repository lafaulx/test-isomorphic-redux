import superagent from 'superagent';

export function get(endpoint) {
  // We on the server-side
  if (process.env.API_ORIGIN) {
    if (endpoint.indexOf(process.env.API_ORIGIN) === -1) {
      endpoint = process.env.API_ORIGIN + endpoint;
    }
  }

  return superagent.get(endpoint);
}
