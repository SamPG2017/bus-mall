'use strict'

// alert("Can you see this ?");
// debugger;

// ARRAY TO HOLD ALL PRODUCT OBJECTS
Product.allProducts = [];

// MAKE A PRODUCT CONSTRUCTOR FOR PRODUCT OBJECTS
function Product(filepath, name) {
  this.filepath = filepath;
  this.name = name;
  Product.allProducts.push(this);
}

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

function randomProd(){
  var randomIndex = Math.floor(Math.random () * Product.allProducts.length);

//  FOR LOOP TO ITERATE OVER THE ARRAY AND RENDER ONE PRODUCT
imgElement.src = Product.allProducts[randomIndex].filepath;
console.log("Prod.allProducts[randomIndex].filepath: " + Product.allProducts[randomIndex].filepath);
imgElement.alt = Product.allProducts[randomIndex].name;
}

// RENDER IMAGE ON PAGE LOAD (CALL FUNCTION)
randomProd();