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
 * ➞ Is the String Empty? ✅
 * isEmpty("") ➞ true
 * isEmpty(" ") ➞ false
 * isEmpty("a") ➞ false
 */

function isEmpty(s) {
  return s.length === 0 ? true : false;
}

console.log(isEmpty(""));
console.log(isEmpty(" "));
console.log(isEmpty("a"));
console.log(isEmpty(0));

/* ************************************************** */

/*
 * ➞ Write a JavaScript function to check whether an 'input' is a string or not.
 * Test Data :
 * console.log(is_string('w3resource')); // true
 * console.log(is_string([1, 2, 4, 0])); // false
 */

function is_string(str) {
  return typeof str === "string" ? true : false;
}

console.log(is_string("w3resource"));
console.log(is_string([1, 2, 4, 0]));
console.log(is_string({ name: "parth" }));
console.log(is_string("parth"));

/* ************************************************** */

/*
 * ➞ Write a JavaScript function to check whether a string is blank or not.
 * Test Data :
 * console.log(is_Blank('')); // true
 * console.log(is_Blank('abc')); // false
 */

function is_Blank(str) {
  return str.length === 0 ? true : false;
}
console.log(is_Blank("")); // true
console.log(is_Blank("abc")); // false

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
 * ➞ Write a JavaScript function to convert a string into abbreviated form.
 * Test Data :
 * console.log(abbrev_name("Robin Singh")); // "Robin S."
 */

function abbrev_name(str) {
  return str.slice(0, 7);
}
console.log(abbrev_name("Robin Singh")); // "Robin S."

/* ************************************************** */

/*
 * ➞ Write a JavaScript function to parameterize a string.
 * Test Data :
 * console.log(string_parameterize("Robin Singh from USA.")); // "robin-singh-from-usa"
 */

function string_parameterize(str) {
  return str.split(" ").join("-");
}
console.log(string_parameterize("Robin Singh from USA.")); // "robin-singh-from-usa"

/* ************************************************** */

/*
 * ➞ Write a JavaScript function to capitalize the first letter of a string.
 * Test Data :
 * console.log(capitalize('js string exercises')); // "Js string exercises"
 */

function capitalize(str) {
  return str[0].toUpperCase() + str.substring(1);
}

console.log(capitalize("js string exercises")); // "Js string exercises"

/* ************************************************** */

/*
 * ➞ Write a JavaScript function to capitalize the first letter of each word in a string.
 * Test Data :
 * console.log(capitalize_Words('js string exercises')); // "Js String Exercises"
 */

function capitalize_Words(str) {
  const words = str.split(" ");
  console.log(words);
  const res = words
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
  return res;
}
console.log(capitalize_Words("js string exercises")); // "Js String Exercises"
console.log(capitalize_Words("software engineer")); // Software Engineer

/* ************************************************** */

/*
 * ➞ Write a JavaScript function that takes a string with both lowercase and upper case letters as a parameter. It converts upper case letters to lower case, and lower case letters to upper case.
 * Test Data :
 * console.log(swapcase('AaBbc')); // "aAbBC"
 */

function swapcase(str) {
  const words = str.split("");

  const res = words.map((word) => {
    if (word === word.toUpperCase()) {
      return word.toLowerCase();
    } else {
      return word.toUpperCase();
    }
  });
  return res.join("");
}
console.log(swapcase("AaBbc")); // "aAbBC"

/* ************************************************** */

/*
 * ➞ Write a JavaScript function to convert a string into camel case.
 * Test Data :
 * console.log(camelize("JavaScript Exercises")); // "JavaScriptExercises"
 * console.log(camelize("JavaScript exercises")); // "JavaScriptExercises"
 * console.log(camelize("JavaScriptExercises")); // "JavaScriptExercises"
 */

function camelize(str) {
  const words = str.split("");
  console.log(words);
}
console.log(camelize("JavaScript Exercises")); // "JavaScriptExercises"

const myColor = ["Red", "Green", "White", "Black"];
console.log(myColor.join());

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
 * Write a JavaScript function to uncapitalize the first character of a string.
 * Test Data:
 */

function Uncapitalize(str) {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

let res = Uncapitalize("Js string exercises");
console.log(res);

/* ************************************************** */

/*
 * Write a JavaScript function to test whether the character at the index provided is upper case.
 * Test Data:
 * console.log(isUpperCaseAt('Js STRING EXERCISES', 1));
 */

function isUpperCaseAt(str, index) {
  return str.charAt(index).toUpperCase() === str.charAt(index);
}

let res = isUpperCaseAt("Js STRING EXERCISES", 1);
console.log(res);

/* ************************************************** */

/*
 *  Write a JavaScript function to test whether a string starts with a specified string.
 * Test Data: console.log(startsWith('js string exercises', 'js')); // true
 */

function startsWith(input, string) {
  return input.indexOf(string) === 0;
}

let res = startsWith("js string exercises", "js");
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
 * Delete first character of a string
 */

function deleteFirstCharacter() {
  let str = "JavaScript";
  let result = str.slice(1);

  return result;
}

let res = deleteFirstCharacter();
console.log(res);

/* ************************************************** */

/*
 * Get the last character of a string
 */

// 1st approach

let str = "JavaScript";

let res = str.charAt(str.length - 1);

console.log(res);

// 2nd approach

let str = "JavaScript";

let res = str.slice(-1);

console.log(res);

/* ************************************************** */

/*
 * Convert an object to string
 */

let obj_to_str = {
  name: "John",
  city: "USA",
  contact: 2488,
};

let myJSON = JSON.stringify(obj_to_str);

console.log(myJSON);

/* ************************************************** */

/*
 *  Program to Replace Characters of a String
 */
// 1st approach

const str = "Welcome to Java";
const replStr = "Java";
const newStr = "JavaScript";

const updatedStr = str.replace(replStr, newStr);

console.log(updatedStr);

// 2nd approach

const str = "Welcome to Java";
const oldStr = "Java";
const newStr = "JavaScript";

const updatedStr = str.split(oldStr).join(newStr);

console.log(updatedStr);

/* ************************************************** */

/*
 * Remove spaces from a string
 */

// 1st approach

let originalText = "Java Script Portal";

let removedSpacesText = originalText.split(" ").join("");
console.log(removedSpacesText);

// 2nd approach

const geek = "   JavaScript   ";
console.log(geek.trim());

/* ************************************************** */

/*
 * Convert string to title case
 */

function titleCase(str) {
  let strToSplit = str.split(" ");

  return strToSplit
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
console.log(titleCase("converting string to titlecase"));

/* ************************************************** */

/*
 * find the longest word within the string
 */

function longest(str) {
  let strToSplit = (str = str.split(" "));
  return strToSplit.sort((a, b) => b.length - a.length)[0];
}

let res = longest("Hello guys this is JavaScript used to build webapps");

console.log(res);

/* ************************************************** */
