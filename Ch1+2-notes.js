/*
- - - - - - - - -
CHAPTER 1 VALUES, TYPES, AND OPERATORS
- - - - - - - - - 
*/

//strings
"This is the frist line\nThis is the second"
// -> This is the first line
//    This is the second

//two backslashes turn into one and is typed out
'A newline character is written like \"\\n\".'
// -> A newline character is written like "\n".

//concatenate - add strings together
'cat' + 'dog'
// -> catdog

//template literals
`half of 100 is ${100 / 2}`
// -> half of 100 is 50

let bird = 'word';
console.log(`The bird is the ${bird}.`)
// -> The bird is the word.

//the minus operatoer (-) can be used as both binary and as a unary operator
console.log(- (10 - 2));
// -> -8

//ternary operator
//The value on the left of the question mark 'picks' which value will come out
console.log(true ? 1 : 2);
// -> 1
console.log(false ? 1: 2);
// -> 2

//The || operator will return the first half if its true, then move
//to the second if its false. You can use this to set up a default behavior

console.log( null || 'user');
// 'user'

console.log( 'Agnes' || 'user');
// 'Agnes'

//! 0, NaN, "" -> false
console.log( 0 || -1);
// -> -1
console.log( '' || '!?');
// -> !?

//short-circuit evaluation
true || x
//x can be anything- even a virus- but it will never run because the first result was true. 
false && x
//Same principle. the && checks the left side to see if its false. 
//If its not, it checks the right side. 
//However, once the left side is false, it won't run X.


/*
- - - - - - - - -
CHAPTER 2 Program Structure
- - - - - - - - - 
*/

//bindings - holds values
let caught = 5 * 5;

let ten = 10;
console.log(ten * ten);
// -> 100

//you can change values of bindings
let mood = 'light';
console.log(mood);
// -> light
mood = 'dark';
console.log(mood);
// -> dark

//imagine bindings as tentacles. They don't contain values, they grasp them - two bindings can refer to the same value

let luigisDebt = 140;
luigisDebt = luigisDebt - 35;
console.log(luigisDebt);
// -> 105

//if you ask for the value of an empty binding, it will be undefined

//you can define multiple bindings, separate them by commas
let one = 1, two = 2;
console.log(one + two);
// -> 3

//const defines a constant binding - the value cannot be changed
const greeting = 'hello';
console.log(greeting);
// -> hello

let x = 30;
console.log('the value of x is', x);
// -> the value of x is 30

//When a function produces a value, it is said to 'return' the value. Anything that produces a value is an expression.
//function calls can be used within larger expressions

//Programs get executed from top to bottom
let number = Number(prompt('Pick a number'));
console.log('Your number is the square root of', number * number);
// -> Your number is the square root of 16
//! The function 'Number' converts a value to a number

//Conditional execution
let number = Number(prompt('Pick a number'));
if (!Number.isNaN(number)) {
  console.log('Your number is the square root of', number * number);
}
//The function 'Number.isNaN' returns true only if the argument is NaN
//if 'Number.isNaN(number)' is NOT true, console.log
//book: 'unless number is not-a-number, do this'

//! You can omit the braces {} if they only hold a single statement
if (1 + 1 == 2) console.log("It's true");
// -> It's true

//Do this if true, else do this
let number = Number(prompt('Pick a number'));
if (!Number.isNaN(number)) {
  console.log('Your number is the square root of', number * number);
} else {
  console.log("Hey. Why didn't you give a number");
}

//You can chain if/else statements
if (num < 10) {
  console.log('Small');
} else if (num < 100) {
  console.log('Medium');
} else {
  console.log('Large');
}

//! The idea of writing a program is to make something LESS work, not more

//loops
let number = 0;
while (number <= 12) {
  console.log(number);
  number = number + 2;
}
// -> 0
// -> 2
// ... etc.

let result = 1;
let counter = 0;
while (counter < 10) {
  result = result * 2;
  counter++;
}
console.log(result);
// -> 1024

//do loop - always executes its body at least once, THEN starts testing
let yourName;
do {
  yourName = prompt('Who are you?');
} while (!yourName);
console.log(yourName);

//for loops
for (let number = 0; number <= 12; number = number + 2){
  console.log(number);
}
// -> 0
// -> 2
// ... etc.

let result = 1;
for (let counter = 0; counter < 10; counter++) {
  result = result * 2;
}
console.log(result);
// -> 1024

//'break' immediately jumps out of the loop
for (let current = 20; current += 1) {
  if (current % 7 == 0) {
    console.log(current);
    break;
  }
}
// -> 21
//if it finds the first number that returns 0 when divided by 7 (divisible by 7), console log and 'break' from loop
//! This is a forever loop as it has no condition. Only way out is to go through the conditional with break

//Switch
let weather = prompt('What is the weather like?');
if (weather == 'rainy') console.log('Remember to bring an umbrella.');
else if (weather == 'sunny') console.log('Dress lightly. Go outside');
else if (weather == 'cloudy') console.log('Go outside');
else console.log('Unkown weather type!');

switch (prompt('What is the weather like?')) {
  case 'rainy':
    console.log('Remember to bring an umbrella.');
    break;
  case 'sunny':
    console.log('Dress lightly');
  case 'cloudy':
    console.log('Go outside.');
    break;
  default:
    console.log('Unkown weather type!');
    break;
}
//! The program will start executing at the label with the proper value(case) or at 'default' if no match.
//! It will continue executing until it reaches a 'break' statement

//!Empty string '' is false