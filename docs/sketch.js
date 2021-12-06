//Sketch

let foods = [];
let months = [];

function preload() {
  loadFoods();
}

function setup() {
    establishRankings([]);
    populateLists();
    try {
        noCanvas();
    } catch (e) {
        print("No canvas found to remove");
        print(e);
    }
}

function draw() {

}

function populateLists() {
  const mClasses = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

  for (let m = 0; m < months.length; m++) {
    for (let i = 0; i < 20; i++) {
      let fIndex = months[m][i];
      let food = foods[fIndex];
      let fName = caseCorrect(food.name);

      let newDiv = document.createElement("div");
      let p = document.createElement("p");
      p.append(fName);
      newDiv.append(p);
      newDiv.classList.add("foodItem");
      newDiv.classList.add(mClasses[m]);
      newDiv.setAttribute("onclick","expandDrawer(this)");
      newDiv.style.opacity = "" + constrain(map(i, 0, 12, 1, 0.2), 0.2, 1);
      // print(newDiv);

      document.getElementById(mClasses[m] + ' food').appendChild(newDiv);
    }
  }
}

function populateRecipes(i) {
  let recipes = foods[i].recipes;

  for (let r of recipes) {

    let newDiv = document.createElement("div");

    let img = document.createElement("img");
    img.setAttribute("src", r.image);

    let p = document.createElement("p");
    p.append(r.name);

    newDiv.append(img);
    newDiv.append(p);
  }
}

