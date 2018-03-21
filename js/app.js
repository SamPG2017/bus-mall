'use strict'

// alert("Can you see this ?");
// debugger;

/*
// STRETCH GOAL
// https://www.w3schools.com/howto/howto_js_tabs.asp

// ADD NAV TABS AND FUNCTIONALITY FOR THOSE TABS
function openPage(evt, pageName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the 
  // button that opened the tab
  document.getElementById(pageName).style.display = "block";
  evt.currentTarget.className += " active";
}
*/
debugger;

// DECLARE ALL GLOBAL VARIABLES

// ARRAY TO HOLD ALL PRODUCT OBJECTS
Product.allProducts = [];             // used on line 70 in object constructor

// array to keep track of previously displayed images
Product.lastDisplayed = [];           // used on lines 139 - 141

// product names for bar chart labels
var productNames = [];                // used on line 69 w/in constructor

// goat votes for bar chart data
var productClicks = [];               // used on line 227

// click tracker
Product.totalClicks = 0;

var totalGuesses = 25;

var img1 = document.getElementById("prod-pic1");
var img2 = document.getElementById("prod-pic2");
var img3 = document.getElementById("prod-pic3");

// access the image elements from the DOM
// var rightImg = document.getElementById('right');
// var midImg = document.getElementById('mid');
// var leftImg = document.getElementById('left');

// access the section element from the DOM
var sectionElement = document.getElementById('product-section');

// access the unordered list element from the DOM
var unorderedListElement = document.getElementById('results');

// MAKE A PRODUCT CONSTRUCTOR FOR PRODUCT OBJECTS
function Product(filepath, imgname) {
  this.filepath = filepath;
  this.imgname = imgname;
  this.numDisplayed = 0;          // numberTimesViewed
  this.numClicked = 0;            // numberTimesClicked
  productNames.push(this.imgname);
  Product.allProducts.push(this);
}
console.log(" LINE 76 - Object: " + Product.imgname);

// SET UP ALL ARGUMENTS FOR NEW OBJECTS
// New instances of products
new Product('img/bag.jpg', 'R2D2 Bag');
new Product('img/banana.jpg', 'Banana slicer');
new Product('img/bathroom.jpg', 'Tablet and TP Holder');
new Product('img/boots.jpg', 'Yellow Boots with no Toes');
new Product('img/breakfast.jpg', 'All In One Toaster');

new Product('img/bubblegum.jpg', 'Meatball Bubble Gum');
new Product('img/chair.jpg', 'Chair with Convex Seat');
new Product('img/cthulhu.jpg', 'Cthulhu Figurine');
new Product('img/dog-duck.jpg', 'Dog with Duck Beak');
new Product('img/dragon.jpg', 'Dragon Meat in a Can');

new Product('img/pen.jpg', 'Utensil Pen');
new Product('img/pet-sweep.jpg', 'Pet Cleaning Slippers');
new Product('img/scissors.jpg', 'Pizza Scissors');
new Product('img/shark.jpg', 'Shark Sleeping Bag');
new Product('img/sweep.png', 'Baby Onesie Sweeper');

new Product('img/tauntaun.jpg', 'Tauntaun Sleeping Bag');
new Product('img/unicorn.jpg', 'Unicorn Meat in a Can');
new Product('img/usb.gif', 'USB Tentacle');
new Product('img/water-can.jpg', 'Recursive Watering Can');
new Product('img/wine-glass.jpg', 'Abnormal Wine Glass');

// access the element from the DOM
// when accessing from the DOM, var keyword is necessary
var imgElement = document.getElementById('prod-pic');

// add event listener
img1.addEventListener('click', clickHandler);
img2.addEventListener('click', clickHandler);
img3.addEventListener('click', clickHandler);

