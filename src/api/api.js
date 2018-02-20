import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://devapi.astus.com/api/';

const responseBody = res => res.body;

const handleErrors = err => {
    if (err && err.response && err.response.status === 401) {
      console.log('Unauthorized');
    }
    return err;
  };

const injectTimestamp = url => {
    var timestamp = new Date().getTime();
    if(url.indexOf("?") == -1){
        url += "?_=" + timestamp;
    }else{
        url += "&_=" + timestamp;
    }
    return url;
}

const requests = {
    del: url =>
      superagent
        .del(`${API_ROOT}${url}`)
        .end(handleErrors)
        .then(responseBody),
    get: url =>
      superagent
        .get(`${API_ROOT}${injectTimestamp(url)}`)
        .end(handleErrors)
        .then(responseBody),
    put: (url, body) =>
      superagent
        .put(`${API_ROOT}${url}`, body)
        .end(handleErrors)
        .then(responseBody),
    post: (url, body) =>
      superagent
        .post(`${API_ROOT}${url}`, body)
        .end(handleErrors)
        .then(responseBody),
  };

const Authentication = {
    login: (username, password) => requests.get(`Account/logon?Username=${username}&Password=${password}&ClientVersion=18.02.97.1394`)
};

const VehicleLastState = {
    getAll: () => requests.get(`Realtime/GetCurrentVehicleState/`)
}

export default {
    Authentication,
    VehicleLastState
  };