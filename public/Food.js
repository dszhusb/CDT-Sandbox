//Food class

class Food {
  constructor(n,p) {
    this.name = n;
    this.popularity = p;
    this.recipes = [];
  }

  addRecipe(r) {
    this.recipes.push(r);
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
