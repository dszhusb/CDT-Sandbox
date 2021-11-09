//Sketch

let foods = [
  ['apple pie']
];

function preload() {
  loadFoods();
  loadRecipes();
  loadTrends();
}

function setup() {

}

function draw() {

}

function loadFoods() {

}

function loadTrends() {

  var exec = require('getTrends.js').exec;

  var cmd = exec("npm build", function(err, stdout, stderr) {
    if (err) {
      // handle error
    }
    console.log(stdout);
  });

  dir.on('exit', function(code) {
    // return value from "npm build"
  });
}

function loadRecipes() {
  let stem = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
  let key = 'TFkhMD2Ty8d03U6yGWv1USnBcxHjUA7W';

  for (let food of foods) {
    let q = food + ' recipe';
    let b = '20040101'
    let url = stem + '?q=' + q + '&begin_date' + b + '&api-key=' + key;

    loadJSON(url, gotNYT);
  }

  foods.push()
}

function gotNYT(data) {
  let d = data;
  let recipes = [];

  let articles = d.response.docs;
  for (let a of articles) {
    let head = a.headline.print_headline;
    let path = a.web_url;
    recipes.push([head, path]);
  }

}
