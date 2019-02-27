const express = require('express');
const app = express();

const server = app.listen(4000, (req, res) => {
  console.log(`server started on ${server.address().port}`);
});
