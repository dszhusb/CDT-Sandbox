const googleTrends = require('google-trends-api');

googleTrends.interestOverTime({keyword: 'apple pie'})

.then(function(results){
  data = results;
  tl = data.default;
  console.log(tl);
  //console.log('These results are awesome', results);
})
.catch(function(err){
  console.error('Oh no there was an error', err);
});
