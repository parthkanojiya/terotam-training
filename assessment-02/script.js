/* Student Registration Form */

document
  .getElementById("studentForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from reloading the page

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const age = document.getElementById("age").value;
    const grade = document.getElementById("grade").value;

    // Get table and tbody
    const table = document.getElementById("studentTable");
    const tbody = table.querySelector("tbody");

    // Create a new row
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
      <td>${name}</td>
      <td>${email}</td>
      <td>${age}</td>
      <td>${grade}</td>
    `;

    // Append the row to the tbody
    tbody.appendChild(newRow);

    // Show the table if it's hidden
    table.style.display = "table";

    // Clear the form
    document.getElementById("studentForm").reset();
  });

//* Student Registration Form */

const contactForm = document.getElementById("contactForm");
const emailInput = document.getElementById("contact-email");
const emailError = document.getElementById("emailError");

contactForm.addEventListener("submit", function (event) {
  emailError.style.display = "none";

  // if email field is empty, then show error
  if (emailInput.value.trim() === "") {
    event.preventDefault();
    emailError.style.display = "block";
  }
});

/* Employee Data */

function calculateTotalSalary() {
  const table = document.getElementById("employeeTable");
  const tbody = table.querySelector("tbody");
  const rows = tbody.querySelectorAll("tr");
  let total = 0;

  // Loop through each row and add the salary value
  rows.forEach((row) => {
    const salary = parseFloat(row.cells[2].textContent); // Salary is in the third column
    total += salary;
  });

  // Update the total salary in the footer
  document.getElementById("totalSalary").textContent = total.toFixed(2);
}

// Call the function to calculate the total salary on page load
calculateTotalSalary();

/* Video Player */

const video = document.getElementById("myVideo");
const playPauseBtn = document.getElementById("playPause");
const muteUnmuteBtn = document.getElementById("muteUnmute");

playPauseBtn.addEventListener("click", () => {
  // if video is paused, then play() else pause()
  if (video.paused) {
    video.play();
    playPauseBtn.textContent = "Pause";
  } else {
    video.pause();
    playPauseBtn.textContent = "Play";
  }
});

muteUnmuteBtn.addEventListener("click", () => {
  // if video is muted, then false else true
  if (video.muted) {
    video.muted = false;
    muteUnmuteBtn.textContent = "Mute";
  } else {
    video.muted = true;
    muteUnmuteBtn.textContent = "Unmute";
  }
});

/* Audio Player */
const audio = document.getElementById("backgroundMusic");
const audioPlayPauseBtn = document.getElementById("playPauseBtn");

audioPlayPauseBtn.addEventListener("click", () => {
  // if audio is paused, then play() else pause()
  if (audio.paused) {
    audio.play();
    audioPlayPauseBtn.textContent = "Pause";
  } else {
    audio.pause();
    audioPlayPauseBtn.textContent = "Play";
  }
});

/******************************************
 *** JavaScript Coding Challenges
 *******************************************/

/* JS Coding Challenge 1:- Write a function using the nullish coalescing operator (??) to provide a default value. */

function getDefaultName(name) {
  return name ?? "Default Name";
}

const user1 = { name: "Parth" };
const user2 = {};

console.log(getDefaultName(user1.name)); // Output: Parth
console.log(getDefaultName(user2.name)); // Output: Default Name

/* JS Coding Challenge 2:- Create an object and access its nested properties using optional chaining.  */

const person = {
  name: "Parth",
  address: {
    street: "Taj Skyline Ahmedabad, Sindhubhavan Road",
    city: "Ahmedabad",
    state: "GJ",
  },
};

const streetName = person?.address?.street;
console.log(streetName); // Output: Taj Skyline Ahmedabad, Sindhubhavan Road

/* JS Coding Challenge 3:- Demonstrate asynchronous behavior using setTimeout and a promise.  */

console.log("Start");

setTimeout(() => {
  console.log("After 2 seconds");
}, 2000);

console.log("End");

// Start
// End
// After 2 seconds

// Using Promise //

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

delay(2000).then(() => {
  console.log("After 2 seconds (Promise)");
});

console.log("Start");

// Start
// After 2 seconds (Promise)

/* JS Coding Challenge 4:- Write code to explain the order of execution of synchronous and asynchronous code. */

console.log("Start");

setTimeout(() => {
  console.log("Asynchronous code 1");
}, 1000);

console.log("Synchronous code 1");

setTimeout(() => {
  console.log("Asynchronous code 2");
}, 500);

console.log("Synchronous code 2");

// Start
// Synchronous code 1
// Synchronous code 2
// Asynchronous code 2
// Asynchronous code 1

/* JS Coding Challenge 5:- Write code to show the effect of hoisting with functions and variables.  */

// Function Hoisting
console.log(greet()); // Output: Hello, world!

function greet() {
  return "Hello, world!";
}

// Variable Hoisting (var)
console.log(x); // Output: undefined
var x = 10;

// Variable Hoisting (let and const)
// console.log(y); // Uncaught ReferenceError: Cannot access 'y' before initialization
// let y = 20;

// console.log(z); // Uncaught ReferenceError: Cannot access 'z' before initialization
// const z = 30;

/* JS Coding Challenge 6:- Create an example demonstrating the lexical scope in JavaScript. */

function outerFunction() {
  let outerVariable = "I'm an outer variable";

  function innerFunction() {
    let innerVariable = "I'm an inner variable";

    console.log(outerVariable);
    console.log(innerVariable);
  }

  innerFunction();
  // console.log(innerVariable); // Error: innerVariable is not defined
}

outerFunction();
