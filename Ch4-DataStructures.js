//arrays store sequences of values. 

let listOfNumbers = [2, 3, 5, 7, 11];
console.log(listOfNumbers[2]);
// -> 5
console.log(listOfNumbers[0])
// -> 2
console.log(listOfNumbers[2 - 1]);
// -> 3

//Almost all JS values have properties, except for null and undefined
//You can access a property with a dot or brackets
value.x
value[x]

//! dot is the literal name of the property
//! brackets is evaluated.

//Dots only work with names that look like valid binding names (not numbers)
//If you want to extract the name by a value held in a binding, use bracket
value.length
value.color
value[2]
value['John Doe']
value[i]

//propeties that hold function values are called methods
let doh = 'Doh';
console.log(typeof doh.toUpperCase);
// -> function
console.log(doh.toUpperCase());
// -> DOH

let sequence = [1, 2, 3];
sequence.push(4);
sequence.push(5);
console.log(sequence);
// -> [1, 2, 3, 4, 5]
console.log(sequence.pop());
// -> 5
console.log(sequence);
// -> [1, 2, 3, 4]

//objects are collections of properties
let day1 = {
  squirrel: false,
  events: ['work', 'touched tree', 'pizza', 'running']
};
console.log(day1.squirrel);
// -> false
console.log(day1.wolf);
// -> undefeined
day1.wolf = false;
console.log(day1.wolf);
// -> false

//'in' tells you if the object has a property with that name
let anObject = {left: 1, right: 2};
console.log(anObject.left);
// -> 1
delete anObject.left;
console.log(anObject.left);
// -> undefeined
console.log('left' in anObject);
// -> false
console.log('right' in anObject);
// -> true

//'Object.keys()' returns an array of strings with the object's property names
console.log(Object.keys({x: 0, y: 0, z: 2}));
// -> ['x', 'y', 'z']

//'Object.assign' copies an object and all its properties to another
let objectA = {
  a: 1,
  b: 2
};

let objectB = {
  b: 3,
  c: 4
};

Object.assign(objectA, objectB);
console.log(objectA);
// -> {a: 1, b: 3, c: 4}

//arrays are just a kind of object specialized for storing sequences of things

//an array of objects
let journal = [
  {events: ['work', 'touched tree', 'pizza', 'running', 
            'televeision'],
   squirrel: false},
  {events: ['work', 'ice cream', 'cauliflower', 'lasanga', 
             'touched tree', 'brushed teeth'],
    squirrel: false},
  {events: ['weekend', 'cycling', 'break', 'peanuts', 
            'beer'],
   squirrel: true},
];

//! There is a difference between having two references to the same object and having two different objects that contain the same properties
//! when you compare objects with JS '==', it compares by identity
//! it will produce true only if BOTH objects are the exactly the same

let object1 = {value: 10};
let object2 = object1;
let object3 = {value: 10};

console.log(object1 == object2);
// -> true
console.log(object1 == object3);
// -> false

object1.value = 15;
console.log(object2.value);
// -> 15
console.log(object3.value);
// -> 10

//Object1 and object2 have the same identity. Object3 points to an entirely different object, even though its the same value. It's property is living a separate life

//a const binding to an object wont let the binding change but you can change the values

const score = {visitors: 0, home: 0};
score.visitors = 1;
console.log(score.visitors);
// -> 1

score = {visitors: 1, home: 1};
// -> TypeError: invalid assignment to const 'score'


let journal = [];

function addEntry(events, squirrel) {
  journal.push({events, squirrel});
}

//!if a property name in brace notation isn't followed by a value, it is taken from the binding with the same name

addEntry(['work', 'touched tree', 'pizza', 'running', 
          'televsion'], false);
addEntry(['work', 'ice cream', 'cauliflower', 'lasagna', 
          'touched tree', 'brushed teeth'], false);
addEntry(['weekend', 'cycling', 'break', 'peanuts', 'beer'], true);

//no squirrel, no pizza = 76
//no squirre, pizza = 9
//squirrel, no pizza = 4
//squirrel, pizza = 1

