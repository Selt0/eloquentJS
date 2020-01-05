//Functions can be used to give structure to our programs and apply the DRY principle (Don't Repeat Yourself)

//inside the function parentheses are called parameters, also called arguments. 
//Function can have multiple parameters or none at all.

//! parameters are like bindings. Bindings can be given when the function is called

function makeNoise(){
  console.log('Pling!');
}
makeNoise();
// -> Pling!

function divideBy(x, y) {
  return x / y;
}
console.log(divideBy(12, 4));
// -> 3

// a value can be binded to a function called a function value
const square = function(x) {
  return x * x;
};  // <- notice the semicolon. A function created this way needs ;

console.log(square(12));
// -> 144

const power = function(base, exponent) {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
};

console.log(power(2, 10));
// -> 1024

//'return' returns the value of the expression. programs immediately jump out of the current function and returns the value.

//scopes

//Each function is like a treasure chest. Bindings created inside the function are only available inside the chest, known as local bindings. 
//Other functions don't know what's inside other chests. 
function myName() {
  let name = 'Michael';
  console.log(name);
}
myName();
// -> Michael
console.log(name);
// -> undefined

//You can create bindings outside chests, known as global bindings
//any function can use bindings creadted in the global scope

let name = 'Michael';

function greeting(){
  console.log(`Hello! My name is ${name}`);
}
// -> Hello! My name is Michael;

//Everytime a function is called, new binding are created
//Each function call acts in its own little world

let x = 10;
if (true) {
  let y = 20;
  var z = 30;
  console.log (x + y + z);
}
// -> 60;

console.log(y);
// -> undefined
console.log(x + z);
// -> 40

//!var declarations are put in the global scope.

//Each scope can look at the global but if the value is defined inside the function, it picks that instead

const halve = function(n) {
  return n / 2;
};

let n = 10;
console.log(halve(100));
// -> 50
console.log(n);
// -> 10;

//nested scopes
//functions inside other functions creating multiple degrees of locality known as lexical scoping

const hummus = function(factor) {
  const ingredient = function(amount, unit, name) {
    let ingredientAmount = amount * factor;
    if (ingredientAmount > 1){
      unit += 's';
    }
    console.log(`${ingredientAmount} ${unit} ${name}`);
  };
  ingredient(1, 'can', 'chickpeas');
  ingredient(0.25, 'cup', 'tahini');
  ingredient(0.25, 'cup', 'lemon juice');
  ingredient(1, 'clove', 'garlic');
  ingredient(1, 'can', 'chickpeas');
  ingredient(0.5, 'teaspoon', 'cumin');
};

//just like regular values, you can store function values in a new binding and pass it as an argument to a function. 
//It can also be assigned a new value
let launchMissiles = function() {
  missileSystem.launch('now');
};
if (safeMode) {
  launchMissiles = function() {
    //do nothing
  }
}

//function declarations
function square(x) {
  return x * x;
}
//function binding
let square = function(x) {
  return x * x;
};

//function declarations can be defined AFTER it is used. Just like 'var', function declarations are sent to the top.

console.log('The future says:', future());

function future() {
  return "You'll never have flying cars";
}

//another way to create functions is arrow functions
//replaces the word function

const power = (base, exponent) => {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
};

//When there is only a single expression, you can omit parentheses and return
const square = (x) => { return x * x; };
const square = x => x * x;

//no parameter arrow function
const horn = () => console.log('toot');

//call stack
//program gets run top to bottom. When it reaches a function call, the program saves its spot in its internal memory, 

//The spot it stores is called the call stack. Every time a function is called, the spot gets added to the top of the stack. Once it executes the function, it gets removed from the top of the stack and the computer continues where it left off. -- like a queue

//When the stack gets too high, the computer fails and gives an error "too much recursion" or 'out of stack space'

function chicken() {
  return egg();
}
function egg() {
  return chicken();
}
console.log(chicken() + ' came first.');
// -> InternalError: too much recursion

//JS ignores extra arguments
function square(x) { return x * x; }
console.log(square(4, true, 'hedgehog', 'okay'));
//-> 16

//missing an argument, the missed arg gets assigned 'undefined'
function minus(a, b) {
  if (b == undefined) return -a;
  else return a - b;
}

console.log(minues(10));
// -> -10
console.log(minues(10, 5));
// -> 5

//You can assign a default value to a missing argument
function power(base, exponent = 2) {
  let result = 1;
  for (let count = 0; count < exponent; count++) {
    result *= base;
  }
  return result;
}

console.log(power(4));
// -> 16
console.log(power(2, 3));
// -> 8;

