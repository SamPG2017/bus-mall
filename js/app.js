'use strict'

var totalGuesses = 25;

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

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(pageName).style.display = "block";
  evt.currentTarget.className += " active";
}
*/

// ARRAY TO HOLD ALL PRODUCT OBJECTS
Product.allProducts = [];

// MAKE A PRODUCT CONSTRUCTOR FOR PRODUCT OBJECTS
function Product(filepath, name) {
  this.filepath = filepath;
  this.imgname = imgname;
  this.numviewed = numviewed;
  this.numclicked = numclicked;
  this.imageid = imageid;
  Product.allProducts.push(this);
}


/////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////


// CREATE FUNCTION FOR DETERMINING WHETHER ARRAY
// ELEMENTS MATCH EACH OTHER
// DO NOT DISPLAY MATCHING ELEMENTS
// RUN THIS THREE TIMES AND RETURN THREE
// DIFFERENT ARRAY ELEMENTS


// COMPARE VALUES WITHIN ARRAY TO OTHER VALUES WITHIN ARRAY
var randIndex = [];

function randomProd(){
  var randomIndex = Math.floor(Math.random () * Product.allProducts.length);
  randIndex.push(randomProd); 
}

var begRandArray[0] = 0;
var begRandArray[1] = 0;
var begRandArray[2] = 0;

// FUNCTION TO PUSH RANDOM ELEMENTS INTO RandIndex ARRAY
// function createRandIndex (){
// randIndex[0] = randomProd() 
// }

for (var i = 0; i < 3; i++) {
  randomProd();
  randomIndex.push;  
  }

RandIndex.push(new number);



// CHECK randIndex[0] against randIndex[1] and randIndex[2] for equality
While randIndex[0] === randIndex[1] || randIndex[1] === randIndex[2];

// REASSIGN VARIABLES TO TAKE NEW VALUES
begRandArray1 = randomIndex[0];
begRandArray2 = randomIndex[1];
begRandArray3 = randomIndex[2];

//////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////

// NEW INSTANCES OF PRODUCTS
new Product('img/bag.jpg', 'R2D2 Bag', '1');
new Product('img/banana.jpg', 'Banana slicer', '2');
new Product('img/bathroom.jpg', 'Tablet and TP Holder', '3');
new Product('img/boots.jpg', 'Yellow Boots with no Toes', '4');
new Product('img/breakfast.jpg', 'All In One Toaster', '5');

new Product('img/bubblegum.jpg', 'Meatball Bubble Gum', '6');
new Product('img/chair.jpg', 'Chair with Convex Seat', '7');
new Product('img/cthulhu.jpg', 'Cthulhu Figurine', '8');
new Product('img/dog-duck.jpg', 'Dog with Duck Beak', '9');
new Product('img/dragon.jpg', 'Dragon Meat in a Can', '10');

new Product('img/pen.jpg', 'Utensil Pen', '11');
new Product('img/pet-sweep.jpg', 'Pet Cleaning Slippers', '12');
new Product('img/scissors.jpg', 'Pizza Scissors', '13');
new Product('img/shark.jpg', 'Shark Sleeping Bag', '14');
new Product('img/sweep.png', 'Baby Onesie Sweeper', '15');

new Product('img/tauntaun.jpg', 'Tauntaun Sleeping Bag', '16');
new Product('img/unicorn.jpg', 'Unicorn Meat in a Can', '17');
new Product('img/usb.gif', 'USB Tentacle', '18');
new Product('img/water-can.jpg', 'Recursive Watering Can', '19');
new Product('img/wine-glass.jpg', 'Abnormal Wine Glass', '20');

// ACCESS ELEMENTS FROM THE DOM
var imgElement = document.getElementById('prod-pic');

// ADD EVENT LISTENER
imgElement.addEventListener('click', randomProd);

// function randomProd(){
//   var randomIndex = Math.floor(Math.random () * Product.allProducts.length);

//  FOR LOOP TO ITERATE OVER THE ARRAY AND RENDER ONE PRODUCT
imgElement.src = Product.allProducts[randomIndex].filepath;
console.log("Prod.allProducts[randomIndex].filepath: " + Product.allProducts[randomIndex].filepath);
imgElement.alt = Product.allProducts[randomIndex].imgname;
}

// RENDER IMAGE ON PAGE LOAD (CALL FUNCTION)
randomProd();