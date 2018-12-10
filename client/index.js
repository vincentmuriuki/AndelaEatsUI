const express = require('express');

const app = express();

app.use(express.static(`${__dirname}/dist`));

app.use('*', (request, response) => {
  response.sendFile(`${__dirname}/src/index.html`);
});

app.listen(process.env.PORT || 3000, () => console.log('Server started'));