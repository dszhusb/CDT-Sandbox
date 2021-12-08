//Sketch

let foods = [];
let months = [];
let activeFilters = [];

let filterBar = document.getElementById("filters");
let sticky = filterBar.offsetTop;

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

function draw() {}

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
      newDiv.setAttribute("onclick", "expandDrawer(this)");
      newDiv.style.opacity = "" + constrain(map(i, 0, 12, 1, 0.2), 0.2, 1);

      document.getElementById(mClasses[m] + ' food').appendChild(newDiv);
    }
  }
}

function populateRecipes(element, foodName) {
  let food;
  for (let i = 0; i < foods.length; i++) {
    if (foods[i].name == foodName) food = foods[i];
  }
  let recipes = food.recipes;

  let recipeDiv = document.createElement("div");
  recipeDiv.classList.add("recipes")
  for (let r of recipes) {

    let newDiv = document.createElement("div");

    let img = document.createElement("img");
    let imgUrl = 'https://nytimes.com/' + r.image;
    if (r.image) {
      img.setAttribute("src", imgUrl);
      img.setAttribute("width", "100%")
    }

    let p = document.createElement("p");
    p.append(r.headline);

    if (r.image) {
      newDiv.append(img);
    }
    newDiv.append(p);

    recipeDiv.append(newDiv);
  }

  let infoDiv = document.createElement("div");
  infoDiv.classList.add("info");
  populateRecipeInfo(infoDiv, recipes[0]);

  let closeButton = document.createElement("img");
  closeButton.setAttribute("src", "img/x.png");
  closeButton.setAttribute("onclick", "closeDrawer()");
  closeButton.classList.add("closeButton");

  element.append(recipeDiv);
  element.append(infoDiv);
  element.append(closeButton);
}

function populateRecipeInfo(element, recipe) {
  //Headline
  let title = document.createElement("h3");
  title.append(recipe.headline);

  //Tags
  let tags = document.createElement("ul");
  tags.classList.add("rTags")

  for (let i = 0; recipe.tags && i < 3; i++) {
    let tag = document.createElement("li");
    tag.append(recipe.tags[i]);
    tags.append(tag);
  }

  //Time and Yield
  let timeYield = document.createElement("ul");
  timeYield.classList.add("timeYield")

  let time = document.createElement("li");
  time.append("Time ");
  time.append(recipe.time);
  timeYield.append(time);
  let yiel = document.createElement("li");
  yiel.append("Yield ")
  yiel.append(recipe.yield);
  timeYield.append(yiel);

  //Reviews
  let reviews = document.createElement("ul");
  reviews.classList.add("reviews")
  reviews.append("Reviews");

  for (let i = 0; i < recipe.comments.length; i++) {
    let comment = document.createElement("li");
    comment.append(recipe.comments[i]);
    reviews.append(comment);
  }

  //link
  let link = document.createElement("a")
  let linkText = document.createTextNode("Learn More");
  link.appendChild(linkText);
  link.title = "Learn More";
  link.href = recipe.url;

  //Appending All Elements
  element.append(title);
  element.append(tags);
  element.append(timeYield);
  element.append(reviews);
  element.append(link);
}

