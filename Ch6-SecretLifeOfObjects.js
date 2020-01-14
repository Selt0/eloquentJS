//! The core idea in object-oriented programming is to break up the program into smaller pieces and make each piece responsible for managing its own state

//Whenever you need to update/change the program, you only need to change the specific piece. Not the whole program

//Such program pieces are modeled using objects, which consists of methods and properties.

//! Public properties - part of the interface
//! Private properties - outside code should not touch/access
//! private propeties start with an underscore _private

//! Separating interface from implementation is called encapsulation

//methods are function inside objects
let rabbit= {};
rabbit.speak = function(line) {
  console.log(`The rabbit says '${line}'`);
};

rabbit.speak('I\'m alive.');
// → The rabbit says 'I'm alive.'

//'this' automatically points at the object that it was called on
function speak(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
}

let whiteRabbit = {type: 'white', speak};
let hungryRabbit = {type: 'hungry', speak};

whiteRabbit.speak('Oh my ears and whiskers, ' + 
                  'how late it\'s getting!');
// → The white rabbit says 'Oh my ears and whiskers, how
//   late it's getting!'
hungryRabbit.speak('I could use a carrot right now.');
// → The hungry rabbit says 'I could use a carrot right now.'

//! another way to call the function is by the 'call' method
speak.call(hungryRabbit, 'Burp!');
// → The hungry rabbit says 'Burp!'

//! Arrow functions do not bind their own this, instead they can see the 'this' binding of the scope around them
function normalize() {
  console.log(this.coords.map(n => n / this.length));
}
normalize.call({coords: [0, 2, 3], length: 5});
// → [0, 0.4, 0.6]

//! If I had written the argument to map using the function keyword, the code wouldn’t work.

//Most objects in JS have prototypes. 
//When an object gets a request for a property that is doesn't have, its prototype will be searched, then the prototype's prototype, etc

//At the very top of the tree is Object.prototype
console.log(Object.getPrototypeOf({}) == Object.prototype);
// → true
console.log(Object.getPrototypeOf(Object.prototype));
// → null

//functions derive from Function.prototype
//arrays derive from Array.prototype
//strings derive from String.prototype

console.log(Object.getPrototypeOf(Math.max) ==
            Function.prototype);
// → true
console.log(Object.getPrototypeOf([]) ==
            Array.prototype);
// → true
console.log(Object.getPrototypeOf(Function.prototype) == 
            Object.prototype);
// → true

//! You can use Object.create to create an object with a specific prototype
let protoRabbit = {
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}
let killerRabbit = Object.create(protoRabbit);
killerRabbit.type = 'killer';
killerRabbit.speak('SKREEE!');
// → The killer rabbit says 'SKREEEE!'

//! a property like speak(line) is a shorthand way of defining a method

//the 'proto' rabbit  is a container for properties shared by all rabbits
//The individual rabbit objects (like killer or hungry) contain properties that apply only to themselves (its type) and use the shared properties from its prototype (speak)

//JS prototype system can be interpreted as a version of object-oriented concept called 'classes' 

//! A class defines the shape of a type of object - methods and properties. Such an object is called an 'instance' of the class

// to create an instance of a given class, you have to make an object that derives from the proper prototype, but ALSO have to make sure it, itself, has the properties that instances of this class are supposed to have.
//! This is what a constructor function does

function makeRabbit(type) {
  let rabbit = Object.create(protoRabbit);
  rabbit.type = type;
  return rabbit;
}

//JS made creating constructors easier. If you put 'new' in front of a function call, the function becomes a constructor

function Rabbit(type) {
  this.type = type;
}

Rabbit.prototype.speak = function(line) {
  console.log(`The ${this.type} rabbit says '${line}'`);
};

let weirdRabbit = new Rabbit('weird');

//constructors (all functions, in fact) automatically get a property named 'prototype', which by default holds a plain, empty object that derives from Object.prototype

//!you can overwrite it with a new object or you can add properties to the existing object, as we did above

//!Constructors are capitalized so they can be distinguished from other functions

console.log(Object.getPrototypeOf(Rabbit) ==
            Function.prototype);
// → true
console.log(Object.getPrototypeOf(weirdRabbit) ==
            Rabbit.prototype);
// → true

//ES2015 changed the way JS writes constructor functions
class Rabbit {
  constructor(type) {
    this.type = type;
  }
  speak(line) {
    console.log(`The ${this.type} rabbit says '${line}'`);
  }
}

let killerRabbit = new Rabbit('killer');
let blackRabbit = new Rabbit('black');

//!this is known as a 'class' declaration. Class declarations only allow methods