function caseCorrect(str) {
  let ccStr = '';
  let words = str.split(" ");
  for (let word of words) {
    ccStr += word.charAt(0).toUpperCase() + word.slice(1) + " "
  }
  return ccStr;
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

    for (let j = 0; j < foods.length; j++) {
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

  for (let m of months) {
    for (let f of m) {
      let fTags = foods[f].getTags();
      if (!checkTags(fTags, tags)) {
        m.splice(f, 1);
      }
    }
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

function checkTags(fTags, tags) {
  let pass = true;

  for (let t of tags) {
    if (!fTags.includes(t)) {
      pass = false;
    }
  }
  return pass;
}

function expandDrawer(element) {
    let calendars = document.getElementsByClassName("grid");
    let template = "";

    // expand the right box based on month
    if (element.classList.contains("jan")) {
        template = "102px calc((100vw - 740px) / 12) 600px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px 38px";
        for (let i = 0; i < 12; i++) {
            document.getElementsByClassName("slideout")[i].style.borderLeft = "0px";
            document.getElementsByClassName("slideout")[i].style.borderRight = "0px";
            document.getElementsByClassName("slideout")[i].style.borderBottom = "0px";
        }
        document.getElementsByClassName("slideout")[0].style.borderLeft = "1px solid black";
        document.getElementsByClassName("slideout")[0].style.borderRight = "1px solid black";
        document.getElementsByClassName("slideout")[0].style.borderBottom = "1px solid black";
    } else if (element.classList.contains("feb")) {
        template = "102px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 600px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px 38px";
        for (let i = 0; i < 12; i++) {
            document.getElementsByClassName("slideout")[i].style.borderLeft = "0px";
            document.getElementsByClassName("slideout")[i].style.borderRight = "0px";
            document.getElementsByClassName("slideout")[i].style.borderBottom = "0px";
        }
        document.getElementsByClassName("slideout")[1].style.borderLeft = "1px solid black";
        document.getElementsByClassName("slideout")[1].style.borderRight = "1px solid black";
        document.getElementsByClassName("slideout")[1].style.borderBottom = "1px solid black";
    } else if (element.classList.contains("mar")) {
        template = "102px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 600px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px 38px";
        for (let i = 0; i < 12; i++) {
            document.getElementsByClassName("slideout")[i].style.borderLeft = "0px";
            document.getElementsByClassName("slideout")[i].style.borderRight = "0px";
            document.getElementsByClassName("slideout")[i].style.borderBottom = "0px";
        }
        document.getElementsByClassName("slideout")[2].style.borderLeft = "1px solid black";
        document.getElementsByClassName("slideout")[2].style.borderRight = "1px solid black";
        document.getElementsByClassName("slideout")[2].style.borderBottom = "1px solid black";
    } else if (element.classList.contains("apr")) {
        template = "102px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 600px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px 38px";
        for (let i = 0; i < 12; i++) {
            document.getElementsByClassName("slideout")[i].style.borderLeft = "0px";
            document.getElementsByClassName("slideout")[i].style.borderRight = "0px";
            document.getElementsByClassName("slideout")[i].style.borderBottom = "0px";
        }
        document.getElementsByClassName("slideout")[3].style.borderLeft = "1px solid black";
        document.getElementsByClassName("slideout")[3].style.borderRight = "1px solid black";
        document.getElementsByClassName("slideout")[3].style.borderBottom = "1px solid black";
    } else if (element.classList.contains("may")) {
        template = "102px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 600px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px 38px";
        for (let i = 0; i < 12; i++) {
            document.getElementsByClassName("slideout")[i].style.borderLeft = "0px";
            document.getElementsByClassName("slideout")[i].style.borderRight = "0px";
            document.getElementsByClassName("slideout")[i].style.borderBottom = "0px";
        }
        document.getElementsByClassName("slideout")[4].style.borderLeft = "1px solid black";
        document.getElementsByClassName("slideout")[4].style.borderRight = "1px solid black";
        document.getElementsByClassName("slideout")[4].style.borderBottom = "1px solid black";
    } else if (element.classList.contains("jun")) {
        template = "102px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 600px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px 38px";
        for (let i = 0; i < 12; i++) {
            document.getElementsByClassName("slideout")[i].style.borderLeft = "0px";
            document.getElementsByClassName("slideout")[i].style.borderRight = "0px";
            document.getElementsByClassName("slideout")[i].style.borderBottom = "0px";
        }
        document.getElementsByClassName("slideout")[5].style.borderLeft = "1px solid black";
        document.getElementsByClassName("slideout")[5].style.borderRight = "1px solid black";
        document.getElementsByClassName("slideout")[5].style.borderBottom = "1px solid black";
    } else if (element.classList.contains("jul")) {
        template = "102px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 600px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px 38px";
        for (let i = 0; i < 12; i++) {
            document.getElementsByClassName("slideout")[i].style.borderLeft = "0px";
            document.getElementsByClassName("slideout")[i].style.borderRight = "0px";
            document.getElementsByClassName("slideout")[i].style.borderBottom = "0px";
        }
        document.getElementsByClassName("slideout")[6].style.borderLeft = "1px solid black";
        document.getElementsByClassName("slideout")[6].style.borderRight = "1px solid black";
        document.getElementsByClassName("slideout")[6].style.borderBottom = "1px solid black";
    } else if (element.classList.contains("aug")) {
        template = "102px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 600px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px 38px";
        for (let i = 0; i < 12; i++) {
            document.getElementsByClassName("slideout")[i].style.borderLeft = "0px";
            document.getElementsByClassName("slideout")[i].style.borderRight = "0px";
            document.getElementsByClassName("slideout")[i].style.borderBottom = "0px";
        }
        document.getElementsByClassName("slideout")[7].style.borderLeft = "1px solid black";
        document.getElementsByClassName("slideout")[7].style.borderRight = "1px solid black";
        document.getElementsByClassName("slideout")[7].style.borderBottom = "1px solid black";
    } else if (element.classList.contains("sep")) {
        template = "102px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 600px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px 38px";
        for (let i = 0; i < 12; i++) {
            document.getElementsByClassName("slideout")[i].style.borderLeft = "0px";
            document.getElementsByClassName("slideout")[i].style.borderRight = "0px";
            document.getElementsByClassName("slideout")[i].style.borderBottom = "0px";
        }
        document.getElementsByClassName("slideout")[8].style.borderLeft = "1px solid black";
        document.getElementsByClassName("slideout")[8].style.borderRight = "1px solid black";
        document.getElementsByClassName("slideout")[8].style.borderBottom = "1px solid black";
    } else if (element.classList.contains("oct")) {
        template = "102px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 600px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px 38px";
        for (let i = 0; i < 12; i++) {
            document.getElementsByClassName("slideout")[i].style.borderLeft = "0px";
            document.getElementsByClassName("slideout")[i].style.borderRight = "0px";
            document.getElementsByClassName("slideout")[i].style.borderBottom = "0px";
        }
        document.getElementsByClassName("slideout")[9].style.borderLeft = "1px solid black";
        document.getElementsByClassName("slideout")[9].style.borderRight = "1px solid black";
        document.getElementsByClassName("slideout")[9].style.borderBottom = "1px solid black";
    } else if (element.classList.contains("nov")) {
        template = "102px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 600px calc((100vw - 740px) / 12) 0px 38px";
        for (let i = 0; i < 12; i++) {
            document.getElementsByClassName("slideout")[i].style.borderLeft = "0px";
            document.getElementsByClassName("slideout")[i].style.borderRight = "0px";
            document.getElementsByClassName("slideout")[i].style.borderBottom = "0px";
        }
        document.getElementsByClassName("slideout")[10].style.borderLeft = "1px solid black";
        document.getElementsByClassName("slideout")[10].style.borderRight = "1px solid black";
        document.getElementsByClassName("slideout")[10].style.borderBottom = "1px solid black";
    } else if (element.classList.contains("dec")) {
        template = "102px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 0px calc((100vw - 740px) / 12) 600px 38px";
        for (let i = 0; i < 12; i++) {
            document.getElementsByClassName("slideout")[i].style.borderLeft = "0px";
            document.getElementsByClassName("slideout")[i].style.borderRight = "0px";
            document.getElementsByClassName("slideout")[i].style.borderBottom = "0px";
        }
        document.getElementsByClassName("slideout")[11].style.borderLeft = "1px solid black";
        document.getElementsByClassName("slideout")[11].style.borderRight = "1px solid black";
        document.getElementsByClassName("slideout")[11].style.borderBottom = "1px solid black";
    }

  for (let i = 0; i < calendars.length; i++) {
    calendars[i].style.gridTemplateColumns = template
  }
}