// randomly display three pictures
function randomProduct() {

  // generate two random indices
  var randomLeft = Math.floor(Math.random() * Product.allProducts.length);
  var randomMid = Math.floor(Math.random() * Product.allProducts.length);
  var randomRight = Math.floor(Math.random() * Product.allProducts.length);

  while (randomLeft === randomRight
    || (randomLeft === randomMid)
    || (randomMid === randomRight)
    || Product.lastDisplayed.includes(randomLeft)
    || Product.lastDisplayed.includes(randomMid)
    || Product.lastDisplayed.includes(randomRight)) {

    console.log('Duplicate was caught here');

    randomLeft = Math.floor(Math.random() * Product.allProducts.length);
    randomMid = Math.floor(Math.random() * Product.allProducts.length);
    randomRight = Math.floor(Math.random() * Product.allProducts.length);
  }                 // END OF WHILE LOOP

  // Now that we know they are unique numbers, display the three
  // unique images on the screen
  img1.src = Product.allProducts[randomLeft].filepath;
  img1.alt = Product.allProducts[randomLeft].imgname;

  img2.src = Product.allProducts[randomMid].filepath;
  img2.alt = Product.allProducts[randomMid].imgname;

  img3.src = Product.allProducts[randomRight].filepath;
  img3.alt = Product.allProducts[randomRight].imgname;

  // incremented the number of times displayed
  Product.allProducts[randomLeft].numDisplayed++;
  Product.allProducts[randomMid].numDisplayed++;
  Product.allProducts[randomRight].numDisplayed++;

  // keep track of previously displayed images
  // APPROACH 1:

  // create array to hold displayed items
  Product.lastDisplayed = [];
  // populate array with .push, using left, mid, right 
  Product.lastDisplayed.push(randomLeft);
  Product.lastDisplayed.push(randomMid);
  Product.lastDisplayed.push(randomRight);
}                     // END OF randomProduct FUNCTION

// CREATE EVENT TO HANDLE CLICK ON IMAGE
function clickHandler(event) {
  // increment click counter
  Product.totalClicks++;
  // increment clicks (votes) on the specific image (numClicked)  
  console.log(event.target);

  // use a for loop to determine which product image was actually clicked on
  for (var i in Product.allProducts) {

    if (event.target.alt === Product.allProducts[i].imgname) {

      // once we find the one that matches, increment counter on 
      // that specific object
      Product.allProducts[i].numClicked++;
    }
  }                                 // END CLICK HANDLER FUNCTION

  //  CLICK COUNTER
  //  Check the click counter
  if (Product.totalClicks < totalGuesses) {

    // turn off event listener
    sectionElement.removeEventListener('click', clickHandler);

    // if less than 24, display more products
    showResults();

    // display the fully populated chart
    renderChart();
  } else {
    // if less than 24, display a new set of product images

    randomProduct();             // commented out to test
  }
}                         // END CLICK COUNTER IF STATEMENT

//////////////////////////////////////////////
// CREATE FUNCTION TO DISPLAY RESULTS TO WEBPAGE
function showResults() {
  console.log("You clicked " + Product.totalClicks + "times !");

  // CREATE SECONDARY FUNCTION TO UPDATE VOTECLICKS FOR PRODUCT
  function updateClicks() {
    for (var i in Product.allProducts) {
      // APPROACH 1:
      // goatVotes.push(Goat.allGoats[i].votes);
      // APPROACH 2:
      productClicks[i] = Product.allProducts[i].votes;
    }
  }
}

// RENDER IMAGE ON PAGE LOAD (CALL FUNCTION)
randomProduct();

////////////////////////////////////////////////////////////
/*
// use Chart.js to create a bar chart
function renderChart() {
  // access the canvas element from the DOM using a var
  var context = document.getElementById('goat-chart').getContext('2d');
  var context = document.getElementById('product-chart').getContext('2d');

  var arrayOfColors = ['red', 'green', 'yellow'];

  var productChart = new Chart(context, {
    type: 'bar',
    data: {
      labels: productNames, // array of product names, populated above in Global Variable section
      datasets: [{
        label: "Clicks on Product",
        data: productClicks,
        backgroundColor: arrayOfColors,
      }]
      // labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  })
}
*/
