
//Flattening

/*
Use the reduce method in combination with the concat method to “flatten” an array of arrays into a single array that has all the elements of the original arrays.

let arrays = [[1, 2, 3], [4, 5], [6]];

// → [1, 2, 3, 4, 5, 6]
*/

let arrays = [[1, 2, 3], [4, 5], [6]]

function flatten (acc) {
  let empty = [];
  for (let item of acc) {
    empty = empty.concat(item);
  }
  return empty;
}

console.log(flatten(arrays))

//turn it into reduce
console.log(arrays.reduce((a, b) => a.concat(b)));

//clever solution
console.log(arrays.reduce((flat, current) => flat.concat(current), []));

//Your own loop

/*Write a higher-order function loop that provides something like a for loop statement. It takes a value, a test function, an update function, and a body function. Each iteration, it first runs the test function on the current loop value and stops if that returns false. Then it calls the body function, giving it the current value. Finally, it calls the update function to create a new value and starts from the beginning.

When defining the function, you can use a regular loop to do the actual looping.

loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1
*/

function loop(value, test, update, body) {
	while(test(value)){
      body(value);
  	  value = update(value);
    }
}

//clever solution
function loop(start, test, update, body) {
  for (let value = start; test(value); update(value)) {
    body(value);
  }
}

///Everything

/*Analogous to the some method, arrays also have an every method. This one returns true when the given function returns true for every element in the array. In a way, some is a version of the || operator that acts on arrays, and every is like the && operator.

Implement every as a function that takes an array and a predicate function as parameters. Write two versions, one using a loop and one using the some method. 

function every(array, test) {
  //your code here
}

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true
*/

function every(array, test) {
  for (let item of array) {
    if (!test(item)) return false;
  }
  return true;
}

function someEvery(array,test) {
  //use some to see if any value in the array is false
  //if there is no false, its true
  if(array.some(test) != false) return true; 
}