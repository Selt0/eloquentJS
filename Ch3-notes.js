//Functions can be used to give structure to our programs and apply the DRY principle (Don't Repeat Yourself)

//a function can be created as long as there is the 'function' keyword
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

// a value can be binded to a function called a function definition
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
}

console.log(power(2, 10));
// -> 1024

//'return' returns the value of the expression. programs immediately jump out of the current function and returns the value.

//scopes

//Each function is like a treasure chest. Bindings created inside the function are only available inside the chest, known as local bindings. 
//Other functions don't know what's inside other chests. 

//You can create bindings outside chests, known as global bindings

