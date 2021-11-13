//Server Code
const express = require('express');
const googleTrends = require('google-trends-api');
const Datastore = require('nedb');

const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));

const database = new Datastore('database.db');
database.loadDatabase();

fetchTrendsData(['apple pie', 'deez nuts']);

// app.get('/api', (request, response) => {
//   database.fin({}, (err, data) => {
//     if (err) {
//       response.end();
//       return;
//     }
//     response.json(data);
//   })
//   response.json({
//     test: 123
//   });
// });

function fetchTrendsData(foodArray) {
  for (let food of foodArray) {
    googleTrends.interestOverTime({
        keyword: food
      })
      .then(function(results) {
        console.log(food);
        let data = JSON.parse(results);
        let tl = data.default.timelineData;

        let oData = new Object();
        oData.name = food;
        oData.data = tl;
        let fData = JSON.stringify(oData);

        database.insert(fData);
      })
      .catch(function(err) {
        console.error('Oh no there was an error', err);
      });
  }
}
