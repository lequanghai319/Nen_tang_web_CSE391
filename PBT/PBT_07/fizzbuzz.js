function customFizzBuzz(n, rules) {
    for (let i = 1; i <= n; i++) {
        let output = "";
        for (let rule of rules) {
            if (i % rule.divisor === 0) output += rule.word;
        }
        console.log(output || i);
    }
}

// Test:
customFizzBuzz(35, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" }
]);