const express = require('express')
const fs = require('fs')
const app = express();
const port = 3000


var concat = require('concat-stream');
app.use(function(req, res, next){
  req.pipe(concat(function(data){
    req.body = data;
    next();
  }));
});

app.post('/audio', function (req, res) {
  console.log(req.body)
   fs.writeFileSync('oui.wav', Buffer.from(new Uint8Array(req.body))); // write the blob to the server as a file
  res.sendStatus(200); //send back that everything went ok
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
