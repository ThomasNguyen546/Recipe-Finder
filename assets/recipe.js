// Javascript File for Recipe HTML
var recipeBtnEl = document.getElementById("recipes-btn");
var recipeInputEl = document.getElementById("searchRecipe");
var storeInputEl = document.getElementById("searchCity");
var storeContainerEl = document.getElementById("stores-container");
var storeBtnEl = document.getElementById("stores-btn");
var recipeContainerEl = document.getElementById("recipe-container");

// Recipe Search Form Handler
var recipesSubmitHandler = function(event) {
  event.preventDefault();
    
    var searchTerm = recipeInputEl.value.trim();
    
    if (searchTerm) {
        getRecipes(searchTerm);
        
        recipeInputEl.value = "";
    } else {
        alert("Please enter a valid search term.");
    }
};

// Get Recipes from Edamam API
var getRecipes = function(searchTerm) {

  var apiUrl = "https://api.edamam.com/search?q=" + searchTerm + "&app_id=b00f114c&app_key=00174a765fb378e74adaddd1216c4fa7";
  
  
  fetch(apiUrl).then(function(response) {
    if(response.ok) {
      response.json().then(function(data) {
        localStorage.setItem("recipes", JSON.stringify(data.hits));
        var resultsTerm = document.getElementById("search-term");
        resultsTerm.innerHTML = searchTerm;
        displayRecipes();
      })
    } else {
      alert("Error: " + response.statusText);
    }
  })
  .catch(function(error) {
    alert("Unable to connect to Edamam");
  });
};

// Display Recipes 
var displayRecipes = function () {
  var recipes = JSON.parse(localStorage.getItem("recipes") );
 
// loop through returned recipe objects
  for (var i = 0; i < recipes.length; i++) {

    var recipeName = recipes[i].recipe.label;
    var recipeSrc = recipes[i].recipe.url;
    var ingredients = recipes[i].recipe.ingredientLines
    var healthLabels = recipes[i].recipe.healthLabels;
    
    // create recipe card element
    var recipeEl = document.createElement("div");
    recipeEl.classList = "card recipe-card";

    // create recipe title element
    var nameEl= document.createElement("h4");
    nameEl.classList = "recipe-title";
    nameEl.innerHTML = recipeName;

    // create recipe Image element
    var recipeImg = document.createElement("img");
    recipeImg.classList = "recipe-image"
    recipeImg.src = recipes[i].recipe.image;

    // create "view full recipe" link
    var linkEl = document.createElement("a");
    linkEl.classList = "recipe-link";
    var link = document.createTextNode("View Full Recipe");

    linkEl.append(link);

    linkEl.title = "View Full Recipe";
    linkEl.href = recipeSrc;

    // create Ingredients element
    var ingredientEl = document.createElement("p");
    ingredientEl.classList = "recipe-ingredients";
    ingredientEl.innerHTML = "Ingredients: " + ingredients;

    // create Health Labels element
    var healthLabelEl = document.createElement("p");
    ingredientEl.classList = "recipe-health";
    healthLabelEl.innerHTML = "**" + healthLabels;
  
    // append all inner elements to recipe card
    recipeEl.append(nameEl, recipeImg, ingredientEl, healthLabelEl, linkEl);

    // append recipe card to document body
    recipeContainerEl.append(recipeEl);
  }
}

// Grocery Store Search Form Handler
var storesSubmitHandler = function() {
  event.preventDefault();

    
    var searchTerm = storeInputEl.value.trim();
    
    if (searchTerm) {
        getStores(searchTerm);
        
        storeInputEl.value = "";
    } else {
        alert("Please enter a valid ZIP code");
    }
};

// Get Nearby Grocery Stores from Google Places API
var getStores = function(searchTerm) {

  var apiUrl = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/textsearch/json?query=groceries%20in%20" + searchTerm + "&key=AIzaSyBFL3Y0p-FOo0Az0uRVoBW8QvtNAohWFCk";
  
  
  fetch(apiUrl).then(function(response) {
    if(response.ok) {
      response.json().then(function(stores) {
      localStorage.setItem("stores", JSON.stringify(stores.results));
      displayStores();
      }) 
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function(error) {
      alert("Unable to connect to Edamam");
    });
  };

// Display Nearby Grocery Stores
var displayStores = function () {
  var stores = JSON.parse(localStorage.getItem("stores") );
   
  storeContainerEl.textContent = "";
  

  for (var i = 0; i < 5; i++) {
      
      var storeName = stores[i].name;
      var storeAddress = stores[i].formatted_address;

      // create store container element
      var storeEl = document.createElement("div");
      storeEl.classList = "store-info list-item";

      // Create Store Title element
      var nameEl = document.createElement("h4");
      nameEl.innerHTML = storeName;

      // create store address element
      var addressEl = document.createElement("p");
      addressEl.innerHTML = storeAddress;

      // append store info elements to store container element
      storeEl.append(nameEl, addressEl);

      // append store container elements to document body
      storeContainerEl.append(storeEl);
  }
};




storeBtnEl.addEventListener("click", storesSubmitHandler)
recipeBtnEl.addEventListener("click", recipesSubmitHandler);