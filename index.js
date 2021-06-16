const express = require('express')
const fs = require('fs')
const { promisify } = require('util');
const exec = promisify(require('child_process').exec)
const app = express();
const port = 3000


var concat = require('concat-stream');
app.use(function(req, res, next) {
  req.pipe(concat(function(data) {
    req.body = data;
    next();
  }));
});

app.post('/audio', async function (req, res) {
  fs.writeFileSync('oui.wav', Buffer.from(new Uint8Array(req.body))); // write the blob to the server as a file
  const out1 = await exec('gcloud ml speech recognize oui.wav --language-code=fr-FR')
  const gg = JSON.parse(out1.stdout)
  const out1 = await exec('./heymorty audio oui.wav')
  const mrty = JSON.parse(out1.stdout);
  let res = {results: []};
  if (abs(gg.confidence - mrty.confidence) < 0.05)
    res.results.push(gg, mrty);
  else if (gg.confidence > mrty.confidence)
    res.results.push(gg)
  else
    res.results.push(mrty)
  res.json(JSON.parse(res)); //send back that everything went ok
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
