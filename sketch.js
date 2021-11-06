//Sketch

let foods = [['apple pie']];

function preload() {
  loadFoods();
  loadTrends();
  loadRecipes();
}

function setup() {

}

function draw() {

}

function loadFoods() {

}

function loadTrends() {
  let stem = '';
  let key = 'TFkhMD2Ty8d03U6yGWv1USnBcxHjUA7W';

  for (let food of foods) {
    let q = food + ' recipe';
  }
}

function loadRecipes() {
  let stem = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
  let key = 'TFkhMD2Ty8d03U6yGWv1USnBcxHjUA7W';

  for (let food of foods) {
    let q = food + ' recipe';
    let b = '20040101'
    let url  = stem + '?q=' + q + '&begin_date' + b + '&api-key=' + key;
    print(url);

    loadJSON(url, gotNYT);
  }

  foods.push()
}

function gotNYT(data) {
  let d = data;

  let articles = d.response.docs;
  for(let a of articles) {
    let head = a.headline.print_headline;
    let path = a.web_url;
    print(path);
    //let
  }
}
