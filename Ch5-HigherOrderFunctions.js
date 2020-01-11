//It is a useful skill to notice when you are working at too low a level of abstraction

for (let i = 0; i < 10; i++) {
  console.log(i);
}

//abstract doing something N times
function repeatLog(n) {
  for (let i = 0; i < n; i++) {
    console.log(i);
  }
}

//! functions are just values, we can pass our action as a function value
//What if we want to do something other than log. 
//Abstract doing X, N number of times
function repeat(n, action) {
  for (let i = 0; i < n; i++) {
    action(i);
  }
}

repeat(3, console.log);
// -> 0
// -> 1
// -> 2

//!We don't have to use a predefined function to repeat(). 
//!Often it is easier to create a function value on the spot
let labels = [];
repeat(5, i => {
  labels.push(`Unit ${i + 1}`);
});
console.log(labels);
// -> ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4', 'Unit 5']

//the function body is a small single expression so we can shorten it
repeat(5, i => labels.push(`Unit ${i + 1}`));

//! functions that operate on other functions, either by taking them as arguments or by returning them, are called 'higher-order functions'

//! Higher-order functions allow us to abstract over actions, not just values.

// For example, we can have a function that creates new functions
function greaterThan(n) {
  return m => m > n;
}
let greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));
// -> true

//functions that change other functions
function noisy(f) {
  return (...args) => {
    console.log('calling with', args);
    let result = f(...args);
    console.log('called with', args, ', returned', result);
    return result;
  };
}
noisy(Math.min)(3, 2, 1);
// -> calling with [3, 2, 1]
// -> called with  [3, 2, 1] , returned 1

//functions that provide new types od control flow
function unless(test, then) {
  if (!test) then();
}

repeat(3, n => {
  unless(n % 2 == 1, () => {
    console.log(n, 'is even');
  });
});
// -> 0 is even
// -> 2 is even

//built-in array method like for/of loop, forEach, is a higher-order function
['A', 'B'].forEach(a => console.log(a));
// -> A
// -> B

//DATA SET of languages
{
  name: 'Coptic',
  ranges: [[994, 1008], [11392, 11508], [11513, 11520]],
  direction: 'ltr',
  year: -200,
  living: false,
  link: 'https://en.wikipedia.org/wiki/Coptic_alphabet'
}

//FILTERING ARRAYS

//to find scripts in the data set still in use
function filter(array, test) {
  let passed = [];
  for (let element of array) {
    if(test(element)) {
      passed.push(element)
    }
  }
  return passed;
}

console.log(filter(SCRIPTS, script => script.living));
// -> [{name: "Adlam", …}, {name: "Arabic", …}, {…}, {…}, {…}, …]

//! filter is a standard array method. 
console.log(SCRIPTS.filter(s => s.direction == 'ttb'));
// -> [{name: "Mongolian", …}, …]

//TRANSFORMING WITH MAP

// we were able to filter out a new array. But we're given lots of information we don't really need. 

//! The map method transforms an array by applying a function to all of its elements 
//! It's content will be 'mapped' to a new form by the function

function map(array, transform) {
  let mapped = [];
  for (let element of array) {
    mapped.push(transform(element));
  }
  return mapped;
}

let rtlScripts = SCRIPTS.filter(s => s.direction == 'rtl');
console.log(map(rtlScripts, s => s.name));
// -> ["Adlam", "Arabic", "Imperial Aramaic", "Avestan", …]

//! map is a standard array method
console.log(rtlScripts.map(s => s.name));
// -> ["Adlam", "Arabic", "Imperial Aramaic", "Avestan", …]

//SUMMARZING WITH REDUCE

//Reducing arrays to compute a single value
//!It builds a value by repeatedly taking a single element from the array and combining it with the current value

function reduce(array, combine, start) {
  let current = start;
  for (let element of array) {
    current = combine(current, element);
  }
  return current;
}
console.log(reduce([1, 2, 3, 4], (a,b) => a + b, 0));
//0 + 1 + 2 + 3 + 4
// -> 10

//!reduce is a standard array method
console.log([1, 2, 3, 4].reduce((a, b) => a + b, 0));
// -> 10
console.log([1, 2, 3, 4].reduce((a, b) => a + b, 10));
//-> 20

//! if no start value is given, the first element will be the accumulator
const values = [5, 4, 1, 2, 9];
let reducer = (accumlator, currentValue) => accumlator + currentValue;

console.log(array.reduce(reducer));
//1 + 2 + 3 + 4
// -> 10
console.log(array.reduce(reducer, 5));
//5 + 1 + 2 + 3 + 4
// -> 15

console.log(array.reduce((a, b) => a + b), 5)
// -> 15

let flattened = [[0, 1], [2, 3], [4, 5]].reduce (
  function(accumlator, currentValue) {
    return accumlator.concat(currentValue)
  }, []);

let flattened = [[0, 1], [2, 3], [4, 5]].reduce (
  (a, b) => a.concat(b), []);

console.log(flattened);
//-> [0, 1, 2, 3, 4, 5]

let biggest = [2, 1, 4, 5, 9, 7].reduce((a, b) => b > a ? b : a);
//accumulator is 2 (because no initial value)
//is 1 > 2? no. accumulator remains 2;
//is 4 > 2? yes. accumulator is now 4;
//is 5 > 4? yes. accumulator is now 5;
//is 9 > 5? yes, accumulator is now 9;
//is 7 > 9? no. accumulator remains 9;
// -> 9

//we'll use reduce twice to find the script with the most characters
//reduces the ranges assigned to a script by summing their sizes
function characterCount(script) {
  return script.ranges.reduce((count, [from, to]) => {
    return count + (to - from);
  }, 0);
}

//uses the returned value from characterCount to find the largest script
console.log(SCRIPTS.reduce((a, b) => {
  return characterCount(a) < characterCount(b) ? b : a;
}));
// -> {name: "Han", …}

//! Higher-order functions are the best when you need to compose operations (aka function chaining)

function average(array) {
  return array.reduce((a, b) => a + b / array.length);
}
console.log(Math.round(average(
  SCRIPTS.filter(s => s.living).map(s => s.year))));
// -> 1165

console.log(Math.round(average(
  SCRIPTS.filter(s => !s.living).map(s => s.year))));
// -> 204
//You can see it as a pipeline: we start with all scripts, filter out the living (or dead) ones, take the years from those, average them, and round the result.

//less abstract function | one big loop
let total = 0, count = 0;
for (let script of SCRIPTS) {
  if (script.living) {
    total += script.year;
    count += 1;
  }
}
console.log(Math.round(total / count));
// -> 1165

//The first approach builds new arrays when running filter and map
//The second approach computes only numbers, doing less work. Faster
//!Hoever the first approach is easier to see what's being done

//!You can usually a afford the readable approach, but if you're processing huge arrays and doing so many times
//the less abstract style might be worth the extra speed