//closure - functions create new bindings every time it is called. 
//Whenever a function accesses its own local binding when called, its closure

function wrapValue(n) {
  let local = n;
  return () => local;
}
function wrapValue(n) {
  return local => n;
}
function wrapValue(n) {
  return () => n;
}

let wrap1 = wrapValue(1);
let wrap2 = wrapValue(2);
console.log(wrap1());
// -> 1
console.log(wrap2());
// -> 2

//this lets us create arbitrary functions
function multiplier(factor) {
  return number => number * factor;
}

let twice = multiplier(2);
console.log(twice(5));
// -> 10

function waterIntake(weight) {
  function ounceConverter(n) {
    let cup = Math.round(n / 8);
    let bottle = Math.round(n / 32);
    return `${cup} cups or ${bottle} bottles of water`;
  }
  return ounceConverter(weight);
}


console.log(waterOunce(175));
console.log(waterCup(175));
console.log(waterBottle(175));
// -> 175
// -> 22
// -> 5

//recursion - when a function calls itself
function power(base, exponent) {
  if (exponent == 0) {
    return 1;
  } else {
    return base * power(base, exponent - 1);
  }
}
console.log(power(2, 3));
// -> 8


//puzzle: Write a function that, given any number, finds a sequence of either adding 5 or multiplying by 3 to produce that number, starting from 1

function findSolution(target) {
  function find(current, history) {
    if (current == target) return history;
    else if (current > target) return null;
    else return find(current + 5, `(${history} + 5)`) ||
                find(current * 3, `(${history} * 3)`);
  }
  return find(1, '1');
}

console.log(findSolution(13));
// -> (((1 * 3) + 5) * 3)

/*
find(1, "1")
  find(6, "(1 + 5)")
    find(11, "((1 + 5) + 5)")
      find(16, "(((1 + 5) + 5) + 5)")
        too big
      find(33, "(((1 + 5) + 5) * 3)")
        too big
    find(18, "((1 + 5) * 3)")
      too big
  find(3, "(1 * 3)")
    find(8, "((1 * 3) + 5)")
      find(13, "(((1 * 3) + 5) + 5)")
        found!
*/

//! Use functions instead of repeating code

//Write a program for a farmer that prints two numbers, one for cows and one for chickens on a farm, with the words Cows and Chickens as labels. 
//Print them with zeros padded before the number so that they are always 3 digits long
// -> 007 cows
// -> 011 chickens

function printFarmInventory(cows, chickens) {
  let cowString = String(cows);
  while (cowString.length < 3) {
    cowString = '0' + cowString;
  }
  console.log(`${cowString} Cows`);
  
  let chickenString = String(chickens);
  while (chickenString.length < 3) {
    chickenString = '0' + chickenString;
  } 
  console.log(`${chickenString} Chickens`)
}

printFarmInventory(7, 11);

//the farmer requests to add a way to also track pigs
//! notice code repeating!

function printZeroPaddedWithLabel(number, label) {
  let numberString = String(number);
  while (numberString.length < 3) {
    numberString = '0' + numberString;
  }
  console.log(`${numberString} ${label}`);
}

function printFarmInventory(cows, chickens, pigs) {
  printZeroPaddedWithLabel(cows, 'Cows');
  printZeroPaddedWithLabel(chickens, 'Chickens');
  printZeroPaddedWithLabel(pigs, 'Pigs');
}
printFarmInventory(7, 11, 3);

//the name 'printZeroPaddedWithLabel' is a little awkward along with the code in the body. Let's clean it up
function zeroPad(number, width) {
  let string = String(number);
  while(string.length < width) {
    string = '0' + string;
  }
  return string;
}

function printFarmInventory(cows, chickens, pigs) {
  console.log(`${zeroPad(cows, 3)} Cows`);
  console.log(`${zeroPad(chickens, 3)} Chickens`);
  console.log(`${zeroPad(pigs, 3)} Pigs`);
}
printFarmInventory(7, 16, 3);

//the function now has an obvious name which helps someone else who's reading the code know what it does. The function is also more versatile to be used for other programs. 

//! A useful principle is to not add cleverness unless you are absolutely sure you’re going to need it. It can be tempting to write general “frameworks” for every bit of functionality you come across. 
//Resist that urge. You won’t get any real work done—you’ll just be writing code that you never use

//! Functions can be divided into those called for their side effects and those called for their return values

//printZeroPaddedWithLabel is a side effect: prints a line
//zeroPad is a return value: return string

//! Functions that create values (return) are easier to combine in new ways than functions that perform side effects 