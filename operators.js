//➡️ Operators

// ▶▶▶ Operators are used to assign values, compare values, perform arithmetic operations, and logical computations on operands.

// 👉 JavaScript Arithmetic Operators 👈

// ▶ JavaScript Arithmetic Operators perform arithmetic operations: addition (+), subtraction (-), multiplication (*), division (/), modulus (%), and exponentiation (**).

// 1️⃣ Addition Operator:

// ▶️▶️ The addition operator (+) is used to add two or more values in JavaScript.
// For example:
var a = 5;
var b = 10;
var c = a + b;
console.log(c); // Output: 15

// 2️⃣ Subtraction Operator

// ▶️ The subtraction operator (-) is used to subtract one value from another value in JavaScript.
// For example:
var a = 10;
var b = 5;
var c = a - b;
console.log(c); // Output: 5

// 3️⃣ Multiplication Operator:

// ▶️ The multiplication operator (*) is used to multiply two or more values in JavaScript.
// For example:
var a = 5;
var b = 10;
var c = a * b;
console.log(c); // Output: 50

// 4️⃣ Division Operator:

// ▶️ The division operator (/) is used to divide one value by another value in JavaScript.
// For example:
var a = 10;
var b = 5;
var c = a / b;
console.log(c); // Output: 2

// 5️⃣ Modulus Operator:

// ▶️ The modulus operator (%) is used to find the remainder of the division of one value by another value in JavaScript.
// For example:
var a = 10;
var b = 3;
var c = a % b;
console.log(c); // Output: 1

// 👉 JavaScript Assignment Operators 👈

// ▶▶▶ Assignment operators are used to assign values to variables in JavaScript.

// assignment operator
let a = 7;
console.log("Assignment: a = 7, a =", a);

// 1️⃣ addition assignment operator:
a += 5; // a = a + 5
console.log("Addition Assignment: a += 5, a =", a); // Addition Assignment: a += 5, a = 12

// 2️⃣ subtraction assignment operator:
a -= 5; // a = a - 5
console.log("Subtraction Assignment: a -= 5, a =", a); // Subtraction Assignment: a -= 5, a = 7

// 3️⃣ multiplication assignment operator:
a *= 2; // a = a * 2
console.log("Multiplication Assignment: a *= 2, a =", a); // Multiplication Assignment: a *= 2, a = 14

// 4️⃣ division assignment operator:
a /= 2; // a = a / 2
console.log("Division Assignment: a /= 2, a =", a); // Division Assignment: a /= 2, a = 7

// 5️⃣ remainder assignment operator:
a %= 2; // a = a % 2
console.log("Remainder Assignment: a %= 2, a =", a); // Remainder Assignment: a %= 2, a = 1

// 6️⃣ exponentiation assignment operator:
a **= 2; // a = a**2
console.log("Exponentiation Assignment: a **= 7, a =", a); // Exponentiation Assignment: a **= 7, a = 1

// 👉 JavaScript Comparison Operators 👈

// ▶▶▶ Comparison operators in JavaScript are used to compare two values and return a boolean result (true or false).

// 1️⃣ Equal to (==) Operator:

// The equal to operator compares two values for equality. It returns true if the values are equal and false if they are not equal.
console.log(5 == 5); // Output: true
console.log(5 == "5"); // Output: true
console.log(5 == 6); // Output: false

// 2️⃣ Not equal to (!=) Operator:

// The not equal to operator compares two values for inequality. It returns true if the values are not equal and false if they are equal.
console.log(5 != 5); // Output: false
console.log(5 != "5"); // Output: false
console.log(5 != 6); // Output: true

// 3️⃣ Strict equal to (===) Operator:

// The strict equal to operator compares two values for equality and type. It returns true if the values are equal and of the same type, and false if they are not equal or of a different type.
console.log(5 === 5); // Output: true
console.log(5 === "5"); // Output: false
console.log(5 === 6); // Output: false

// 4️⃣ Strict not equal to (!==) Operator:

// The strict not equal to operator compares two values for inequality and type. It returns true if the values are not equal or of a different type, and false if they are equal and of the same type.
console.log(5 !== 5); // Output: false
console.log(5 !== "5"); // Output: true
console.log(5 !== 6); // Output: true

// 5️⃣ Greater than (>) Operator:

// The greater than operator compares two values to check if the left-hand side value is greater than the right-hand side value. It returns true if the left-hand side value is greater than the right-hand side value, and false otherwise.
console.log(5 > 3); // Output: true
console.log(3 > 5); // Output: false

// 6️⃣ Less than (<) Operator:

// The less than operator compares two values to check if the left-hand side value is less than the right-hand side value. It returns true if the left-hand side value is less than the right-hand side value, and false otherwise.
console.log(5 < 3); // Output: false
console.log(3 < 5); // Output: true

// 7️⃣ Greater than or equal to (>=) Operator:

// The greater than or equal to operator compares two values to check if the left-hand side value is greater than or equal to the right-hand side value. It returns true if the left-hand side value is greater than or equal to the right-hand side value, and false otherwise.
console.log(5 >= 5); // Output: true
console.log(6 >= 5); // Output: true
console.log(4 >= 5); // Output: false

// 8️⃣ Less than or equal to (<=) Operator:

// The less than or equal to operator compares two values to check if the left-hand side value is less than or equal to the right-hand side value. It returns true if the left-hand side value is less than or equal to the right-hand side value, and false otherwise.
console.log(5 <= 5); // Output: true
console.log(5 <= 6); // Output: true
console.log(5 <= 4); // Output: false

// 👉 JavaScript Logical Operators 👈

// ▶▶▶ Logical operators in JavaScript are used to perform logical operations on operands, and the result of these operations is either always a boolean value, true or false.

// 1️⃣ AND (&&) Operator:

// The AND operator returns true if both operands are true, and false otherwise. The syntax for the AND operator is &&. The following table shows the truth table for the AND operator:

let num1 = 5;
let num2 = 10;

if (num1 > 0 && num2 > 0) {
  console.log("Both numbers are positive"); // Both numbers are positive
}

// In this above example, the AND operator is used to check if both num1 and num2 are positive. If both operands are positive, the console will output "Both numbers are positive".

// 2️⃣ OR (||) Operator:

// The OR operator returns true if at least one of the operands is true, and false otherwise. The syntax for the OR operator is ||. The following table shows the truth table for the OR operator:

let num1 = 5;
let num2 = -10;

if (num1 > 0 || num2 > 0) {
  console.log("At least one number is positive"); // At least one number is positive
}
// In this example, the OR operator is used to check if at least one of num1 and num2 is positive. If at least one operand is positive, the console will output "At least one number is positive".

// 3️⃣ NOT (!) Operator:

// The NOT operator negates the value of its operand. If the operand is true, the NOT operator returns false. If the operand is false, the NOT operator returns true. The syntax for the NOT operator is !.

let num1 = 5;

if (!(num1 > 10)) {
  console.log("num1 is not greater than 10"); // num1 is not greater than 10
}
// In this example, the NOT operator is used to check if num1 is not greater than 10. If num1 is not greater than 10, the console will output "num1 is not greater than 10".