function phi(table) {
  return (table[3] * table[0] - tanle[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
              (table[0] + table[1]) *
              (table[1] + table[3]) *
              (table[0] + table[2]));
}

console.log(phi([76, 9, 4, 1]))

function tableFor(event, journal) {
  let table = [0, 0, 0, 0];
  for (let i = 0; i < journal.length; i++) {
    let entry = journal[i], index = 0;
    if (entry.events.includes(event)) index += 1;
    if (entry.squirrel) index += 2;
    table[index] += 1;
  }
  return table;
}

console.log(tableFor('pizza', journal));
// -> [76, 9, 4, 1]

//!.includes() checks if the value exists in the arrray

for (let i = 0; i < journal.length; i++) {
  let entry = journal[i];
  //do something
}

//mordern JS
for (let entry of journal) {
  //do something
}

//a function to list every type of event that occurs
function journalEvents(journal) {
  let events = [];
  for (let entry of journal) {
    for (let event of entry.events) {
      if (!events.includes(event)) {
        events.push(event);
      }
    }
  }
  return events;
}

console.log(journalEvents(journal));
// -> ['carrot', 'exercise', 'weekend', 'bread', ...]

for (let event of journalEvents(journal)) {
  console.log(event + ':', phi(tableFor(event, journal)));
}

// → carrot:   0.0140970969
// → exercise: 0.0685994341
// → weekend:  0.1371988681
// → bread:   -0.0757554019
// → pudding: -0.0648203724
// and so on...

//filter results to show only correlations greater than 0.1 or less than -0.1
for (let event of journalEvents(journal)) {
  let correlation = phi(tableFor(event, journal));
  if (correlation > 0.1 || correlation < -0.1) {
    console.log(event + ':', correlation);
  }
}

// → weekend:        0.1371988681
// → brushed teeth: -0.3805211953
// → candy:          0.1296407447
// → work:          -0.1371988681
// → spaghetti:      0.2425356250
// → reading:        0.1106828054
// → peanuts:        0.5902679812

for (let entry of journal) {
  if (entry.events.includes('peanuts') &&
     !entry.events.includes('brushed teeth')) {
      entry.events.push('peanut teeth');
     }
}
console.log(phi(tableFor('peanut teeth', journal)));
// -> 1
//That’s a strong result. The phenomenon occurs precisely when Jacques eats peanuts and fails to brush his teeth. 

//ARRAY METHODS

//unshift - adds an element to the beginning of the array
//shift - removes the first element of the array
let todoList = [];
function remember(task) {
  todoList.push(task);
}
function getttask() {
  return todoList.shift();
}
function rememberUrgently(task) {
  todoList.unshift(task);
}

//search for a specific value in an array. Returns the index
//From the beginning, indexOf()
//start searching from the end, lastIndexOf(). Returns -1 if not found

console.log([1, 2, 3, 2, 1].indexOf(2));
// -> 1
console.log([1, 2, 3, 2, 1].lastIndexOf(2));
// -> 3

//slice - returns the selected elements in an array as a new array
console.log([0, 1, 2, 3, 4].slice(2, 4));
// -> [2, 3]
console.log([0, 1, 2, 3, 4].slice(2));
// -> [2, 3, 4]

//concat - joins two arrays together
let a = [1, 2];
let b = [3, 4];
console.log(a.concat(b));
// - > [1, 2, 3, 4];

function remove(array, index) {
  return array.slice(0, index).concat(array.slice(index + 1));
}
console.log(remove(['a', 'b', 'c', 'd', 'e'], 2));
// -> ['a', 'b', 'd', 'e']

//! string, number, and Boolean are not objects

//three-dot notation to call a function of an array
function max(...numbers) {
  let result = -Infinity;
  for (let number of numbers) {
    if (number > result) result = number;
  }
  return result;
}
console.log(max(4, 1, 9, -2));
// -> 9

let numbers = [5, 1, 7];
console.log(max(...numbers));
// -> 7

//three-dot notation also spreads an array into a new array
let words = ['never', 'fully'];
console.log(['will', ...words, 'understand']);
// -> ['will', 'never', 'fully', 'understand']

//! if you know the value you are binding is an array, you can use square brackets to assign the values inside the array
function phi([n00, n01, n10, n11]) {
  return (n11 * n00 - n10 * n01) /
    Math.sqrt((n10 + n11) * (n00 + n01) *
              (n01 + n11) * (n00 + n10));
}

//Same trick works for objects using braces
let {name} = {name: 'Faraji', age: 23};
console.log(name);
// -> Faraji
let {city} = {city: 'Minneapolis', state: 'MN'};
console.log(city);
// -> Minneapolis