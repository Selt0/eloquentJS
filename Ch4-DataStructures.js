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

//! You can change an object's properties