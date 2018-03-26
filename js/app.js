'use strict'

// ARRAY TO HOLD ALL PRODUCT OBJECTS
Product.allProducts = [];

// array to keep track of previously displayed images
var lastDisplayed = [];

// product names for bar chart labels
var productNames = [];

// product votes for bar chart data
var productClicks = [];

// click tracker
Product.totalClicks = 0;

var totalGuesses = 25;

var img1 = document.getElementById("prod-pic1");
var img2 = document.getElementById("prod-pic2");
var img3 = document.getElementById("prod-pic3");

// access the section element from the DOM
var sectionElement = document.getElementById('prod-images');

// access the unordered list element from the DOM
var unorderedListElement = document.getElementById('results');

// MAKE A PRODUCT CONSTRUCTOR FOR PRODUCT OBJECTS
function Product(filepath, imgname) {
  this.filepath = filepath;
  this.imgname = imgname;
  this.numDisplayed = 0;
  this.numClicked = 0;
  // this.productLine = productline;
  productNames.push(this.imgname);
  Product.allProducts.push(this);
}

function setupProducts() {

  var productsAsString = localStorage.getItem('allProducts');
  var lastDisplayedAsString = localStorage.getItem('lastDisplayed');
  var productNamesAsString = localStorage.getItem('productNames');

  var useableProducts = JSON.parse(productsAsString);
  var useableLastDisplayed = JSON.parse(lastDisplayedAsString);
  var useableProductNames = JSON.parse(productNamesAsString);

  // Check local storage for stored values
  if (useableProducts && useableProducts.length) {
    Product.allProducts = useableProducts;

  } else {

    // New product arguments to create instances   
    new Product('img/bag.jpg', 'R2D2 Bag' /*, 'luggage' */);
    new Product('img/banana.jpg', 'Banana slicer', 'kitchen');
    new Product('img/bathroom.jpg', 'Tablet and TP Holder', 'bathroom');
    new Product('img/boots.jpg', 'Yellow Boots with no Toes', 'shoes');
    new Product('img/breakfast.jpg', 'All In One Toaster', 'kitchen');

    new Product('img/bubblegum.jpg', 'Meatball Bubble Gum', 'edible');
    new Product('img/chair.jpg', 'Chair with Convex Seat', 'furniture');
    new Product('img/cthulhu.jpg', 'Cthulhu Figurine', 'toy');
    new Product('img/dog-duck.jpg', 'Dog with Duck Beak', 'pets');
    new Product('img/dragon.jpg', 'Dragon Meat in a Can', 'edible');

    new Product('img/pen.jpg', 'Utensil Pen', 'kitchen');
    new Product('img/pet-sweep.jpg', 'Pet Cleaning Slippers', 'pets');
    new Product('img/scissors.jpg', 'Pizza Scissors', 'kitchen');
    new Product('img/shark.jpg', 'Shark Sleeping Bag', 'soft-goods');
    new Product('img/sweep.png', 'Baby Onesie Sweeper', 'kids');

    new Product('img/tauntaun.jpg', 'Tauntaun Sleeping Bag', 'soft-goods');
    new Product('img/unicorn.jpg', 'Unicorn Meat in a Can', 'edible');
    new Product('img/usb.gif', 'USB Tentacle', 'tech');
    new Product('img/water-can.jpg', 'Recursive Watering Can', 'gardening');
    new Product('img/wine-glass.jpg', 'Abnormal Wine Glass', 'kitchen');
  }

  // Check local storage for stored values
  if (useableLastDisplayed && useableLastDisplayed.length) {
    lastDisplayed = useableLastDisplayed;

  } else {
    lastDisplayed = [];
  }

  // Check local storage for stored values
  if (useableProductNames && useableProductNames.length) {
    productNames = useableProductNames;

  } else {
    productNames = [];
    for (var i = 0; i < Product.allProducts.length; i++) {
      productNames.push(Product.allProducts[i].imgname);
    }
  }
}

// access the element from the DOM
var imgElement1 = document.getElementById('prod-pic1');
var imgElement2 = document.getElementById('prod-pic2');
var imgElement3 = document.getElementById('prod-pic3');

// add event listener
imgElement1.addEventListener('click', clickHandler);
imgElement2.addEventListener('click', clickHandler);
imgElement3.addEventListener('click', clickHandler);

