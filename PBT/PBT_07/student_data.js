const students = [
    { name: "An", math: 8, physics: 7, cs: 9, gender: "M" },
    { name: "Bình", math: 6, physics: 9, cs: 7, gender: "F" },
    { name: "Chi", math: 9, physics: 6, cs: 8, gender: "F" },
    { name: "Dũng", math: 5, physics: 5, cs: 6, gender: "M" },
    { name: "Em", math: 10, physics: 8, cs: 9, gender: "F" },
    { name: "Phong", math: 3, physics: 4, cs: 5, gender: "M" },
    { name: "Giang", math: 7, physics: 7, cs: 7, gender: "F" },
    { name: "Huy", math: 4, physics: 6, cs: 3, gender: "M" },
];

let sumMath = 0, sumPhysics = 0, sumCs = 0;
let maleTotal = 0, maleCount = 0;
let femaleTotal = 0, femaleCount = 0;
let stats = { "Giỏi": 0, "Khá": 0, "Trung bình": 0, "Yếu": 0 };
let results = [];

for (let i = 0; i < students.length; i++) {
    let s = students[i];
    let avg = Number((s.math * 0.4 + s.physics * 0.3 + s.cs * 0.3).toFixed(2));
    
    let rank = avg >= 8.0 ? "Giỏi" : (avg >= 6.5 ? "Khá" : (avg >= 5.0 ? "Trung bình" : "Yếu"));
    stats[rank]++;

    sumMath += s.math; sumPhysics += s.physics; sumCs += s.cs;
    if (s.gender === "M") { maleTotal += avg; maleCount++; }
    else { femaleTotal += avg; femaleCount++; }

    results.push({ STT: i + 1, "Tên": s.name, "TB": avg, "Xếp loại": rank });
}

console.log("=== BẢNG KẾT QUẢ ===");
console.table(results);

let highest = results.reduce((max, s) => s.TB > max.TB ? s : max, results[0]);
let lowest = results.reduce((min, s) => s.TB < min.TB ? s : min, results[0]);

console.log("\n--- THỐNG KÊ ---");
console.log(`Số lượng: Giỏi (${stats["Giỏi"]}), Khá (${stats["Khá"]}), TB (${stats["Trung bình"]}), Yếu (${stats["Yếu"]})`);
console.log(`SV cao điểm nhất: ${highest.Tên} (${highest.TB})`);
console.log(`SV thấp điểm nhất: ${lowest.Tên} (${lowest.TB})`);
console.log(`TB toàn lớp: Toán (${(sumMath/8).toFixed(2)}), Lý (${(sumPhysics/8).toFixed(2)}), CS (${(sumCs/8).toFixed(2)})`);
console.log(`TB theo giới tính: Nam (${(maleTotal/maleCount).toFixed(2)}), Nữ (${(femaleTotal/femaleCount).toFixed(2)})`);