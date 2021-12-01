const https = require('https');
const fs = require('fs');

// const options = {
//   pfx: fs.readFileSync('test/fixtures/test_cert.pfx'),
//   passphrase: 'sample'
// };

https.createServer((req, res) => {// options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8000);