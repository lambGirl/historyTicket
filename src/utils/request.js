import fetch from 'dva/fetch';
import { baseUtil } from './util'
function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
    //console.log("options",options,url);
    if(options.method === "post"){
        options.body = JSON.parse(options.body); //设置options
        options.body._p_from = baseUtil.get("cdqcp_channel");
        options.body.channelTokenName = baseUtil.getSession("channelTokenName");
        options.body =  JSON.stringify(options.body);
    }
    //console.log("post",url);
    //console.log("options------",options);
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => (data))
    .catch(err => ({ err }));
}
