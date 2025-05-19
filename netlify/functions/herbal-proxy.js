const fetch = require('node-fetch');

exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const body = JSON.parse(event.body);

    const apiRes = await fetch('https://herbalai.deepxlabs.tech/api/prompt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API_KEY': '68289d7d0ce9b',
      },
      body: JSON.stringify({
        prompt: body.prompt,
        userId: body.userId,
        timestamp: body.timestamp,
      }),
    });

    const data = await apiRes.json();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