// randomly display three pictures
function randomProduct() {
  if (Product.totalClicks == totalGuesses) {
    renderChart();
    return;
  }

  // generate two random indices
  var randomLeft = Math.floor(Math.random() * Product.allProducts.length);
  var randomMid = Math.floor(Math.random() * Product.allProducts.length);
  var randomRight = Math.floor(Math.random() * Product.allProducts.length);

  while (randomLeft === randomRight
    || (randomLeft === randomMid)
    || (randomMid === randomRight)
    || lastDisplayed.includes(randomLeft)
    || lastDisplayed.includes(randomMid)
    || lastDisplayed.includes(randomRight)) {

    randomLeft = Math.floor(Math.random() * Product.allProducts.length);
    randomMid = Math.floor(Math.random() * Product.allProducts.length);
    randomRight = Math.floor(Math.random() * Product.allProducts.length);
  }                 // END OF WHILE LOOP

  // Display the three unique images on the screen
  imgElement1.src = Product.allProducts[randomLeft].filepath;
  imgElement1.alt = Product.allProducts[randomLeft].imgname;

  imgElement2.src = Product.allProducts[randomMid].filepath;
  imgElement2.alt = Product.allProducts[randomMid].imgname;

  imgElement3.src = Product.allProducts[randomRight].filepath;
  imgElement3.alt = Product.allProducts[randomRight].imgname;

  // increment the number of times displayed
  Product.allProducts[randomLeft].numDisplayed++;
  Product.allProducts[randomMid].numDisplayed++;
  Product.allProducts[randomRight].numDisplayed++;

  // keep track of previously displayed images
  // create array to hold displayed items
  lastDisplayed = [];

  // populate array with .push, using left, mid, right 
  lastDisplayed.push(randomLeft);
  lastDisplayed.push(randomMid);
  lastDisplayed.push(randomRight);
}

// CREATE EVENT TO HANDLE CLICK ON IMAGE
function clickHandler(event) {
  Product.totalClicks++;


  // use a for loop to determine which product image was actually clicked on
  for (var i in Product.allProducts) {
    if (event.target.alt === Product.allProducts[i].imgname) {
      // If it matches, increment counter on specific object
      Product.allProducts[i].numClicked++;
    }
  }

  //  CLICK COUNTER
  if (Product.totalClicks < totalGuesses) {
    randomProduct();
  } else {

    finish();

  }
}

function toggleEventListeners() {
  if (Product.totalClicks >= totalGuesses) {
    // turn off event listener if totalGuesses maxed
    imgElement1.removeEventListener('click', clickHandler);
    imgElement2.removeEventListener('click', clickHandler);
    imgElement3.removeEventListener('click', clickHandler);
  } else {
    imgElement1.addEventListener('click', clickHandler);
    imgElement2.addEventListener('click', clickHandler);
    imgElement3.addEventListener('click', clickHandler);
  }
}

// DISPLAY RESULTS TO WEBPAGE
function showResults() {


  // UPDATE VOTECLICKS FOR PRODUCT
  function updateClicks() {
    for (var i in Product.allProducts) {
      productClicks[i] = Product.allProducts[i].votes;
    }
  }
}

function clearImages() {
  document.getElementById('prod-images').innerHTML = '';
}

// use Chart.js to create a bar chart
function renderChart() {
  clearImages();
  // access the canvas element from the DOM 
  productClicks = [];
  for (var i = 0; i < Product.allProducts.length; i++) {
    productClicks.push(Product.allProducts[i].numClicked)
  }

  var context = document.getElementById('myChart').getContext('2d');

  var arrayOfColors = [
    '#378888', '#375F88', '#373788', '#5F3788', '#88375F',
    '#886337', '#848837', '#5C8837', '#37883A', '#378863',
    '#378888', '#375F88', '#373788', '#5F3788', '#88375F',
    '#886337', '#848837', '#5C8837', '#37883A', '#378863'];

  var productChart = new Chart(context, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: "Clicks on Product",
        data: productClicks,
        backgroundColor: arrayOfColors
      }]

    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            stepSize: 1,
            beginAtZero: true
          }
        }]
      }
    }
  });

}

function finish() {
  // Save to local storage
  var saveProducts = JSON.stringify(Product.allProducts);
  var saveLastDisplayed = JSON.stringify(lastDisplayed);
  var saveProductNames = JSON.stringify(productNames);
  var saveProductClicks = JSON.stringify(productClicks);
  var saveClickCount = JSON.stringify(Product.totalClicks);

  localStorage.setItem('allProducts', saveProducts);
  localStorage.setItem('lastDisplayed', saveLastDisplayed);
  localStorage.setItem('productNames', saveProductNames);
  localStorage.setItem('productClicks', saveProductClicks);
  localStorage.setItem('clickCount', saveClickCount);

  toggleEventListeners();
  renderChart();
}

// Get values from local storage if already stored
function setupCounters() {
  var productClicksAsString = localStorage.getItem('productClicks');
  var clickCountAsString = localStorage.getItem('clickCount');

  var savedProductClicks = JSON.parse(productClicksAsString);

  if (savedProductClicks && savedProductClicks.length) {
    productClicks = savedProductClicks;

  } else {
    for (var i = 0; i < Product.allProducts.length; i++) {
      productClicks.push(0);
    }
  }

  var savedClickCount = JSON.parse(clickCountAsString);
  if (savedClickCount) {
    Product.totalClicks = savedClickCount;

  } else {
    Product.totalClicks = 0;
  }
}

// RENDER IMAGE ON PAGE LOAD 
setupProducts();
setupCounters();
toggleEventListeners();
randomProduct();
