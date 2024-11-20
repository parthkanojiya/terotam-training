/*
 * ➞ Convert an Array to a String✅
 * arrayToString([1, 2, 3, 4, 5, 6]) ➞ "123456"
 */

function arrayToString(arr) {
  return arr.join("").toString();
}

console.log(arrayToString([1, 2, 3, 4, 5, 6])); // "123456"
console.log(arrayToString(["a", "b", "c", "d", "e", "f"])); // "abcdef"
console.log(arrayToString([1, 2, 3, "a", "s", "dAAAA"])); // "123asdAAAA"

/* ************************************************** */

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
 * ➞ Create a function that takes an array of strings and returns an array with only the strings that have numbers in them. If there are no strings containing numbers, return an empty array.
 */

// 1st approch

function numInStr(str) {
  let arr = [];

  str.forEach((element) => {
    if (parseInt(element)) {
      console.log(element);
    } else {
      console.log([]);
    }
  });
}

let res = numInStr(["1a", "a", "2b", "b"]);
console.log(res);

// 2nd approch

function numInStr(arr) {
  let result = arr.filter((str) => {
    return str.match(/\d/);
  });
  return result;
}

console.log(numInStr(["1a", "a", "2b", "b"])); // ["1a", "2b"]
console.log(numInStr(["apple", "banana", "cherry"])); // []

/* ************************************************** */

/*
 * Examples
 * getLength([1, [2, 3]]) ➞ 3
 * ➞ Write a function that returns the total number of non-nested items in a nested array.✅
 */

const arr = [1, [2, 3]];

function getLength(input) {
  let result = [];

  if (!Array.isArray(input)) {
    return input;
  }

  for (const i of input) {
    result = result.concat(getLength(i));
  }

  return result;
}

let resultArray = getLength(arr);
console.log(resultArray.length);

/* ************************************************** */

/*
 * ➞ Array of Strings to Array of Numbers✅
 * toNumberArray(["9.4", "4.2"]) ➞ [9.4, 4.2]
 */

function toNumberArray(arr) {
  console.log(arr);
  let res = arr.map((ele) => {
    return Number(ele);
  });
  console.log(res);
}
toNumberArray(["9.4", "4.2"]);

/* ************************************************** */

/*
 * ➞ Return the Last Element in an Array ✅
 * getLastItem([1, 2, 3]) ➞ 3
 * getLastItem(["cat", "dog", "duck"]) ➞ "duck"
 * getLastItem([true, false, true]) ➞ true
 */

function getLastItem(arr) {
  return arr[arr.length - 1];
}
console.log(getLastItem([1, 2, 3]));
console.log(getLastItem(["cat", "dog", "duck"]));
console.log(getLastItem([true, false, true]));

/* ************************************************** */

/*
 * ➞ Write a JavaScript function to split a string and convert it into an array of words.
 * Test Data :
 * console.log(string_to_array("Robin Singh"));
 * ["Robin", "Singh"]
 */

function string_to_array(str) {
  return str.split();
}

console.log(string_to_array("Robin Singh"));

/* ************************************************** */

/*
 * ➞ Write a JavaScript program to find the most frequent item in an array.
 * Sample Output : a ( 5 times )
 */

var arr1 = [3, "a", "a", "a", 2, 3, "a", 3, "a", 2, 4, 9, 3];

let arr = [];
const res = arr1.map((el, index) => {
  if (el === arr1.includes(el)) {
    return arr.push(el);
  }
  return arr;
});
console.log(res);

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
 * Add new elements at the beginning of an array using
 */

let Arr = [1, 2, 3, 4, 5];
console.log(Arr.unshift("parth"));
console.log(Arr);

/* ************************************************** */

/*
 * find the sum of all elements of a given array
 */

// 1st Approach

let arr = [10, 20, 30, 40, 50];

let res = arr.reduce((prevVal, currVal) => {
  return prevVal + currVal;
});

console.log(res);

// 2nd Approach

let sum = 0;

for (let i = 0; i < arr.length; i++) {
  sum += arr[i];
}
console.log(sum);

/* ************************************************** */

/*
 * check whether an array includes a particular value or not
 */

let fruits_array = [
  "mango",
  "banana",
  "apple",
  "pineapple",
  "pomegranate",
  "orange",
];

function isItemIncludes(arr, val) {
  return arr.includes(val);
}

let res = isItemIncludes(fruits_array, "apple"); // true
let res1 = isItemIncludes(fruits_array, "man"); // false
console.log(res);
console.log(res1);

/* ************************************************** */

/*
 * convert a number into array
 */

// 1st approach

function numToArr(num) {
  return String(num)
    .split("")
    .map((item) => {
      return Number(item);
    });
}

let res = numToArr(12345);
console.log(res);

// 2nd approach

let number = 12345;
let result = [];
let numStr = String(number);

for (let i = 0; i < numStr.length; i++) {
  result.push(Number(numStr[i]));
}

console.log(result);

/* ************************************************** */

/*
 * Remove Duplicate Elements from JavaScript Array
 */

// const arr = [1, 2, 3, 1, 5, 2]; ➡️ Output: [ 1, 2, 3, 5 ]

const arr = ["banana", "apple", "mango", "banana", "mango"];

function removeDuplicate(arrData) {
  return arrData.filter((value, index, self) => self.indexOf(value) === index);
}

const res = removeDuplicate(arr);
console.log(res);

// 2nd approach

function removeDuplicate(arrData) {
  return [...new Set(arrData)];
}

const res = removeDuplicate(arr);
console.log(res);

/* ************************************************** */

/*
 * merge two arrays and remove duplicate items
 */

// 1st approach

let arr1 = [1, 2, 3, 4, 5, 6];
let arr2 = [3, 4, 5, 7, 2, 1];

let arr = [...arr1, ...arr2];

let res = [...new Set(arr)];
console.log(res);

// 2nd approach

let arr1 = [1, 2, 3, 4, 5, 6];
let arr2 = [3, 4, 5, 7, 2, 1];

let res = arr1.concat(
  arr2.filter((value, index, self) => {
    return arr1.indexOf(value) < 0;
  })
);

console.log(res);

/* ************************************************** */

/*
 * Write a simple JavaScript program to join all elements of the following array into a string.
 * Expected Output: "Red,Green,White,Black"
 */

const myColor = ["Red", "Green", "White", "Black"];
console.log(myColor.toString());
console.log(myColor.join());

/* ************************************************** */

/*
 * convert Set to Array
 */

const mySet = new Set([1, 1, 2, 3, 4, 4, 5, 6, 5]);
console.log("Elements in the set are: ", mySet);
let myArr = Array.from(mySet);

console.log("Elements in the Array created using Set are: ", myArr);

/*
 * Convert Array to Set
 */

const array = [1, 2, 2, 3, 4, 4, 5];

const setFromArr = new Set(array);

console.log(setFromArr); // Output: Set { 1, 2, 3, 4, 5 }

/* ************************************************** */

/*
 * Get the first and last item in an array
 */

let array = [3, 2, 3, 4, 5];

function firstAndLastItem(arr) {
  let firstItem = arr.find((_, index) => index === 0);

  let lastItem = arr.find((_, index) => index === arr.length - 1);

  console.log("first element is " + firstItem);
  console.log("Last element is " + lastItem);
}

let res = firstAndLastItem(array);

/* ************************************************** */

/*
 * Check whether an array includes a particular value or not
 */

let fruits_array = ["mango", "banana", "apple", "orange"];

function includesItem(arr, item) {
  return arr.includes(item);
}

let res = includesItem(fruits_array, "apple");
console.log(res);

/* ************************************************** */
