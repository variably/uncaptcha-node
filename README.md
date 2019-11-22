# @variably/uncaptcha-node
Official API

- Package version: 0.0.1

## Requirements.

NodeJS 8.11.4+

### NodeJS

To install this package you must have [NodeJS](https://nodejs.org/en/download/package-manager/) installed, please follow those instructions for your OS before attempting to use this package.

### NPM

Install via [NPM](https://www.npmjs.com/get-npm) (easiest method).

```sh
npm install --save @variably/uncaptcha-node
```

Then import the package:
```javascript
const uncaptchaNode = require('@variably/uncaptcha-node');
```

## Basic Usage

Please follow the installation procedure and then you may run any of the following:

```javascript
const uncaptchaNode = require('@variably/uncaptcha-node');

(async() => {
  const api_client = new uncaptchaNode.ApiClient({
    apiTimeout: <Number|Optional|Default:10000>,
    apiUrl: <String|Optional|Default:'https://api.uncaptcha.com'>,

    privateKey: <String|Required>
  });
  const visitorObject = {
    ip: <String|Recommended>,
    'user-agent': <String|Recommended>,
    'uncaptcha-token': <String|Required>
  };
  const verified_response = await api_client.validateUncaptchaResponse(visitorObject);
  if(verified_response && verified_response.body && verified_response.body == 'true'){
    console.log('user verified');
  }else if(verified_response){
    console.log('user failed to verify')
  }else{
    console.log('failed to verify user');
  }
})().catch(console.error);
```

## Documentation For Authorization

 All endpoints require authorization.


## Author

 Variably
