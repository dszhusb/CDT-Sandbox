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
  const url = 'foodlist.json';
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

function getTrends() {

}

function expandDrawer(element) {
    let calendars = document.getElementsByClassName("calendar");
    let template = "";

    // expand the right box based on month
    if (element.classList.contains("jan")) {
        template = "102px auto 300px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px 37px";
    } else if (element.classList.contains("feb")) {
        template = "102px auto 0px auto 300px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px 37px";
    } else if (element.classList.contains("mar")) {
        template = "102px auto 0px auto 0px auto 300px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px 37px";
    } else if (element.classList.contains("apr")) {
        template = "102px auto 0px auto 0px auto 0px auto 300px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px 37px";
    } else if (element.classList.contains("may")) {
        template = "102px auto 0px auto 0px auto 0px auto 0px auto 300px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px 37px";
    } else if (element.classList.contains("jun")) {
        template = "102px auto 0px auto 0px auto 0px auto 0px auto 0px auto 300px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px 37px";
    } else if (element.classList.contains("jul")) {
        template = "102px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 300px auto 0px auto 0px auto 0px auto 0px auto 0px 37px";
    } else if (element.classList.contains("aug")) {
        template = "102px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 300px auto 0px auto 0px auto 0px auto 0px 37px";
    } else if (element.classList.contains("sep")) {
        template = "102px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 300px auto 0px auto 0px auto 0px 37px";
    } else if (element.classList.contains("oct")) {
        template = "102px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 300px auto 0px auto 0px 37px";
    } else if (element.classList.contains("nov")) {
        template = "102px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 300px auto 0px 37px";
    } else if (element.classList.contains("dec")) {
        template = "102px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 0px auto 300px 37px";
    }

    for (let i = 0; i < calendars.length; i++) {
        calendars[i].style.gridTemplateColumns = template
    }
}
