//➡️ Data Types

// ▶▶▶ Data types basically specify what kind of data can be stored in a Variable.
// ▶▶ There are two types of data types available in JS. Primitive and Non-Primitive.
// 1️⃣ Primitive: Number, Null, String, Symbol, Bigint, Boolean, Undefined
// 2️⃣ Non-Primitive: Objects, and Array.

// 👉 Premitive Data Types 👈

// 1️⃣ JavaScript String:

// string enclosed within single quotes
let fruit = "apple";
console.log(fruit); // apple

// string enclosed within double quotes
let country = "USA";
console.log(country); // USA

// string enclosed within backticks
let result = `fail`;
console.log(result); // fail

// 2️⃣ JavaScript Number:

let num = 2; // Integer
let num2 = 1.3; // Floating point number
let num3 = Infinity; // Infinity
let num4 = "something here too" / 2; // NaN

// 3️⃣ JavaScript BigInt:

// BigInt value
let value1 = 900719925124740998n;

// add two big integers
let result1 = value1 + 1n;
console.log(result1); // "900719925124740999n"

let value2 = 900719925124740998n;

// 4️⃣ JavaScript Boolean:

let dataChecked = true;
console.log(dataChecked); // true

let valueCounted = false;
console.log(valueCounted); // false

// 5️⃣ JavaScript undefined:

let name;
console.log(name); // undefined

// 6️⃣ JavaScript null:

let number = null;
console.log(number); // null

// 7️⃣ JavaScript Symbol:

// two symbols with the same description
let value1 = Symbol("programiz");
let value2 = Symbol("programiz");

console.log(value1 === value2); // false

// 👉 Non-Primitive Data Types 👈

// 1️⃣ JavaScript Object:

let student = {
  firstName: "John",
  lastName: "Mue",
  class: 10,
};

// 2️⃣ JavaScript Arrays:

let fish = ["shark", "cuttlefish", "clownfish", "eel"];
