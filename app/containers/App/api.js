/* eslint-disable */

export default class API {
  static _instance = null;

  static instance() {
    if (this._instance === null) {
      this._instance = new API();
    }

    return this._instance;
  }

  callSecure(apiUrl, endPoint, payload = {}, method = 'get', headers = {}) {
    const options = {
      method: method.toUpperCase(),
      mode: 'cors',
    };

    if (method.toUpperCase() === 'POST' || method.toUpperCase() === 'PUT') {
      options.body = JSON.stringify(payload);
    }
    console.log('asdfsaf', `${apiUrl}${endPoint}`);

    return fetch(`${apiUrl}${endPoint}`, options)
      .then(response => {
        if (response.ok) {
          return response.text().then(text => (text ? JSON.parse(text) : {}));
        }
        const { status } = response;
        return response.json().then(res => ({ ...res, error: true, status }));
      })
      .catch(e => {
        return { error: true, status: 500, message: 'Unknown Error', e };
      });
  }
}
/* eslint-enable */
