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
      modalCont.innerHTML = "Please enter a valid search term.";
      showModal(); 
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
      modalCont.innerHTML = "Error: " + response.statusText;
      showModal();
    }
  })
  .catch(function(error) {
    modalCont.innerHTML = "Unable to connect to Edamam"
    showModal();

  });
};

// Display Recipes 
var displayRecipes = function () {

  recipeContainerEl.textContent = "";

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
    ingredientEl.innerHTML = 'Ingredients: ' + '<ul><li>' + ingredients.join("</li><li>"); + '</li></ul>';

    // create Health Labels element
    var healthLabelEl = document.createElement("p");
    healthLabelEl.classList = "recipe-health";
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
      modalCont.innerHTML = "Please enter a valid ZIP code"
      showModal();
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
        modalCont.innerHTML = "Error: " + response.statusText;
        showModal();
        }
    })
    .catch(function(error) {
      modalCont.innerHTML = "Unable to connect to Edamam"
      showModal();
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

// Get the modal
var modal = document.getElementById("myModal");

// Get the content for the modal
var modalCont = document.getElementById("modal-content");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
function showModal() {
    modal.style.display = "block";
    modalCont.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}