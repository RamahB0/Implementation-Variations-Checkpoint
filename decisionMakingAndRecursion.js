// Checkpoint: Decision Making and Recursive Algorithms

// === DECISION MAKING TASKS ===

// Task 1: Leap Year Checker
function isLeapYear(year) {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  if (year % 4 === 0) return true;
  return false;
}

console.log("=== Leap Year Checker ===");
console.log("2000:", isLeapYear(2000)); // true
console.log("1900:", isLeapYear(1900)); // false
console.log("2024:", isLeapYear(2024)); // true
console.log("2023:", isLeapYear(2023)); // false

// Task 2: Ticket Pricing
function getTicketPrice(age) {
  if (age <= 12) {
    return { category: "Children", price: 10 };
  } else if (age >= 13 && age <= 17) {
    return { category: "Teenager", price: 15 };
  } else {
    return { category: "Adult", price: 20 };
  }
}

console.log("\n=== Ticket Pricing ===");
[5, 14, 25].forEach(age => {
  const ticket = getTicketPrice(age);
  console.log("Age " + age + " (" + ticket.category + "): $" + ticket.price);
});

// Task 3: Weather Clothing Adviser
function clothingAdvice(temperature, isRaining) {
  let clothing = [];
  if (isRaining) clothing.push("Rain jacket or umbrella");
  if (temperature <= 0) {
    clothing.push("Heavy coat, gloves, hat, warm boots");
  } else if (temperature <= 10) {
    clothing.push("Warm jacket, scarf");
  } else if (temperature <= 20) {
    clothing.push("Light jacket or sweater");
  } else {
    clothing.push("T-shirt and light pants");
  }
  return clothing.join(", ");
}

console.log("\n=== Weather Clothing Adviser ===");
console.log("5C raining:", clothingAdvice(5, true));
console.log("25C dry:", clothingAdvice(25, false));

// === RECURSION TASKS ===

// Task 1: Fibonacci Sequence
function fibonacci(n) {
  if (n < 0) return -1;
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("\n=== Fibonacci Sequence ===");
for (let i = 0; i <= 10; i++) {
  console.log("Fib(" + i + ") = " + fibonacci(i));
}

// Task 2: Power Function
function power(base, exponent) {
  if (exponent === 0) return 1;
  if (exponent < 0) return 1 / power(base, -exponent);
  return base * power(base, exponent - 1);
}

console.log("\n=== Power Function ===");
console.log("2^10 = " + power(2, 10));
console.log("3^4 = " + power(3, 4));
console.log("5^0 = " + power(5, 0));
console.log("2^-3 = " + power(2, -3));

// Task 3: Palindrome Checker
function isPalindrome(str) {
  const clean = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  if (clean.length <= 1) return true;
  if (clean[0] !== clean[clean.length - 1]) return false;
  return isPalindrome(clean.slice(1, -1));
}

console.log("\n=== Palindrome Checker ===");
console.log("racecar:", isPalindrome("racecar"));
console.log("A man a plan a canal Panama:", isPalindrome("A man a plan a canal Panama"));
console.log("hello:", isPalindrome("hello"));
