// Javascript File for Homepage
var userFormEl = document.getElementById("submit-btn");
var recipeInputEl = document.getElementById("searchRecipe")

// Slideshow for Pictures 
var slideIndex = 0;
showSlides();

function showSlides() {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 7000); // Change image every 5 seconds
}

var formSubmitHandler = function(event) {
  event.preventDefault();
    // get value from input element & send it to getRecipes()
    var searchTerm = recipeInputEl.value.trim();
    
    if (searchTerm) {
        getRecipes(searchTerm);
        // clear the input element
        recipeInputEl.value = "";
    } else {
        alert("Please enter a valid search term.");
    }
};

var getRecipes = function(searchTerm) {
  // format the mealsdb api url
  var apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchTerm;
  
  // make a request to the url
  fetch(apiUrl).then(function(response) {
    if(response.ok) {
      response.json().then(function(data) {
      console.log(data, searchTerm);
      })
    } else {
      alert("Error: " + response.statusText);
    }
  })
  .catch(function(error) {
    alert("Unable to connect to Github");
  });
};

userFormEl.addEventListener("click", formSubmitHandler);