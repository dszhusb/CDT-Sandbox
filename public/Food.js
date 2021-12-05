//Food class

class Food {
  constructor(n,p) {
    this.name = n;
    this.popularity = p;
    this.recipes = [];
    this.tags = [];
  }

  addRecipe(r) {
    this.recipes.push(r);
  }

  addTags(t) {
    this.tags.push(t);
  }
}

class Recipe {
  constructor(h,u,i,ts,ti,y,c) {
    this.headline = h;
    this.url = u;
    this.image = i;
    this.tags = ts;
    this.time = ti;
    this.yield = y;
    this.comments = c;
  }
}
