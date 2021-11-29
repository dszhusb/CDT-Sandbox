//Sketch

let foods = [
  ['apple pie']
];

function preload() {
  // loadFoods();
  // loadRecipes();
  // loadTrends();
}

function setup() {
  print(foods);
}

function draw() {

}

function loadFoods() {
  let stem = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
  let key = 'TFkhMD2Ty8d03U6yGWv1USnBcxHjUA7W';
  let b = '20040101';
  let nResults = 5;

  for (let i = 0; i < nResults; i++) {
    let url = stem + "?q=recipe" + '&fq=document_type:("recipe")' + '&page=' + i + '&begin_date' + b + '&api-key=' + key;
    loadJSON(url, gotFoods);
  }
}

function loadRecipes() {
  let stem = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
  let key = 'TFkhMD2Ty8d03U6yGWv1USnBcxHjUA7W';

  for (let food of foods) {
    let q = food;
    let b = '20040101';
    let url = stem + '?q=' + q + '&fq=document_type:("recipe")' + '&begin_date' + b + '&api-key=' + key;

    loadJSON(url, gotNYT);
  }
}

function gotFoods(data) {
  let d = data;
  print(d);
}

function gotNYT(data) {
  let d = data;
  print(d);
  let recipes = [];

  let articles = d.response.docs;
  for (let a of articles) {
    let head = a.headline.print_headline;
    let path = a.web_url;
    recipes.push([head, path]);
  }
}

// async function loadTrends() {
//   const response  = await fetch('/api');
//   const data = await response.json();
//
//   for (let item of data) {
//     print('another one');
//   }
//   print(data);
// }

function getTrends() {

}
