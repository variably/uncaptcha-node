const express = require('express');

const uncaptchaNode = require('../index');

const port = 3000;
const app = express();

app.get('/verify', async (req, res) => {
  if(typeof req.query.private_key === 'string' && typeof req.query['uncaptcha-token'] === 'string'){
    const api_client = new uncaptchaNode.ApiClient({      
      apiTimeout: 10000,
      apiUrl: 'https://api.uncaptcha.com',

      privateKey: req.query.private_key
    });

    const visitor = {
      ip: req.connection.remoteAddress,
      'user-agent': req.headers['User-Agent'],
      'uncaptcha-token': req.query['uncaptcha-token']
    };
    const verified_response = await api_client.validateUncaptchaResponse(visitor);
    const verified_body = verified_response && verified_response.body && verified_response.body;
    if(verified_body == 'true'){
      return res.json('Request Valid');
    }else if(verified_body){
      return res.json(verified_body);
    }
  }

  return res.status(400).json('Invalid Request');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));