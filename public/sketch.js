//Sketch

let foods = [];
let months = [];

function preload() {
  loadFoods();
}

function setup() {
  establishRankings([]);
  print(foods);
  print(months);
}

function draw() {

}

function loadFoods() {
  const url = './foodlist.json';
  let data = loadJSON(url, fillFoods);
}

function fillFoods(data) {

  for (let f in data) {
    let n = data[f].food;
    let norm = data[f].normalized;
    let reg = data[f].popularity;
    let p = combinePopularity(reg, norm);
    let nFood = new Food(n, p);

    for (let r in data[f].recipes) {
      let h = data[f].recipes[r].headline;
      let u = data[f].recipes[r].url;
      let i = data[f].recipes[r].image;
      let ta = data[f].recipes[r].tags;
      let ti = data[f].recipes[r].time;
      let y = data[f].recipes[r].yield;
      let c = data[f].recipes[r].comments;

      let nRecipe = new Recipe(h, u, i, ta, ti, y, c);
      nFood.addRecipe(nRecipe);
    }
    consolidateTags(nFood);
    foods.push(nFood);
  }
}

function consolidateTags(food) {
  let tList = [];

  for (let r of food.recipes) {
    if (typeof r.tags !== 'undefined') {
      for (let t of r.tags) {
        if (!tList.includes(t)) {
          tList.push(t);
        }
      }
    }
  }

  food.addTags(tList);
}

function combinePopularity(reg, norm) {
  let p = [];
  for (let i = 0; i < reg.length; i++) {
    let v = reg[i] * norm[i];
    p.push(v)
  }
  return p;
}

function establishRankings(tags) {

  for (let m = 0; m < 12; m++) {
    let mr = [];

    while (mr.length < foods.length) {
      let topScore = -1;
      let topIndex = -1;
      for (let i = 0; i < foods.length; i++) {
        print(foods[i].tags);
        if (foods[i].popularity[m] > topScore && checkSorted(i, mr) == false) {
          topScore = foods[i].popularity[m];
          topIndex = i;
        }
      }
      mr.push(topIndex);
    }

    months.push(mr);
  }
}

function checkSorted(i, mr) {
  for (let f of mr) {
    if (f == i) {
      return true;
    }
  }
  return false;
}

// function checkTags(ft, tags) {
//   let fTags = ft;
//
//   let fits = true;
//
//   if (fTags.length > 0 && tags.length > 0) {
//     for (let t of tags) {
//       if (!fTags.includes(t)) {
//         fits = false;
//       }
//     }
//   }
//
//   return fits;
// }

// function loadFoods() {
//   let stem = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
//   let key = 'TFkhMD2Ty8d03U6yGWv1USnBcxHjUA7W';
//   let b = '20040101';
//   let nResults = 5;
//
//   for (let i = 0; i < nResults; i++) {
//     let url = stem + "?q=recipe" + '&fq=document_type:("recipe")' + '&page=' + i + '&begin_date' + b + '&api-key=' + key;
//     loadJSON(url, gotFoods);
//   }
// }
//
// function loadRecipes() {
//   let stem = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
//   let key = 'TFkhMD2Ty8d03U6yGWv1USnBcxHjUA7W';
//
//   for (let food of foods) {
//     let q = food;
//     let b = '20040101';
//     let url = stem + '?q=' + q + '&fq=document_type:("recipe")' + '&begin_date' + b + '&api-key=' + key;
//
//     loadJSON(url, gotNYT);
//   }
// }
//
// function gotFoods(data) {
//   let d = data;
//   print(d);
// }
//
// function gotNYT(data) {
//   let d = data;
//   print(d);
//   let recipes = [];
//
//   let articles = d.response.docs;
//   for (let a of articles) {
//     let head = a.headline.print_headline;
//     let path = a.web_url;
//     recipes.push([head, path]);
//   }
// }

// async function loadTrends() {
//   const response  = await fetch('/api');
//   const data = await response.json();
//
//   for (let item of data) {
//     print('another one');
//   }
//   print(data);
// }
