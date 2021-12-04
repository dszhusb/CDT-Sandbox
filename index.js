//Server Code
const express = require('express');
const googleTrends = require('google-trends-api');
const Datastore = require('nedb');
let jsonFile = require('jsonfile');
const fs = require('fs');

const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));

const database = new Datastore('database.db');
database.loadDatabase();

// let foodIndex = 0;
// let trendsArray = [];
//
// let foodArray = arrayifyFoods();
// console.log(foodArray);
//
// setInterval(getInterest, 1500);

function getInterest() {
  food = foodArray[foodIndex];
  googleTrends.interestOverTime({
    keyword: food
  })
  .then(function(results) {
    let data = JSON.parse(results);
    let tl = data.default.timelineData;
    console.log(data)

    let oData = new Object();
    oData.name = food;
    oData.data = tl;
    let fData = JSON.stringify(oData);
    trendsArray.push(fData);
  })
  .catch(function(err) {
    console.error('Oh no there was an error', err);
  });

  if (foodIndex >= 867) {
    jsonFile.writeFile('trendsData.json', trendsArray);
  }

  foodIndex++;
}

function arrayifyFoods(data) {

  let foodArray = ['skirt steak', 'clams', 'beets', 'pasta', 'tomato sauce', 'chicken thighs', 'roast chicken', 'syrup', 'butterscotch sauce', 'toffee pudding', 'leeks', 'lamb', 'slow-roasted duck', 'linguine', 'mushrooms', 'braised duck', 'monkfish', 'potato gnocchi', 'butternut squash soup', 'scaloppine', 'eggs', 'beef', 'soup', 'squid', 'octopus', 'veal', 'pot roast', 'gumbo', 'cranberry tart', 'bread pudding', 'brussels sprouts', 'greens', 'oysters', 'pumpkin creme brulee', 'squash', 'tarte tatin', 'horseradish sauce', 'corned beef', 'brisket', 'figs', 'cornish hens', 'corn', 'tomato salsa', 'salsa verde', 'bass', 'salmon', 'corn chowder', 'gazpacho', 'summer salad', 'papaya salad', 'tomato salad', 'cake', 'mayonnaise', 'cabbage salad', 'pepper mayonnaise', 'pizza', 'pizza dough', 'chicken', 'asparagus', 'lobster', 'ragout', 'pea soup', 'onions', 'sundae', 'brownies', 'lemonade', 'flank steak', 'spring rolls', 'snapper', 'peking duck', 'vichyssoise', 'panna cotta', 'asparagus soup', 'coulis', 'chicken tagine', 'lamb tagine', 'pork', 'brined pork', 'remoulade', 'mostarda', 'fish', 'razor clams', 'fennel', 'gnocchi', 'apple tart', 'apple crumble', 'chicken soup', 'potato kugel', 'blackberry', 'pepper dip', 'braised lamb shanks', 'braised ribs', 'scallops', 'parmesan', 'peach pies', 'shrimp', 'cauliflower', 'chocolate', 'spaghetti', 'bay scallops', 'pork tenderloin', 'paella', 'penne', 'cauliflower soup', 'ricotta gnocchi', 'pumpkin', 'baba au rhum', 'vinaigrette', 'deviled eggs', 'pecans', 'garlic chicken', 'cheese straws', 'risotto', 'saltimbocca', 'zucchini', 'cranberry relish', 'chestnut cake', 'potatoes anna', 'bread', 'beans', 'pastry', 'pumpkin pie', 'pie crust', 'macaroni and cheese', 'crab cakes', 'poundcake', 'salad', 'shrimp burgers', 'veal stew', 'lasagna', 'mushroom lasagna', 'goat cheese', 'country captain', 'roast duck', 'persian rice', 'popcorn', 'challah', 'plums', 'cheesecake', 'vanilla cakes', 'swordfish', 'caesar salad', 'crab louis', 'chicken skewers', 'pesto', 'almond cake', 'slaw', 'chickpeas', 'creme anglaise', 'seaweed salad', 'langoustines', 'couscous', 'potato salad', 'kaipen', 'vegetables', 'pepper shrimp', 'pork loin', 'artichokes', 'ice cream', 'whipped cream', 'coconut rice', 'zabaglione', 'braised chicken', 'soft-shell crabs', 'ceviche', 'tacos', 'halibut', 'chicken salad', 'salade nicoise', 'braised pork', 'brine', 'tuna', 'rabbit', 'coconut pie', 'tortilla soup', 'chicken enchiladas', 'mango', 'sorbet', 'coq au vin', 'beet salad', 'lentils', 'swiss chard', 'seafood chowder', 'cucumber', 'mustard', 'sardines', 'rigatoni', 'lentil salad', 'mushroom-barley soup', 'mushroom barley soup', 'buckwheat blini', 'champagne cocktail', 'rice pudding', 'black-eyed peas', 'chicken bouillabaisse', 'velvet cake', 'vesper', 'pumpkin soup', 'bagna cauda', 'braised lamb', 'baby pumpkins', 'peach pie', 'duck breasts', 'tomatoes', 'polenta', 'beef tenderloin', 'pumpkin pancakes', 'pate', 'tomato soup', 'sloppy joes', 'spinach rice', 'thai beef salad', 'rice', 'fish pie', 'toad-in-the-hole', 'stir-fried chicken', 'plum', 'pan-roasted chicken', 'toasts', 'guacamole', 'blueberry pie', 'poussins', 'beet goat cheese salad', 'corn soup', 'crostini', 'pad thai', 'bouillabaisse', 'crab salad', 'soba noodles', 'pineapple salsa', 'pico de gallo', 'eggplant', 'watermelon tomato salad', 'bluefish', 'romesco sauce', 'almonds', 'noodles', 'cherries', 'burger', 'salt-baked potatoes', 'potato cake', 'ricotta', 'rib steaks', 'tofu', 'crown roast', 'peppers', 'cod', 'tomato', 'crepes', 'shrimp linguine', 'sea bass', 'lamb kebabs', 'roast suckling pig', 'mussels', 'braised veal shanks', 'souffle', 'chocolate souffle', 'cheese souffle', 'barley', 'drizzle cake', 'cabbage potato gratin', 'potatoes', 'chicken confit', 'eggnog', 'granola muffins', 'churros', 'beef stew', 'spinach salad', 'yogurt sauce', 'custard', 'apples', 'meatloaf', 'focaccia', 'winter squash', 'corn pudding', 'braised celery', 'sausage', 'chicken livers', 'lemony chicken', 'coconut', 'spoonbread', 'huevos rancheros', 'chili', 'peaches', 'trout', 'thousand island dressing', 'lobster salad', 'squid salad', 'tomato bread soup', 'blackfish', 'fish stock', 'fish soup', 'butterflied chicken', 'tartar sauce', 'shrimp salad', 'fluke crudo', 'sichuan chicken', 'radish salad', 'eggplant salad', 'caramel cream', 'summer pudding', 'meat skewers', 'sweetbreads', 'duck', 'hash', 'glass noodles', 'rice noodles', 'peas', 'mushroom soup', 'bok choy', 'grits', 'pancakes', 'chicken noodle soup', 'potato hash', 'stir-fried lamb', 'soufflé omelet', 'apricots', 'banana bread', 'chocolate chip cookies', 'cod salad', 'pork stew', 'tom yum soup', 'chicken potpie', 'tartiflette', 'irish stew', 'coleslaw', 'fish cakes', 'georgian chicken', 'ricotta pudding', 'butternut squash pie', 'fruit', 'cornbread', 'turkey', 'german potato salad', 'vanilla ice cream', 'romaine salad', 'confit', 'migas', 'calas', 'pan-roasted fish', 'lime pie', 'pears', 'roast beef', 'duck breast', 'caprese salad', 'berry clafoutis', 'lettuce soup', 'pan-roasted pork', 'buttermilk chicken', 'fettuccine', 'roast chicken salad', 'mushroom quesadillas', 'pasta dough', 'lamb meatballs', 'blood oranges', 'beef bourguignon', 'omelet', 'stir-fried shrimp', 'strawberries', 'mousse', 'whiskey cake', 'spaetzle', 'fruit salad', 'veal breast', 'steak', 'celery root soup', 'bucatini', 'asparagus salad', 'stir-fried asparagus', 'steak au poivre', 'pudding', 'crab', 'artichoke salad', 'mint', 'ham', 'sugar peas', 'liver', 'roast lamb', 'garlic soup', 'pan-seared halibut', 'birthday cake', 'braised lettuce', 'holiday ham', 'cassoulet', 'cheese', 'apple pie', 'stir-fried cabbage', 'chard', 'buckwheat crepes', 'pudding cake', 'quail', 'ratatouille', 'lentil soup', 'salsa fresca', 'summer pasta', 'bulgur salad', 'okra', 'tuna-macaroni salad', 'tomatillo salsa', 'pinwheels', 'yogurt', 'feta', 'olives', 'watermelon juice', 'rhubarb', 'spinach lasagna', 'prunes', 'chorizo', 'shrimp scampi', 'crema', 'ribs', 'braised fennel', 'onion soup', 'mackerel', 'stew', 'farfalle', 'black-skinned chicken', 'trifle', 'coconut cream', 'chiles rellenos', 'sauce gribiche', 'carrot soup', 'carrots', 'five-spice powder', 'salmon sandwich', 'pan bagnat', 'marmalade', 'falafel', 'layer cake', 'sea scallops', 'glaze', 'broccoli salad', 'braised kale', 'pernil', 'cabbage', 'winter squash gratin', 'egg soup', 'garlic broth', 'gravy', 'stir-fried potatoes', 'potato gratin', 'sourdough', 'rice salad', 'braised turkey', 'quinoa pilaf', 'quinoa', 'quinoa salad', 'kasha varnishkes', 'potato leek gratin', 'hummus', 'marinara sauce', 'spinach', 'yogurt soup', 'summer squash gratin', 'corn salad', 'frittata', 'jerk chicken', 'gremolata', 'bibimbap', 'calamari', 'spaghettini', 'rainbow trout', 'pasta primavera', 'fish stew', 'buckwheat crepes', 'ganache', 'flan', 'lamb stew', 'farro salad', 'sausages', 'fish tacos', 'shrimp risotto', 'chicken-fried steak', 'berries', 'cupcakes', 'meringue', 'butter cookies', 'broccoli', 'lamb shanks', 'carrot salad', 'rice noodle salad', 'barley risotto', 'cauliflower salad', 'cauliflower gratin', 'farro soup', 'collard greens', 'strata', 'caramel cake', 'butter', 'creme fraiche', 'apple cider doughnuts', 'granola', 'one-pot pasta', 'egg', 'pumpkin flan', 'gingerbread cake', 'acorn squash', 'spaghetti squash', 'casserole', 'orecchiette', 'strozzapreti', 'chili con carne', 'radicchio', 'purslane salad', 'walnut bread', 'fig', 'succotash', 'stir-fried tofu', 'chicken liver mousse', 'kale', 'venetian spritz', 'grain blueberry muffins', 'tomato frittata', 'garlic toast', 'borscht', 'orzo', 'yogurt buttermilk soup', 'pizza margherita', 'salmorejo', 'chamomile syrup', 'ranch', 'bulgur pilaf', 'summer vegetables', 'chilaquiles', 'chicken caesar salad', 'sugar pea salad', 'chicken meatballs', 'rhubarb cobbler', 'chicken schnitzel', 'asparagus frittata', 'chicken paillard', 'sunday-salad', 'jalapenos', 'pappardelle', 'porchetta', 'blue cheese dip', 'braised cabbage', 'spaghetti and meatballs', 'farro', 'winter salad', 'duck confit', 'chicken cutlets', 'bean burgers', 'peperonata', 'fruit compote', 'frisee salad', 'braised endives', 'kale salad', 'blini', 'beef ribs', 'grapefruit', 'rice casserole', 'rugelach', 'butterscotch scotch eggnog', 'arugula salad', 'pumpkin cornbread', 'sauerkraut', 'lentil stew', 'queso fundido', 'butter pie', 'butternut squash salad', 'banana pie', 'couscous salad', 'brioche', 'portobello', 'coconut kale', 'vegetable soup', 'lavash pizza', 'chicken breasts', 'dough', 'avocado', 'scones', 'harissa', 'dukkah', 'pear ginger', 'quince', 'carrot cake', 'minestrone', 'insects', 'stir-fried rice noodles', 'pie dough', 'braised chicken thighs', 'yogurt cake', 'tomato gazpacho', 'italian sausage', 'chicken stew', 'fregola', 'rice bowl', 'ragu', 'ribollita', 'lamb ribs', 'matzo', 'haroseth', 'bruschetta', 'pork rillettes', 'vinegar', 'chicken stock', 'hot cakes', 'cornbread muffins', 'amaranth porridge', 'rib roast', 'braised potatoes', 'soba', 'albacore', 'cookies', 'potato soup', 'thumbprints', 'herring', 'linzer cookies', 'cod sea bass salad', 'midnight pasta', 'winter squash blini', 'carrot avocado salad', 'potato', 'mushroom stew', 'waffles', 'onion', 'bananas', 'stir-fried brussels', 'cod ceviche', 'shells', 'persimmon salad', 'potato casserole', 'broccoli rabe', 'pasta fagioli', 'burrata', 'chicken scaloppine', 'cheese frosting', 'dandelion salad', 'frisee', 'braised brisket', 'tabbouleh', 'stir-fried rice', 'zucchini salad', 'rice pilaf', 'slow-roasted tomatoes', 'watermelon gazpacho', 'aioli', 'clafoutis', 'miso-glazed eggplant', 'chinese chicken', 'pan-roasted cauliflower', 'pork cutlets', 'burgers', 'moroccan fish', 'farro pasta', 'pho', 'radicchio salad', 'tostadas', 'braised beets', 'parsnip gratin', 'rice lentil salad', 'baby ribs', 'sesame chicken', 'spinach gnocchi', 'indian lamb', 'shortbread', 'pate a choux', 'root vegetables', 'potato latkes', 'endive apple salad', 'candied potatoes', 'roast turkey', 'butternut squash', 'brussels sprouts salad', 'carrot', 'vegan pizza', 'stock', 'cranberry sauce', 'beet winter squash salad', 'teff pancakes', 'quiche', 'pasta salad', 'pasta alla gricia', 'croutons', 'meatballs', 'tomato jam', 'rice arborio risotto', 'clam pasta', 'arugula corn herb salad', 'buttermilk biscuits', 'melon cucumber tomato salad', 'chickpea salad', 'tomato ketchup', 'leek soup', 'rainbow quinoa salad', 'fattoush', 'quesadilla', 'mexican chocolate', 'mushroom', 'blanched kale', 'banana pudding', 'irish soda bread', 'pinto beans', 'tangerine sorbet', 'shallots', 'coconut chicken', 'leeks vinaigrette', 'shrimp cocktail', 'fennel salad', 'beet arugula salad', 'spanish tortilla', 'chickpea stew', 'lemon-garlic kale salad', 'pecan pie', 'belgian endive', 'millet polenta', 'red-cooked beef ribs', 'noodle bowl', 'clam chowder', 'zucchini pasta', 'eggplant tomatoes', 'panzanella', 'melon', 'lobster pasta', 'soda bread', 'zucchini carpaccio', 'cucumber salad', 'barbecue chicken', 'miso chicken', 'sesame noodles', 'parsley salad', 'beef carpaccio', 'kale quinoa salad', 'cucumber tomato salad', 'watermelon salad', 'stir-fried soba noodles', 'pickles', 'garlic bread', 'apricot', 'barbecue sauce', 'key lime pie', 'beef empanadas', 'cacio pepe', 'pasta alla norma', 'tuna salad', 'quinoa bowl', 'smoothie', 'no-knead bread', 'tomato toast', 'shrimp stew', 'whole-wheat buttermilk scones', 'oats', 'fish chowder', 'apple compote', 'quinoa cakes', 'doughnuts', 'waldorf salad', 'pie', 'corn casserole', 'carrot parsnip potato colcannon', 'colcannon', 'mofongo', 'shiitakes', 'endive salad', 'twice-baked potatoes', 'pearl couscous', 'herb salad', 'rice cakes', 'pork roast', 'ziti', 'stir-fried beans', 'strawberry cream', 'butter cream', 'skillet chicken', 'ramen', 'strawberry cheesecake', 'pozole', 'pops', 'vegetables la grecque', 'cheese sandwich', 'polpettone', 'kasha', 'matzo brei', 'yorkshire pudding', 'gingerbread house', 'shakshuka', 'icing', 'arancini', 'chocolate cookies', 'coconut cake', 'toast', 'pumpkin bread', 'radishes', 'delicata squash', 'dutch baby', 'cauliflower steaks', 'stew chicken', 'sheet-pan fish', 'skillet chili', 'cucumbers', 'blondies', 'chimichurri', 'cheese enchiladas', 'celery salad', 'jollof rice', 'babka', 'angel food cake', 'pavlova', 'nachos', 'baklava', 'cinnamon', 'pommes anna', 'wine-braised ribs', 'sugar cookies', 'sauteed brussels', 'rainbow cake', 'chicken congee', 'sofrito', 'fig jam', 'kimchi noodles', 'brie', 'spaghetti al limone', 'rice beans', 'lemony pasta', 'chicken rice', 'cheese fondue', 'swedish meatballs', "shepherd's pie", 'gougeres', 'beef stroganoff', 'queso', 'onion dip', 'gravlax', 'wine pears', 'slow-roasted salmon', 'steak tacos', 'strawberry pie', 'pan pizza', 'no-bake cheesecake', 'sheet cake', 'sheet-pan paprika chicken', 'tagliatelle', 'tres leches cake', 'thai noodles', 'brown-butter salmon', 'lemony cauliflower', 'biscuits', 'cranberries', 'lemon curd', 'cooker lentil soup', 'mozzarella', 'crunchy chickpeas', 'pumpkin cheesecake', 'avocado salad', 'coconut shrimp', 'biscotti', 'shishito', 'dumpling soup', 'snacking cake', 'oil cake', 'vinegar chicken', 'ginger cake', 'zhug', 'sheet-pan sausage', 'one-pan fish', 'macaroni salad', 'fruit scones', 'spatchcocked chicken', 'sheet-pan gnocchi', 'steel-cut oats', 'chicken rice soup', 'butternut squash pasta', 'sheet-pan sausages', 'pesto pasta', 'vegan polenta', 'porgy', 'halloumi'];

  return foodArray;
}
