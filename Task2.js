let people = ["Adam", "Mia", "Jamal", "Sara", "Omar", "Nina"];

// 1) Remove the person at the FRONT who decided to leave.

// 2) Add "Luna" to the VERY FRONT.

// 3) Move the LAST TWO people to be right AFTER the first element (keep their order).
people.shift();
people.unshift("Luna");
let PEOP=people.splice(-2);
people.splice(1,0,...PEOP);
console.log("people =", people); // ["Luna", "Omar", "Nina", "Mia", "Jamal", "Sara"]

// Task 2 — Small decisions with logical operators
// ------------------------------
console.log("\\nTask 2 — Decisions with && and ||");
let a = 12;
let b = 5;
let c = 0;

// Create a variable 'isNiceNumber' that is TRUE only if:
//   - a is even AND b is odd OR c is NOT truthy (use !c)
// Use &&, ||, and !
let isNiceNumber=((a%2===0)&&(b%2!==0))||(!c);

console.log("isNiceNumber =", isNiceNumber); // true

// Task 3 — Array membership without loops
// ------------------------------
console.log("\\nTask 3 — Array membership without loops");
let cartA = ["Phone", "Headphones", "Charger"];
let cartB = ["Laptop", "Camera"];

// Create 'hasTechDeal' that is TRUE if EITHER cart contains "Laptop" OR "Camera".
// Use includes or indexOf (no loops).
let hasTechDeal=cartA.includes("Laptop")||cartA.includes("Camera")||cartB.includes("Laptop")||cartB.includes("Camera");

console.log("hasTechDeal =", hasTechDeal);

// Task 4 — Truthy vs Falsy (no loops)
// ------------------------------
console.log("\\nTask 4 — Truthy vs Falsy");
let values = [0, "hi", "", 42, null];

// Create two arrays: truthy and falsy. Then, using if/else for EACH element by index,
// push the value into the correct array. Use the logical NOT operator to test falsy.
let truthy = [];
let falsy = [];

// value at index 0
// if value is falsy, push it to falsy array
// if value is truthy, push it to truthy array
if(!values[0]){
    falsy.push(values[0]);
}else{
    truthy.push(values[0]);
}
if(!values[1]){
    falsy.push(values[1]);
}else{
    truthy.push(values[1]);
}
if(!values[2]){
    falsy.push(values[2]);
}else{
    truthy.push(values[2]);
}
if(!values[3]){
    falsy.push(values[3]);
}else{
    truthy.push(values[3]);
}
if(!values[4]){
    falsy.push(values[4]);
}else{
    truthy.push(values[4]);
}

console.log("truthy =", truthy);
console.log("falsy  =", falsy);

// ------------------------------
// Task 5 — Merge settings (Object.assign) WITHOUT changing defaults
// ------------------------------
console.log("\\nTask 5 — Object.assign merge");
let defaults = { theme: "light", pageSize: 20, showTips: true };
let overrides = { theme: "", pageSize: 50 }; // falsy value "" should still override

// Create 'settings' as a MERGE of defaults and overrides WITHOUT mutating 'defaults'.
// Use Object.assign on an empty object or a shallow copy of defaults.
let settings=Object.assign({},defaults,overrides);

console.log("settings =", settings);
console.log("defaults still =", defaults);

// ------------------------------
// Task 6 — Prototypes with Object.create (no functions needed)
// ------------------------------
console.log("\\nTask 6 — Object.create basics");
let vehicleBase = {
  type: "vehicle",
  wheels: 0,
  powered: true
};

// Using Object.create, make myBike that INHERITS from vehicleBase,
// and give it its OWN properties: kind: "bike", wheels: 2, brand: "EcoRide".
let myBike=Object.create(vehicleBase);
// e.g., myBike.kind = "bike"; ...
myBike.kind = "bike";
myBike.wheels = 2;
myBike.brand = "EcoRide";
// Check prototype data access (should read from prototype if not on the object itself).
console.log("myBike.kind     =", myBike.kind);
console.log("myBike.wheels   =", myBike.wheels);
console.log("myBike.powered  =", myBike.powered);


// ------------------------------
// Task 7 — Object.keys / Object.values with decisions (no loops)
// ------------------------------
console.log("\\nTask 7 — keys & values");
let scores = { Alice: 17, Bob: 22, Carol: 22 };

// 1) Make two variables: names = Object.keys(scores), numbers = Object.values(scores)
/* TODO */
let names = Object.keys(scores);
let numbers = Object.values(scores);
// 2) Make 'hasBob' true if "Bob" exists in names.
let hasBob=names.includes("Bob");

// 3) Decide a winner name and store in 'winner' by comparing the known properties with if/else.
//    If there is a tie, set winner to "TIE". (No loops; compare known keys)
let winner;
if (scores.Alice > scores.Bob && scores.Alice > scores.Carol) {
  winner = "Alice";
} else if (scores.Bob > scores.Alice && scores.Bob > scores.Carol) {
  winner = "Bob";
} else if (scores.Carol > scores.Alice && scores.Carol > scores.Bob) {
  winner = "Carol";
} else {
  winner = "TIE";
}
console.log("names  =", names);
console.log("numbers=", numbers);
console.log("hasBob =", hasBob);
console.log("winner =", winner);
// ------------------------------
// Task 8 — If / Else if / Else rules (ticket price)
// ------------------------------
console.log("\\nTask 8 — Ticket price rules");
let customer = { age: 20, isStudent: true, hasCoupon: true };
// Rules (in this order):
//   1) If age < 6: price = 0
//   2) Else if age <= 18 OR isStudent is true: price = 8
//   3) Else if age >= 65: price = 6
//   4) Else: price = 12
//   After that, if hasCoupon is true, subtract 2 (but not below 0).
let price;
if(customer.age<6){
    price=0;
}
else if(customer.age<=18||customer.isStudent){
    price=8;
}
else if(customer.age>=65){
    price=6;
}else {
    price=12;
}if(customer.hasCoupon){
    price=Math.max(price-2,0);
}
console.log("price =", price);


// ------------------------------
// Task 9 — String methods
// ------------------------------
console.log("\\nTask 9 — String methods");
let rawName = "   PreProgramming JavaScript   ";

// Create 'displayName' so that:
//   - trims spaces
let displayName=rawName.trim();
//   - first letter uppercase
//   - rest lowercase (for the first word only is OK here)
displayName=displayName.charAt(0).toUpperCase()+displayName.slice(1).toLowerCase();


// Create 'hasProgram' that is TRUE if the (trimmed, lowercased) string contains "program".
let hasProgram=displayName.toLowerCase().includes("program");

console.log("displayName =", displayName);
console.log("hasProgram  =", hasProgram);
