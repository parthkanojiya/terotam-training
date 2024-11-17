//➡️ Variables

// (Q) What is Variables?
// (A) Variables are containers for storing values.

//1️⃣ Example 1: In this example, we will declare variables using "var".

var a = "Hello Geeks";
var b = 10;
var c = 12;
var d = b + c;

console.log(a); // Hello Geeks
console.log(b); // 10
console.log(c); // 12
console.log(d); // 12

var c = 10;
console.log(c); // 10
var c = 20;
console.log(c); // 20
// using a "var" keyword we can redeclare a variable with same variable name.

//2️⃣ Example 2: In this example, we will declare variables using "let".

let a = "Hello learners";
let b = "joining";
let c = " 12";
let d = b + c;

console.log(a); // Hello learners
console.log(b); // joining
console.log(c); // 12
console.log(d); // joining 12

let e = 10;
e = 20;
console.log(e); // 20

let e = 30;
console.log(e); // with let we can reassign the value but we cannot redeclare wth the same varible name. it throw // Uncaught SyntaxError: redeclaration of let e.

//3️⃣ Example 3: In this example, we will declare the variable using the "const" keyword.

const a = "Hello learners";
console.log(a); // Hello learners

const b = 400;
console.log(b); // 400

const c = "12";
console.log(c); // 12
// "c" variable Cannot change because a value is constant, it cannot change and it cannot be redelared.
c = "new";
console.log(c); // TypeError: Assignment to constant variable.

//👉 Basic rules to declare a variable in JavaScript: 👈

// - variable name must start with letter (a to z or A to Z), underscore( _ ), or dollar( $ ) sign.
// - Variable names cannot start with numbers.
// - javascript variables are case sensitive(x and X are different variables).
// - Reserved words (like JavaScript keywords(const, if, let, function)) cannot be used as names.
