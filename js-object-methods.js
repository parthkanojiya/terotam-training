/*
 * ➞ Write a function that converts an object into an array, where each element represents a key-value pair in the form of an array.
 * Example: ({ a: 1, b: 2 }) ➞ [["a", 1], ["b", 2]] ✅
 */

function objToArray(arg) {
  let arr = [];
  let obj = arg;

  for (const key in obj) {
    arr.push([key, obj[key]]);
  }
  return arr;
}

let res = objToArray({ a: 1, b: 2 });
console.log(res);

/* ************************************************** */

/*
 * ➞ Write a JavaScript program to list the properties of a JavaScript object.
 * Sample object:-
 * var student = {
 * name : "David Rayy",
 * sclass : "VI",
 * rollno : 12 };
 * Sample Output: name,sclass,rollno
 */

const student = {
  name: "David Rayy",
  class: "VI",
  rollno: 12,
};

for (const key in student) {
  console.log(key);
}

/* ************************************************** */

/*
 * ➞ Write a JavaScript program to delete the rollno property from the following object. Also print the object before or after deleting the property.
 */

const student = {
  name: "David Rayy",
  class: "VI",
  rollno: 12,
};

const { rollno, ...newObj } = student;

console.log(student); // { name: 'David Rayy', class: 'VI', rollno: 12 }
console.log(newObj); // { name: 'David Rayy', class: 'VI' }

/* ************************************************** */

/*
 * ➞ Write a JavaScript program to get the length of a JavaScript object.
 */

const student = {
  name: "David Rayy",
  class: "VI",
  rollno: 12,
};

let size = Object.keys(student).length;
console.log(size);

/* ************************************************** */

/*
 * ➞ How to get the last item of JavaScript object ?
 */

const student = {
  name: "David Rayy",
  class: "VI",
  rollno: 12,
};

const entries = Object.entries(student);
const [last] = entries.slice(-1);
console.log(last);

/* ************************************************** */

/*
 * ➞ Add an Object to an Array in JavaScript.
 */

const student = {
  name: "David Rayy",
  class: "VI",
  rollno: 12,
};

function addObjToArr(obj) {
  let arr = [];
  arr.push(obj);
  return arr;
}

console.log(addObjToArr(student));

/* ************************************************** */
/*
 * ➞ How to convert an object to string using JavaScript?
 */

const student = {
  name: "David Rayy",
  class: "VI",
  rollno: 12,
};

function objectToString(obj) {
  return JSON.stringify(obj);
}

console.log(objectToString(student));
console.log(typeof objectToString(student)); // string

/* ************************************************** */

/*
 * ➞ Convert two-dimensional array into an object
 */

function arr2obj(arr) {
  return Object.entries(arr);
}

let array = [
  ["John", 12],
  ["Jack", 13],
  ["Matt", 14],
  ["Maxx", 15],
];

console.log(arr2obj(array));

/* ************************************************** */

/*
 * ➞ Program to Count the Number of Keys/Properties in an Object.
 */

const obj = {
  name: "John",
  age: 25,
  city: "USA",
};

const count = Object.entries(obj).length;
console.log("Number of keys: " + count);

/* ************************************************** */

/*
 * ➞ Return the Objects Keys and Values.
 * Create a function that takes an object and returns the keys and values as separate arrays.
 * Examples:-
 * keysAndValues({ a: 1, b: 2, c: 3 }); ➞ [["a", "b", "c"], [1, 2, 3]]
 */

const obj = {
  a: 1,
  b: 2,
  c: 3,
};

// 1st Approach

function keysAndValues(data) {
  return [Object.keys(data), Object.values(data)];
}

console.log(keysAndValues(obj));

// 2nd Approach

function keysAndValues(objData) {
  let result = [];

  for (const key in objData) {
    result.push([key, objData[key]]);
  }
  return result;
}

console.log(keysAndValues(obj));

/* ************************************************** */

/*
 * ➡️ Iterate over a JavaScript object
 */

let exampleObj = {
  book: "Atomic Habits",
  author: "James Clear",
  genre: "Self-help book",
};

function iterateObject(obj) {
  return Object.keys(obj).forEach((key) => console.log(`${key}: ${obj[key]}`));
}

iterateObject(exampleObj);

/* ************************************************** */