function updateFilters(filter) {
  if (!activeFilters.includes(filter)) {
    activeFilters.push(filter);
  } else {
    for (let i = 0; i < activeFilters.length; i++) {
      if (activeFilters[i] === filter) {
        activeFilters.splice(i, 1);
      }
    }
  }
  establishRankings(activeFilters);
  populateLists();
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
  months = [];

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

function openPopup(about) {
    let sources = document.getElementsByClassName("sources")[0];
    if (about) {

    } else {
        sources.style.display = "inline";
        document.body.style.backgroundImage = "";
    }
}

function closePopup() {
    let sources = document.getElementsByClassName("sources")[0];
    sources.style.display = "none";
    document.body.style.backgroundImage = "url(assets/grid.png)";
}

function syncScroll(column) {
  var columns = document.getElementsByClassName("column");

  for (let i = 0; i < columns.length; i++) {
    columns[i].scrollTop = column.scrollTop;
  }
}

// window.onscroll = function() {filterScroll()};

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
// function filterScroll() {
//   if (window.pageYOffset >= 0) {
//     filters.classList.add("sticky")
//   } else {
//     filters.classList.remove("sticky");
//   }
// }

function setFoodOpacity(scale) {
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    for (let i = 0; i < months.length; i++) {
        let monthColumn = document.getElementById(months[i] + ' food');
        for (let child = 1; child < monthColumn.childNodes.length; child++) {
            monthColumn.childNodes[child].style.opacity = constrain(map(i, 0, 12, scale, 0.2), 0.2, scale)
        }
    }
    console.log("opacity");
}

function closeDrawer() {
    let calendars = document.getElementsByClassName("grid");

    setFoodOpacity(1);

    for (let i = 0; i < 12; i++) {
        document.getElementsByClassName("slideout")[i].style.borderLeft = "0px";
        document.getElementsByClassName("slideout")[i].style.borderRight = "0px";
        document.getElementsByClassName("slideout")[i].style.borderBottom = "0px";
        while (document.getElementsByClassName("slideout")[i].firstChild) {
            document.getElementsByClassName("slideout")[i].removeChild(document.getElementsByClassName("slideout")[i].firstChild);
        }
        document.getElementsByClassName("column")[i].childNodes[1].style.opacity = 1;
        let template = "102px calc((100vw - 140px) / 12) 0px calc((100vw - 140px) / 12) 0px calc((100vw - 140px) / 12) 0px calc((100vw - 140px) / 12) 0px calc((100vw - 140px) / 12) 0px calc((100vw - 140px) / 12) 0px calc((100vw - 140px) / 12) 0px calc((100vw - 140px) / 12) 0px calc((100vw - 140px) / 12) 0px calc((100vw - 140px) / 12) 0px calc((100vw - 140px) / 12) 0px calc((100vw - 140px) / 12) 0px 38px";
        for (let i = 0; i < calendars.length; i++) {
            calendars[i].style.gridTemplateColumns = template;
        }
    }

}

function expandDrawer(element) {
  let calendars = document.getElementsByClassName("grid");
  let template = "";

  setFoodOpacity(0.4);

  element.style.opacity = 1;
  console.log("element opacity");

  for (let i = 0; i < 12; i++) {
    document.getElementsByClassName("slideout")[i].style.borderLeft = "0px";
    document.getElementsByClassName("slideout")[i].style.borderRight = "0px";
    document.getElementsByClassName("slideout")[i].style.borderBottom = "0px";
    while (document.getElementsByClassName("slideout")[i].firstChild) {
      document.getElementsByClassName("slideout")[i].removeChild(document.getElementsByClassName("slideout")[i].firstChild);
    }
    document.getElementsByClassName("column")[i].childNodes[1].style.opacity = 0;
  }

  // expand the right box based on month
  let index = 0;
  if (element.classList.contains("jan")) {
    template = "102px calc((100vw - 940px) / 16 * 3) 800px calc((100vw - 940px) / 16 * 3) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px 38px";
    index = 0;
  } else if (element.classList.contains("feb")) {
    template = "102px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16 * 3) 800px calc((100vw - 940px) / 16 * 3) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px 38px";
    index = 1;
  } else if (element.classList.contains("mar")) {
    template = "102px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16 * 3) 800px calc((100vw - 940px) / 16 * 3) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px 38px";
    index = 2;
  } else if (element.classList.contains("apr")) {
    template = "102px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16 * 3) 800px calc((100vw - 940px) / 16 * 3) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px 38px";
    index = 3;
  } else if (element.classList.contains("may")) {
    template = "102px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16 * 3) 800px calc((100vw - 940px) / 16 * 3) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px 38px";
    index = 4;
  } else if (element.classList.contains("jun")) {
    template = "102px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16 * 3) 800px calc((100vw - 940px) / 16 * 3) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px 38px";
    index = 5;
  } else if (element.classList.contains("jul")) {
    template = "102px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16 * 3) 800px calc((100vw - 940px) / 16 * 3) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px 38px";
    index = 6;
  } else if (element.classList.contains("aug")) {
    template = "102px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16 * 3) 800px calc((100vw - 940px) / 16 * 3) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px 38px";
    index = 7;
  } else if (element.classList.contains("sep")) {
    template = "102px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16 * 3) 800px calc((100vw - 940px) / 16 * 3) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px 38px";
    index = 8;
  } else if (element.classList.contains("oct")) {
    template = "102px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16 * 3) 800px calc((100vw - 940px) / 16 * 3) 0px calc((100vw - 940px) / 16) 0px 38px";
    index = 9;
  } else if (element.classList.contains("nov")) {
    template = "102px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16 * 3) 800px calc((100vw - 940px) / 16 * 3) 0px 38px";
    index = 10;
  } else if (element.classList.contains("dec")) {
    template = "102px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16) 0px calc((100vw - 940px) / 16 * 3) 800px 38px";
    index = 11;
  }
  document.getElementsByClassName("column")[index].childNodes[1].style.opacity = 1;
  if (index < 11) {
    document.getElementsByClassName("column")[index + 1].childNodes[1].style.opacity = 1;
  }
  document.getElementsByClassName("slideout")[index].style.borderLeft = "1px solid black";
  document.getElementsByClassName("slideout")[index].style.borderRight = "1px solid black";
  document.getElementsByClassName("slideout")[index].style.borderBottom = "1px solid black";

  for (let i = 0; i < calendars.length; i++) {
    calendars[i].style.gridTemplateColumns = template
  }

  populateRecipes(document.getElementsByClassName("slideout")[index], element.textContent.toLowerCase().slice(0, -1));
}
