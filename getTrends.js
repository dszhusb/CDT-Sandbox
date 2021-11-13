const http = require('http');

const googleTrends = require('google-trends-api');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  googleTrends.interestOverTime({keyword: 'Women\'s march'})
  .then(function(results){
    //console.log('These results are awesome', results);
    res.end(results);
  })
  .catch(function(err){
    console.error('Oh no there was an error', err);
  });

  //res.end('Hello, World!\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});