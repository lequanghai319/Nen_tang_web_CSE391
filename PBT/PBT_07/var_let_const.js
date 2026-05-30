// Đoạn 1
console.log(x); // In ra: undefined
var x = 5;

// Đoạn 2
// console.log(y); // Bỏ comment sẽ báo lỗi ReferenceError (TDZ)
let y = 10;

// Đoạn 3
const z = 15;
// z = 20; // Bỏ comment sẽ báo lỗi TypeError

// Đoạn 4
const arr = [1, 2, 3];
arr.push(4);
console.log(arr); // In ra: [1, 2, 3, 4]

// Đoạn 5
let a = 1;
{
    let a = 2;
    console.log("Trong block:", a); // 2
}
console.log("Ngoài block:", a); // 1