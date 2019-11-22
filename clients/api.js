const fs = require('fs');
const request = require('request');

const packageJSON = require('../package.json');

module.exports = class ApiClient {
  constructor({ privateKey, apiUrl = 'https://api.uncaptcha.com', apiTimeout = 10000 }){
    if(typeof privateKey !== 'string'){
      throw new Error('invalid required private key');
    }
    this.privateKey = privateKey;

    if(typeof apiUrl !== 'string'){
      throw new Error('invalid required api url');
    }
    this.apiUrl = apiUrl;

    if(typeof apiTimeout !== 'number'){
      throw new Error('invalid required api timeout');
    }
    this.apiTimeout = apiTimeout;

    this.setup();
  }

  setup() {
    this.api = request.defaults({
      baseUrl: this.apiUrl,
      headers: {
        'X-PRIVKEY': this.privateKey,
        'User-Agent': `${packageJSON.name}/${packageJSON.version}/node`
      },
      timeout: this.apiTimeout
    });
    const requester = function(options) {
      return new Promise((resolve, reject) => {
        this.api(options, (error, response, body) => {
          if(error){
            reject(error);
          }else{
            resolve(response);
          }
        });
      });
    }
    this.request = requester.bind(this);
  }

  validateUncaptchaResponse(visitor = {}){
    if(typeof visitor !== 'object' || Array.isArray(visitor)){
      throw new Error('invalid visitor dictionary object');
    }

    if(visitor.ip){
      if(typeof visitor.ip !== 'string'){
        throw new Error('invalid visitor ip provided');
      }
    }else{
      visitor.ip = '';
    }

    if(visitor['user-agent']){
      if(typeof visitor['user-agent'] !== 'string'){
        throw new Error('invalid visitor user agent provided');
      }
    }else{
      visitor['user-agent'] = '';
    }

    if(typeof visitor['uncaptcha-token'] !== 'string'){
      throw new Error('invalid visitor uncaptcha response provided'); 
    }

    const path = `/validation`;
    return this.request({
      uri: path,
      method: 'POST',
      formData: {
        ip: visitor['ip'],
        ua: visitor['user-agent'],
        'uncaptcha-token': visitor['uncaptcha-token']
      }
    });
  }
}