//! like function, class can be used both in statements and in expressions
//When used in an expression, it doesn't define a binding but just produces the constructor as a value. 
//You can omit the class name in a class expression
let object = new class { getWord() { return 'hello'; } };
console.log(object.getWord());
// → hello

//!If there is a property in an object with the same name in the prototype, the object will choose its own property

Rabbit.prototype.teeth = 'small';
console.log(killerRabbit.teeth);
// → small
killerRabbit.teeth = 'long, sharp, and bloody';
console.log(killerRabbit.teeth);
// → long, sharp, and bloody
console.log(blackRabbit.teeth);
// → small
console.log(Rabbit.prototype.teeth);
// → small

//! overriding properties is a useful thing to do. You can create gerneric properites on the prototype. Certain objects can take their  specific values and other objects can take the standard value

//! there are two different 'maps'

//.map() method transforms a data structure by applying a function to its elements
console.log([1, 2, 3, 4].map(a => '$' + a));
// → ["$1", "$2", "$3", "$4"]

//a map(noun) is a data structure that associates values(keys) with other values
let ages = {
  Borris: 39,
  Liang: 22,
  Júlia: 62
};
console.log(`Júlia is ${ages['Júlia']}`);
// → Júlia is 62
console.log('Is Jack\'s gae known?', 'Jack' in ages);
// → Is Jack's age known? false
console.log('Is toString\'s age known?', 'toString' in ages);
// → Is toString's age known? true
//! because plain objects derive from Object.prototype, it looks like the property is there.

//As such, using plain objects as maps is dangerous. There are several ways to avoid this

//First, create objects with no prototype
console.log('toString' in Object.create(null));
// → false

//!Object property names must be strings. If you need a map whose keys cant be easily converted to strings - such as objects - you cannot use an object as your map
//! luckily, JS comes with a class called Map for this exact purpose

//Map class allows any type of keys
let ages = new Map();
ages.set('Boris', 39);
ages.set('Liang', 22);
ages.set('Júlia', 62);

console.log(`Júlia is ${ages.get('Júlia')}`);
// → Júlia is 62
console.log('Is Jack\'s age known?', ages.has('Jack'));
// → Is Jack's age known? false
console.log(ages.has('toString'));
// → false

//! methods set, get, and has are part of the interface of Map

//!Writing a data structure that can quickly update and search a large set of values isn’t easy, but we don’t have to worry about that. Someone else did it for us, and we can go through this simple interface to use their work.

//Second, you can use hasOwnProperty() method, which ignores the object's prototype
console.log({x: 1}.hasOwnProperty('x'));
// → true
console.log({x: 1}.hasOwnProperty('toString'));
// → false

//Polymorphism

console.log(Array.prototype.toString == 
            Object.prototype.toString);
// → false
console.log([1, 2].toString());
// → 1,2
console.log(Object.prototype.toString.call([1, 2]));
// → [object Array]

//some of the standard prototypes define their own version of 'toString'. You can also do that yourself
Rabbit.prototype.toString = function() {
  return `a ${this.type} rabbit`;
};

console.log(String(blackRabbit));
// → a black rabbit

//!When a piece of code is written to work with objects that have a certain interface - in this case, toString - any kind of object that supports this interance can be plugged into the code and still work - aka polymorphism
//! polymorphic code can work with values of different shapes, as long as they support the interface it expects

//Symbols

//Property names can also be symbols. Symbols are values created with the Symbol function. You cannot create the same Symbol twice

let sym = Symbol('name');
console.log(sym == Symbol('name'));
// → false
Rabbit.prototype[sym] = 55;
console.log(blackRabbit[sym]);
// → 55

let my = Symbol('name');
Rabbit.prototype[my] = 'Rory';
console.log(blackRabbit[my]);
// → Rory

//! multiple symbols may have the same name. 
//Being both unique and usable as property names makes symbols suitable for defining interfaces that can peacefully live alongside other properties, no matter what their names are

const toStringSymbol = Symbol('toString');
Array.prototype[toStringSymbol] = function() {
  return `${this.length} cm of blue yarn`;
};

console.log([1, 2].toString());
// → 1,2
console.log([1, 2][toStringSymbol]());
// → 2 cm of blue yarn

//! you can include symbol properties in object expressions and classes by using square brackets around the property name. That causes the property name to be evaluated, much like the square bracket property access notation, which allows us to refer to a binding that holds the symbol

let stringObject = {
  [toStringSymbol]() { return 'a jute rope'; }
};
console.log(stringObject[toStringSymbol]());
// → a jute rope