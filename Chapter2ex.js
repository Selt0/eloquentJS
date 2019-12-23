//Looping A Triangle
/*
Write a loop that makes seven calls to console.log to output the following traingle:

#
##
###
####
#####
######
#######
*/
let hashtag = '#';
for (let i = 0; i < 7; i++) {
  console.log(hashtag);
  hashtag += '#';
}

//clever solution
for (let line = '#'; line.length < 8; line += '#') {
  console.log(line);
}

//FizzBizz (actually an interview question)
/*
Write a program that uses console.log to print all the numbers from 1 to 100, with two exceptions. For numbers divisible by 3, print "Fizz" instead of the number, and for numbers divisible by 5 (and not 3), print "Buzz" instead.

When you have that working, modify your program to print "FizzBuzz" for numbers that are divisible by both 3 and 5 (and still print "Fizz" or "Buzz" for numbers divisible by only one of those).
*/

let number = 0
for (let i = 0; i < 100; i++) {
  number += 1;
  if (number % 3 == 0 && number % 5 == 0){
    console.log('FizzBuzz');
  } else if (number % 5 == 0) {
    console.log('Buzz');
  } else if (number % 3 == 0) {
    console.log('Fizz')
  } else {
    console.log(number);
  }
}

//Clever solution
for (let i = 1; i <= 100; i++) {
  let output = '';
  if (i % 3 == 0) output += 'Fizz';
  if ( i % 5 == 0) output += 'Buzz';
  console.log(output || i);
}

//Chessboard
/*
Write a program that creates a string that represents an 8×8 grid, using newline characters to separate lines. At each position of the grid there is either a space or a "#" character. The characters should form a chessboard.

Passing this string to console.log should show something like this:

 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # # 
 # # # #
# # # #

When you have a program that generates this pattern, define a binding size = 8 and change the program so that it works for any size, outputting a grid of the given width and height.
*/

//hold grid size
let grid = 8
let chessboard = '';
//loop to add new line
  for (let i = 0; i < grid; i++){
    //loop to add characters on line
    for (let j = 0; j < grid; j++) {
      //add ' '; if the sum of j + i is even (otherwise it would add '#' in the same place)
      if ((j + i) % 2 == 0){
        chessboard += ' ';
      } else {
        chessboard += '#';
      } 
    }
    chessboard += '\n';
  }
  //print out chessboard
  console.log(chessboard);




//when characters = gird length, console log