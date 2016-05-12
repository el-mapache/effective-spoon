import fetch from 'isomorphic-fetch';
import AppConfig from '../AppConfig.js';

const assign = require('lodash').assign;
const DEFAULT_METHOD = 'GET';
const CREDENTIALS = 'include';

function triggerError(response) {
  // trigger the catch handler in fetch.
  const error = new Error(response.statusText);
  error.response = response;

  throw error;
}

/**
 * Wrapper for fetch that automatically checks for response errors and parses
 * json responses from the server when appropriate.
 *
 * @private
 * @param  {String} url       fully qualified URL of the endpoint to be called
 * @param  {Object} configs   configuration object that defines the request
 * @return {Function}         Promise object
 */
function _fetch(url, configs) {
  /**
   * Parses json from the bye stream of the fetch response object.
   * Per fetch spec, we return the raw response on 204, as there is nothing to
   * parse. Function also returns the response if response.json isn't defined.
   *
   * @private
   * @param {Object} response object returned after async fetch call.
   * @return Promise
  **/
  function parse(response) {
    // Return the raw response in the case of a 204. Fetch won't return
    // a promise if there is no content in the response.
    // Because parses can be nested in a token refresh attempt, we also need to
    // check if `response` is a fetch response object or a plain JS one.
    return (response.status === 204 || typeof response.json !== 'function') ?
      response : response.json();
  }

  /**
    * Validates the response object. if the request was successful,
    * return a promises. Otherwise, throw an error.
    *
    * @param {Object} response the response object to be validated
    *
    * @return Promise
  **/
  function checkResponse(response) {
    // 2xx status from server, return the reponse object
    if (/2\d{2}/.test(response.status)) {
      return response;
    }

    triggerError(response);
  }

  return fetch(url, configs)
    .then((response) => {
      return checkResponse(response);
    }).then(parse);
}

/**
 * These headers let hapi know we are sending a json request.
 *
 * @param {Object} options Configuration object with support for the following keys:
 *   token {String} an access token
 *   apiType {String} the api name for gopro social apis (example: social-like)
 * @return headers object
**/
function defaultHeaders(options = {}) {
  let baseHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  if (options.token) {
    baseHeaders = assign({}, baseHeaders, {
      'Authorization': `Bearer ${options.token}`
    });
  }

  if (options.apiType) {
    baseHeaders = assign({}, baseHeaders, getGoProAcceptHeader(options.apiType));
  }

  return baseHeaders;
}

const ajax = {

  /**
    * Proxies async HTTP requests to fetch.
    *
    * @param {String} method HTTP verb to be used in request.
    * @param {String} url resource to be requested.
    * @param {Object} options configuration options. Supported keys:
    *   credentials: {String}
    *   data: {Object}
    *   headerOptions: {Object}
    *
    * @return Promise
  **/
  request(method, url, options = {}) {
    const credentials = options.credentials || CREDENTIALS;

    if (options.headerOptions && options.headerOptions.token === null) {
      return Promise.reject('You are attempting to make an authenticated request without supplying an access token!');
    }

    // extend default headers with headers in options, if supplied.
    const headers = assign({}, defaultHeaders(options.headerOptions));

    let absoluteURL;

    let configuration = {
      method: method,
      credentials: false,
      headers: headers
    };

    // if POST or PUT data has been supplied, add it to a new object.
    if (options.data) {
      configuration = assign({}, configuration, {
        body: JSON.stringify(options.data)
      });
    }

    absoluteURL = `${AppConfig.baseUrl}${url}`;

    return _fetch(absoluteURL, configuration);
  }
};

export default ajax;
